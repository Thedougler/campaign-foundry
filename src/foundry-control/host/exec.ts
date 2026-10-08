import { spawn } from "node:child_process";

import type { CommandResult, ExecFn } from "./remote.ts";

const MAX_BUFFER = 32 * 1024 * 1024;

/** The real exec: spawns the process, pipes stdin through, never throws on a nonzero exit. */
export const realExec: ExecFn = (file, args, opts) => {
	const { promise, resolve } = Promise.withResolvers<CommandResult>();
	const child = spawn(file, args, { stdio: ["pipe", "pipe", "pipe"] });
	let stdout = "";
	let stderr = "";
	child.stdout.setEncoding("utf8");
	child.stderr.setEncoding("utf8");
	child.stdout.on("data", (chunk: string) => {
		if (stdout.length < MAX_BUFFER) stdout += chunk;
	});
	child.stderr.on("data", (chunk: string) => {
		if (stderr.length < MAX_BUFFER) stderr += chunk;
	});
	child.on("error", (error: NodeJS.ErrnoException) => {
		resolve({ code: 1, stdout, stderr: `${stderr}${stderr ? "\n" : ""}${error.message}` });
	});
	child.on("close", (code) => {
		resolve({ code: code ?? 1, stdout, stderr });
	});
	child.stdin.end(opts.input ?? "");
	return promise;
};
