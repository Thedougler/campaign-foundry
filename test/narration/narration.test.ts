import { describe, expect, it } from "vitest";
import { analyzeCallout, wordsWithLines } from "../../src/narration/analyze.ts";

describe("narration structural analysis", () => {
	const inspect = (body: string) => analyzeCallout({ body, sources: [] });

	it("warns on evaluative adjective stacks and chained relative clauses", () => {
		const report = inspect("A beautiful mysterious tower that leans toward the road which climbs the hill.");
		expect(report.evaluativeAdjectiveStacks).toEqual(["beautiful mysterious tower"]);
		expect(report.relativeClauseChains).toHaveLength(1);
		expect(report.findings.filter((finding) => finding.severity === "warning").map((finding) => finding.rule)).toEqual([
			"evaluative-stack",
			"relative-chain",
		]);
	});

	it("caps proper-name candidates per block", () => {
		const report = inspect("Mara meets Tovin beside Eileen Dover while Ghazrim DuLoc watches.");
		expect(report.inventedProperNouns).toEqual(["Mara", "Tovin", "Eileen Dover", "Ghazrim DuLoc"]);
		expect(report.findings.map((finding) => finding.rule)).toContain("invented-names");
	});

	it("counts a sentence-opening English word as a name only when it is no English word", () => {
		const isWord = (word: string) => ["water", "traders"].includes(word);
		const report = analyzeCallout({ body: "Water swallows the dock. Traders flee. Tovin waits.", sources: [], isWord });
		expect(report.inventedProperNouns).toEqual(["Tovin"]);
	});

	it("leaves Canon names uncounted, possessives and joined names included", () => {
		const names = new Set(["Nona", "Black", "Jaw", "Pearl", "Souls", "Calveno"]);
		const report = analyzeCallout({ body: "Nona Black-Jaw sends Nona's ship to Calveno with the Pearl of Souls. Tovin waits.", sources: [], names });
		expect(report.inventedProperNouns).toEqual(["Tovin"]);
	});

	it("does not count a shared page name as echoed phrasing", () => {
		const sources = [{ label: "Branca.md", words: wordsWithLines("She wants the Pearl of Souls first.") }];
		const body = "The waveservant says the Pearl of Souls first, then the rest.";
		expect(analyzeCallout({ body, sources }).echo).not.toEqual([]);
		expect(analyzeCallout({ body, sources, maskNames: (t) => t.replace("Pearl of Souls", "Placenamea") }).echo).toEqual([]);
	});

	it("counts a name joined by \"of\" once", () => {
		expect(inspect("Tovin carries the Pearl of Souls to the Sentinels of the Eyrie.").inventedProperNouns).toEqual(["Tovin", "Pearl of Souls", "Sentinels of the Eyrie"]);
	});

	it("leaves function-word homophones alone", () => {
		expect(inspect("Two guards walk to the door, and their lamps burn there.").spokenWordTraps.filter((trap) => trap.type === "homophone")).toEqual([]);
	});

	it("flags alliteration, tongue-twisters, pun names and homophones", () => {
		const report = inspect("Six slick silver snakes slide past Eileen Dover, who must ring the wring bell.");
		expect(report.spokenWordTraps.map((trap) => trap.type)).toEqual(
			expect.arrayContaining(["alliteration", "tongue-twister", "pun-name", "homophone"]),
		);
		expect(report.findings.map((finding) => finding.rule)).toContain("spoken-word-trap");
	});

	it("flags a speech tag after a quoted line", () => {
		const report = inspect('The ferryman says, "Coins first," he mutters.');
		expect(report.dialogueAttributions).toEqual(['" he mutters']);
		expect(report.findings.map((finding) => finding.rule)).toContain("dialogue-attribution");
	});
});
