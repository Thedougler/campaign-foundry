import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { hash, type CachedFinding } from "../../src/check/cache.ts";
import { runLanguageTool, type LanguageTool } from "../../src/check/language.ts";
import type { CheckContext } from "../../src/check/types.ts";
import { buildVault } from "../../src/vault/vault.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function context(sources: Record<string, string>): Promise<CheckContext> {
	const root = await mkdtemp(join(tmpdir(), "cf-language-"));
	roots.push(root);
	const vault = buildVault(join(root, "wiki"), { markdown: new Map(Object.entries(sources)), attachments: [] });
	return {
		root,
		vault,
		pages: vault.pages,
		templates: { byName: new Map(), types: new Map() },
		display: (path) => `wiki/${path}`,
	};
}

const answer: CachedFinding = {
	layer: "fake-language",
	rule: "fake-rule",
	severity: "warning",
	line: 2,
	message: "Canned language answer.",
	hint: "Rewrite this line.",
};

describe("runLanguageTool", () => {
	it("computes only prose misses, keeps the full vault as context and maps cached answers to display paths", async () => {
		const ctx = await context({
			"Target.md": "A sailor waits.\n",
			"Foreign.md": "A keeper watches.\n",
			"index.md": "Generated text.\n",
		});
		ctx.pages = [ctx.vault.pageByPath.get("Target.md")!, ctx.vault.pageByPath.get("index.md")!];
		const batches: string[][] = [];
		const tool: LanguageTool = {
			name: "fake-language",
			salt: () => "config-v1",
			async compute(pages, received, words) {
				expect(received).toBe(ctx);
				expect(received.vault.pages).toHaveLength(3);
				expect(received.vault.pageByPath.has("Foreign.md")).toBe(true);
				expect(words).toEqual(expect.arrayContaining(["Foreign", "Target"]));
				batches.push(pages.map((page) => page.path));
				return new Map(pages.map((page) => [page, [answer]]));
			},
		};
		const first = await runLanguageTool(tool, ctx);
		expect(first).toEqual([{ ...answer, path: "wiki/Target.md" }]);
		expect(batches).toEqual([["Target.md"]]);
		ctx.display = (path) => `shown/${path}`;
		expect(await runLanguageTool(tool, ctx)).toEqual([{ ...answer, path: "shown/Target.md" }]);
		expect(batches).toHaveLength(1);
		expect(await readFile(join(ctx.root, ".cache/check/fake-language.json"), "utf8")).toContain("fake-rule");
	});

	it("invalidates hits when tool inputs change and computes only changed sources on a stable salt", async () => {
		const ctx = await context({ "One.md": "One waits.\n", "Two.md": "Two waits.\n" });
		let salt = "config-v1";
		const batches: string[][] = [];
		const tool: LanguageTool = {
			name: "fake-language",
			salt: () => salt,
			async compute(pages) {
				batches.push(pages.map((page) => page.path));
				return new Map(pages.map((page) => [page, [answer]]));
			},
		};
		await runLanguageTool(tool, ctx);
		await runLanguageTool(tool, ctx);
		expect(batches).toEqual([["One.md", "Two.md"]]);
		ctx.vault = buildVault(ctx.vault.dir, {
			markdown: new Map([
				["One.md", "One waits differently.\n"],
				["Two.md", "Two waits.\n"],
			]),
			attachments: [],
		});
		ctx.pages = ctx.vault.pages;
		await runLanguageTool(tool, ctx);
		expect(batches[1]).toEqual(["One.md"]);
		salt = "config-v2";
		await runLanguageTool(tool, ctx);
		expect(batches[2]).toEqual(["One.md", "Two.md"]);
	});

	it("preserves unused foreign cache entries in scoped runs, then prunes them on a full run", async () => {
		const oldTarget = "The sailor waits.\n";
		const oldForeign = "The keeper watches.\n";
		const newTarget = "The sailor knots a rope.\n";
		const newForeign = "The keeper checks the mooring.\n";
		const ctx = await context({ "Target.md": oldTarget, "Foreign.md": oldForeign });
		const batches: string[][] = [];
		const tool: LanguageTool = {
			name: "fake-language",
			salt: () => "stable-config",
			async compute(pages, received) {
				expect(received.vault.pages).toHaveLength(2);
				batches.push(pages.map((page) => page.path));
				return new Map(pages.map((page) => [page, [answer]]));
			},
		};
		await runLanguageTool(tool, ctx);
		const cachePath = join(ctx.root, ".cache/check/fake-language.json");
		const before = JSON.parse(await readFile(cachePath, "utf8")) as {
			salt: string;
			entries: Record<string, CachedFinding[]>;
		};
		ctx.vault = buildVault(ctx.vault.dir, {
			markdown: new Map([
				["Target.md", newTarget],
				["Foreign.md", newForeign],
			]),
			attachments: [],
		});
		ctx.pages = [ctx.vault.pageByPath.get("Target.md")!];
		expect(await runLanguageTool(tool, ctx)).toEqual([{ ...answer, path: "wiki/Target.md" }]);
		expect(batches[1]).toEqual(["Target.md"]);
		const scoped = JSON.parse(await readFile(cachePath, "utf8")) as typeof before;
		expect(scoped.salt).toBe(before.salt);
		expect(scoped.entries[hash(oldForeign)]).toEqual(before.entries[hash(oldForeign)]);
		expect(scoped.entries[hash(newForeign)]).toBeUndefined();
		expect(scoped.entries[hash(newTarget)]).toEqual([answer]);
		ctx.pages = ctx.vault.pages;
		const full = await runLanguageTool(tool, ctx);
		expect(batches[2]).toEqual(["Foreign.md"]);
		expect(full.filter((finding) => finding.path === "wiki/Target.md")).toEqual([
			{ ...answer, path: "wiki/Target.md" },
		]);
		const pruned = JSON.parse(await readFile(cachePath, "utf8")) as typeof before;
		expect(pruned.entries[hash(oldForeign)]).toBeUndefined();
		expect(pruned.entries[hash(oldTarget)]).toBeUndefined();
		expect(pruned.entries[hash(newForeign)]).toEqual([answer]);
	});

	it("reuses source-keyed answers after a path changes without caching the old display path", async () => {
		const ctx = await context({ "Old.md": "A sailor waits.\n" });
		let computes = 0;
		const tool: LanguageTool = {
			name: "fake-language",
			salt: () => "stable-config",
			async compute(pages) {
				computes++;
				return new Map(pages.map((page) => [page, [answer]]));
			},
		};
		await runLanguageTool(tool, ctx);
		ctx.vault = buildVault(ctx.vault.dir, {
			markdown: new Map([["Nested/Old.md", "A sailor waits.\n"]]),
			attachments: [],
		});
		ctx.pages = ctx.vault.pages;
		expect(await runLanguageTool(tool, ctx)).toEqual([{ ...answer, path: "wiki/Nested/Old.md" }]);
		expect(computes).toBe(1);
	});

	it("owns dictionary and config invalidation even when the tool supplies no policy salt", async () => {
		const sources = { "Target.md": "A sailor waits.\n", "Zorvath.md": "A keeper watches.\n" };
		const ctx = await context(sources);
		ctx.pages = [ctx.vault.pageByPath.get("Target.md")!];
		await mkdir(ctx.vault.dir);
		await writeFile(join(ctx.vault.dir, ".cspell-words.txt"), "# Calendar coinages\nTidewake\n");
		const dictionaries: string[][] = [];
		const tool: LanguageTool = {
			name: "fake-language",
			config: ["cspell.json"],
			async compute(pages, received, words) {
				expect(received.pages.map((page) => page.path)).toEqual(["Target.md"]);
				dictionaries.push(words);
				return new Map(pages.map((page) => [page, [answer]]));
			},
		};
		await runLanguageTool(tool, ctx);
		expect(dictionaries[0]).toEqual(expect.arrayContaining(["Zorvath", "Tidewake"]));
		expect(dictionaries[0]).not.toContain("# Calendar coinages");
		await runLanguageTool(tool, ctx);
		expect(dictionaries).toHaveLength(1);
		await writeFile(join(ctx.vault.dir, ".cspell-words.txt"), "Tidewake\nMistfall\n");
		ctx.vault = buildVault(ctx.vault.dir, { markdown: new Map(Object.entries(sources)), attachments: [] });
		ctx.pages = [ctx.vault.pageByPath.get("Target.md")!];
		await runLanguageTool(tool, ctx);
		expect(dictionaries).toHaveLength(2);
		expect(dictionaries[1]).toContain("Mistfall");
		tool.config = [".vale.ini"];
		await runLanguageTool(tool, ctx);
		expect(dictionaries).toHaveLength(3);
	});
});
