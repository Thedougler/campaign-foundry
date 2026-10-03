import { linkSync, mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { readRunnerOutput } from "../../evals/outputs.ts";

const roots: string[] = [];
afterEach(() => { for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });
function output() {
	const root = realpathSync(mkdtempSync(join(tmpdir(), "runner-output-test-"))); roots.push(root);
	writeFileSync(join(root, "reply.md"), "DM reply.");
	return root;
}

describe("Runner disk deliverables", () => {
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
		rmSync(join(root, "Linked.md")); linkSync(join(external, "reply.md"), join(root, "Hard.md"));
		expect(() => readRunnerOutput(root)).toThrow(/independent regular/);
		mkdirSync(join(root, "links")); symlinkSync(external, join(root, "links/root"));
		expect(() => readRunnerOutput(join(root, "links/root"))).toThrow(/canonical real directory/);
	});
});
