import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { checkLayer, copyFixture, repoRoot, vaultFlags } from "./helpers.ts";

const item = `---
title: "Brass Key"
type: Item
summary: ""
sources: []
revealed: ""
---

## Properties

*Mundane Gear*

A brass key opens one matching lock.

## Links

\`\`\`base
filters:
  and:
    - file.hasLink(this.file)
\`\`\`
`;

async function itemFixture(folder = "Items", summary = '""'): Promise<{ dir: string; path: string }> {
	const dir = await copyFixture("clean");
	const path = join(dir, "wiki", folder, "x.md");
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, item.replace('summary: ""', `summary: ${summary}`));
	return { dir, path };
}

describe("blank summaries at the public CLI", () => {
	it("passes a World-free Item with an empty summary in the template layer", async () => {
		const { dir, path } = await itemFixture();
		const result = await checkLayer("template", dir, [path]);
		expect(result.code, result.stdout).toBe(0);
		expect(result.report).toMatchObject({ ok: true, findings: [], counts: { pages: 1 } });
	});

	it("still reports template/blank-summary for the same Item in a Campaign folder", async () => {
		const { dir, path } = await itemFixture("ashes-of-the-crown/Items");
		const result = await checkLayer("template", dir, [path]);
		expect(result.code, result.stdout).toBe(1);
		expect(result.report.findings).toMatchObject([
			{ path: "wiki/ashes-of-the-crown/Items/x.md", layer: "template", rule: "blank-summary" },
		]);
	});

	it.each([
		["42", "summary-type"],
		['"First line.\\nSecond line."', "summary-multiline"],
	])("still rejects a World-free Item summary %s with %s", async (summary, rule) => {
		const { dir, path } = await itemFixture("Items", summary);
		const result = await checkLayer("template", dir, [path]);
		expect(result.code, result.stdout).toBe(1);
		expect(result.report.findings).toMatchObject([{ path: "wiki/Items/x.md", layer: "template", rule }]);
	});

	it("bun run cfcli -- index writes the World-free Item as a bare link and the index layer is clean", async () => {
		const { dir } = await itemFixture();
		const result = spawnSync("bun", ["run", "cfcli", "--", "index", ...vaultFlags(dir)], {
			cwd: repoRoot,
			encoding: "utf8",
		});
		expect(result.status, result.stderr).toBe(0);
		expect(result.stdout).toMatch(/^wrote {2}.*\/wiki\/index\.md$/m);
		const index = await readFile(join(dir, "wiki/index.md"), "utf8");
		expect(index.split("\n").filter((line) => line.includes("[[x|"))).toEqual(["- [[x|Brass Key]]"]);
		const checked = await checkLayer("index", dir);
		expect(checked.code, checked.stdout).toBe(0);
		expect(checked.report).toMatchObject({ ok: true, findings: [] });
	});
});
