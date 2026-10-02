import { link, mkdir, mkdtemp, readFile, readdir, realpath, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { bindRunnerTools, type RunnerPreparedRun, type RunnerToolRegistrar } from "../../evals/runner-tools.ts";
import { allocateEvalRun, closeEvalSession, createEvalSession } from "../../evals/workspaces.ts";
import evalAccessControl from "../../.omp/extensions/eval-access-control.ts";
import { readRunnerOutput } from "../../evals/outputs.ts";

const mock = vi.hoisted(() => ({ stdout: "[]", commands: [] as Array<{ file: string; args: string[]; cwd: string }> }));
vi.mock("node:child_process", async (importOriginal) => {
	const original = await importOriginal<Record<string, unknown>>();
	return {
		...original, execFile: (file: string, args: string[], options: { cwd: string }, callback: (error: null, stdout: string, stderr: string) => void) => {
			mock.commands.push({ file, args, cwd: options.cwd }); callback(null, mock.stdout, "");
		}
	};
});
const cleanup: Array<{ root: string; sessionRoot: string }> = [];
afterEach(async () => {
	for (const entry of cleanup.splice(0)) { await closeEvalSession(entry.sessionRoot); await rm(entry.root, { recursive: true, force: true }); }
	mock.commands.length = 0; mock.stdout = "[]";
});
type Handler = (input: Record<string, unknown>) => Promise<unknown>;

async function fixture() {
	const root = await realpath(await mkdtemp(join(tmpdir(), "runner-live-test-")));
	const session = await createEvalSession({ sessionId: "access-test", pid: process.pid });
	cleanup.push({ root, sessionRoot: session.root });
	const run = await allocateEvalRun(session.root);
	const skillRoot = join(root, ".agents/skills/creature-design");
	await Promise.all([mkdir(join(root, "wiki/World"), { recursive: true }), mkdir(join(root, "wiki/templates"), { recursive: true }), mkdir(join(root, "raw")), mkdir(join(root, "archive")), mkdir(join(root, ".qmd")), mkdir(join(skillRoot, "evals"), { recursive: true })]);
	await Promise.all([
		writeFile(join(root, "wiki/World/Source.md"), "Live source fact.\n"), writeFile(join(root, "raw/input.md"), "Raw input"), writeFile(join(root, "archive/input.md"), "Archive input"),
		writeFile(join(root, ".qmd/index.sqlite"), "index"), writeFile(join(root, ".qmd/index.yml"), "collections:\n  wiki:\n    path: wiki\n  raw:\n    path: raw\n  archive:\n    path: archive\n"),
		writeFile(join(skillRoot, "SKILL.md"), "Production skill"), writeFile(join(skillRoot, "evals/cases.yaml"), "private criteria"),
	]);
	const prepared: RunnerPreparedRun = { repositoryRoot: root, sessionRoot: session.root, runId: run.runId, caseId: "access", case: { prompt: "Create a grounded note.", source_pages: ["World/Source.md"], raw_sources: ["archive/input.md"] }, qmd: { mode: "live-read-only", index: join(root, ".qmd/index.sqlite") } };
	return { root, skillRoot, sessionRoot: session.root, controlRoot: run.controlRoot, outputRoot: run.outputRoot, prepared };
}
async function bind(input: { prepared: RunnerPreparedRun; skillRoot: string }, assigned: string | null = input.skillRoot, network?: { https: boolean; search: boolean }) {
	const tools = new Map<string, Handler>();
	const register: RunnerToolRegistrar = (handler, options) => { tools.set(options.name, handler); };
	const binding = await bindRunnerTools(input.prepared, { targetSkillRoot: input.skillRoot, ...(assigned ? { skillRoot: assigned } : {}), ...(network ? { network } : {}) }, register);
	const capability = (suffix: string): Handler => {
		const match = [...tools].find(([name]) => name.endsWith(`_${suffix}`));
		if (!match) throw new Error(`No bound ${suffix}`);
		return match[1];
	};
	return { tools, binding, capability };
}

function hooks() {
	const handlers = new Map<string, (event: never, ctx: never) => unknown>();
	const definitions: Array<{ name: string; execute: (...args: never[]) => unknown }> = [];
	evalAccessControl({ zod: { object: (value: unknown) => value, enum: (value: unknown) => value }, registerTool: (tool: never) => definitions.push(tool), on: (event: string, handler: (event: never, ctx: never) => unknown) => handlers.set(event, handler) } as never);
	return { handlers, definitions };
}

describe("live Runner capabilities with scoped file deliverables", () => {
	it("binds live reads and output-only mutations, with a natural start-here brief", async () => {
		const input = await fixture(); const bound = await bind(input);
		expect(bound.binding.toolNames.map((name) => name.replace(/^cf_eval_[a-f0-9]+_/u, ""))).toEqual(["write", "delete_page", "read", "grep", "glob", "find", "qmd_query", "qmd_get"]);
		const read = bound.capability("read");
		expect(await read({ path: "wiki/World/Source.md" })).toContain("Live source fact.");
		expect(await read({ path: "raw/input.md" })).toContain("Raw input");
		expect(await read({ path: "archive/input.md" })).toContain("Archive input");
		expect(await read({ path: "skill://creature-design" })).toContain("Production skill");
		await writeFile(join(input.root, "wiki/World/Source.md"), "Current live bytes");
		expect(await read({ path: "wiki/World/Source.md" })).toContain("Current live bytes");
		expect(bound.binding.runnerBrief).toContain("wiki/World/Source.md");
		expect(bound.binding.runnerBrief).toContain("archive/input.md");
		expect(bound.binding.runnerBrief).toContain("DM request (verbatim):\nCreate a grounded note.");
		expect(bound.binding.runnerBrief).not.toContain("private criteria");
		expect(await readdir(input.controlRoot)).toEqual(["runner-grant.json"]);
	});
	it("denies evaluator files, private runs, traversal, symlinks and hardlinks", async () => {
		const input = await fixture(); const bound = await bind(input); const read = bound.capability("read");
		for (const path of [join(input.skillRoot, "evals/cases.yaml"), join(input.controlRoot, "runner-grant.json"), "../outside", "wiki/World/../Source.md", "file://private", "skill://creature-design/evals/cases.yaml", "skill://other/SKILL.md"]) await expect(read({ path })).rejects.toThrow();
		for (const directory of ["evals", "answers", "graders", "grades", "snapshots"]) {
			await mkdir(join(input.root, "wiki", directory)); await writeFile(join(input.root, "wiki", directory, "private.md"), "SECRET");
			await expect(read({ path: `wiki/${directory}/private.md` })).rejects.toThrow();
		}
		await writeFile(join(input.root, "wiki/World/rubric.md"), "SECRET");
		await expect(read({ path: "wiki/World/rubric.md" })).rejects.toThrow();
		await symlink(join(input.root, "wiki/World/Source.md"), join(input.root, "wiki/World/link.md"));
		await expect(read({ path: "wiki/World/link.md" })).rejects.toThrow(/Symbolic/);
		await link(join(input.root, "raw/input.md"), join(input.root, "raw/hard.md"));
		await expect(read({ path: "raw/hard.md" })).rejects.toThrow(/Hard-linked/);
		const other = await allocateEvalRun(input.sessionRoot);
		await writeFile(join(other.controlRoot, "grades.json"), "SECRET");
		await expect(read({ path: join(other.controlRoot, "grades.json") })).rejects.toThrow();
		await writeFile(join(other.outputRoot, "reply.md"), "Other run SECRET");
		await expect(read({ path: join(other.outputRoot, "reply.md") })).rejects.toThrow();
		const hits = await bound.capability("grep")({ query: "SECRET" }); expect(hits).toEqual([]);
		expect(JSON.stringify(await bound.capability("glob")({ pattern: "**" }))).not.toMatch(/private\.md|rubric\.md/);
	});
	it("confines writes and draft searches to its own output directory", async () => {
		const input = await fixture(); const bound = await bind(input); const write = bound.capability("write");
		await write({ path: "wiki/World/New.md", content: "Complete draft." });
		await write({ path: "reply.md", content: "DM reply." });
		expect(await readFile(join(input.outputRoot, "World/New.md"), "utf8")).toBe("Complete draft.");
		expect(await bound.capability("read")({ path: join(input.outputRoot, "World/New.md") })).toContain("Complete draft.");
		expect(await bound.capability("grep")({ path: input.outputRoot, query: "draft" })).toMatchObject([{ path: join(input.outputRoot, "World/New.md") }]);
		expect(await bound.capability("glob")({ path: input.outputRoot, pattern: "**" })).toHaveLength(2);
		expect(await bound.capability("find")({ path: input.outputRoot, query: "New" })).toHaveLength(1);
		for (const path of ["../outside.md", "/outside.md", join(input.root, "wiki/World/Source.md"), join(input.controlRoot, "grades.md"), "wiki/World/../Source.md", "World/Page", "raw/input.txt", ".deleted.json", "World/rubric.md", "World/evals/Page.md"]) {
			await expect(write({ path, content: "Mutation" })).rejects.toThrow();
		}
		expect(await readFile(join(input.root, "wiki/World/Source.md"), "utf8")).toBe("Live source fact.\n");
		await expect(readFile(join(input.root, "wiki/World/New.md"))).rejects.toMatchObject({ code: "ENOENT" });
		const other = await allocateEvalRun(input.sessionRoot);
		await expect(write({ path: join(other.outputRoot, "reply.md"), content: "Other mutation" })).rejects.toThrow();
		for (const suffix of ["grep", "glob", "find"]) {
			await expect(bound.capability(suffix)({ path: other.outputRoot, query: "a", pattern: "**" })).rejects.toThrow();
		}
	});
	it("records deletions without touching live pages and allows later rewrites", async () => {
		const input = await fixture(); const bound = await bind(input); const write = bound.capability("write"); const remove = bound.capability("delete_page");
		await write({ path: "reply.md", content: "DM reply." });
		await write({ path: "World/Source.md", content: "A draft." });
		await remove({ path: "wiki/World/Source.md" });
		expect(readRunnerOutput(input.outputRoot).deleted).toEqual(["World/Source.md"]);
		await expect(readFile(join(input.outputRoot, "World/Source.md"))).rejects.toMatchObject({ code: "ENOENT" });
		expect(await readFile(join(input.root, "wiki/World/Source.md"), "utf8")).toBe("Live source fact.\n");
		await write({ path: "World/Source.md", content: "Final draft." });
		expect(readRunnerOutput(input.outputRoot).deleted).toEqual([]);
		await expect(remove({ path: "reply.md" })).rejects.toThrow(/reserved/);
		await Promise.all(["One", "Two", "Three"].map((name) => remove({ path: `World/${name}.md` })));
		expect(readRunnerOutput(input.outputRoot).deleted.sort()).toEqual(["World/One.md", "World/Three.md", "World/Two.md"]);
	});
	it("rejects output symlink and hardlink mutations", async () => {
		const input = await fixture(); const bound = await bind(input);
		await symlink(join(input.root, "wiki/World"), join(input.outputRoot, "World"));
		await expect(bound.capability("write")({ path: "World/Source.md", content: "Unsafe" })).rejects.toThrow(/real directory/);
		await link(join(input.root, "raw/input.md"), join(input.outputRoot, "hard.md"));
		await expect(bound.capability("write")({ path: "hard.md", content: "Unsafe" })).rejects.toThrow(/independent regular file/);
		await expect(bound.capability("delete_page")({ path: "hard.md" })).rejects.toThrow(/independent regular file/);
		expect(await readFile(join(input.root, "raw/input.md"), "utf8")).toBe("Raw input");
	});
	it("excludes the live candidate in snapshot and no-skill baselines", async () => {
		const input = await fixture(); const baseline = await bind(input, null);
		await expect(baseline.capability("read")({ path: join(input.skillRoot, "SKILL.md") })).rejects.toThrow();
		await expect(baseline.capability("read")({ path: "skill://creature-design" })).rejects.toThrow();
		const snapshot = join(input.sessionRoot, "authoring/creature-design/skill-snapshot");
		await mkdir(snapshot, { recursive: true }); await writeFile(join(snapshot, "SKILL.md"), "Assigned snapshot");
		const run = await allocateEvalRun(input.sessionRoot); const snap = await bind({ ...input, prepared: { ...input.prepared, runId: run.runId } }, snapshot);
		expect(await snap.capability("read")({ path: "skill://creature-design" })).toContain("Assigned snapshot");
		await expect(snap.capability("read")({ path: join(input.skillRoot, "SKILL.md") })).rejects.toThrow();
	});
	it.each([".agents/skills/creature-design/evals/revision", ".omp/skills/sample/evals/revision", "snapshots/sample", "revisions/rubric/sample"])("rejects assigned roots inside evaluator components: %s", async (location) => {
		const input = await fixture(); const snapshot = join(input.root, location);
		await mkdir(snapshot, { recursive: true }); await writeFile(join(snapshot, "SKILL.md"), "Evaluator-protected snapshot");
		await expect(bind(input, snapshot)).rejects.toThrow(/protected evaluator data/);
	});
	it("requires an assigned skill directory with a canonical regular SKILL.md", async () => {
		const input = await fixture(); const snapshot = join(input.root, "revisions/sample");
		await mkdir(snapshot, { recursive: true });
		await expect(bind(input, snapshot)).rejects.toThrow();
		await symlink(join(input.skillRoot, "SKILL.md"), join(snapshot, "SKILL.md"));
		await expect(bind(input, snapshot)).rejects.toThrow(/Symbolic links/);
	});
	it("returns direct live QMD paths and filters private snippets, retrieving current source bytes", async () => {
		const input = await fixture(); const bound = await bind(input);
		mock.stdout = JSON.stringify([{ file: "qmd://wiki/World/Source.md", snippet: "indexed" }, { file: "qmd://wiki/evals/secret.md", snippet: "SECRET" }]);
		const result = await bound.capability("qmd_query")({ intent: "Current source", searches: [{ type: "lex", query: "Source" }] });
		expect(result).toMatchObject({ results: [{ path: join(input.root, "wiki/World/Source.md"), liveSource: "wiki/World/Source.md" }] });
		expect(JSON.stringify(result)).not.toMatch(/SECRET|scratchPath|stdout/);
		expect(mock.commands[0]).toMatchObject({ file: "qmd", cwd: input.root });
		expect(mock.commands[0]!.args).not.toContain("update");
		mock.stdout = `${join(input.root, "wiki/World/Source.md")}\nSTALE INDEX BODY`;
		expect(await bound.capability("qmd_get")({ reference: "#abcd12" })).toMatchObject({ content: "Live source fact.\n", path: join(input.root, "wiki/World/Source.md") });
		mock.stdout = `${join(input.root, "wiki/evals/secret.md")}\nSECRET`;
		await expect(bound.capability("qmd_get")({ reference: "#abcd12" })).rejects.toThrow();
	});
	it("grants public HTTPS only when requested and rejects private hosts", async () => {
		const input = await fixture(); const bound = await bind(input, input.skillRoot, { https: true, search: false });
		expect(bound.binding.toolNames.some((name) => name.endsWith("_https_get"))).toBe(true);
		expect(bound.binding.toolNames.some((name) => name.endsWith("_web_search"))).toBe(false);
		await expect(bound.capability("https_get")({ url: "https://localhost/private" })).rejects.toThrow();
		await expect(bound.capability("https_get")({ url: "https://[::ffff:127.0.0.1]/private" })).rejects.toThrow();
	});
});

describe("native Runner extension boundaries", () => {
	it("requires one grant, strips evaluator context, and blocks unscoped/other-run tools", async () => {
		const input = await fixture(); const bound = await bind(input); const { handlers } = hooks();
		const ctx = { agent: { kind: "sub", name: "test-subject", id: "access-runner" }, sessionManager: { getSessionId: () => "access-parent" } };
		const before = handlers.get("before_agent_start")!; const gate = handlers.get("tool_call")!;
		const started = await before({ prompt: `Preamble\n${bound.binding.runnerBrief}`, systemPrompt: "Production.\n<evaluator-only>SECRET</evaluator-only>" } as never, ctx as never);
		expect(started).toEqual({ systemPrompt: "Production." });
		expect(await gate({ toolName: bound.binding.toolNames[0] } as never, ctx as never)).toBeUndefined();
		expect(await gate({ toolName: bound.binding.toolNames.find((name) => name.endsWith("_delete_page")) } as never, ctx as never)).toBeUndefined();
		expect(await gate({ toolName: "yield" } as never, ctx as never)).toBeUndefined();
		for (const toolName of ["read", "write", "delete_page", "edit", "bash", "eval", "cf_eval_0000000000000000_read", "cf_eval_0000000000000000_write"]) expect(await gate({ toolName } as never, ctx as never)).toMatchObject({ block: true });
		const context = await handlers.get("context")!({ messages: [{ role: "user", content: bound.binding.runnerBrief }] } as never, ctx as never);
		expect(JSON.stringify(context)).not.toContain("Eval grant:");
		const unbound = { ...ctx, agent: { ...ctx.agent, id: "unbound-runner" } };
		expect(await gate({ toolName: "yield" } as never, unbound as never)).toMatchObject({ block: true });
	});
	it("opens and closes private Session storage through eval_session", async () => {
		const { definitions } = hooks(); const tool = definitions.find((tool) => tool.name === "eval_session")!;
		const ctx = { agent: { kind: "main", name: "main", id: "session-owner" }, sessionManager: { getSessionId: () => "session-owner" } };
		const call = async (operation: string) => {
			const result = await tool.execute("id" as never, { operation } as never, undefined as never, undefined as never, ctx as never) as { content: Array<{ text: string }> };
			return JSON.parse(result.content[0]!.text) as { open: boolean; root?: string };
		};
		const opened = await call("open");
		expect(opened.open).toBe(true);
		expect(await readdir(opened.root!)).not.toContain("worlds");
		expect(await call("open")).toEqual(opened);
		expect(await call("close")).toEqual({ open: false });
		await expect(readFile(join(opened.root!, ".session.json"))).rejects.toMatchObject({ code: "ENOENT" });
	});
});
