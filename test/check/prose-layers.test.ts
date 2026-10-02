import { execFile } from "node:child_process";
import { chmod, mkdir, readdir, readFile, realpath, stat, writeFile } from "node:fs/promises";
import { dirname, join, sep } from "node:path";
import { promisify } from "node:util";
import { beforeAll, describe, expect, it } from "vitest";
import { cf, checkFixture, copyFixture, findingsFor, fixtures, realTemplates, repoRoot, type JsonFinding, type JsonReport } from "./helpers.ts";

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
		expect(found.map((f) => [f.rule, f.line])).toEqual(expect.arrayContaining([["MD009", 10], ["MD012", 13]]));
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
			expect.arrayContaining([["harbormaster", 10], ["recieved", 10]]),
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
		expect(lines).toEqual(expect.arrayContaining([10, 11]));
		expect(found.map((f) => f.rule)).toEqual(expect.arrayContaining(["RepeatedWords", "AnA"]));
	});

	it("does not run Harper's spell checker: the spelling layer owns spelling", () => {
		expect(reports.grammar.findings.some((f) => f.rule === "SpellCheck")).toBe(false);
		expect(on("grammar", "NPCs/Bad Spelling")).toEqual([]);
	});

	it("does not merge a possessive or preposition into the page name beside it", () => {
		expect(on("grammar", "NPCs/Good Prose")).toEqual([]);
	});
});

describe("style layer", () => {
	it("enforces the Narration hard lines inside a narration callout only", () => {
		const found = on("style", "NPCs/Bad Style");
		const rules = found.filter((f) => f.line === 13).map((f) => f.rule);
		expect(rules).toEqual(expect.arrayContaining(["Narration.NoCompass", "Narration.NoSemicolon", "Narration.NoFootMileCounts", "Narration.NoEmDash"]));
	});

	it("leaves compass words, counts and punctuation alone outside a callout: those are the DM's notes", () => {
		const notes = on("style", "NPCs/Bad Style").filter((f) => f.line === 19);
		expect(notes.filter((f) => f.rule.startsWith("Narration."))).toEqual([]);
	});

	it("flags ai-tells prose", () => {
		const found = on("style", "NPCs/Bad Style");
		expect(found.some((f) => f.rule.startsWith("ai-tells.") && f.line === 17)).toBe(true);
	});

});

describe("style layer setup", () => {
	it("exits 2 with an install hint when Vale is not on the PATH", async () => {
		const root = join(fixtures, "clean");
		const bare = dirname(process.execPath);
		const run = promisify(execFile);
		const result = await run(process.execPath, [join(repoRoot, "src/cli.ts"), "check", "--layer", "style", "--vault", join(root, "wiki"), "--root", root, "--templates", realTemplates], {
			cwd: root,
			env: { ...process.env, PATH: bare },
		}).then(
			() => ({ code: 0, stderr: "" }),
			(error: unknown) => {
				if (
					error &&
					typeof error === "object" &&
					"code" in error && typeof error.code === "number" &&
					"stderr" in error && typeof error.stderr === "string"
				) {
					return { code: error.code, stderr: error.stderr };
				}
				throw error;
			},
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
		const snapshotRepoCache = async () => {
			try {
				const entries = (await readdir(repoCache)).sort();
				return await Promise.all(
					entries.map(async (name) => {
						const info = await stat(join(repoCache, name));
						return { name, modified: info.mtimeMs, size: info.size };
					}),
				);
			} catch (error) {
				if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") return null;
				throw error;
			}
		};
		const before = await snapshotRepoCache();
		await promisify(execFile)(
			process.execPath,
			[
				join(repoRoot, "src/cli.ts"),
				"check",
				"--json",
				"--layer",
				"spelling",
				"--layer",
				"grammar",
				"--layer",
				"style",
				"--vault",
				join(dir, "wiki"),
				"--root",
				dir,
				"--templates",
				realTemplates,
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
		expect(await snapshotRepoCache()).toEqual(before);
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
