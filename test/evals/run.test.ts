import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { operationalInstructions, resolveSkillEval, runSkillEvals, type DispatchFn, type DispatchHandle } from "../../evals/run.ts";
import { closeEvalSession } from "../../evals/workspaces.ts";
import type { RunnerToolRegistrar } from "../../evals/runner-tools.ts";

const roots: string[] = [];
const sessions: string[] = [];
afterEach(async () => { await Promise.all(sessions.splice(0).map(closeEvalSession)); await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true }))); });
const isolation = "\n\nIsolation: no changes captured.";
async function fixture(rubrics = true) {
	const root = await mkdtemp(join(tmpdir(), "eval-run-test-")); roots.push(root);
	const skill = join(root, ".agents/skills/sample");
	await Promise.all([mkdir(join(skill, "evals"), { recursive: true }), mkdir(join(root, "wiki/World"), { recursive: true }), mkdir(join(root, "raw")), mkdir(join(root, "archive")), mkdir(join(root, ".qmd"))]);
	await Promise.all([
		writeFile(join(root, "wiki/World/Source.md"), "Original live canon."), writeFile(join(root, "archive/source.md"), "Live Archive excerpt."),
		writeFile(join(skill, "SKILL.md"), "Production skill"), writeFile(join(root, ".qmd/index.sqlite"), "index"), writeFile(join(root, ".qmd/index.yml"), "collections:\n  wiki:\n    path: wiki\n  raw:\n    path: raw\n  archive:\n    path: archive\n"),
		writeFile(join(skill, "evals/cases.yaml"), `- id: case\n  prompt: Make a live page.\n  source_pages: [World/Source.md]\n  raw_sources: [archive/source.md]\n  checks:\n    pages: [World/New.md]\n    canon:\n      World/New.md: [New canon]\n${rubrics ? '  rubrics: [Read the writing.]\n' : ''}`),
	]);
	return { root, skill };
}
function registry() {
	const tools = new Map<string, (input: Record<string, unknown>) => Promise<unknown>>();
	const register: RunnerToolRegistrar = (handler, options) => { tools.set(options.name, handler); };
	return { tools, register };
}
async function runner(tools: ReturnType<typeof registry>["tools"], content = "## Play\nNew canon.", reply = true, settled = "Saved files." + isolation): Promise<DispatchHandle> {
	const write = [...tools].find(([name]) => name.endsWith("_write"))![1];
	await write({ path: "wiki/World/New.md", content });
	await write({ path: "World/Unchecked.md", content: "Also authored." });
	if (reply) await write({ path: "reply.md", content: "Here is the DM reply." });
	return { wait: async () => settled };
}

describe("runSkillEvals live orchestration", () => {
	it("resolves custom committed cases and keeps operational text production-shaped", () => {
		const target = resolveSkillEval("theatre-of-the-mind");
		expect(target.casesFile).toBe(resolve(".agents/skills/theatre-of-the-mind/evals/cases.yaml"));
		const text = operationalInstructions("/live/repo", "/session/outputs/run", target.skillRoot);
		expect(text).toContain("campaign-config.md"); expect(text).toContain("last ten entries");
		expect(text).toContain("/session/outputs/run"); expect(text).toContain("reply.md"); expect(text).toContain("delete_page");
		expect(text).not.toMatch(/rubric|eval:check|cf check|backticks|page blocks|Write root/);
		expect(() => resolveSkillEval("no-such-skill")).toThrow(/PREPARATION: no cases.yaml/);
	});
	it.each(["object", "json-string"] as const)("checks disk overlays, grades from %s and retains private artifacts separately", async (gradeFormat) => {
		const input = await fixture(); const prompts: string[] = []; const bound = registry();
		const dispatch: DispatchFn = async (prompt, options) => {
			prompts.push(prompt); expect(options.isolated).toBe(true); expect(options.apply).toBe(false);
			if (options.agent === "test-subject") return await runner(bound.tools);
			const grades = { grades: [{ rubric: "Read the writing.", pass: true, reason: "New canon is grounded." }] };
			return { wait: async () => gradeFormat === "object" ? grades : JSON.stringify(grades) };
		};
		const report = await runSkillEvals({ skill: "sample", repositoryRoot: input.root, register: bound.register, dispatch, closeSession: false, network: { https: true } });
		sessions.push(report.sessionRoot);
		expect(report.cases[0]).toMatchObject({ checkFailed: 0, completionEvidence: { isolated: true, apply: false, hasRootChanges: false }, grades: [{ pass: true }] });
		expect(report.cases[0]!.executionError).toBeUndefined();
		expect(prompts[0]).toContain("DM request (verbatim):\nMake a live page."); expect(prompts[0]).not.toContain("Read the writing.");
		expect(prompts[1]).toContain(report.cases[0]!.outputRoot); expect(prompts[1]).toContain("reply.md");
		expect(prompts[1]).toContain("wiki/World/Source.md"); expect(prompts[1]).toContain("archive/source.md");
		expect([...bound.tools.keys()].some((name) => name.endsWith("_write"))).toBe(true);
		expect([...bound.tools.keys()].some((name) => name.endsWith("_delete_page"))).toBe(true);
		expect(await readdir(report.cases[0]!.controlRoot)).toEqual(expect.arrayContaining(["runner-grant.json", "runner-brief.md", "grades.json", "source-hashes.json"]));
		expect(await readdir(report.cases[0]!.controlRoot)).not.toContain("runner-reply.md");
		expect(await readFile(join(report.cases[0]!.outputRoot, "reply.md"), "utf8")).toBe("Here is the DM reply.");
		expect(await readFile(join(input.root, "wiki/World/Source.md"), "utf8")).toBe("Original live canon.");
		await expect(readFile(join(input.root, "wiki/World/New.md"))).rejects.toMatchObject({ code: "ENOENT" });
		expect(await readdir(report.sessionRoot)).not.toContain("worlds");
	});
	it("closes output and control storage by default", async () => {
		const input = await fixture(false); const bound = registry();
		const report = await runSkillEvals({ skill: "sample", repositoryRoot: input.root, register: bound.register, dispatch: () => runner(bound.tools) });
		expect(report.cases[0]!.checkFailed).toBe(0); expect(report.cases[0]!.executionError).toBeUndefined();
		await expect(readdir(report.sessionRoot)).rejects.toMatchObject({ code: "ENOENT" });
		await expect(readdir(report.cases[0]!.outputRoot)).rejects.toMatchObject({ code: "ENOENT" });
	});
	it("invalidates source drift instead of recording quality failures", async () => {
		const input = await fixture(false);
		const report = await runSkillEvals({ skill: "sample", repositoryRoot: input.root, register: () => { }, dispatch: () => ({ wait: async () => { await writeFile(join(input.root, "wiki/World/Source.md"), "Outside mutation"); return "Summary" + isolation; } }) });
		expect(report.cases[0]).toMatchObject({ checks: [], checkFailed: 0, executionError: "INVALIDATED: live source drift: wiki/World/Source.md" });
	});
	it("ignores completion content and preserves full output page text", async () => {
		const input = await fixture(false); const bound = registry(); const full = "New canon " + "x".repeat(4822);
		const report = await runSkillEvals({ skill: "sample", repositoryRoot: input.root, register: bound.register, dispatch: () => runner(bound.tools, full, true, '{"page":"````page ../invalid.md"}\n[Some lines truncated to 768 chars]' + isolation), closeSession: false });
		sessions.push(report.sessionRoot);
		expect(report.cases[0]).toMatchObject({ checkFailed: 0, completionEvidence: { hasRootChanges: false } });
		expect(report.cases[0]!.executionError).toBeUndefined();
		expect(await readFile(join(report.cases[0]!.outputRoot, "World/New.md"), "utf8")).toBe(full);
	});
	it("reports a missing reply.md as execution error, not a quality failure", async () => {
		const input = await fixture(false); const bound = registry();
		const report = await runSkillEvals({ skill: "sample", repositoryRoot: input.root, register: bound.register, dispatch: () => runner(bound.tools, "New canon", false) });
		expect(report.cases[0]).toMatchObject({ checks: [], checkFailed: 0, executionError: "EXECUTION: Runner output is missing reply.md" });
	});
	it("invalidates source drift while the grader runs before persisting grades", async () => {
		const input = await fixture(); const bound = registry();
		const report = await runSkillEvals({
			skill: "sample", repositoryRoot: input.root, register: bound.register, closeSession: false, dispatch: async (_prompt, options) => options.agent === "test-subject" ? await runner(bound.tools) : {
				wait: async () => {
					await writeFile(join(input.root, "archive/source.md"), "Outside mutation during grading");
					return { grades: [{ rubric: "Read the writing.", pass: true, reason: "Would pass." }] };
				}
			}
		});
		sessions.push(report.sessionRoot);
		expect(report.cases[0]!.executionError).toBe("INVALIDATED: live source drift: archive/source.md");
		expect(report.cases[0]!.grades).toBeUndefined(); expect(report.cases[0]!.gradeError).toBeUndefined();
		await expect(readFile(join(report.cases[0]!.controlRoot, "grades.json"))).rejects.toMatchObject({ code: "ENOENT" });
	});
	it.each(["Summary", "Summary\n\nIsolation: changes captured."])("rejects missing isolation evidence (%s)", async (settled) => {
		const input = await fixture(false); const bound = registry();
		const report = await runSkillEvals({ skill: "sample", repositoryRoot: input.root, register: bound.register, dispatch: () => runner(bound.tools, "New canon", true, settled) });
		expect(report.cases[0]!.executionError).toBe("INVALIDATED: isolated dispatch did not report no changes captured");
		expect(report.cases[0]!.checks).toEqual([]);
	});
});
