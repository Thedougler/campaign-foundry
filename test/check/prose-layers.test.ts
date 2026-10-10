import { execFile } from "node:child_process";
import { chmod, mkdir, readdir, readFile, realpath, stat, writeFile } from "node:fs/promises";
import { dirname, join, sep } from "node:path";
import { promisify } from "node:util";
import { beforeAll, describe, expect, it } from "vitest";
import { cf, cfWithEnv, checkFixture, copyFixture, findingsFor, fixtures, realTemplates, repoRoot, type JsonFinding, type JsonReport } from "./helpers.ts";

const A = "Aldermoor";
const LAYERS = ["markdownlint", "remark-lint", "spelling", "grammar", "style"] as const;
type Layer = (typeof LAYERS)[number];

const reports = {} as Record<Layer, JsonReport>;
const exits = {} as Record<Layer, number>;
let clean: JsonReport;

beforeAll(async () => {
	await Promise.all(
		LAYERS.map(async (layer) => {
			const result = await checkFixture("prose", ["--layer", layer]);
			reports[layer] = result.report;
			exits[layer] = result.code;
		}),
	);
	clean = (await checkFixture("clean", LAYERS.flatMap((l) => ["--layer", l]))).report;
}, 60000);

const on = (layer: Layer, page: string): JsonFinding[] => findingsFor(reports[layer], `${A}/${page}.md`);

describe.each(LAYERS)("%s layer", (layer) => {
	it("fails check on a page seeded for it", () => {
		expect(exits[layer]).toBe(1);
		expect(reports[layer].findings.length).toBeGreaterThan(0);
		expect(reports[layer].findings.every((f) => f.layer === layer)).toBe(true);
		expect(reports[layer].findings.every((f) => f.hint.length > 0)).toBe(true);
	});

	it("passes the clean page, which has bad text only in frontmatter, comments, code and embeds", () => {
		expect(on(layer, "NPCs/Good Prose")).toEqual([]);
		expect(on(layer, "Locations/Zorvath Keep")).toEqual([]);
	});

	it("skips generated index.md pages", () => {
		expect(on(layer, "index")).toEqual([]);
	});
});

describe("markdownlint layer", () => {
	it("flags trailing spaces and extra blank lines on their lines, with the rule id", () => {
		const found = on("markdownlint", "NPCs/Bad Markdown");
		expect(found.map((f) => [f.rule, f.line])).toEqual(expect.arrayContaining([["MD009", 11], ["MD012", 14]]));
		expect(found[0]?.hint).toMatch(/--fix/);
	});

	it("does not fight Obsidian syntax", () => {
		expect(on("markdownlint", "NPCs/Good Prose")).toEqual([]);
	});

	it("--fix applies markdownlint's own fixes and leaves a clean vault alone", async () => {
		const dir = await copyFixture("prose");
		const args = ["check", "--json", "--layer", "markdownlint", "--fix", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates];
		const result = await cf(args, dir);
		const report = JSON.parse(result.stdout) as JsonReport;
		expect(report.fixes.some((f) => f.layer === "markdownlint" && f.path.endsWith("Bad Markdown.md"))).toBe(true);
		const fixed = await readFile(join(dir, "wiki", A, "NPCs/Bad Markdown.md"), "utf8");
		expect(fixed).not.toMatch(/ +$/m);
		expect(fixed).not.toMatch(/\n\n\n/);
		const again = JSON.parse((await cf(args, dir)).stdout) as JsonReport;
		expect(again.fixes).toEqual([]);
		expect(findingsFor(again, `${A}/NPCs/Bad Markdown.md`)).toEqual([]);
	});
});

describe("remark-lint layer", () => {
	it("flags a lazy blockquote line and a bare URL", () => {
		const rules = on("remark-lint", "NPCs/Bad Remark").map((f) => f.rule);
		expect(rules).toEqual(expect.arrayContaining(["no-blockquote-without-marker", "no-literal-urls"]));
	});

	it("reads wikilinks, callouts, embeds and block ids as ordinary text", () => {
		expect(on("remark-lint", "NPCs/Good Prose")).toEqual([]);
	});
});

describe("spelling layer", () => {
	it("flags American and misspelt words on their lines", () => {
		const found = on("spelling", "NPCs/Bad Spelling");
		expect(found.map((f) => [f.message.match(/`([^`]+)`/)?.[1], f.line])).toEqual(
			expect.arrayContaining([["harbormaster", 11], ["recieved", 11]]),
		);
		expect(found.find((f) => f.message.includes("harbormaster"))?.hint).toContain("harbourmaster");
	});

	it("passes in-world names taken from page names, and British spellings", () => {
		const words = on("spelling", "NPCs/Bad Spelling").map((f) => f.message);
		expect(words.some((m) => /Zorvath/.test(m))).toBe(false);
		expect(on("spelling", "NPCs/Good Prose")).toEqual([]);
	});

	it("checks log.md", () => {
		expect(on("spelling", "log").map((f) => f.line)).toEqual([3]);
	});
});

describe("grammar layer", () => {
	it("flags agreement, repeated words and a/an on their lines", () => {
		const found = on("grammar", "NPCs/Bad Grammar");
		const lines = found.map((f) => f.line);
		expect(lines).toEqual(expect.arrayContaining([11, 12]));
		expect(found.map((f) => f.rule)).toEqual(expect.arrayContaining(["RepeatedWords", "AnA"]));
	});

	it("does not run Harper's spell checker: the spelling layer owns spelling", () => {
		expect(reports.grammar.findings.some((f) => f.rule === "SpellCheck")).toBe(false);
		expect(on("grammar", "NPCs/Bad Spelling")).toEqual([]);
	});

	it("does not merge a possessive or preposition into the page name beside it", () => {
		expect(on("grammar", "NPCs/Good Prose")).toEqual([]);
	});

	it("does not read a linked page name as the DM's wording", () => {
		expect(on("grammar", "log").filter((f) => f.line === 7)).toEqual([]);
	});

	it("never suggests an en or em dash, which the style layer fails", async () => {
		const dir = await copyFixture("prose");
		await writeFile(join(dir, "wiki", A, "NPCs", "Range.md"), "The goblins arrive in groups of 5-9 at dusk.\n");
		const args = ["check", "--json", "--layer", "grammar", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates];
		const found = findingsFor(JSON.parse((await cf(args, dir)).stdout) as JsonReport, `${A}/NPCs/Range.md`);
		expect(found.length).toBeGreaterThan(0);
		for (const finding of found) expect(finding.hint).not.toMatch(/[\u2013\u2014]/u);
		expect(found.map((f) => f.hint).join(" ")).toContain("3 to 5");
	});

	it("reads a callout title as its own sentence, not run into the first line of the body", async () => {
		const dir = await copyFixture("prose");
		await writeFile(join(dir, "wiki", A, "NPCs", "Recap.md"), "> [!narration] Previously on\n> On the quay the crew waited for the tide.\n");
		const args = ["check", "--json", "--layer", "grammar", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates];
		const found = findingsFor(JSON.parse((await cf(args, dir)).stdout) as JsonReport, `${A}/NPCs/Recap.md`);
		expect(found.map((f) => f.rule)).not.toContain("RepeatedWords");
	});
});

describe("style layer", () => {
	it("enforces the Narration hard lines inside a narration callout only", () => {
		const found = on("style", "NPCs/Bad Style");
		const narration = found.filter((f) => f.line === 14 && f.rule.startsWith("Narration."));
		expect(narration.map((f) => f.rule)).toEqual(expect.arrayContaining(["Narration.NoSemicolon", "Narration.NoEmDash", "Narration.NoColon"]));
		expect(narration.every((f) => f.severity === "error")).toBe(true);
		expect(narration.every((f) => /theatre-of-the-mind.*(?:Clean prose|Speakable)|(?:Clean prose|Speakable).*theatre-of-the-mind/.test(f.hint))).toBe(true);
	});

	it("leaves compass words, counts and punctuation alone outside a callout: those are the DM's notes", () => {
		const notes = on("style", "NPCs/Bad Style").filter((f) => f.line === 20);
		expect(notes.filter((f) => f.rule.startsWith("Narration."))).toEqual([]);
	});

	it("leaves non-narration callouts outside Narration rules", () => {
		const notes = on("style", "NPCs/Bad Style").filter((f) => f.line === 23);
		expect(notes.filter((f) => f.rule.startsWith("Narration."))).toEqual([]);
	});

	it("flags ai-tells prose", () => {
		const found = on("style", "NPCs/Bad Style");
		const aiTells = found.filter((f) => f.rule.startsWith("ai-tells.") && f.line === 18);
		expect(aiTells.length).toBeGreaterThan(0);
		expect(aiTells.every((f) => f.severity === "error")).toBe(true);
	});

	it("reads a page name as its kind: a ship that carried passengers is literal, an abstract subject still fails", () => {
		const carries = on("style", "Vehicles/Saltwright").filter((f) => f.rule === "ai-tells.FigurativeCarries");
		expect(carries.map((f) => f.line)).toEqual([16]);
	});

	it("never advises disabling a rule: the DM alone switches one off", () => {
		const found = on("style", "Vehicles/Saltwright").filter((f) => f.rule === "ai-tells.FigurativeCarries");
		expect(found.length).toBeGreaterThan(0);
		expect(found.every((f) => !/disable/i.test(f.message))).toBe(true);
	});

	it.each([
		["JudgementWords", 14, "Evidence"],
		["MechanicalTerms", 15, "Evidence"],
		["PcInterior", 18, "Hard line 1"],
		["StockTells", 19, "People"],
	] as const)("%s warns on the dirty twin and stays silent on the clean twin", (name, line, item) => {
		const rule = `Narration.${name}`;
		const found = on("style", "NPCs/Dirty Narration").filter((f) => f.rule === rule);
		expect(found.length).toBeGreaterThan(0);
		expect(found.every((f) => f.line === line && f.severity === "warning")).toBe(true);
		expect(found.every((f) => f.hint.includes("theatre-of-the-mind") && f.hint.includes(item) && f.hint.includes("becomes"))).toBe(true);
		expect(on("style", "NPCs/Clean Narration").filter((f) => f.rule === rule)).toEqual([]);
	});

	it("warns on a write-good hit inside a narration callout", () => {
		const found = on("style", "NPCs/Craft Narration").filter((f) => f.rule.startsWith("write-good."));
		expect(found.length).toBeGreaterThan(0);
		expect(found.every((f) => f.line === 14 && f.severity === "warning")).toBe(true);
	});

	it("holds craft checks to narration callouts: the same words pass outside them and inside quotes", () => {
		const craft = on("style", "NPCs/Craft Narration").filter((f) => f.rule.startsWith("write-good.") || f.rule.startsWith("proselint."));
		expect(craft.length).toBeGreaterThan(0);
		expect(craft.every((f) => f.severity === "warning")).toBe(true);
		expect([...new Set(craft.map((f) => f.line))]).toEqual([14]);
	});

	it.each([
		["error", "error", 1, false],
		["warning", "warning", 0, true],
		["suggestion", "warning", 0, true],
	] as const)("maps Vale %s severity to %s and the gate result", async (valeSeverity, severity, code, ok) => {
		const dir = await copyFixture("clean");
		const binDir = join(dir, "test-bin");
		const vale = join(binDir, "vale");
		await mkdir(binDir, { recursive: true });
		await writeFile(vale, [
			"#!/bin/sh",
			"# The narration craft pass reads .vale-narration.ini; this fake reports only the page pass.",
			'for arg do case "$arg" in *.vale-narration.ini) exit 0 ;; esac; done',
			"for arg do input=$arg; done",
			'file=$(find "$input" -type f -name "*.md" -print -quit)',
			`printf '{"%s":[{"Check":"Narration.StockTells","Message":"Give a physical cue.","Line":1,"Match":"eyes widen","Severity":"${valeSeverity}"}]}\\n' "$file"`,
			"",
		].join("\n"));
		await chmod(vale, 0o755);
		// Spawned: the test shims a child's PATH, which the in-process runner does not isolate per call here.
		const result = await promisify(execFile)(
			process.execPath,
			[join(repoRoot, "src/cli.ts"), "check", "--json", "--layer", "style", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates],
			{ cwd: dir, env: { ...process.env, PATH: `${binDir}${process.platform === "win32" ? ";" : ":"}${process.env.PATH ?? ""}` } },
		).then(
			({ stdout }) => ({ code: 0, stdout }),
			(error: { code: number; stdout: string }) => ({ code: error.code, stdout: error.stdout }),
		);
		const report = JSON.parse(result.stdout) as JsonReport;
		expect(result.code).toBe(code);
		expect(report.ok).toBe(ok);
		expect(report.findings).toHaveLength(1);
		expect(report.findings[0]?.severity).toBe(severity);
	});

});

describe("style layer setup", () => {
	it("exits 2 with an install hint when Vale is not on the PATH", async () => {
		const root = join(fixtures, "clean");
		const result = await cfWithEnv(
			["check", "--layer", "style", "--vault", join(root, "wiki"), "--root", root, "--templates", realTemplates],
			{ PATH: dirname(process.execPath) },
			root,
		);
		expect(result.code).toBe(2);
		expect(result.stderr).toMatch(/Vale is not installed[\s\S]*bun run setup[\s\S]*cf check/);
	});
});

describe("prose layer scratch paths", () => {
	it("keeps caches and Vale input under the invocation root", async () => {
		const dir = await copyFixture("clean");
		const cacheDir = join(dir, ".cache", "check");
		const binDir = join(dir, "test-bin");
		const capture = join(dir, "vale-input-path.txt");
		const vale = join(binDir, "vale");
		await mkdir(binDir, { recursive: true });
		await writeFile(
			vale,
			[
				"#!/bin/sh",
				"for arg do input=$arg; done",
				'[ -d "$input" ] || exit 10',
				'find "$input" -type f -print -quit | grep -q . || exit 11',
				'printf "%s" "$input" > "$CF_VALE_CAPTURE"',
				"printf '{}\\n'",
				"",
			].join("\n"),
		);
		await chmod(vale, 0o755);

		const repoCache = join(repoRoot, ".cache", "check");
		// Names only: other test workers share this real cache and legitimately rewrite their entries,
		// so the invariant this test protects is that the run adds none of its own.
		const snapshotRepoCache = async (): Promise<string[] | null> => {
			try {
				return (await readdir(repoCache)).sort();
			} catch (error) {
				if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") return null;
				throw error;
			}
		};
		const before = await snapshotRepoCache();
		// Spawned: the test shims a child's PATH and hands Vale an env var only the stub reads.
		await promisify(execFile)(
			process.execPath,
			[
				join(repoRoot, "src/cli.ts"),
				"check",
				"--json",
				"--layer", "spelling",
				"--layer", "grammar",
				"--layer", "style",
				"--vault", join(dir, "wiki"),
				"--root", dir,
				"--templates", realTemplates,
			],
			{
				cwd: dir,
				env: {
					...process.env,
					PATH: `${binDir}${process.platform === "win32" ? ";" : ":"}${process.env.PATH ?? ""}`,
					CF_VALE_CAPTURE: capture,
				},
			},
		);

		const entries = await readdir(cacheDir);
		expect(entries).toEqual(expect.arrayContaining(["grammar.json", "spelling.json"]));
		expect(entries.filter((name) => name.startsWith("vale-"))).toEqual([]);
		const valeInput = await readFile(capture, "utf8");
		expect(valeInput.startsWith(`${await realpath(cacheDir)}${sep}vale-`)).toBe(true);
		const after = await snapshotRepoCache();
		expect(after === null ? [] : after.filter((name) => before === null || !before.includes(name))).toEqual([]);
	});
});

describe("the clean fixture vault", () => {
	it("passes every prose layer", () => {
		expect(clean.findings).toEqual([]);
	});
});

describe("prose layers on a page written with the fixture text", () => {
	it("re-reads a page after --fix without drift", async () => {
		const dir = await copyFixture("prose");
		const file = join(dir, "wiki", A, "NPCs/Good Prose.md");
		const before = await readFile(file, "utf8");
		await writeFile(file, before);
		const result = await cf(["check", "--json", "--fix", "--layer", "markdownlint", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates], dir);
		const report = JSON.parse(result.stdout) as JsonReport;
		expect(report.fixes.some((f) => f.path.endsWith("Good Prose.md"))).toBe(false);
		expect(await readFile(file, "utf8")).toBe(before);
	});
});
