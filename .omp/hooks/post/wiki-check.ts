import { spawn } from "node:child_process";
import type { ChildProcess } from "node:child_process";
import { realpathSync, statSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI, ExtensionContext, ToolResultEvent, ToolResultEventResult } from "@oh-my-pi/pi-coding-agent";
import { feedback, inputPaths, LIMITS, shouldCheck } from "../wiki-check-core.ts";
import type { Execution } from "../wiki-check-core.ts";

export interface CheckRequest {
	command: string;
	args: string[];
	cwd: string;
	timeoutMs: number;
	maxOutputBytes: number;
}

export interface WikiCheckOptions {
	repoRoot: string;
	run?: (request: CheckRequest) => Promise<Execution>;
}

/** Both a lexical Wiki target and its real destination must remain inside the Wiki. */
export function wikiPage(value: string, cwd: string, repoRoot: string): string | null {
	if (!value || value.length > LIMITS.pathChars || value.includes("\0")) return null;
	const header = /^\[(.+?)(?:#[\da-f]{4})?\]$/iu.exec(value);
	const path = header?.[1] ?? value;
	const wiki = join(repoRoot, "wiki");
	let candidate: string;
	if (path.startsWith("vault://_/")) {
		const parts = path.slice("vault://_/".length).split(/[\\/]/u);
		if (parts.some((part) => part === "." || part === "..")) return null;
		candidate = resolve(wiki, ...parts);
	} else {
		if (/^[a-z][a-z\d+.-]*:\/\//iu.test(path)) return null;
		candidate = resolve(cwd, path);
	}
	const lexical = relative(wiki, candidate);
	if (lexical === ".." || lexical.startsWith(`..${sep}`) || isAbsolute(lexical)) return null;
	try {
		const root = realpathSync(wiki);
		const canonical = realpathSync(candidate);
		const inside = relative(root, canonical);
		if (inside === ".." || inside.startsWith(`..${sep}`) || isAbsolute(inside)) return null;
		return /\.md$/iu.test(candidate) && /\.md$/iu.test(canonical) && statSync(canonical).isFile() ? canonical : null;
	} catch {
		return null; // Removed files, dangling links and unavailable roots are not check targets.
	}
}

/** No shell, stdin or fixes. Capture and process lifetime are bounded, including child subprocesses. */
export function runCheck(request: CheckRequest): Promise<Execution> {
	const { promise, resolve: done } = Promise.withResolvers<Execution>();
	const grouped = process.platform !== "win32";
	let outputBytes = 0;
	const stdout: Buffer[] = [];
	let settled = false;
	let timer: NodeJS.Timeout | undefined;
	let child: ChildProcess;
	const finish = (result: Execution) => {
		if (settled) return;
		settled = true;
		clearTimeout(timer);
		done(result);
	};
	try {
		child = spawn(request.command, request.args, { cwd: request.cwd, stdio: ["ignore", "pipe", "pipe"], shell: false, detached: grouped });
	} catch (error) {
		finish({ failure: "error", detail: String(error) });
		return promise;
	}
	const stop = (failure: "timeout" | "output-capped") => {
		try {
			if (grouped && child.pid) process.kill(-child.pid, "SIGKILL");
			else child.kill("SIGKILL");
		} catch { /* The process may already have exited. */ }
		finish({ failure });
	};
	const capture = (chunk: Buffer, keep: boolean) => {
		if (settled) return;
		outputBytes += chunk.length;
		if (outputBytes > request.maxOutputBytes) { stop("output-capped"); return; }
		if (keep) stdout.push(chunk);
	};
	child.stdout?.on("data", (chunk: Buffer) => capture(chunk, true));
	child.stderr?.on("data", (chunk: Buffer) => capture(chunk, false));
	child.on("error", (error) => finish({ failure: "error", detail: error.message }));
	child.on("close", (exitCode) => finish({ stdout: Buffer.concat(stdout).toString("utf8"), exitCode }));
	timer = setTimeout(() => stop("timeout"), request.timeoutMs);
	return promise;
}

/** A fresh factory owns one bounded queue; imported module state is not shared session state. */
export function createWikiCheckHandler(options: WikiCheckOptions): (event: ToolResultEvent, ctx: Pick<ExtensionContext, "cwd" | "agent">) => Promise<ToolResultEventResult | undefined> {
	const run = options.run ?? runCheck;
	const repoRoot = resolve(options.repoRoot);
	let queue: Promise<void> = Promise.resolve();
	let pending = 0;
	return async (event, ctx) => {
		if (!shouldCheck(event.toolName, event.isError, ctx.agent)) return;
		const targets = inputPaths(event.toolName, event.input);
		const seen = new Set<string>();
		const pages: string[] = [];
		for (const value of targets.values) {
			const path = wikiPage(value, ctx.cwd, repoRoot);
			if (!path || seen.has(path)) continue;
			seen.add(path);
			if (pages.length >= LIMITS.pages) { targets.omitted++; continue; }
			pages.push(relative(repoRoot, path));
		}
		if (pages.length === 0) return;
		let execution: Execution;
		if (pending >= LIMITS.pending) execution = { failure: "queue-full" };
		else {
			pending++;
			const task = queue.then(async (): Promise<Execution> => {
				try {
					return await run({ command: "bun", args: ["run", "cf", "--", "check", "--json", "--root", repoRoot, ...pages], cwd: repoRoot, timeoutMs: LIMITS.timeoutMs, maxOutputBytes: LIMITS.outputBytes });
				} catch (error) {
					return { failure: "error", detail: String(error) };
				} finally { pending--; }
			});
			queue = task.then(() => undefined);
			execution = await task;
		}
		const result = feedback(execution, pages, targets);
		return { content: [...event.content, { type: "text", text: `\n[wiki-check]\n${result.text}` }], ...(result.additionalContext ? { additionalContext: result.additionalContext } : {}) };
	};
}

export default function wikiCheck(pi: ExtensionAPI): void {
	pi.on("tool_result", createWikiCheckHandler({ repoRoot: resolve(dirname(fileURLToPath(import.meta.url)), "../../..") }));
}
