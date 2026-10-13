import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { runCheck, type CheckOptions } from "../../src/check/run.ts";
import type { Finding, Layer } from "../../src/check/types.ts";
import { realTemplates } from "./helpers.ts";

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

const npc = (title: string, body: string): string =>
	`---\ntype: NPC\ntitle: "${title}"\nsummary: A sailor.\nsources: []\n---\n\n## Roleplaying\n\n${body}\n`;

describe("runCheck execution scope", () => {
	it("omits boilerplate only for hook checks, leaving explicit scoped and full checks intact", async () => {
		const options = await workspace({ "One.md": "One.\n", "Two.md": "Two.\n" });
		let calls = 0;
		const registry: Layer[] = [
			{
				name: "boilerplate",
				scope: "vault",
				description: "Repeated prose.",
				run: () => {
					calls++;
					return [];
				},
			},
		];
		await runCheck({ ...options, registry, paths: ["wiki/One.md"], skipBoilerplate: true });
		expect(calls).toBe(0);
		await runCheck({ ...options, registry, paths: ["wiki/One.md"] });
		await runCheck({ ...options, registry });
		expect(calls).toBe(2);
	});

	it("skips irrelevant hot, log and mermaid layers before loading templates", async () => {
		const options = await workspace({ "One.md": "A sailor waits.\n" });
		const result = await runCheck({
			...options,
			templates: "/missing-templates",
			paths: ["wiki/One.md"],
			layers: ["hot", "log", "mermaid"],
		});
		expect(result.layers).toEqual([]);
		expect(result.pages).toBe(1);
	});

	it("retains foreign link targets, inbound links, duplicate owners and shared prose for file and folder checks", async () => {
		const target = "Aldermoor/NPCs/Twin.md";
		const shared = "The swing comes wide and slow, telegraphed long before it lands.";
		const options = await workspace({
			[target]: npc("Twin", `${shared}\n\n[[Outer]] [[Outer#Missing]] [[Nowhere]] [[Local]]`),
			"Aldermoor/NPCs/Local.md": npc("Local", "A sailor waits beside the gangplank."),
			"Aldermoor/Locations/Twin.md": `---\ntype: Location\ntitle: Twin\nkind: Site\n---\n\n${shared}\n`,
			"Aldermoor/NPCs Adjacent/Outer.md": npc(
				"Outer",
				"[[Aldermoor/NPCs/Twin]]\n\n## Known\n\nA keeper repairs the shutter.",
			),
		});
		options.layers = ["links", "orphans", "placement", "boilerplate"];
		const full = await runCheck(options);
		const scoped = await runCheck({ ...options, paths: [join(options.vault, target)] });
		expect(scoped.pages).toBe(1);
		expect(full.pages).toBe(4);
		expect(scoped.findings).toEqual(full.findings.filter((finding) => finding.path === `wiki/${target}`));
		expect(scoped.findings.map((finding) => finding.rule)).toEqual(
			expect.arrayContaining(["duplicate-name", "missing-heading", "unresolved", "shared-line"]),
		);
		expect(scoped.findings.some((finding) => finding.rule === "orphan")).toBe(false);
		expect(scoped.findings.find((finding) => finding.rule === "shared-line")?.message).toContain("Locations/Twin.md");
		const folder = await runCheck({ ...options, paths: ["wiki/Aldermoor/NPCs", `wiki/${target}`] });
		expect(folder.pages).toBe(2);
		expect(folder.findings).toEqual(full.findings.filter((finding) => finding.path.startsWith("wiki/Aldermoor/NPCs/")));
	});

	it("invokes page and vault registries with their declared evaluation scope and filters only vault reports", async () => {
		const options = await workspace({ "One.md": "One.\n", "Elsewhere/Two.md": "Two.\n" });
		const finding = (layer: string, path: string): Finding => ({
			layer,
			rule: "probe",
			severity: "warning",
			path,
			line: 1,
			message: "probe",
			hint: "probe",
		});
		const registry = (["page", "vault"] as const).map(
			(scope): Layer => ({
				name: scope,
				scope,
				description: "Scope test seam.",
				run(ctx) {
					expect(ctx.pages.map((page) => page.path)).toEqual(
						scope === "page" ? ["One.md"] : ["Elsewhere/Two.md", "One.md"],
					);
					expect(ctx.vault.pageByPath.has("Elsewhere/Two.md")).toBe(true);
					expect(ctx.vault.pages).toHaveLength(2);
					return ctx.pages.map((page) => finding(scope, ctx.display(page.path)));
				},
			}),
		);
		const result = await runCheck({ ...options, paths: ["wiki/One.md"], registry });
		expect(result.findings.map((entry) => [entry.layer, entry.path])).toEqual([
			["page", "wiki/One.md"],
			["vault", "wiki/One.md"],
		]);
		expect(result.pages).toBe(1);
		const empty = await runCheck({ ...options, layers: ["links"], paths: ["wiki/No Pages"] });
		expect(empty.pages).toBe(0);
		expect(empty.findings).toEqual([]);
	});

	it("selects virtual inputs by vault key, not by a colliding display path in the context", async () => {
		const options = await workspace({ "Draft.md": "Context only.", "_style/Draft.md": "Runner output." });
		const registry: Layer[] = [
			{
				name: "probe",
				scope: "page",
				description: "Virtual page selection.",
				run(ctx) {
					expect(ctx.pages.map((page) => page.path)).toEqual(["_style/Draft.md"]);
					expect(ctx.vault.pages).toHaveLength(2);
					return [
						{
							layer: "probe",
							rule: "input",
							severity: "warning",
							path: ctx.display(ctx.pages[0]!.path),
							line: 1,
							message: "Selected.",
							hint: "Selected.",
						},
					];
				},
			},
		];
		const result = await runCheck({ ...options, pagePaths: ["_style/Draft.md"], display: () => "Draft.md", registry });
		expect(result.pages).toBe(1);
		expect(result.findings[0]?.path).toBe("Draft.md");
	});

	it("rejects out-of-scope findings from a page layer instead of hiding them", async () => {
		const options = await workspace({ "One.md": "One.\n", "Two.md": "Two.\n" });
		await expect(
			runCheck({
				...options,
				paths: ["wiki/One.md"],
				registry: [
					{
						name: "leaky",
						scope: "page",
						description: "Broken page layer.",
						run: () => [
							{
								layer: "leaky",
								rule: "probe",
								severity: "warning",
								path: "wiki/Two.md",
								line: 1,
								message: "probe",
								hint: "probe",
							},
						],
					},
				],
			}),
		).rejects.toThrow(/scope|target|outside/i);
	});

	it("rejects out-of-scope fixes from a page layer instead of hiding them", async () => {
		const options = await workspace({ "One.md": "One.\n", "Two.md": "Two.\n" });
		await expect(
			runCheck({
				...options,
				paths: ["wiki/One.md"],
				fix: true,
				registry: [
					{
						name: "leaky",
						scope: "page",
						description: "Broken page fix seam.",
						run: () => [],
						fix: () => ({
							fixes: [
								{
									layer: "leaky",
									rule: "probe",
									path: "wiki/Two.md",
									description: "Leaked write.",
									edit: { type: "write", path: "Two.md", content: "Wrong.\n" },
								},
							],
						}),
					},
				],
			}),
		).rejects.toThrow(/out-of-scope/);
		expect(await readFile(join(options.vault, "Two.md"), "utf8")).toBe("Two.\n");
	});

	it.each(["page", "vault"] as const)("scopes %s-layer fixes and leaves foreign files untouched", async (scope) => {
		const options = await workspace({ "One.md": "One.\n", "Two.md": "Two.\n" });
		const seen: string[][] = [];
		const result = await runCheck({
			...options,
			paths: ["wiki/One.md"],
			fix: true,
			registry: [
				{
					name: "probe",
					scope,
					description: "Fix scope seam.",
					run: () => [],
					fix(ctx) {
						seen.push(ctx.pages.map((page) => page.path));
						const fixes = (scope === "page" ? ctx.pages : ctx.vault.pages)
							.filter((page) => page.source !== "Fixed.\n")
							.map((page) => ({
								layer: "probe",
								rule: "probe",
								path: ctx.display(page.path),
								description: "Replace probe text.",
								edit: { type: "write" as const, path: page.path, content: "Fixed.\n" },
							}));
						return { fixes };
					},
				},
			],
		});
		expect(seen.every((paths) => paths.join(",") === (scope === "page" ? "One.md" : "One.md,Two.md"))).toBe(true);
		expect(result.fixes.map((fix) => fix.path)).toEqual(["wiki/One.md"]);
		expect(await readFile(join(options.vault, "One.md"), "utf8")).toBe("Fixed.\n");
		expect(await readFile(join(options.vault, "Two.md"), "utf8")).toBe("Two.\n");
	});

	it.each([false, true])("scopes mechanical writes and preserves unrelated files (dryRun=%s)", async (dryRun) => {
		const source = npc("Target", "A sailor knots a rope.\n\n\nThe keeper checks the mooring.");
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

	it.each([false, true])(
		"scopes placement moves and leaves unrelated misplaced pages alone (dryRun=%s)",
		async (dryRun) => {
			const source = npc("Target", "A sailor knots a rope.");
			const options = await workspace({ "Aldermoor/Target.md": source, "Aldermoor/Unrelated.md": source });
			const result = await runCheck({
				...options,
				layers: ["placement"],
				paths: ["wiki/Aldermoor/Target.md"],
				fix: true,
				dryRun,
			});
			expect(result.fixes.map((fix) => fix.edit)).toEqual([
				{ type: "move", from: "Aldermoor/Target.md", to: "Aldermoor/NPCs/Target.md" },
			]);
			expect(await readFile(join(options.vault, "Aldermoor/Unrelated.md"), "utf8")).toBe(source);
			expect(
				await readFile(join(options.vault, dryRun ? "Aldermoor/Target.md" : "Aldermoor/NPCs/Target.md"), "utf8"),
			).toBe(source);
			await expect(
				readFile(join(options.vault, dryRun ? "Aldermoor/NPCs/Target.md" : "Aldermoor/Target.md"), "utf8"),
			).rejects.toMatchObject({ code: "ENOENT" });
		},
	);

	it("does not move a target over a globally occupied destination", async () => {
		const source = npc("Target", "A sailor knots a rope.");
		const occupied = npc("Target", "A sailor checks the mooring.");
		const options = await workspace({ "Aldermoor/Target.md": source, "Aldermoor/NPCs/Target.md": occupied });
		const result = await runCheck({
			...options,
			layers: ["placement"],
			paths: ["wiki/Aldermoor/Target.md"],
			fix: true,
		});
		expect(result.fixes).toEqual([]);
		expect(await readFile(join(options.vault, "Aldermoor/Target.md"), "utf8")).toBe(source);
		expect(await readFile(join(options.vault, "Aldermoor/NPCs/Target.md"), "utf8")).toBe(occupied);
	});

	it("checks indexes in the full gate but skips them for page-list checks, including fixes", async () => {
		const options = await workspace({
			"Aldermoor/Aldermoor.md": "---\ntype: World\ntitle: Aldermoor\nsummary: A river country.\n---\n",
			"Aldermoor/Ashes of the Crown.md": "---\ntype: Campaign\ntitle: Ashes of the Crown\nsummary: One line.\n---\n",
			"Aldermoor/NPCs/Zorvath.md": npc("Zorvath", "A sailor knots a rope."),
			"index.md": "Unrelated stale index.\n",
		});
		const full = await runCheck({ ...options, layers: ["index"] });
		const scoped = await runCheck({ ...options, layers: ["index"], paths: ["wiki/Aldermoor"] });
		expect(full.findings.length).toBeGreaterThan(0);
		expect(scoped.findings).toEqual([]);
		expect(scoped.layers).toEqual([]);
		const fixed = await runCheck({ ...options, layers: ["index"], paths: ["wiki/Aldermoor"], fix: true });
		expect(fixed.fixes).toEqual([]);
		expect(await readFile(join(options.vault, "index.md"), "utf8")).toBe("Unrelated stale index.\n");
	});
});
