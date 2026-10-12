import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it } from "vitest";
import { runCheck } from "../../src/check/run.ts";

it("checks and fixes directory-scale Markdown without changing per-page findings or their order", async () => {
	const root = await mkdtemp(join(tmpdir(), "cf-markdownlint-"));
	try {
		const vault = join(root, "wiki");
		const items = join(vault, "Items");
		await mkdir(items, { recursive: true });
		const seeded = new Set([0, 199, 200, 399, 400, 999, 1000, 1200]);
		const clean = "---\ntype: Item\n---\n\nA copper ring.\n";
		const bad = "---\ntype: Item\n---\n\n%% Authoring guidance.   \n\n\n%%\n\nA copper ring.   \n\n\nA silver clasp.\n";
		const fixed = "---\ntype: Item\n---\n\n%% Authoring guidance.   \n\n\n%%\n\nA copper ring.\n\nA silver clasp.\n";
		const paths = Array.from({ length: 1201 }, (_, i) => `Items/item-${String(i).padStart(4, "0")}.md`);
		await Promise.all(paths.map((path, i) => writeFile(join(vault, path), seeded.has(i) ? bad : clean)));
		const options = { root, vault, cwd: root, layers: ["markdownlint"] };
		// The small selection fits in one markdownlint invocation; its pages span the large run's boundaries.
		const subset = [...seeded].map((i) => paths[i]!);
		const small = await runCheck({ ...options, pagePaths: subset });
		expect(small.pages).toBe(8);
		expect(small.findings.map(({ path, line, rule }) => [path, line, rule])).toEqual(
			subset.flatMap((path) => [
				[`wiki/${path}`, 10, "MD009"],
				[`wiki/${path}`, 12, "MD012"],
			]),
		);
		const large = await runCheck({ ...options, paths: ["wiki/Items"] });
		expect(large.pages).toBe(1201);
		expect(large.findings).toEqual(small.findings);

		const repaired = await runCheck({ ...options, paths: ["wiki/Items"], fix: true });
		expect(repaired.findings).toEqual([]);
		expect(repaired.fixes.map(({ path }) => path)).toEqual(subset.map((path) => `wiki/${path}`));
		for (const path of subset) expect(await readFile(join(vault, path), "utf8")).toBe(fixed);
		expect(await readFile(join(vault, paths[1]!), "utf8")).toBe(clean);
	} finally {
		await rm(root, { recursive: true, force: true });
	}
});

it("allows a frontmatter title with a body H1 but still rejects duplicate body H1s", async () => {
	const root = await mkdtemp(join(tmpdir(), "cf-markdownlint-title-"));
	try {
		const vault = join(root, "wiki");
		await mkdir(vault);
		const path = join(vault, "spell.md");
		const entry = "---\ntitle: Alter Self\ntype: Spell\n---\n\n# Alter Self\n\n*Level 2 Transmutation.*\n";
		await writeFile(path, entry);
		const options = { root, vault, cwd: root, layers: ["markdownlint"] };
		expect((await runCheck(options)).findings).toEqual([]);
		await writeFile(path, `${entry}\n# Another title\n\nA spell changes the caster's shape.\n`);
		const duplicate = await runCheck(options);
		expect(duplicate.findings.map(({ rule }) => rule)).toEqual(["MD025"]);
	} finally {
		await rm(root, { recursive: true, force: true });
	}
});
