import { beforeAll, describe, expect, it } from "vitest";
import { checkFixture, findingsFor, type JsonReport } from "./helpers.ts";

let report: JsonReport;
let code: number;
const A = "Aldermoor";

beforeAll(async () => {
	({ report, code } = await checkFixture("orphans", ["--layer", "orphans"]));
});

describe("orphans layer", () => {
	it("exits 1 and reports each page with no inbound link", () => {
		expect(code).toBe(1);
		expect(report.findings.map((f) => f.path.replace(`wiki/${A}/`, "")).sort()).toEqual([
			"NPCs/Lonely.md",
			"NPCs/Only From Index.md",
			"NPCs/Only From Log.md",
			"NPCs/Orphan With Link.md",
		]);
		expect(report.findings.every((f) => f.rule === "orphan")).toBe(true);
	});

	it("does not count links from index.md or log.md", () => {
		expect(findingsFor(report, `${A}/NPCs/Only From Index.md`)).toHaveLength(1);
		expect(findingsFor(report, `${A}/NPCs/Only From Log.md`)).toHaveLength(1);
	});

	it("does not count a page's link to itself", () => {
		expect(findingsFor(report, `${A}/NPCs/Self Only.md`)).toHaveLength(0); // linked from Linked
		expect(findingsFor(report, `${A}/NPCs/Lonely.md`)).toHaveLength(1);
	});

	it("counts a link from an orphan", () => {
		expect(findingsFor(report, `${A}/NPCs/Linked From Orphan.md`)).toEqual([]);
	});

	it("counts a frontmatter link both ways: the parent is linked, and so is the child", () => {
		// Child Site has `parent: "[[Ravenhold]]"`; no body anywhere links to Child Site.
		expect(findingsFor(report, `${A}/Locations/Ravenhold.md`)).toEqual([]);
		expect(findingsFor(report, `${A}/Locations/Child Site.md`)).toEqual([]);
	});

	it("counts a body link one way only", () => {
		// Orphan With Link links Linked From Orphan in its body; nothing links back to it.
		expect(findingsFor(report, `${A}/NPCs/Orphan With Link.md`)).toHaveLength(1);
	});

	it("exempts the roots: vault index, DM Settings, World and Campaign overviews, log, hot, World index", () => {
		for (const root of ["index.md", "DM Settings.md", `${A}/${A}.md`, `${A}/log.md`, `${A}/index.md`, `${A}/Ashes/hot.md`, `${A}/Ashes/Ashes.md`]) {
			expect(findingsFor(report, root), root).toEqual([]);
		}
	});

	it("tells the author where the link usually goes", () => {
		expect(findingsFor(report, `${A}/NPCs/Lonely.md`)[0]?.hint).toContain("Location where they are found");
		expect(findingsFor(report, `${A}/NPCs/Lonely.md`)[0]?.hint).toContain("[[Lonely]]");
	});
});
