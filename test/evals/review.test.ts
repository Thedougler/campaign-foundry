import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { findReviewRuns, generateDescriptionReview } from "../../evals/review.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function workspace() {
	const root = await mkdtemp(join(tmpdir(), "cf-review-test-"));
	roots.push(root);
	return root;
}
async function run(root: string, path: string) {
	const directory = join(root, path);
	await mkdir(join(directory, "outputs"), { recursive: true });
	return directory;
}

describe("authoring review inputs", () => {
	it("preserves nested deliverables and independent grades for each configuration", async () => {
		const root = await workspace();
		const candidate = await run(root, "choice/with_skill/run-1");
		const baseline = await run(root, "choice/old_skill/run-1");
		await writeFile(join(root, "choice/eval_metadata.json"), JSON.stringify({ eval_id: 7, prompt: "Expose the choice." }));
		await mkdir(join(candidate, "outputs/scenes"));
		await writeFile(join(candidate, "outputs/scenes/Hook.md"), "Pay or take the stairs.");
		await writeFile(join(baseline, "outputs/Hook.md"), "The ferryman waits.");
		await writeFile(join(candidate, "grading.json"), JSON.stringify({ expectations: [{ text: "Choice is explicit", passed: true, evidence: "Pay or take the stairs." }] }));
		await writeFile(join(baseline, "grading.json"), JSON.stringify({ expectations: [{ text: "Choice is explicit", passed: false, evidence: "The ferryman waits." }] }));
		const reviews = await findReviewRuns(root);
		const current = reviews.find((item) => item.id === "choice-with_skill-run-1")!;
		const previous = reviews.find((item) => item.id === "choice-old_skill-run-1")!;
		expect(current.prompt).toBe("Expose the choice.");
		expect(current.eval_id).toBe(7);
		expect(current.outputs[0]?.name).toBe("scenes/Hook.md");
		expect(current.outputs[0]?.content).toBe("Pay or take the stairs.");
		expect(current.grading?.expectations).toEqual([{ text: "Choice is explicit", passed: true, evidence: "Pay or take the stairs." }]);
		expect(previous.grading?.expectations).toEqual([{ text: "Choice is explicit", passed: false, evidence: "The ferryman waits." }]);
	});
	it("rejects colliding feedback IDs instead of merging unrelated reviews", async () => {
		const root = await workspace();
		await run(root, "a-b/c");
		await run(root, "a/b-c");
		await expect(findReviewRuns(root)).rejects.toThrow("duplicate feedback ID");
	});
	it("rejects output links rather than embedding external files", async () => {
		const root = await workspace();
		const directory = await run(root, "case/with_skill/run-1");
		await writeFile(join(root, "private.txt"), "private criteria");
		await symlink(join(root, "private.txt"), join(directory, "outputs/linked.txt"));
		await expect(findReviewRuns(root)).rejects.toThrow("not symlinks");
	});
	it("rejects a string trigger verdict rather than treating false as truthy", async () => {
		const root = await workspace();
		const queries = join(root, "queries.json");
		await writeFile(queries, JSON.stringify([{ query: "Describe an NPC", should_trigger: "false" }]));
		await expect(generateDescriptionReview({ queries, skillName: "npc-design", description: "Design an NPC.", static: join(root, "review.html") })).rejects.toThrow("should_trigger: boolean");
	});
});
