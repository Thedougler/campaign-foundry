import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, copyFixture, findingsFor, type JsonReport, realTemplates } from "./helpers.ts";

const item = `---
title: "Brass Key"
type: Item
summary: "A brass key that opens one lock."
sources: []
---

## Properties

*Mundane Gear, Common.*

The key opens one matching lock.

## Links

\`\`\`base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
\`\`\`
`;

const prep = `---
title: "Session 99 - Prep"
type: Prep
summary: "The next Session."
sources: []
date: ""
revealed: ""
---

## Session question

- **Session question.** Will the door open?
- **Party at.** The door.
- **Length.** Two hours.

## Scene Chart

| Scene | Kind | Minutes |
| --- | --- | --- |
| The door | Hook | 30 |

## Links

\`\`\`base
filters:
  and:
    - file.inFolder(this.file.folder)
\`\`\`
`;

describe("minimal templates: all-layer acceptance in a temp vault copy", () => {
	it("passes a World-free Item with only frontmatter, Properties and Links", async () => {
		const dir = await copyFixture("clean");
		const path = join(dir, "wiki/Items/brass-key.md");
		await mkdir(join(dir, "wiki/Items"), { recursive: true });
		await writeFile(path, item);
		const result = await cf(
			["check", path, "--json", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates],
			dir,
		);
		const report = JSON.parse(result.stdout) as JsonReport;
		expect(result.code, result.stdout).toBe(0);
		expect(report).toMatchObject({ ok: true, findings: [], counts: { pages: 1, findings: 0 } });
	});

	it("fails a strictly Campaign Prep at the vault root for placement", async () => {
		const dir = await copyFixture("clean");
		const path = join(dir, "wiki/root-prep.md");
		await writeFile(path, prep);
		const result = await cf(
			["check", path, "--json", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates],
			dir,
		);
		const report = JSON.parse(result.stdout) as JsonReport;
		expect(result.code, result.stdout).toBe(1);
		expect(report.ok).toBe(false);
		expect(
			findingsFor(report, "/root-prep.md")
				.filter((f) => f.layer === "placement")
				.map((f) => f.rule),
		).toEqual(["misplaced"]);
		expect(findingsFor(report, "/root-prep.md").filter((f) => f.layer === "template")).toEqual([]);
	});
});
