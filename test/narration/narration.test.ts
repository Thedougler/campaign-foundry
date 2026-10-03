import { describe, expect, it } from "vitest";
import { analyzeCallout } from "../../src/narration/analyze.ts";

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
