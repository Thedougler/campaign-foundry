import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { styleLayerWith } from "../../src/check/layers/style.ts";
import { runCheck } from "../../src/check/run.ts";
import { valeSubprocess } from "../../src/check/vale.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

const cases = [
	{
		change: "P1 hunting",
		rule: "AnthropomorphicCognition",
		literal: ["Malone hunts Grigori.", "She was hunted."],
		figurative: ["The scanner hunts secrets.", "The scanner hunted secrets."],
	},
	{
		change: "P2 teaching",
		rule: "AnthropomorphicCognition",
		literal: ["Renzo was teaching Geoffrey.", "Renzo was teaching Jean-Claude."],
		figurative: ["The guide is teaching the compiler.", "The guide is teaching the compiler that contract."],
	},
	{
		change: "P3 carrying",
		rule: "FigurativeCarries",
		literal: [
			"The construct carried the catatonic Jean-Claude.",
			"It carried Geoffrey.",
			"The constructs carry the catatonic Jean-Claude.",
			"It can carry Geoffrey.",
		],
		figurative: [
			"The change carries risk.",
			"The module carried the validation logic.",
			"The modules carry the payload.",
			"It can carry the payload.",
		],
	},
	{
		change: "P4 party arrival",
		rule: "BareReaches",
		literal: ["The Party reaches the village.", "The parties reach the village."],
		figurative: ["The catalog reaches the store.", "The records reach the store."],
	},
	...[
		{
			rule: "BareHolds",
			literal: [
				"The PC holds the rope.",
				"The NPC holds the rope.",
				"The PCs hold the rope.",
				"The NPCs hold the rope.",
			],
			figurative: ["The table holds the values.", "The RPC holds the token.", "The NPCache holds the token."],
		},
		{
			rule: "AnthropomorphicCognition",
			literal: ["The PC wants the sword.", "The NPC wants the sword."],
			figurative: ["The spec wants us to retry."],
		},
		{
			rule: "BareNames",
			literal: ["The PC names the ship.", "The NPC names the ship."],
			figurative: ["The file names the version."],
		},
		{
			rule: "BareReaches",
			literal: ["The PC reaches the village.", "The NPC reaches the village."],
			figurative: ["The catalog reaches the store."],
		},
		{
			rule: "FigurativeCarries",
			literal: ["The PC carries the pack.", "The NPC carries the pack."],
			figurative: ["The module carries the payload."],
		},
		{
			rule: "FigurativeLives",
			literal: ["The PC lives in the village.", "The NPC lives in the village."],
			figurative: ["The config lives in the file."],
		},
		{
			rule: "FigurativeReaches",
			literal: ["The PC reaches for the sword.", "The NPC reaches for the sword."],
			figurative: ["The prose reaches for the passive voice."],
		},
		{
			rule: "FigurativeWins",
			literal: ["The PC wins the race.", "The NPC wins the race."],
			figurative: ["The exact match wins."],
		},
		{
			rule: "MortalityMetaphors",
			literal: ["The PC dies.", "The NPC dies."],
			figurative: ["The cache dies during the restart."],
		},
		{
			rule: "MotionMetaphors",
			literal: ["The PC feeds the child.", "The NPC feeds the child."],
			figurative: ["The pipeline feeds the stage."],
		},
		{
			rule: "NamedAdjective",
			literal: ["The named PC waits.", "The named NPC waits."],
			figurative: ["The named file remains."],
		},
	].map((testCase) => ({ change: "P5 PC/NPC people", ...testCase })),
];

describe("DM-confirmed people in Vale style checks", () => {
	it.each(cases)("$change: $rule passes people and flags artifacts", async ({ rule, literal, figurative }) => {
		const root = await mkdtemp(join(tmpdir(), "cf-vale-people-"));
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
	});
});
