import { existsSync, readFileSync, statSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import { Command, Option } from "commander";
import { UsageError } from "../check/run.ts";
import { suggest } from "../check/util.ts";
import { analyzeCallout, type Band, type CalloutReport, type SourceWords } from "../narration/analyze.ts";
import { calloutLines, linkedPages, pageWords } from "../narration/sources.ts";
import { parsePage } from "../vault/parse.ts";
import type { Callout, Page, Vault } from "../vault/types.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { resolveVault } from "./vault-flags.ts";

interface NarrationFlags {
	callout?: string;
	source: string[];
	old?: string;
	band?: string;
	json?: boolean;
	vault?: string;
	root?: string;
}

const collect = (value: string, previous: string[]): string[] => [...previous, value];
const EXAMPLE = 'cf narration "Session 2 - Low Water at the Chapel" --callout Opening --old /tmp/old-opening.md --band 80-120';

function parseBand(input: string): Band {
	const m = /^\s*(\d+)\s*[-–]\s*(\d+)\s*$/.exec(input);
	const min = Number(m?.[1]);
	const max = Number(m?.[2]);
	if (!m || min > max) throw new UsageError(`--band \`${input}\` is not a word range.`, "Give it as <min>-<max> words, e.g. --band 80-120");
	return { min, max };
}

/** A page named on the command line: its name, its vault path, or a path from the working directory. */
function findPage(vault: Vault, input: string): Page {
	const raw = input.trim().replace(/^\[\[(.*)\]\]$/, "$1");
	if (raw.includes("/") || raw.endsWith(".md")) {
		const rel = raw.endsWith(".md") ? raw : `${raw}.md`;
		for (const candidate of [rel.replace(/^\/+/, ""), relative(vault.dir, resolve(process.cwd(), rel)).split(sep).join("/")]) {
			const page = vault.pageByPath.get(candidate);
			if (page) return page;
		}
	} else {
		const named = vault.pages.filter((p) => p.name === raw);
		if (named.length === 1) return named[0]!;
		if (named.length > 1) {
			throw new UsageError(`More than one page is named \`${raw}\`: ${named.map((p) => p.path).join(", ")}.`, `Pass the vault path of the one you mean. cf narration "${named[0]!.path}"`);
		}
	}
	const closest = suggest(raw.replace(/\.md$/, "").split("/").at(-1) ?? raw, vault.pages.map((p) => p.name));
	throw new UsageError(`No page \`${raw}\` in the Wiki.${closest ? ` Did you mean \`${closest}\`?` : ""}`, `Name a page that exists, by name or vault path. ${EXAMPLE}`);
}

function fileWords(path: string, flag: string): SourceWords {
	const file = resolve(process.cwd(), path);
	if (!existsSync(file) || !statSync(file).isFile()) throw new UsageError(`${flag} file \`${path}\` does not exist.`, `Pass a file to compare against. ${EXAMPLE}`);
	return pageWords(parsePage(path, readFileSync(file, "utf8")));
}

function pickCallouts(page: Page, title: string | undefined): Callout[] {
	const all = page.callouts.filter((c) => c.type === "narration");
	if (all.length === 0) throw new UsageError(`Page \`${page.path}\` has no [!narration] callout.`, "Check a page whose Narration slot is written, e.g. a Scene page or an NPC's First look.");
	if (title === undefined) return all;
	const wanted = all.filter((c) => c.title.trim().toLowerCase() === title.trim().toLowerCase());
	if (wanted.length === 0) {
		throw new UsageError(`No [!narration] callout titled \`${title}\` on \`${page.path}\`. Callouts here: ${all.map((c) => `\`${c.title}\``).join(", ")}.`, `cf narration "${page.name}" --callout "${all[0]!.title}"`);
	}
	return wanted;
}

interface CalloutResult extends CalloutReport {
	title: string;
	line: number;
}

function formatHuman(pagePath: string, results: CalloutResult[]): string {
	const out: string[] = [];
	for (const r of results) {
		out.push(`${pagePath}:${r.line}  [!narration] ${r.title}`);
		out.push(`  words: ${r.words}`);
		out.push(`  sentences (narration): ${r.sentences.narration}, spoken lines: ${r.sentences.spoken}`);
		if (r.band) out.push(`  band ${r.band.min}-${r.band.max}: ${r.band.pass ? "pass" : "FAIL"}`);
		out.push(`  fresh starts: ${r.freshStarts.starts.join(" | ") || "none"}`);
		out.push(`  punctuation: em dashes ${r.punctuation.emDashes}, semicolons ${r.punctuation.semicolons}, colons ${r.punctuation.colons}`);
		if (r.findings.length === 0) out.push("  ok: no findings");
		for (const f of r.findings) {
			out.push(`  ${f.severity === "error" ? "FAIL" : "warn"}  ${f.rule}  ${f.message}`);
			if (f.rule === "echo") {
				for (const e of r.echo) {
					out.push(`    "${e.text}"`);
					for (const o of e.occurrences) out.push(`      in ${o.source}:${o.line}`);
				}
			}
			out.push(`    fix: ${f.hint}`);
		}
	}
	const errors = results.flatMap((r) => r.findings).filter((f) => f.severity === "error").length;
	const warnings = results.flatMap((r) => r.findings).filter((f) => f.severity === "warning").length;
	out.push(`${errors === 0 ? "ok" : "FAIL"}: ${errors} findings, ${warnings} warnings, ${results.length} ${results.length === 1 ? "callout" : "callouts"}`);
	return out.join("\n");
}

export function narrationCommand(): Command {
	return new Command("narration")
		.description("Check a Narration draft before filing it: length, echo of the sources, banned punctuation, compass and foot counts, list-like starts. Exits 0 clean, 1 findings, 2 usage error.")
		.argument("<page>", "the page holding the [!narration] callout: its name, vault path, or a path from here")
		.option("--callout <title>", "check only the callout with this title (default: every [!narration] callout on the page)")
		.addOption(new Option("--source <file>", "a file the callout must not echo; repeat for several (default: the page minus the callout, and every page it links to)").argParser(collect).default([] as string[], "the page and its linked pages"))
		.option("--old <file>", "the block being replaced: a file holding it, checked for echo as well")
		.option("--band <min>-<max>", "the slot's word band from the length table, e.g. 80-120")
		.option("--json", "print machine-readable JSON instead of text")
		.option("--vault <dir>", "the Wiki folder (default: <root>/wiki)")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.addHelpText(
			"after",
			`
Reports, per callout:
  words, and sentences (narration): N, spoken lines: M     spoken lines are the text in double quotes
  band          pass or fail against --band, in words
  echo          each run of 4+ words shared with a source, and where; quoted speech is exempt, and so is
                a run of nothing but stop-words
  punctuation   em dashes, semicolons, colons
  compass       north, southeast and the rest of the Narration Vale style's list
  foot and mile counts   "forty feet", "2 miles"; the same pattern the Vale style uses
  fresh starts  each sentence's first two words; warns when three or more in a row open with You, a
                preposition and its place, or a bare noun phrase (the list pattern)
  judgement words   abandoned, ancient, mysterious, ominous, eerie, strange, bustling, dangerous, angry,
                afraid, sense of, can't help but (quoted speech is exempt)

Findings:
  Hard (exit 1): echo, punctuation, compass, foot and mile counts, band.
  Soft (a warning, exit 0): fresh starts, judgement words.

Sources:
  With no --source, the page itself (minus the callout being checked) and every page it links to, in
  its frontmatter and body. --source replaces that default; --old adds the block being rewritten.

Exit codes:
  0  no hard finding    1  hard findings    2  usage error

Examples:
  cf narration "Ilse Corran"
  cf narration "Ilse Corran" --callout "First look" --band 60-100
  cf narration "Session 2 - Low Water at the Chapel" --callout Opening --band 80-120 --old /tmp/old-opening.md
  cf narration Saltwick --source wiki/Lowtide/Locations/The\\ Brack.md --json
  cf narration "Ilse Corran" --vault test/fixtures/vault --root test/fixtures`,
		)
		.action((pageInput: string, flags: NarrationFlags) => {
			const { vault: vaultDir } = resolveVault(flags, "narration");
			return readVaultFiles(vaultDir).then((files) => {
				const vault = buildVault(vaultDir, files);
				const page = findPage(vault, pageInput);
				const callouts = pickCallouts(page, flags.callout);
				const band = flags.band === undefined ? undefined : parseBand(flags.band);
				const explicit = flags.source.map((s) => fileWords(s, "--source"));
				const old = flags.old === undefined ? [] : [fileWords(flags.old, "--old")];
				const linked = explicit.length > 0 ? [] : linkedPages(vault, page).map((p) => pageWords(p));

				const results: CalloutResult[] = callouts.map((callout) => {
					const own = explicit.length > 0 ? [] : [pageWords(page, calloutLines(page, callout))];
					const report = analyzeCallout({ body: callout.body, sources: [...explicit, ...own, ...linked, ...old], ...(band ? { band } : {}) });
					return { title: callout.title, line: callout.line, ...report };
				});
				const ok = results.every((r) => r.ok);
				process.stdout.write(`${flags.json ? JSON.stringify({ ok, page: page.path, callouts: results }, null, 2) : formatHuman(page.path, results)}\n`);
				process.exitCode = ok ? 0 : 1;
			});
		});
}
