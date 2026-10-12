import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { checkLayer } from "../helpers.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

const valid =
	"size: Small\nhp: 10\nhit_dice: 3d6\nstats: [8, 15, 10, 10, 8, 8]\ncr: 1/4\nsenses: passive Perception 9\nskillsaves: []\nactions: []";

async function fixture(body: string, corpus?: string, sources = ["archive/legacy.md"]) {
	const root = await mkdtemp(join(tmpdir(), "cf-statblock-provenance-"));
	roots.push(root);
	await mkdir(join(root, "wiki/Creatures"), { recursive: true });
	await mkdir(join(root, "archive"));
	if (corpus !== undefined) await writeFile(join(root, "archive/legacy.md"), corpus);
	await writeFile(
		join(root, "wiki/Creatures/Legacy.md"),
		`---\ntype: Creature\nsources: ${JSON.stringify(sources)}\n---\n\n## Statblock\n\n\`\`\`statblock\n${body}\n\`\`\`\n`,
	);
	return () => checkLayer("statblock", root);
}

describe("statblock corpus provenance", () => {
	it("exempts a proved legacy HP value after whitespace normalisation", async () => {
		const check = await fixture(valid.replace("hp: 10", "hp: 11"), "hp:   11");
		expect((await check()).report.findings).toEqual([]);
	});

	it("still flags authored HP arithmetic when the page names no corpus", async () => {
		const check = await fixture(valid.replace("hp: 10", "hp: 11"), "hp: 11", []);
		expect((await check()).report.findings).toEqual([expect.objectContaining({ rule: "hp-average", line: 10 })]);
	});

	it("still flags an edited HP value on a page with a real corpus", async () => {
		const check = await fixture(valid.replace("hp: 10", "hp: 12"), "hp: 11");
		expect((await check()).report.findings).toEqual([expect.objectContaining({ rule: "hp-average", line: 10 })]);
	});

	it.each([["archive/missing.md"], ["https://example.invalid/legacy.md"]])(
		"does not infer provenance from a missing or remote source: %s",
		async (source) => {
			const check = await fixture(valid.replace("hp: 10", "hp: 11"), "hp: 11", [source]);
			expect((await check()).report.findings).toEqual([expect.objectContaining({ rule: "hp-average", line: 10 })]);
		},
	);

	it("exempts a legacy skill bonus only when its actual numeric entry is proved", async () => {
		const check = await fixture(
			valid.replace("skillsaves: []", "skillsaves:\n  - Religion: 3"),
			"skillsaves:\n  - Religion: 3",
		);
		expect((await check()).report.findings).toEqual([]);
	});

	it.each([
		["skillsaves:", 3],
		["skillsaves:\n  - Religion: 3", 5],
	])("a matching skillsaves header does not exempt an unproved Religion value", async (corpus, value) => {
		const check = await fixture(valid.replace("skillsaves: []", `skillsaves:\n  - Religion: ${value}`), corpus);
		expect((await check()).report.findings).toEqual([expect.objectContaining({ rule: "skill-bonus", line: 16 })]);
	});

	it("keeps non-numeric HP validation even when its malformed line occurs in the corpus", async () => {
		const check = await fixture(valid.replace("hp: 10", "hp: bogus"), "hp: bogus");
		expect((await check()).report.findings).toEqual([expect.objectContaining({ rule: "hp-average", line: 10 })]);
	});

	it.each([
		['desc: "Melee Attack Roll: +9, reach 5 ft."', 0],
		["- name: Bite", 1],
	])("feature arithmetic binds to its description, not its name: %s", async (corpus, findings) => {
		const body = valid.replace(
			"actions: []",
			'actions:\n  - name: Bite\n    desc: "Melee Attack Roll: +9, reach 5 ft."',
		);
		const check = await fixture(body, corpus);
		const found = (await check()).report.findings;
		expect(found).toHaveLength(findings);
		if (findings) expect(found[0]).toMatchObject({ rule: "attack-bonus", line: 18 });
	});

	it.each(["|", ">"])("requires every non-blank content line of a %s description to be proved", async (header) => {
		const body = valid.replace(
			"actions: []",
			`actions:\n  - name: Bite\n    desc: ${header}\n      Melee Attack Roll: +9, reach 5 ft.\n\n      Hit: 4 Piercing damage.`,
		);
		const complete = await fixture(body, "Melee Attack Roll: +9, reach 5 ft.\nHit: 4 Piercing damage.");
		expect((await complete()).report.findings).toEqual([]);
		const edited = await fixture(body, "Melee Attack Roll: +9, reach 5 ft.");
		expect((await edited()).report.findings).toEqual([expect.objectContaining({ rule: "attack-bonus", line: 19 })]);
		const headerOnly = await fixture(body, `desc: ${header}`);
		expect((await headerOnly()).report.findings).toEqual([expect.objectContaining({ rule: "attack-bonus", line: 19 })]);
	});

	it.each([
		["- Religion: *bonus", 1],
		["religion_bonus: &bonus 3", 0],
	])(
		"binds an aliased bonus to its resolved numeric value rather than the alias token: %s",
		async (corpus, findings) => {
			const body = `religion_bonus: &bonus 3\n${valid.replace("skillsaves: []", "skillsaves:\n  - Religion: *bonus")}`;
			const check = await fixture(body, corpus);
			const found = (await check()).report.findings;
			expect(found).toHaveLength(findings);
			if (findings) expect(found[0]).toMatchObject({ rule: "skill-bonus", line: 9 });
		},
	);

	it.each([
		["skillsaves: *entries", 1],
		["- Religion: 3", 0],
	])("resolves an aliased bonus list before proving the actual entry: %s", async (corpus, findings) => {
		const body = `religion_entries: &entries\n  - Religion: 3\n${valid.replace("skillsaves: []", "skillsaves: *entries")}`;
		const check = await fixture(body, corpus);
		const found = (await check()).report.findings;
		expect(found).toHaveLength(findings);
		if (findings) expect(found[0]).toMatchObject({ rule: "skill-bonus", line: 10 });
	});
});
