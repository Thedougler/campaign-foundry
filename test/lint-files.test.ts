import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { repoIgnore, visibleRepoFiles } from "../scripts/lint/repo-files.ts";
import { agentsScope } from "../scripts/lint/agents.ts";

const roots: string[] = [];
afterEach(() => {
	for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("Git-free lint file policy", () => {
	it("honours nested ignore rules, negations and excluded parents", () => {
		const root = mkdtempSync(join(tmpdir(), "lint-files-"));
		roots.push(root);
		mkdirSync(join(root, "nested"));
		mkdirSync(join(root, "blocked"));
		writeFileSync(join(root, ".gitignore"), "*.log\nblocked/\n!blocked/keep.md\n");
		writeFileSync(join(root, "nested/.gitignore"), "!keep.log\nlocal.md\n");
		for (const path of [
			"root.log",
			"nested/keep.log",
			"nested/drop.log",
			"nested/local.md",
			"blocked/keep.md",
			"ok.md",
		])
			writeFileSync(join(root, path), "text");
		const ignored = repoIgnore(root);
		expect(ignored("nested/keep.log")).toBe(false);
		expect(ignored("nested/drop.log")).toBe(true);
		expect(ignored("nested/local.md")).toBe(true);
		expect(ignored("blocked/keep.md")).toBe(true);
		expect(visibleRepoFiles(root)).toEqual([".gitignore", "nested/.gitignore", "nested/keep.log", "ok.md"]);
	});
	it("selects and validates a skill's cases YAML rather than silently selecting zero files", async () => {
		const path = ".omp/skills/lint/evals/cases.yaml";
		expect(await agentsScope.select([path])).toEqual([path]);
		const result = await agentsScope.run({ files: [path], fix: false });
		expect(result.files).toEqual([path]);
		expect(result.findings).toEqual([]);
		expect(result.failures).toEqual([]);
	});
});
