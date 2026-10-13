import { mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { styleLayerWith } from "../../src/check/layers/style.ts";
import { gateText } from "../../src/check/run.ts";
import type { CheckContext } from "../../src/check/types.ts";
import type { ValeAdapter, ValeAlert, ValePass } from "../../src/check/vale.ts";
import { buildVault } from "../../src/vault/vault.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function context(source: string, foreign: Record<string, string> = {}): Promise<CheckContext> {
	const root = await mkdtemp(join(tmpdir(), "cf-style-"));
	roots.push(root);
	const vault = buildVault(join(root, "wiki"), {
		markdown: new Map(Object.entries({ "Target.md": source, ...foreign })),
		attachments: [],
	});
	return {
		root,
		vault,
		pages: [vault.pageByPath.get("Target.md")!],
		templates: { byName: new Map(), types: new Map() },
		display: (path) => `wiki/${path}`,
	};
}

/** Canned Vale output: these tests exercise the adapter contract, never the Vale binary or installed packages. */
function alert(
	Check: string,
	Line = 1,
	Match = "keeper",
	Severity = "error",
	Message = "Rewrite this phrase.",
): ValeAlert {
	return { Check, Message, Line, Match, Severity };
}

describe("style adapter contract", () => {
	it.each([
		["error", "error"],
		["warning", "warning"],
		["suggestion", "warning"],
	] as const)("maps Vale %s to gate %s without inventing advice to disable rules", async (valeSeverity, severity) => {
		const ctx = await context("The keeper waits.\n");
		const adapter: ValeAdapter = {
			async check(pass, root) {
				expect(root).toBe(ctx.root);
				expect(pass.config).toBe("gate");
				expect(Object.keys(pass.files)).toEqual(["Target.md"]);
				return new Map([
					[
						"Target.md",
						[
							alert(
								"ai-tells.Staccato",
								1,
								"keeper",
								valeSeverity,
								"Rewrite this phrase. Disable this rule for clipped prose.",
							),
						],
					],
				]);
			},
		};
		const findings = await styleLayerWith(adapter).run(ctx);
		expect(findings).toHaveLength(1);
		expect(findings[0]).toMatchObject({
			layer: "style",
			path: "wiki/Target.md",
			rule: "ai-tells.Staccato",
			line: 1,
			severity,
			message: "Rewrite this phrase.",
		});
		expect(findings[0]?.hint).toContain(".vale/styles/ai-tells/Staccato.yml");
		expect(findings[0]?.hint).toContain("DM");
	});

	it.each([
		["NoEmDash", "Clean prose"],
		["NoSemicolon", "Clean prose"],
		["NoColon", "Clean prose"],
		["JudgementWords", "Evidence"],
		["MechanicalTerms", "Evidence"],
		["PcInterior", "Hard line 1"],
		["StockTells", "People"],
	] as const)("maps Narration.%s to the actionable theatre-of-the-mind hint", async (rule, section) => {
		const ctx = await context("> [!narration] First look\n> The keeper waits.\n");
		const found = await styleLayerWith({
			async check(pass) {
				return new Map([["Target.md", pass.config === "gate" ? [alert(`Narration.${rule}`, 2)] : []]]);
			},
		}).run(ctx);
		expect(found).toHaveLength(1);
		expect(found[0]).toMatchObject({ rule: `Narration.${rule}`, line: 2, severity: "error" });
		expect(found[0]?.hint).toContain("theatre-of-the-mind");
		expect(found[0]?.hint).toContain(section);
	});

	it.each([
		["Depth", "the specific section"],
		["InUse", "Properties"],
		["Story", "Backstory"],
		["Changes", "Changes to the World"],
		["Next", "Next Session"],
	])("maps Narration.%s to its template migration hint", async (rule, destination) => {
		const ctx = await context("## Heading\n");
		const found = await styleLayerWith({
			async check() {
				return new Map([["Target.md", [alert(`Narration.${rule}`)]]]);
			},
		}).run(ctx);
		expect(found).toHaveLength(1);
		expect(found[0]?.severity).toBe("error");
		expect(found[0]?.hint).toContain("wiki/templates/");
		expect(found[0]?.hint).toContain(destination);
	});

	it("passes line-preserving gate, craft and Cue views and accepts only Narration rules from the Cue pass", async () => {
		const source = [
			"## At a glance",
			"",
			"- **Found at.** Ravenhold",
			"",
			"> [!narration] First look",
			"> A gull circles; the ropes creak.",
			"",
			"Notes: north lies two miles away.",
			"",
			"> [!note] DM reminder",
			"> Wait: three guards.",
			"",
			"Failure: ==A rope snaps: spray leaps.== and ==You lose sight of the quay.==",
			"",
			"## Quotes",
			'> "Vast tapestry."',
			"Context stays.",
			"## Other",
			"The lantern burns.",
		].join("\n");
		const ctx = await context(source, { "Foreign.md": "The keeper watches.\n", "index.md": "Generated text.\n" });
		const passes: ValePass[] = [];
		const found = await styleLayerWith({
			async check(pass, root) {
				expect(root).toBe(ctx.root);
				expect(Object.keys(pass.files)).toEqual(["Target.md"]);
				passes.push(pass);
				const cue = pass.config === "gate" && pass.files["Target.md"]!.split("\n")[12]!.startsWith("> ");
				return new Map([
					["Target.md", cue ? [alert("Narration.NoColon", 13, ":"), alert("ai-tells.Staccato", 13)] : []],
				]);
			},
		}).run(ctx);
		expect(passes).toHaveLength(3);
		const craft = passes.find((pass) => pass.config === "narration")!.files["Target.md"]!.split("\n");
		const gates = passes.filter((pass) => pass.config === "gate").map((pass) => pass.files["Target.md"]!.split("\n"));
		const main = gates.find((lines) => lines[0] !== "")!;
		const cue = gates.find((lines) => lines[12]?.startsWith("> "))!;
		for (const lines of [main, craft, cue]) expect(lines).toHaveLength(source.split("\n").length);
		expect(main[2]).toBe("- **Found at** Ravenhold");
		expect(main[5]).toBe("> A gull circles; the ropes creak.");
		expect(main[10]).toBe("Wait: three guards.");
		expect(main[12]).toBe("Failure: A rope snaps: spray leaps. and You lose sight of the quay.");
		expect(main[15]).toBe("");
		expect(main[16]).toBe("Context stays.");
		expect(craft[4]).toBe("");
		expect(craft[5]).toBe("A gull circles; the ropes creak.");
		expect(craft[7]).toBe("");
		expect(craft[10]).toBe("");
		expect(craft[12]).toBe("A rope snaps: spray leaps. You lose sight of the quay.");
		expect(cue[12]).toBe("> A rope snaps: spray leaps. You lose sight of the quay.");
		expect(cue.filter(Boolean)).toEqual([cue[12]]);
		expect(found.map((finding) => [finding.rule, finding.line])).toEqual([["Narration.NoColon", 13]]);
	});

	it("uses the full vault's kind and alias context to make literal named ships read as ships", async () => {
		const ctx = await context(
			"Saltwright carried passengers.\nOld Ferry carried grain.\nThe silence carried a promise.\n",
			{
				"Saltwright.md": "---\ntype: Vehicle\naliases: [Old Ferry]\n---\nA ship waits.\n",
			},
		);
		const found = await styleLayerWith({
			async check(pass) {
				expect(Object.keys(pass.files)).toEqual(["Target.md"]);
				expect(pass.files["Target.md"]).toBe(
					"Ship carried passengers.\nShip carried grain.\nThe silence carried a promise.\n",
				);
				return new Map([["Target.md", [alert("ai-tells.FigurativeCarries", 3, "carried")]]]);
			},
		}).run(ctx);
		expect(found.map((finding) => [finding.rule, finding.line])).toEqual([["ai-tells.FigurativeCarries", 3]]);
	});

	it("appends the stand-in sentence when the flagged span quotes a masked page name", async () => {
		const ctx = await context("The Saltwright reaches him before dawn.\n", {
			"Saltwright.md": "---\ntype: Vehicle\n---\nA ship waits.\n",
		});
		const found = await styleLayerWith({
			async check(pass) {
				expect(pass.files["Target.md"]).toBe("The Ship reaches him before dawn.\n");
				return new Map([
					["Target.md", pass.config === "gate" ? [alert("ai-tells.BareReaches", 1, "The Ship reaches him")] : []],
				]);
			},
		}).run(ctx);
		expect(found).toHaveLength(1);
		expect(found[0]?.hint).toContain(".vale/styles/ai-tells/BareReaches.yml");
		expect(found[0]?.hint).toContain("'Ship' in the quoted text is the checker's stand-in for a page's name.");
	});

	it("leaves the hint unchanged when the flagged span quotes no stand-in", async () => {
		const ctx = await context("The keeper waits.\n");
		const found = await styleLayerWith({
			async check(pass) {
				return new Map([["Target.md", pass.config === "gate" ? [alert("ai-tells.Staccato", 1, "keeper waits")] : []]]);
			},
		}).run(ctx);
		expect(found).toHaveLength(1);
		expect(found[0]?.hint).not.toContain("stand-in");
	});

	it("drops confirmed quoted counts and proper-noun colons, but preserves literal DM-prose hits", async () => {
		const ctx = await context(
			[
				'"Take a single fruit," she says.',
				'"Take a single fruit," she says, then picks a single flower.',
				"Ship versus garden: Matteo calls the keeper mad.",
				"A masked name: Person calls the keeper mad.",
				"The quay: sailor waits.",
			].join("\n"),
			{ "matteo.md": "---\ntitle: Gardener\naliases: [Matteo]\n---\nA gardener waits.\n" },
		);
		const found = await styleLayerWith({
			async check() {
				return new Map([
					[
						"Target.md",
						[
							alert("ai-tells.FillerIntensifier", 1, "a single"),
							alert("ai-tells.FillerIntensifier", 2, "a single"),
							alert("ai-tells.ColonUsage", 3, ": Matteo"),
							alert("ai-tells.ColonUsage", 4, ": Person"),
							alert("ai-tells.ColonUsage", 5, ": sailor"),
						],
					],
				]);
			},
		}).run(ctx);
		expect(found.map((finding) => [finding.rule, finding.line])).toEqual([
			["ai-tells.FillerIntensifier", 2],
			["ai-tells.ColonUsage", 5],
		]);
	});

	it("does not report ColonUsage for a title's proper noun despite its lowercase slug", async () => {
		const root = await mkdtemp(join(tmpdir(), "cf-style-"));
		roots.push(root);
		const path = "shepherd-grigori.md";
		const vault = buildVault(join(root, "wiki"), {
			markdown: new Map([[path, "---\ntitle: Shepherd Grigori\n---\nThe name on the note: Grigori.\n"]]),
			attachments: [],
		});
		const ctx: CheckContext = {
			root,
			vault,
			pages: vault.pages,
			templates: { byName: new Map(), types: new Map() },
			display: (path) => `wiki/${path}`,
		};
		const found = await styleLayerWith({
			async check(pass) {
				expect(pass.files[path]?.split("\n")[3]).toBe("The name on the note: Grigori.");
				return new Map([[path, [alert("ai-tells.ColonUsage", 4, ": Grigori")]]]);
			},
		}).run(ctx);
		expect(found.filter((finding) => finding.rule === "ai-tells.ColonUsage")).toEqual([]);
	});

	it.each([
		["- **Casting Time:** Action", ": Action", 17, false],
		["**Classes:** Artificer, Sorcerer, Wizard", ": Artificer", 10, false],
		["__Casting Time:__ Action", ": Action", 15, false],
		["**Casting Time:** Action. Then: Action.", ": Action", 15, false],
		["**Casting Time:** Action. Then: Action.", ": Action", 31, true],
		["**Casting Time:** Action. Notes: Rain falls.", ": Rain", 32, true],
		["Casting Time: Action", ": Action", 13, true],
		["**Casting Time**: Action", ": Action", 17, true],
		["The keeper waits: Rain falls.", ": Rain", 17, true],
		["**𐐀:** Action", ": Action", 4, false],
	] as const)("checks entry-field precision in %s (%s at column %i)", async (line, match, column, flagged) => {
		const ctx = await context(`${line}\n`);
		const found = await styleLayerWith({
			async check() {
				return new Map([
					["Target.md", [{ ...alert("ai-tells.ColonUsage", 1, match), Span: [column, column + match.length - 1] }]],
				]);
			},
		}).run(ctx);
		expect(found).toHaveLength(flagged ? 1 : 0);
	});

	it("exempts spoken-line colon labels without exempting ordinary notes or Narration punctuation", async () => {
		const ctx = await context(
			"> [!narration] First look\n> A keeper waits: rain falls.\n\nFailure: ==A rope snaps: spray leaps.==\n\n> [!note] Reminder\n> Rain: falling.\n\nNotes: rain falls.\n",
		);
		const found = await styleLayerWith({
			async check(pass) {
				if (pass.config === "narration") return new Map();
				if (pass.files["Target.md"]!.split("\n")[3]?.startsWith("> "))
					return new Map([
						["Target.md", [alert("Narration.NoColon", 4, ":"), alert("ai-tells.ColonUsage", 4, ": rain")]],
					]);
				return new Map([
					[
						"Target.md",
						[
							alert("ai-tells.ColonUsage", 2, ": rain"),
							alert("ai-tells.ColonUsage", 4, ": rain"),
							alert("ai-tells.ColonUsage", 7, ": rain"),
							alert("ai-tells.ColonUsage", 9, ": rain"),
							alert("Narration.NoColon", 2, ":"),
						],
					],
				]);
			},
		}).run(ctx);
		expect(found.map((finding) => [finding.rule, finding.line])).toEqual([
			["ai-tells.ColonUsage", 7],
			["ai-tells.ColonUsage", 9],
			["Narration.NoColon", 2],
			["Narration.NoColon", 4],
		]);
	});

	it("keeps craft checks on spoken text, warns regardless of Vale severity and drops only wholly quoted matches", async () => {
		const ctx = await context(
			[
				"> [!narration] First look",
				'> "Very slowly," she says. Very slowly the lantern sways.',
				'> "Very slowly," she says.',
				"> “Very slowly,” she says.",
				"> Very slowly the rain stops.",
				"",
				"Very slowly the keeper waits.",
			].join("\n"),
		);
		const found = await styleLayerWith({
			async check(pass) {
				if (pass.config !== "narration") return new Map();
				expect(pass.files["Target.md"]!.split("\n")[6]).toBe("");
				return new Map([
					[
						"Target.md",
						[2, 3, 4, 5].map((line) =>
							alert(
								"write-good.Weasel",
								line,
								"Very slowly",
								"error",
								"Give the action. Disable this rule for dialogue.",
							),
						),
					],
				]);
			},
		}).run(ctx);
		expect(found.map((finding) => [finding.line, finding.severity, finding.message])).toEqual([
			[2, "warning", "Give the action."],
			[5, "warning", "Give the action."],
		]);
		expect(found.every((finding) => finding.hint.includes("write-good/Weasel.yml"))).toBe(true);
	});

	it("caches all style passes together and recomputes only a changed selected page", async () => {
		const source = "> [!narration] First look\n> The keeper waits.\n\nFailure: ==The rope snaps.==\n";
		const ctx = await context(source, { "Foreign.md": "A sailor watches.\n" });
		const passes: ValePass[] = [];
		const layer = styleLayerWith({
			async check(pass) {
				passes.push(pass);
				return new Map([["Target.md", pass.config === "narration" ? [alert("write-good.Weasel", 2)] : []]]);
			},
		});
		const first = await layer.run(ctx);
		expect(await layer.run(ctx)).toEqual(first);
		expect(passes).toHaveLength(3);
		ctx.vault = buildVault(ctx.vault.dir, {
			markdown: new Map([
				["Target.md", source.replace("keeper waits", "keeper hauls a rope")],
				["Foreign.md", "A sailor checks the mooring.\n"],
			]),
			attachments: [],
		});
		ctx.pages = [ctx.vault.pageByPath.get("Target.md")!];
		await layer.run(ctx);
		expect(passes).toHaveLength(6);
		expect(passes.every((pass) => Object.keys(pass.files).join(",") === "Target.md")).toBe(true);
		expect(await readdir(join(ctx.root, ".cache/check"))).toEqual(["style.json"]);
	});
});

describe("gateText orchestration", () => {
	it("overlays an existing page, keeps the full vault as read-only context and removes its isolated cache root", async () => {
		const root = await mkdtemp(join(tmpdir(), "cf-gate-test-"));
		roots.push(root);
		const vault = join(root, "wiki");
		await mkdir(vault);
		const existing = "Existing log text.\n";
		await writeFile(join(vault, "log.md"), existing);
		await writeFile(join(vault, "Foreign.md"), "Foreign context stays.\n");
		const text = "> [!narration] Entry\n> Foreign keeps watch.\n";
		let scratch = "";
		const style = styleLayerWith({
			async check(pass, cacheRoot) {
				scratch = cacheRoot;
				expect(cacheRoot).not.toBe(root);
				expect(Object.keys(pass.files)).toEqual(["log.md"]);
				return new Map([["log.md", pass.config === "gate" ? [alert("Narration.NoColon", 2, ":")] : []]]);
			},
		});
		let invoked = 0;
		const findings = await gateText({
			vault,
			cwd: root,
			rel: "log.md",
			text,
			registry: [
				{
					...style,
					async run(ctx) {
						invoked++;
						expect(ctx.pages.map((page) => page.path)).toEqual(["log.md"]);
						expect(ctx.pages[0]?.source).toBe(text);
						expect(ctx.vault.pages).toHaveLength(2);
						expect(ctx.vault.pageByPath.get("Foreign.md")?.source).toBe("Foreign context stays.\n");
						return style.run(ctx);
					},
				},
				{
					name: "not-style",
					scope: "vault",
					description: "Must not run.",
					run() {
						throw new Error("Unexpected layer.");
					},
				},
			],
		});
		expect(invoked).toBe(1);
		expect(findings).toMatchObject([{ path: "wiki/log.md", layer: "style", rule: "Narration.NoColon", line: 2 }]);
		expect(await readFile(join(vault, "log.md"), "utf8")).toBe(existing);
		expect(await readFile(join(vault, "Foreign.md"), "utf8")).toBe("Foreign context stays.\n");
		await expect(stat(scratch)).rejects.toMatchObject({ code: "ENOENT" });
		await expect(stat(join(root, ".cache"))).rejects.toMatchObject({ code: "ENOENT" });
	});

	it("gates a not-yet-written log and cleans up even when the adapter fails", async () => {
		const root = await mkdtemp(join(tmpdir(), "cf-gate-test-"));
		roots.push(root);
		const vault = join(root, "wiki");
		await mkdir(vault);
		await writeFile(join(vault, "Foreign.md"), "A sailor waits.\n");
		let scratch = "";
		await expect(
			gateText({
				vault,
				cwd: root,
				rel: "log.md",
				text: "A keeper waits.\n",
				registry: [
					styleLayerWith({
						async check(pass, cacheRoot) {
							scratch = cacheRoot;
							expect(Object.keys(pass.files)).toEqual(["log.md"]);
							throw new Error("Canned adapter failure.");
						},
					}),
				],
			}),
		).rejects.toThrow("Canned adapter failure.");
		await expect(stat(scratch)).rejects.toMatchObject({ code: "ENOENT" });
		await expect(stat(join(vault, "log.md"))).rejects.toMatchObject({ code: "ENOENT" });
	});
});
