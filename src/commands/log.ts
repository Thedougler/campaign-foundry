import { join, relative, resolve, sep } from "node:path";
import { Command, Option } from "commander";
import { styleSnippet } from "../check/layers/style.ts";
import { UsageError } from "../check/run.ts";
import { suggest } from "../check/util.ts";
import { campaignFolders } from "../vault/indexes.ts";
import { appendLogEntry, formatEntry, isLogOp, isRealDate, LOG_OPS, today } from "../vault/log.ts";
import type { Page, Vault } from "../vault/types.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { resolveVault } from "./vault-flags.ts";

interface LogFlags {
	vault?: string;
	root?: string;
	campaign?: string;
	op?: string;
	title?: string;
	page: string[];
	stdin?: boolean;
	date?: string;
	dryRun?: boolean;
}

const collect = (value: string, previous: string[]): string[] => [...previous, value];

async function readStdin(): Promise<string> {
	const chunks: Buffer[] = [];
	for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
	return Buffer.concat(chunks).toString("utf8");
}

/** A page named on the command line: `Mara Voss`, `[[Mara Voss]]`, `shattered-sea/NPCs/Mara Voss.md` or a path from the working directory. */
function resolvePage(vault: Vault, input: string, campaignFolder: string, example: string): Page {
	const raw = input.trim().replace(/^\[\[(.*)\]\]$/, "$1");
	if (raw.includes("/") || raw.endsWith(".md")) {
		const rel = raw.endsWith(".md") ? raw : `${raw}.md`;
		const candidates = [rel.replace(/^\/+/, ""), relative(vault.dir, resolve(process.cwd(), rel)).split(sep).join("/")];
		for (const c of candidates) {
			const page = vault.pageByPath.get(c);
			if (page) return page;
		}
	} else {
		const named = vault.pages.filter((p) => p.name === raw);
		if (named.length === 1) return named[0]!;
		if (named.length > 1) {
			const here = named.filter((p) => p.path.startsWith(`${campaignFolder}/`));
			if (here.length === 1) return here[0]!;
			throw new UsageError(`More than one page is named \`${raw}\`: ${named.map((p) => p.path).join(", ")}.`, `Pass the vault path of the one you mean. ${example.replace(/--page ".*"/, `--page "${named[0]!.path}"`)}`);
		}
	}
	const closest = suggest(raw.replace(/\.md$/, "").split("/").at(-1) ?? raw, vault.pages.map((p) => p.name));
	throw new UsageError(
		`No page \`${raw}\` in the Wiki.${closest ? ` Did you mean \`${closest}\`?` : ""}`,
		`Name a page that exists, by name or vault path, and log after creating it. ${example}`,
	);
}

/** The wikilink target for a page: its name, or its vault path when another page shares the name. */
function linkTarget(vault: Vault, page: Page): string {
	return vault.pages.filter((p) => p.name === page.name).length === 1 ? page.name : page.path.replace(/\.md$/, "");
}

export function logCommand(): Command {
	return new Command("log")
		.description("Append an entry to a Campaign folder's log.md: what the Agent did, and the pages it touched. Rotates yearly. Exits 0 done, 2 usage error.")
		.option("--campaign <Campaign>", "the Campaign whose folder's log.md to append to, by the Campaign's name (required)")
		.addOption(new Option("--op <op>", `the operation: ${LOG_OPS.join(", ")} (required)`))
		.option("--title <Title>", "one line saying what was done, e.g. a Session or Raw file name (required; the entry runs through the log gate's Vale rules before writing, and a failing title is refused with its findings, while a semicolon or trailing punctuation is refused outright)")
		.addOption(new Option("--page <page>", "a page touched: name or vault path; repeat for several").argParser(collect).default([] as string[], "none"))
		.option("--stdin", "also read page names from stdin, one per line")
		.option("--date <YYYY-MM-DD>", "the entry's real-world date (default: today)")
		.option("--vault <dir>", "the Wiki folder (default: <root>/wiki)")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.option("--dry-run", "print the entry and any rotation without writing")
		.addHelpText(
			"after",
			`
Entry written:
  ## [YYYY-MM-DD] <op> | <Title>
  (blank line)
  - [[Page]]           one bullet per page touched
  Entries are separated by a blank line. log.md is created if absent.

Title:
  One line, gate-clean by construction: before anything is written, the entry
  runs through the same Vale rules the page gate applies to log.md, and a
  title with a finding is refused with each finding's rule, message and fix.
  A semicolon and trailing punctuation are refused outright. A colon inside
  the title is fine.

Rotation:
  If the last entry in log.md is from an earlier year than the new one, log.md is first renamed to
  log-<that year>.md and a fresh log.md is started.

Retries:
  Repeating the last entry (same date, op, title and pages) changes nothing and prints "already logged".

Exit codes:
  0  logged, or already logged    2  usage error (nothing written)

Examples:
  cf log --campaign "Shattered Sea" --op ingest --title "Session 3 transcript" --page "Session 3 - Recap" --page "Mara Voss"
  cf log --campaign "Shattered Sea" --op prep --title "Session 4 Prep" --page "Session 4 - Prep"
  printf 'Mara Voss\nOrsa\n' | cf log --campaign "Shattered Sea" --op audit --title "Link sweep" --stdin
  cf log --campaign "Shattered Sea" --op query --title "Who holds the bridge" --page "Ravenhold" --dry-run`,
		)
		.action(async (flags: LogFlags) => {
			const { root, vault: vaultDir } = resolveVault(flags, "log");
			const vault = buildVault(vaultDir, await readVaultFiles(vaultDir));
			const folders = campaignFolders(vault);
			const names = [...folders.keys()];
			const campaign = flags.campaign ?? "<Campaign>";
			const example = `cf log --campaign "${campaign}" --op prep --title "Session 2 Prep" --page "Session 2 - Prep"`;
			const fail = (message: string, hint: string = example): never => {
				throw new UsageError(message, hint);
			};

			if (!flags.campaign) fail("No --campaign given.", `Campaigns here: ${names.join(", ") || "none"}. ${example}`);
			if (!folders.has(flags.campaign!)) {
				const closest = suggest(flags.campaign!, names);
				fail(`No Campaign \`${flags.campaign}\`.${closest ? ` Did you mean \`${closest}\`?` : ""}`, `Campaigns here: ${names.join(", ") || "none"}. ${example}`);
			}
			const folder = folders.get(flags.campaign!)!;
			if (!flags.op) fail("No --op given.", `--op is one of ${LOG_OPS.join(", ")}. ${example}`);
			if (!isLogOp(flags.op!)) fail(`Unknown --op \`${flags.op}\`.`, `--op is one of ${LOG_OPS.join(", ")}. ${example}`);
			const title = (flags.title ?? "").trim();
			if (title === "") fail("No --title given.", `--title is one line saying what was done. ${example}`);
			if (/[\r\n]/.test(title)) fail("--title must be one line.", example);
			// A semicolon and trailing heading punctuation are refused outright: the Vale rules cannot see them on a
			// bare entry (SemicolonUsage only fires before a clause-final full stop; MD026 is markdownlint, not Vale),
			// so the title would slip past the snippet check below and fail the next `cf check` on log.md.
			if (title.includes(";")) fail("The --title holds `;`, which the page gate fails on log.md (`ai-tells.SemicolonUsage`).", `Replace the semicolon with a comma or a full stop. ${example}`);
			const trailing = /[.,;:!]$/.exec(title)?.[0];
			if (trailing) fail(`The --title ends with \`${trailing}\`, which the page gate fails on a log heading (markdownlint MD026).`, `Drop the trailing punctuation. ${example}`);
			const date = flags.date ?? today();
			if (!isRealDate(date)) fail(`--date \`${date}\` is not a real YYYY-MM-DD date.`, `${example} --date 2026-02-01`);

			const pageNames = [...flags.page, ...(flags.stdin ? (await readStdin()).split("\n") : [])].map((n) => n.trim()).filter((n) => n !== "");
			if (pageNames.length === 0) fail("No pages given: an entry lists each page touched.", `Pass --page once per page, or --stdin with one name per line. ${example}`);
			const pages: string[] = [];
			for (const name of pageNames) {
				const target = linkTarget(vault, resolvePage(vault, name, folder, example));
				if (!pages.includes(target)) pages.push(target);
			}

			const entry = { date, op: flags.op!, title, pages };
			// The gate fails Vale findings on log.md, so the entry is checked before it is written, through the same
			// Vale invocation the style layer runs: the command cannot author text its own gate rejects. Only errors
			// fail the gate, so only errors refuse here. --dry-run refuses too: it must not print an entry that
			// would be refused.
			const gateFindings = (await styleSnippet(vault, root, `${folder}/log.md`, formatEntry(entry))).filter((f) => f.severity === "error");
			if (gateFindings.length > 0) {
				fail(
					`The ${flags.op} entry fails the log gate on log.md, so nothing was written: ${gateFindings.map((f) => f.rule).join(", ")}.`,
					[...gateFindings.map((f) => [`  ${f.rule}: ${f.message}${f.match === "" ? "" : ` matched \`${f.match}\``}`, `    fix: ${f.hint}`].join("\n")), example].join("\n"),
				);
			}
			const show = (path: string): string => relative(process.cwd(), join(vaultDir, path)).split(sep).join("/");
			const result = await appendLogEntry(vaultDir, folder, entry, { dryRun: flags.dryRun ?? false, show, example });
			if (result.status === "error") throw new UsageError(result.message, result.hint);
			if (result.status === "already-logged") {
				process.stdout.write(`already logged  ${show(result.path)}: ${formatEntry(entry).split("\n")[0]}\n`);
				return;
			}
			const out: string[] = [];
			if (result.rotated) out.push(`${flags.dryRun ? "would rotate" : "rotated"}  ${show(result.rotated.from)} -> ${show(result.rotated.to)}`);
			out.push(`${flags.dryRun ? "would log" : "logged"}  ${show(result.path)}`, formatEntry(entry));
			process.stdout.write(`${out.join("\n")}\n`);
		});
}
