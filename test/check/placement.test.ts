import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { cf, checkFixture, copyFixture, findingsFor, fixtures, type JsonReport, realTemplates } from "./helpers.ts";

let report: JsonReport;
let code: number;

beforeAll(async () => {
	({ report, code } = await checkFixture("placement", ["--layer", "placement"]));
});

const rules = (path: string): string[] => findingsFor(report, path).map((f) => f.rule).sort();
const fixtureHas = (path: string) => access(join(fixtures, "placement/wiki", path));
const A = "Aldermoor";
const C = `${A}/Ashes of the Crown`;

describe("placement layer: failure classes", () => {
	it("exits 1", () => expect(code).toBe(1));

	it("accepts every kind in the place docs/wiki-layout.md gives it", async () => {
		for (const ok of [
			"DM Settings.md",
			`${A}/${A}.md`,
			`${A}/Locations/Saint-Denis.md`,
			`${A}/NPCs/Mara Voss.md`,
			`${A}/House Rules/Old Crossing Rules.md`,
			`${C}/Ashes of the Crown.md`,
			`${C}/hot.md`,
			`${C}/PCs/Tam Brightwater.md`,
			`${C}/House Rules/Fire Watch.md`,
			`${C}/Sessions/Session 1/Session 1 - Storm at the Crossing.md`,
			`${C}/Sessions/Session 1/Session 1 Map.md`,
			`${C}/Sessions/Session 1/Session 1 - Prep.md`,
			"Ironvale/log.md",
			"Ironvale/index.md",
			"index.md",
		]) {
			await fixtureHas(ok);
			expect(findingsFor(report, ok), ok).toEqual([]);
		}
	});

	it.each([
		[`${A}/NPCs/Wrong Home Location.md`, ["misplaced"]],
		[`${C}/Locations/Campaign Location.md`, ["misplaced"]],
		[`${A}/Locations/Deep/Nested Site.md`, ["misplaced"]],
		[`${C}/Sessions/Session 1/Stray PC.md`, ["misplaced"]],
		[`${C}/NPCs/Campaign Rule.md`, ["misplaced"]],
		[`${A}/Loose Scene.md`, ["misplaced"]],
		["Stray Root Page.md", ["misplaced"]],
		[`${C}/Sessions/Session One/Odd Session.md`, ["misplaced"]],
		["Ironvale/Overview.md", ["wrong-file-name"]],
		[`${C}/Sessions/Session 1/Session 2 - Recap.md`, ["session-page-name"]],
		[`${C}/Sessions/Session 1/Session 1 Previously On.md`, ["session-page-name"]],
		[`${C}/Sessions/Session 1/Wrong Prefix.md`, ["session-page-name"]],
		[`${A}/Locations/black-lotus.md`, ["slug-name"]],
		[`${A}/NPCs/black_lotus.md`, ["slug-name"]],
		[`${A}/Locations/Doubled.md`, ["duplicate-name"]],
		[`${A}/NPCs/Doubled.md`, ["duplicate-name"]],
		[`${A}/Locations/index.md`, ["misplaced-special"]],
		["log.md", ["misplaced-special"]],
	])("%s yields %j", (path, expected) => {
		expect(rules(path)).toEqual(expected);
	});

	it("hints the right Session page name, with an example", () => {
		const recap = findingsFor(report, `${C}/Sessions/Session 1/Session 2 - Recap.md`)[0];
		expect(recap?.message).toContain("`Session 1 - Recap`");
		expect(recap?.hint).toContain("Session 1 - Recap.md");
		const scene = findingsFor(report, `${C}/Sessions/Session 1/Wrong Prefix.md`)[0];
		expect(scene?.hint).toContain("Session 1 - The Drowned Bell.md");
	});

	it("names the destination in the hint, and says when --fix can move it", () => {
		const movable = findingsFor(report, `${A}/NPCs/Wrong Home Location.md`)[0];
		expect(movable?.hint).toContain("Aldermoor/Locations/Wrong Home Location.md");
		expect(movable?.hint).toContain("--fix");
		const stuck = findingsFor(report, `${A}/Loose Scene.md`)[0];
		expect(stuck?.hint).toContain("Sessions/Session 1/");
		expect(stuck?.hint).not.toContain("--fix");
		expect(findingsFor(report, `${A}/Locations/black-lotus.md`)[0]?.hint).toContain("Black Lotus");
		expect(findingsFor(report, `${A}/Locations/Doubled.md`)[0]?.hint).toContain("Doubled (Keep)");
	});
});

describe("placement layer: --fix", () => {
	const fixArgs = (dir: string) => ["check", "--layer", "placement", "--json", "--fix", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates];

	it("moves unambiguous pages, leaves ambiguous ones, and is idempotent", async () => {
		const dir = await copyFixture("placement");
		const first = JSON.parse((await cf(fixArgs(dir), dir)).stdout) as JsonReport;
		expect(first.fixes.map((f) => f.path).sort()).toEqual([
			`wiki/${A}/Locations/Deep/Nested Site.md`,
			`wiki/${A}/NPCs/Wrong Home Location.md`,
			`wiki/${C}/Locations/Campaign Location.md`,
			`wiki/${C}/NPCs/Campaign Rule.md`,
			`wiki/${C}/Sessions/Session 1/Stray PC.md`,
		].sort());
		const exists = (p: string) => access(join(dir, "wiki", p)).then(() => true, () => false);
		expect(await exists(`${A}/Locations/Nested Site.md`)).toBe(true);
		expect(await exists(`${A}/Locations/Wrong Home Location.md`)).toBe(true);
		expect(await exists(`${A}/NPCs/Wrong Home Location.md`)).toBe(false);
		expect(await exists(`${C}/PCs/Stray PC.md`)).toBe(true);
		expect(await exists(`${C}/House Rules/Campaign Rule.md`)).toBe(true);
		expect(await exists(`${A}/Loose Scene.md`)).toBe(true);
		expect(await readFile(join(dir, `wiki/${A}/Locations/Nested Site.md`), "utf8")).toContain("type: Location");

		expect(first.findings.some((f) => f.path.endsWith("Loose Scene.md"))).toBe(true);
		expect(first.findings.some((f) => f.path.endsWith("Wrong Home Location.md"))).toBe(false);

		const second = JSON.parse((await cf(fixArgs(dir), dir)).stdout) as JsonReport;
		expect(second.fixes).toEqual([]);
	});

	it("does not overwrite a page that already sits at the destination", async () => {
		const dir = await copyFixture("placement");
		const result = JSON.parse((await cf(fixArgs(dir), dir)).stdout) as JsonReport;
		expect(result.fixes.map((f) => f.path)).not.toContain(`wiki/${A}/NPCs/Ravenhold.md`);
		expect(await readFile(join(dir, `wiki/${A}/Locations/Ravenhold.md`), "utf8")).toContain("type: Location");
	});
});
