import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { checkFixture, findingsFor, fixtures, type JsonReport } from "./helpers.ts";

let report: JsonReport;
let code: number;
const A = "Aldermoor";

beforeAll(async () => {
	({ report, code } = await checkFixture("mermaid", ["--layer", "mermaid"]));
});

describe("mermaid layer", () => {
	it("exits 1 and reports exactly the one broken diagram", () => {
		expect(code).toBe(1);
		expect(report.findings).toHaveLength(1);
	});

	it("anchors the finding on the broken block's fence line, with the parser's message", async () => {
		const source = (await readFile(join(fixtures, "mermaid/wiki", A, "NPCs/Diagrams.md"), "utf8")).split("\n");
		// The page holds two ```mermaid fences: the valid chain of command, then the broken one.
		const fences = source.flatMap((line, i) => (line.trim() === "```mermaid" ? [i + 1] : []));
		expect(fences).toHaveLength(2);
		const finding = findingsFor(report, `${A}/NPCs/Diagrams.md`)[0]!;
		expect(finding).toMatchObject({ layer: "mermaid", rule: "parse-error", severity: "error", line: fences[1] });
		expect(finding.message).toContain("Parse error");
		expect(finding.message).toContain("{Guilds");
	});

	it("says nothing about the valid diagram beside it", () => {
		const finding = report.findings[0]!;
		expect(finding.message).not.toContain("Docks");
	});

	it("tells the author where the error shows and what governs the syntax", () => {
		expect(report.findings[0]?.hint).toContain("Obsidian");
		expect(report.findings[0]?.hint).toContain("diagram type");
	});

	it("reports nothing on a vault without diagrams", async () => {
		const clean = await checkFixture("minimal", ["--layer", "mermaid"]);
		expect(clean.code).toBe(0);
		expect(clean.report.findings).toEqual([]);
	});
});
