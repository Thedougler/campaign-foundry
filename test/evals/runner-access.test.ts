import { link, mkdir, mkdtemp, readFile, readdir, realpath, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import { bindRunnerTools, type RunnerToolRegistrar } from "../../evals/runner-tools.ts";
import { allocateEvalRun, closeEvalSession, createEvalSession } from "../../evals/workspaces.ts";
import evalAccessControl from "../../.omp/extensions/eval-access-control.ts";
const qmdRefresh = (await import(new URL("../../.omp/hooks/post/qmd-refresh.js", import.meta.url).href)).default;

const mockState = vi.hoisted(() => ({
	commands: [] as Array<{ file: string; args: string[]; options: Record<string, unknown> }>,
	refreshes: [] as Array<{ file: string; args: string[]; options: Record<string, unknown> }>,
	qmdOutput: "",
	commandOutput: "",
}));

vi.mock("node:child_process", () => ({
	execFile(file: string, args: string[], options: Record<string, unknown>, callback: (error: Error | null, stdout: string, stderr: string) => void) {
		mockState.commands.push({ file, args, options });
		const output = file === "qmd" ? mockState.qmdOutput : mockState.commandOutput;
		callback(null, output, file === "qmd" ? "qmd stderr" : "cf stderr");
		return {};
	},
	spawnSync(file: string, args: string[], options: Record<string, unknown>) {
		mockState.refreshes.push({ file, args, options });
		return { status: 0, stdout: "", stderr: "", error: undefined };
	},
}));

interface Fixture {
	root: string;
	repositoryRoot: string;
	sessionRoot: string;
	worldRoot: string;
	controlRoot: string;
	prepared: Parameters<typeof bindRunnerTools>[0];
	targetSkillRoot: string;
}

const fixtures = new Set<{ root: string; sessionRoot: string }>();


async function createFixture(): Promise<Fixture> {
	const root = await mkdtemp(join(tmpdir(), "runner-access-test-"));
	const project = join(root, "project");
	await mkdir(project);
	const repositoryRoot = await realpath(project);
	const qmdRoot = join(repositoryRoot, ".qmd");
	const session = await createEvalSession({ sessionId: `runner-access-${randomUUID()}`, pid: process.pid });
	fixtures.add({ root, sessionRoot: session.root });
	const run = await allocateEvalRun(session.root);
	const worldRoot = run.worldRoot;
	const controlRoot = run.controlRoot;
	const targetSkillRoot = join(repositoryRoot, ".agents", "skills", "creature-design");
	await Promise.all([
		mkdir(join(repositoryRoot, "wiki", "World"), { recursive: true }),
		mkdir(join(repositoryRoot, "wiki", "templates"), { recursive: true }),
		mkdir(join(repositoryRoot, "raw"), { recursive: true }),
		mkdir(join(repositoryRoot, "archive"), { recursive: true }),
		mkdir(qmdRoot, { recursive: true }),
		mkdir(join(repositoryRoot, "src"), { recursive: true }),
		mkdir(targetSkillRoot, { recursive: true }),
		mkdir(join(worldRoot, "wiki", "World"), { recursive: true }),
		mkdir(join(worldRoot, "raw"), { recursive: true }),
		mkdir(join(worldRoot, "archive"), { recursive: true }),
		mkdir(join(worldRoot, ".eval"), { recursive: true }),
	]);
	await Promise.all([
		writeFile(join(repositoryRoot, "wiki", "World", "Source.md"), "Live source fact.\n"),
		writeFile(join(repositoryRoot, "src", "cli.ts"), "// CLI fixture\n"),
		writeFile(join(targetSkillRoot, "SKILL.md"), "Live candidate instructions.\n"),
		writeFile(join(repositoryRoot, ".qmd", "index.sqlite"), "index fixture\n"),
		writeFile(join(repositoryRoot, ".qmd", "index.yml"), "collections:\n  wiki:\n    path: wiki\n  raw:\n    path: raw\n  archive:\n    path: archive\n"),
		writeFile(join(worldRoot, "wiki", "World", "Source.md"), "Copied source fact.\n"),
	]);
	const prompt = "Create a short grounded note from the assigned source.";
	const runnerInput = join(worldRoot, ".eval", "runner-input.json");
	await writeFile(runnerInput, JSON.stringify({
		caseId: "runner-access",
		prompt,
		startHere: ["World/Source.md"],
		replaySources: [],
		outputPaths: {
			workspace: worldRoot,
			wiki: join(worldRoot, "wiki"),
			raw: join(worldRoot, "raw"),
			archive: join(worldRoot, "archive"),
			output: join(worldRoot, ".eval", "output.md"),
		},
	}), { mode: 0o444 });
	return {
		root,
		repositoryRoot,
		sessionRoot: session.root,
		worldRoot,
		controlRoot,
		targetSkillRoot,
		prepared: {
			root: worldRoot,
			runnerInput,
			caseId: "runner-access",
			case: { prompt },
			qmd: { mode: "live-read-only", index: join(repositoryRoot, ".qmd", "index.sqlite") },
		},
	};
}

async function withFixture(run: (fixture: Fixture) => Promise<void>): Promise<void> {
	const fixture = await createFixture();
	mockState.commands.length = 0;
	mockState.refreshes.length = 0;
	mockState.qmdOutput = "";
	mockState.commandOutput = "";
	try {
		await run(fixture);
	} finally {
		const owned = [...fixtures].find((entry) => entry.root === fixture.root);
		if (owned) {
			await closeEvalSession(owned.sessionRoot);
			fixtures.delete(owned);
		}
		await rm(fixture.root, { recursive: true, force: true });
	}
}

afterEach(() => {
	vi.clearAllMocks();
});

function registerTools(): { tools: Map<string, (input: Record<string, unknown>) => Promise<unknown>>; register: RunnerToolRegistrar } {
	const tools = new Map<string, (input: Record<string, unknown>) => Promise<unknown>>();
	const register: RunnerToolRegistrar = (handler, options) => {
		tools.set(options.name, handler);
	};
	return { tools, register };
}

function capability(tools: Map<string, (input: Record<string, unknown>) => Promise<unknown>>, suffix: string): (input: Record<string, unknown>) => Promise<unknown> {
	const found = [...tools.entries()].find(([name]) => name.endsWith(`_${suffix}`));
	if (!found) throw new Error(`Missing ${suffix} capability`);
	return found[1];
}

async function bind(fixture: Fixture, skillRoot: string | null = fixture.targetSkillRoot) {
	const registered = registerTools();
	const binding = await bindRunnerTools(fixture.prepared, {
		targetSkillRoot: fixture.targetSkillRoot,
		...(skillRoot === null ? {} : { skillRoot }),
	}, registered.register);
	return { ...registered, binding };
}

describe("eval Runner capabilities", () => {
	it("allows live-source reads and confined World writes and edits", async () => {
		await withFixture(async (fixture) => {
			const { tools } = await bind(fixture);
			const read = capability(tools, "read");
			const write = capability(tools, "write");
			const content = await read({ path: join(fixture.repositoryRoot, "wiki", "World", "Source.md") });
			expect(content).toContain("Live source fact.");
			expect(await read({ path: join(fixture.targetSkillRoot, "SKILL.md") })).toContain("Live candidate instructions.");
			expect(await write({ path: "wiki/World/Output.md", content: "Runner output.\n" })).toMatchObject({ path: "wiki/World/Output.md" });
			expect(await readFile(join(fixture.worldRoot, "wiki", "World", "Output.md"), "utf8")).toBe("Runner output.\n");
			const edit = capability(tools, "edit");
			expect(await edit({ path: "wiki/World/Edited.md", content: "Edited page contents.\n" })).toMatchObject({ path: "wiki/World/Edited.md" });
			expect(await readFile(join(fixture.worldRoot, "wiki", "World", "Edited.md"), "utf8")).toBe("Edited page contents.\n");
			expect(await write({ path: ".eval/output.md", content: "Final answer.\n" })).toMatchObject({ path: ".eval/output.md" });
			await expect(write({ path: ".eval/other.md", content: "private" })).rejects.toThrow();
			await expect(write({ path: join(fixture.repositoryRoot, "wiki", "World", "Source.md"), content: "overwrite" })).rejects.toThrow();
			await expect(write({ path: "../project/wiki/World/Source.md", content: "escape" })).rejects.toThrow();
			await expect(write({ path: ".eval/runner-input.json", content: "replace descriptor" })).rejects.toThrow();
		});
	});

	it("denies private control data, other runs, URI schemes, symlinks, and hard links", async () => {
		await withFixture(async (fixture) => {
			const { tools } = await bind(fixture);
			const read = capability(tools, "read");
			const grantLine = [...tools.keys()];
			expect(grantLine.length).toBeGreaterThan(0);
			const grantFile = join(fixture.controlRoot, "runner-grant.json");
			await expect(read({ path: grantFile })).rejects.toThrow();
			const otherRun = await allocateEvalRun(fixture.sessionRoot);
			await mkdir(join(otherRun.worldRoot, "wiki"), { recursive: true });
			await expect(read({ path: join(otherRun.worldRoot, "wiki", "secret.md") })).rejects.toThrow();
			await expect(read({ path: "vault://_/World/Source.md" })).rejects.toThrow();
			await expect(read({ path: "agent://another-run/private" })).rejects.toThrow();
			const outside = join(fixture.root, "outside.md");
			await writeFile(outside, "outside data\n");
			await symlink(outside, join(fixture.worldRoot, "wiki", "World", "Link.md"));
			await expect(read({ path: "wiki/World/Link.md" })).rejects.toThrow();
			await link(outside, join(fixture.worldRoot, "wiki", "World", "Hard-link.md"));
			await expect(read({ path: "wiki/World/Hard-link.md" })).rejects.toThrow();
		});
	});

	it("grants only assigned skill snapshots and filters QMD results to mapped scratch paths", async () => {
		await withFixture(async (fixture) => {
			const snapshot = join(fixture.sessionRoot, "authoring", "creature-design");
			await mkdir(snapshot, { recursive: true });
			await writeFile(join(snapshot, "SKILL.md"), "Assigned snapshot content.\n");
			const { tools } = await bind(fixture, snapshot);
			const read = capability(tools, "read");
			const query = capability(tools, "qmd_query");
			await expect(read({ path: join(fixture.targetSkillRoot, "SKILL.md") })).rejects.toThrow();
			expect(await read({ path: join(snapshot, "SKILL.md") })).toContain("Assigned snapshot content.");
			expect(await read({ path: "skill://creature-design/SKILL.md" })).toContain("Assigned snapshot content.");
			mockState.qmdOutput = `Structured search: 1 queries\n[\n  {"docid":"#abcd12","file":"qmd://wiki/World/Source.md","score":0.9,"snippet":"Live source fact."}\n]\n`;
			const result = await query({ intent: "Read the current source", searches: [{ type: "lex", query: "Source" }], limit: 1 });
			expect(result).toMatchObject({ stderr: "qmd stderr", exitCode: 0, results: [{ liveSource: "wiki/World/Source.md", scratchPath: "wiki/World/Source.md" }] });
			const command = mockState.commands[0];
			expect(command).toMatchObject({ file: "qmd", options: { shell: false, cwd: fixture.repositoryRoot } });
			expect(command?.args).toContain("--no-rerank");
			expect(command?.args).toContain("wiki");
			expect(command?.args).toContain("archive");
			expect(command?.args).not.toContain("update");
			expect(command?.args).not.toContain("embed");
			mockState.qmdOutput = "Retrieved live source body.\n";
			const get = capability(tools, "qmd_get");
			const retrieved = await get({ reference: join(fixture.repositoryRoot, "wiki", "World", "Source.md") });
			expect(retrieved).toMatchObject({ liveSource: "wiki/World/Source.md", scratchPath: "wiki/World/Source.md" });
			const getCommand = mockState.commands[1];
			expect(getCommand).toMatchObject({ file: "qmd", options: { shell: false, cwd: fixture.repositoryRoot } });
			expect(getCommand?.args[0]).toBe("get");
			expect(getCommand?.args[1]).toBe(join(fixture.repositoryRoot, "wiki", "World", "Source.md"));
		});
	});

	it("denies the target skill completely for a no-skill baseline", async () => {
		await withFixture(async (fixture) => {
			const { tools } = await bind(fixture, null);
			const read = capability(tools, "read");
			await expect(read({ path: join(fixture.targetSkillRoot, "SKILL.md") })).rejects.toThrow();
			await expect(read({ path: "skill://creature-design/SKILL.md" })).rejects.toThrow();
		});
	});

	it("grants HTTPS only on request and rejects local and IPv4-mapped IPv6 hosts", async () => {
		await withFixture(async (fixture) => {
			const registered = registerTools();
			const binding = await bindRunnerTools(fixture.prepared, {
				targetSkillRoot: fixture.targetSkillRoot,
				skillRoot: fixture.targetSkillRoot,
				network: { https: true, search: false },
			}, registered.register);
			expect(binding.toolNames.some((name) => name.endsWith("_https_get"))).toBe(true);
			expect(binding.toolNames.some((name) => name.endsWith("_web_search"))).toBe(false);
			const get = capability(registered.tools, "https_get");
			await expect(get({ url: "https://localhost/private" })).rejects.toThrow();
			await expect(get({ url: "https://[::ffff:127.0.0.1]/private" })).rejects.toThrow();
		});
	});

	it("runs the unified check with fixed World bindings and returns its real process result", async () => {
		await withFixture(async (fixture) => {
			mockState.commandOutput = "{\"layers\":13}\n";
			const { tools } = await bind(fixture);
			const check = capability(tools, "check");
			const result = await check({ fix: true });
			expect(result).toMatchObject({ stdout: "{\"layers\":13}\n", stderr: "cf stderr", exitCode: 0 });
			const command = mockState.commands[0];
			expect(command).toMatchObject({ file: "node", options: { shell: false, cwd: fixture.repositoryRoot } });
			expect(command?.args).toContain(join(fixture.repositoryRoot, "src", "cli.ts"));
			expect(command?.args).toContain("check");
			expect(command?.args).toContain("--fix");
			expect(command?.args).toContain("--root");
			expect(command?.args).toContain(fixture.worldRoot);
			expect(command?.args).toContain(join(fixture.worldRoot, "wiki"));
			expect(command?.args).toContain(join(fixture.worldRoot, "wiki", "templates"));
			expect(command?.args).not.toContain("--layer");
		});
	});
});

describe("eval Runner inherited hook policy", () => {
	it("binds one grant, strips its machine line, and blocks ungranted child tools", async () => {
		await withFixture(async (fixture) => {
			const { binding, tools } = await bind(fixture);
			const handlers = new Map<string, (event: never, ctx: never) => unknown>();
			const definition: { name: string; execute?: (...args: never[]) => unknown }[] = [];
			const pi = {
				zod: { object: (value: unknown) => value, enum: (value: unknown) => value },
				registerTool: (tool: { name: string; execute?: (...args: never[]) => unknown }) => definition.push(tool),
				on: (event: string, handler: (event: never, ctx: never) => unknown) => handlers.set(event, handler),
			};
			evalAccessControl(pi as never);
			const beforeAgentStart = handlers.get("before_agent_start");
			const transformContext = handlers.get("context");
			const gateTool = handlers.get("tool_call");
			if (!beforeAgentStart || !transformContext || !gateTool) throw new Error("Runner enforcement hooks were not registered");
			const agentContext = { agent: { kind: "sub", name: "test-subject", id: "runner-child" }, sessionManager: { getSessionId: () => "parent-session" } };
			const promptResult = await beforeAgentStart({
				systemPrompt: "Production instructions.\n<plan path=\"local://eval-isolation-plan.md\">private plan material</plan>\nAssigned skill instructions.",
				prompt: binding.runnerBrief,
			} as never, agentContext as never) as { systemPrompt: string };
			expect(promptResult.systemPrompt).toContain("Production instructions.");
			expect(promptResult.systemPrompt).toContain("Assigned skill instructions.");
			expect(promptResult.systemPrompt).not.toContain("private plan material");
			const messages = await transformContext({ messages: [{ role: "user", content: [{ type: "text", text: binding.runnerBrief }] }] } as never, agentContext as never) as { messages: Array<{ content: Array<{ text?: string }> }> };
			expect(messages.messages[0]?.content[0]?.text).not.toContain("Eval grant:");
			const readName = binding.toolNames.find((name) => name.endsWith("_read"));
			expect(await gateTool({ toolName: readName } as never, agentContext as never)).toBeUndefined();
			expect(await gateTool({ toolName: "yield" } as never, agentContext as never)).toBeUndefined();
			expect(await gateTool({ toolName: "bash" } as never, agentContext as never)).toMatchObject({ block: true });
			expect(await gateTool({ toolName: "eval" } as never, agentContext as never)).toMatchObject({ block: true });
			expect(await gateTool({ toolName: "task" } as never, agentContext as never)).toMatchObject({ block: true });
			const other = { ...agentContext, agent: { kind: "sub", name: "test-subject", id: "unbound-child" } };
			await beforeAgentStart({ systemPrompt: "Production", prompt: "No private grant." } as never, other as never);
			expect(await gateTool({ toolName: binding.toolNames[0] } as never, other as never)).toMatchObject({ block: true });
			expect(await gateTool({ toolName: "yield" } as never, other as never)).toMatchObject({ block: true });
			expect(definition.some((item) => item.name === "eval_session")).toBe(true);
		});
	});
});

describe("QMD refresh access boundary", () => {
	it("skips eval Runners and refreshes only canonical live-source file operations", async () => {
		const handlers = new Map<string, (event: never, ctx: never) => unknown>();
		qmdRefresh({ on: (event: string, handler: (event: never, ctx: never) => unknown) => handlers.set(event, handler) } as never);
		const sessionStart = handlers.get("session_start");
		const toolResult = handlers.get("tool_result");
		if (!sessionStart || !toolResult) throw new Error("QMD hooks were not registered");
		await sessionStart({} as never, { cwd: process.cwd(), agent: { kind: "sub", name: "test-subject" } } as never);
		expect(mockState.refreshes).toHaveLength(0);
		await toolResult({ toolName: "bash", input: { command: "echo /wiki/World/Page.md" }, isError: false } as never, { cwd: process.cwd(), agent: { kind: "main", name: "main" } } as never);
		await toolResult({ toolName: "eval", input: { code: "write /wiki/World/Page.md" }, isError: false } as never, { cwd: process.cwd(), agent: { kind: "main", name: "main" } } as never);
		expect(mockState.refreshes).toHaveLength(0);
		const livePage = await findMarkdown(join(process.cwd(), "wiki"));
		await toolResult({ toolName: "write", input: { path: livePage }, isError: false } as never, { cwd: process.cwd(), agent: { kind: "main", name: "main" } } as never);
		expect(mockState.refreshes).toHaveLength(1);
		const scratchPage = join(tmpdir(), "campaign-foundry-eval-unit", "worlds", "run", "wiki", "Page.md");
		await toolResult({ toolName: "write", input: { path: scratchPage }, isError: false } as never, { cwd: process.cwd(), agent: { kind: "main", name: "main" } } as never);
		expect(mockState.refreshes).toHaveLength(1);
	});
});

async function findMarkdown(root: string): Promise<string> {
	for (const entry of await readdir(root, { withFileTypes: true })) {
		const path = join(root, entry.name);
		if (entry.isDirectory() && !entry.isSymbolicLink()) {
			const found = await findMarkdown(path).catch(() => "");
			if (found) return found;
		} else if (entry.isFile() && entry.name.endsWith(".md")) return path;
	}
	throw new Error(`No Markdown source file was available under ${root}`);
}
