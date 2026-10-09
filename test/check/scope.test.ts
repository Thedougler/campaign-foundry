import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { hash } from "../../src/check/cache.ts";
import { layers } from "../../src/check/layers/index.ts";
import { runCheck, type CheckOptions } from "../../src/check/run.ts";
import type { CheckContext, Finding } from "../../src/check/types.ts";
import { checkedPages } from "../../src/check/util.ts";
import { realTemplates, repoRoot } from "./helpers.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function workspace(pages: Record<string, string>): Promise<CheckOptions> {
	const root = await mkdtemp(join(tmpdir(), "cf-scope-"));
	roots.push(root);
	const vault = join(root, "wiki");
	await mkdir(vault);
	for (const [path, source] of Object.entries(pages)) {
		await mkdir(dirname(join(vault, path)), { recursive: true });
		await writeFile(join(vault, path), source);
	}
	return { root, vault, templates: realTemplates, cwd: root };
}

/** Context dictionaries may read names/aliases, but page-local evaluators must not read these unrelated bodies. */
function guardUnrelatedBodies(ctx: CheckContext): void {
	for (const page of ctx.vault.pages) {
		if (ctx.target?.(page.path)) continue;
		for (const key of ["source", "tree", "callouts", "comments"]) {
			Object.defineProperty(page, key, {
				configurable: true,
				get() { throw new Error(`Evaluated unrelated ${page.path}.${key}`); },
			});
		}
	}
}

const npc = (body: string): string => `---\ntype: NPC\nsummary: A sailor.\nsources: []\ncreature: ""\n---\n\n## At a glance\n\n${body}\n`;

describe("runCheck execution scope", () => {
	it("retains foreign link targets, inbound links, duplicate owners and shared prose for file and folder checks", async () => {
		const target = "Aldermoor/NPCs/Twin.md";
		const shared = "The swing comes wide and slow, telegraphed long before it lands.";
		const options = await workspace({
			[target]: npc(`${shared}\n\n[[Outer]] [[Outer#Missing]] [[Nowhere]] [[Local]]`),
			"Aldermoor/NPCs/Local.md": npc("A sailor waits beside the gangplank."),
			"Aldermoor/Locations/Twin.md": `---\ntype: Location\nkind: Site\n---\n\n${shared}\n`,
			"Aldermoor/NPCs Adjacent/Outer.md": npc("[[Aldermoor/NPCs/Twin]]\n\n## Known\n\nA keeper repairs the shutter."),
		});
		options.layers = ["links", "orphans", "placement", "boilerplate"];
		const full = await runCheck(options);
		const scoped = await runCheck({ ...options, paths: [join(options.vault, target)] });
		expect(scoped.pages).toBe(1);
		expect(full.pages).toBe(4);
		expect(scoped.findings).toEqual(full.findings.filter((finding) => finding.path === `wiki/${target}`));
		expect(scoped.findings.map((finding) => finding.rule)).toEqual(expect.arrayContaining(["duplicate-name", "missing-heading", "unresolved", "shared-line"]));
		expect(scoped.findings.some((finding) => finding.rule === "orphan")).toBe(false);
		expect(scoped.findings.find((finding) => finding.rule === "shared-line")?.message).toContain("Locations/Twin.md");
		const folder = await runCheck({ ...options, paths: ["wiki/Aldermoor/NPCs", `wiki/${target}`] });
		expect(folder.pages).toBe(2);
		expect(folder.findings).toEqual(full.findings.filter((finding) => finding.path.startsWith("wiki/Aldermoor/NPCs/")));
	});

	it("does not read unrelated bodies in any page-local layer or its fix proposer", { timeout: 30_000 }, async () => {
		const target = "Aldermoor/NPCs/Target.md";
		const options = await workspace({
			[target]: npc("A sailor knots a rope."),
			"Aldermoor/NPCs/Unrelated.md": npc("The sailor recieve a rope."),
			"Aldermoor/Creatures/Unrelated Creature.md": "---\ntype: Creature\n---\n\n```statblock\nname: Wrong\n```\n",
			"Aldermoor/Campaign/hot.md": "word ".repeat(600),
			"Aldermoor/log.md": "Bad log text.\n",
		});
		const local = layers.filter((layer) => layer.name !== "index" && layer.name !== "boilerplate");
		const registry = local.map((layer) => ({
			...layer,
			async run(ctx: CheckContext) {
				guardUnrelatedBodies(ctx);
				if (layer.fix) {
					const proposed = await layer.fix(ctx);
					expect(proposed.fixes.every((fix) => fix.path === `wiki/${target}`)).toBe(true);
				}
				return layer.run(ctx);
			},
		}));
		const result = await runCheck({ ...options, registry, paths: [`wiki/${target}`] });
		expect(result.pages).toBe(1);
		expect(result.layers).toEqual(local.map((layer) => layer.name));
		expect(result.findings.every((finding) => finding.path === `wiki/${target}`)).toBe(true);
	});

	it("exposes only targets for evaluation while retaining the full context and final report safety net", async () => {
		const options = await workspace({ "One.md": "One.\n", "Elsewhere/Two.md": "Two.\n" });
		const finding = (path: string): Finding => ({ layer: "probe", rule: "probe", severity: "warning", path, line: 1, message: "probe", hint: "probe" });
		const result = await runCheck({ ...options, paths: ["wiki/One.md"], registry: [{
			name: "probe", description: "Scope test seam.",
			run(ctx) {
				expect(checkedPages(ctx).map((page) => page.path)).toEqual(["One.md"]);
				expect(ctx.vault.pageByPath.has("Elsewhere/Two.md")).toBe(true);
				return ctx.vault.pages.map((page) => finding(ctx.display(page.path)));
			},
		}] });
		expect(result.findings.map((entry) => entry.path)).toEqual(["wiki/One.md"]);
		expect(result.pages).toBe(1);
		const empty = await runCheck({ ...options, layers: ["links"], paths: ["wiki/No Pages"] });
		expect(empty.pages).toBe(0);
		expect(empty.findings).toEqual([]);
	});

	it.each([false, true])("scopes mechanical writes and preserves unrelated files (dryRun=%s)", async (dryRun) => {
		const source = npc("A sailor knots a rope.\n\n\nThe keeper checks the mooring.");
		const options = await workspace({ "Aldermoor/NPCs/Target.md": source, "Aldermoor/NPCs/Unrelated.md": source });
		const target = join(options.vault, "Aldermoor/NPCs/Target.md");
		const unrelated = join(options.vault, "Aldermoor/NPCs/Unrelated.md");
		const full = await runCheck({ ...options, layers: ["markdownlint"] });
		expect(full.findings.filter((finding) => finding.rule === "MD012")).toHaveLength(2);
		const result = await runCheck({ ...options, layers: ["markdownlint"], paths: [target], fix: true, dryRun });
		expect(result.fixes.map((fix) => fix.path)).toEqual(["wiki/Aldermoor/NPCs/Target.md"]);
		expect(result.findings).toEqual([]);
		expect(await readFile(unrelated, "utf8")).toBe(source);
		expect(await readFile(target, "utf8")).toBe(dryRun ? source : source.replace("\n\n\n", "\n\n"));
	});

	it.each([false, true])("scopes placement moves and leaves unrelated misplaced pages alone (dryRun=%s)", async (dryRun) => {
		const source = npc("A sailor knots a rope.");
		const options = await workspace({ "Aldermoor/Target.md": source, "Aldermoor/Unrelated.md": source });
		const result = await runCheck({ ...options, layers: ["placement"], paths: ["wiki/Aldermoor/Target.md"], fix: true, dryRun });
		expect(result.fixes.map((fix) => fix.edit)).toEqual([{ type: "move", from: "Aldermoor/Target.md", to: "Aldermoor/NPCs/Target.md" }]);
		expect(await readFile(join(options.vault, "Aldermoor/Unrelated.md"), "utf8")).toBe(source);
		expect(await readFile(join(options.vault, dryRun ? "Aldermoor/Target.md" : "Aldermoor/NPCs/Target.md"), "utf8")).toBe(source);
		await expect(readFile(join(options.vault, dryRun ? "Aldermoor/NPCs/Target.md" : "Aldermoor/Target.md"), "utf8")).rejects.toMatchObject({ code: "ENOENT" });
	});

	it("does not move a target over a globally occupied destination", async () => {
		const source = npc("A sailor knots a rope.");
		const occupied = npc("A sailor checks the mooring.");
		const options = await workspace({ "Aldermoor/Target.md": source, "Aldermoor/NPCs/Target.md": occupied });
		const result = await runCheck({ ...options, layers: ["placement"], paths: ["wiki/Aldermoor/Target.md"], fix: true });
		expect(result.fixes).toEqual([]);
		expect(await readFile(join(options.vault, "Aldermoor/Target.md"), "utf8")).toBe(source);
		expect(await readFile(join(options.vault, "Aldermoor/NPCs/Target.md"), "utf8")).toBe(occupied);
	});

	it("checks generated index targets against every page and fixes only the targeted index", async () => {
		const options = await workspace({
			"Aldermoor/Aldermoor.md": "---\ntype: World\nsummary: A river country.\n---\n",
			"Aldermoor/Ashes of the Crown.md": "---\ntype: Campaign\nsummary: One line.\n---\n",
			"Aldermoor/NPCs/Zorvath.md": npc("A sailor knots a rope."),
			"index.md": "Unrelated stale index.\n",
		});
		const full = await runCheck({ ...options, layers: ["index"] });
		const scoped = await runCheck({ ...options, layers: ["index"], paths: ["wiki/Aldermoor"] });
		expect(scoped.findings).toEqual(full.findings.filter((finding) => finding.path === "wiki/Aldermoor/index.md"));
		expect(scoped.findings.map((finding) => finding.rule)).toEqual(["missing"]);
		const fixed = await runCheck({ ...options, layers: ["index"], paths: ["wiki/Aldermoor"], fix: true });
		expect(fixed.fixes.map((fix) => fix.path)).toEqual(["wiki/Aldermoor/index.md"]);
		expect(await readFile(join(options.vault, "Aldermoor/index.md"), "utf8")).toContain("[[Zorvath]]");
		expect(await readFile(join(options.vault, "index.md"), "utf8")).toBe("Unrelated stale index.\n");
	});

	it.each(["spelling", "grammar"])("retains foreign names and unrelated %s cache entries without computing unrelated misses", { timeout: 30_000 }, async (layer) => {
		const target = "Aldermoor/NPCs/Target.md";
		const foreign = "Aldermoor/NPCs/Zorvath.md";
		const targetSource = npc("Zorvath knots a rope.");
		const foreignSource = npc("A sailor knots a rope.");
		const options = await workspace({ [target]: targetSource, [foreign]: foreignSource });
		options.layers = [layer];
		await runCheck(options);
		const cachePath = join(options.root, ".cache/check", `${layer}.json`);
		const before = JSON.parse(await readFile(cachePath, "utf8")) as { salt: string; entries: Record<string, unknown> };
		const updatedTarget = npc("Zorvath recieve a rope.");
		const updatedForeign = npc("The sailors is waiting at teh harbour.");
		await writeFile(join(options.vault, target), updatedTarget);
		await writeFile(join(options.vault, foreign), updatedForeign);
		const scoped = await runCheck({ ...options, paths: [`wiki/${target}`] });
		const after = JSON.parse(await readFile(cachePath, "utf8")) as typeof before;
		expect(after.salt).toBe(before.salt);
		expect(before.entries[hash(foreignSource)]).toBeDefined();
		expect(after.entries[hash(foreignSource)]).toEqual(before.entries[hash(foreignSource)]);
		expect(after.entries[hash(updatedForeign)]).toBeUndefined();
		expect(after.entries[hash(updatedTarget)]).toBeDefined();
		expect(scoped.findings.some((finding) => finding.message.includes("`Zorvath`"))).toBe(false);
		const full = await runCheck(options);
		expect(scoped.findings).toEqual(full.findings.filter((finding) => finding.path === `wiki/${target}`));
		const pruned = JSON.parse(await readFile(cachePath, "utf8")) as typeof before;
		expect(pruned.entries[hash(foreignSource)]).toBeUndefined();
	});

	it("retains the Gullhook narration and foreign shared-line findings with one checked page", { timeout: 30_000 }, async () => {
		const options = await workspace({});
		await cp(join(repoRoot, "test/fixtures/vault"), options.vault, { recursive: true });
		const target = "wiki/salt-and-lantern/Locations/Gullhook Lighthouse.md";
		const full = await runCheck(options);
		const scoped = await runCheck({ ...options, paths: [target] });
		expect(scoped.pages).toBe(1);
		expect(full.pages).toBe(51);
		expect(scoped.layers).toEqual(layers.map((layer) => layer.name));
		expect(scoped.findings).toEqual(full.findings.filter((finding) => finding.path === target));
		expect(scoped.findings.map(({ layer, rule, line }) => ({ layer, rule, line }))).toEqual([
			{ layer: "narration", rule: "fresh-starts", line: 20 },
			{ layer: "boilerplate", rule: "shared-line", line: 34 },
		]);
		expect(scoped.findings[1]?.message).toContain("Session 1 - The Lamp Room.md:33");
	});
});
