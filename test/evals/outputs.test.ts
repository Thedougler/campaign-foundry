import { linkSync, mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { deleteRunnerPage, outputPagePath, readRunnerOutput, writeRunnerOutput } from "../../evals/outputs.ts";

const roots: string[] = [];
afterEach(() => { for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });
function output() {
	const root = realpathSync(mkdtempSync(join(tmpdir(), "runner-output-test-"))); roots.push(root);
	writeFileSync(join(root, "reply.md"), "DM reply.");
	return root;
}

describe("Runner disk deliverables", () => {
	it("normalizes wiki prefixes and preserves complete page text without fence parsing", async () => {
		const root = output(); const text = "---\ntype: NPC\n---\n````page anything\n```statblock\nname: Cobb\n```\n";
		await writeRunnerOutput(root, "wiki/World/NPCs/Cobb.md", text);
		const result = readRunnerOutput(root);
		expect([...result.pages]).toEqual([["World/NPCs/Cobb.md", text]]);
		expect(result.reply).toBe("DM reply."); expect(result.deleted).toEqual([]);
	});
	it.each(["../outside.md", "/outside.md", "wiki/../outside.md", "wiki//outside.md", "World/./Page.md", "World//Page.md", "World\\Page.md", "World/Page", "World/Page.md ", "C:/Page.md", "reply.md"])("rejects unsafe, non-Markdown or reserved page paths: %s", (path) => {
		expect(() => outputPagePath(path)).toThrow(/EXECUTION:/);
	});
	it("requires reply.md even if pages are delivered", () => {
		const root = output(); rmSync(join(root, "reply.md")); writeFileSync(join(root, "Page.md"), "A page.");
		expect(() => readRunnerOutput(root)).toThrow("EXECUTION: Runner output is missing reply.md");
	});
	it.each(["{}", '["../outside.md"]', '["World/Page"]', '["reply.md"]', '["World/Page.md","wiki/World/Page.md"]'])("rejects malformed deletion manifests (%s)", (manifest) => {
		const root = output(); writeFileSync(join(root, ".deleted.json"), manifest);
		expect(() => readRunnerOutput(root)).toThrow();
	});
	it("rejects unexpected non-Markdown deliverables", () => {
		const root = output(); writeFileSync(join(root, "raw.txt"), "Wrong format.");
		expect(() => readRunnerOutput(root)).toThrow(/end in .md/);
	});
	it("rejects symlink and hardlink files and linked output roots", async () => {
		const root = output(); const external = output();
		symlinkSync(join(external, "reply.md"), join(root, "Linked.md"));
		expect(() => readRunnerOutput(root)).toThrow(/symlinks/);
		await expect(writeRunnerOutput(root, "Linked.md", "Mutation")).rejects.toThrow(/independent regular/);
		await expect(deleteRunnerPage(root, "Linked.md")).rejects.toThrow(/independent regular/);
		rmSync(join(root, "Linked.md")); linkSync(join(external, "reply.md"), join(root, "Hard.md"));
		expect(() => readRunnerOutput(root)).toThrow(/independent regular/);
		mkdirSync(join(root, "links")); symlinkSync(external, join(root, "links/root"));
		expect(() => readRunnerOutput(join(root, "links/root"))).toThrow(/canonical real directory/);
	});
});
