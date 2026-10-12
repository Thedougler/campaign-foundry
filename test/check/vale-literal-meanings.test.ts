import { execFile } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";
import { styleLayerWith } from "../../src/check/layers/style.ts";
import { runCheck } from "../../src/check/run.ts";
import { valeSubprocess } from "../../src/check/vale.ts";
import { repoRoot } from "./helpers.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

const cases = [
	{
		rule: "FigurativeWorth",
		literal: [
			"A diamond worth 1,000+ GP is consumed.",
			"The marked sticks are worth 25 GP.",
			"The sealable vessel is worth 2,000 gold pieces.",
			"The jewel is worth £25.",
			"The ring is worth $25.",
		],
		figurative: ["The migration is worth the effort.", "Naming is worth knowing about."],
	},
	{
		rule: "MortalityMetaphors",
		literal: [
			"The target dies.",
			"The original creature dies after the clone finishes forming.",
			"The target can die from this spell.",
			"It dies if you die.",
			"It then dies if you die.",
		],
		figurative: ["The cache dies during the restart.", "It dies during the third stage."],
	},
	{
		rule: "FigurativeShape",
		literal: [
			"It takes the shape of a dragon.",
			"The cloud takes the shape of a Cylinder.",
			"The shape of a Cone is drawn on the map.",
			"The shape of the Emanation is drawn on the map.",
			"The Cylinder shape is drawn on the map.",
			"The Sphere shape is drawn on the map.",
		],
		figurative: ["The shape of the API changes.", "The wrong shape remains."],
	},
	{
		rule: "FigurativeQuantities",
		literal: [
			"You need a pinch of bone dust.",
			"You need a pinch of powdered iron.",
			"You need a pinch of colorful sand.",
			"You need a handful of oak bark.",
			"You need a handful of sand.",
			"You need a handful of thorns.",
			"You need the handful of sand.",
			"You need handfuls of thorns.",
		],
		figurative: [
			"A handful of tests fail.",
			"A pinch of optimism helps.",
			"The handful of tests fail.",
			"Handfuls of alerts arrive.",
		],
	},
	{
		rule: "EmDashUsage",
		literal: ["Roll 3–5 dice.", "Roll 3 to 5 dice."],
		figurative: ["The door opens—slowly.", "The door opens – slowly."],
	},
];

describe("DM-confirmed literal Vale meanings", () => {
	it.each(cases)(
		"$rule spares its literal false matches and keeps catching its figurative targets",
		async ({ rule, literal, figurative }) => {
			const root = await mkdtemp(join(tmpdir(), "cf-literal-"));
			roots.push(root);
			const files = [...literal, ...figurative].map((text, index) => [`example-${index}.md`, `${text}\n`] as const);
			const result = await runCheck({
				root,
				vault: join(root, "wiki"),
				cwd: root,
				registry: [styleLayerWith(valeSubprocess())],
				files: { markdown: new Map(files), attachments: [] },
			});
			const found = result.findings.filter((finding) => finding.rule === `ai-tells.${rule}`);
			expect(found.filter(({ path }) => literal.some((_, index) => path === `wiki/example-${index}.md`))).toEqual([]);
			for (const index of figurative.keys()) {
				expect(found).toEqual(
					expect.arrayContaining([
						expect.objectContaining({ path: `wiki/example-${index + literal.length}.md`, line: 1 }),
					]),
				);
			}
		},
	);

	it("applies the literal narrowings idempotently to synced styles", async () => {
		const root = await mkdtemp(join(tmpdir(), "cf-vale-patch-"));
		roots.push(root);
		const styles = join(root, ".vale/styles/ai-tells");
		await mkdir(join(root, ".vale/styles"), { recursive: true });
		await cp(join(repoRoot, ".vale/styles/ai-tells"), styles, { recursive: true });
		const run = promisify(execFile);
		await run(process.execPath, [join(repoRoot, "scripts/vale-patch.ts")], { cwd: root });
		const before = await Promise.all(cases.map(({ rule }) => readFile(join(styles, `${rule}.yml`), "utf8")));
		await run(process.execPath, [join(repoRoot, "scripts/vale-patch.ts")], { cwd: root });
		expect(await Promise.all(cases.map(({ rule }) => readFile(join(styles, `${rule}.yml`), "utf8")))).toEqual(before);
	});
});
