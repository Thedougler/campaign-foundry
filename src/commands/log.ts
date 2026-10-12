import { join, relative, sep } from "node:path";
import { Command, Option } from "commander";
import { gateText, UsageError } from "../check/run.ts";
import { campaignNames } from "../vault/indexes.ts";
import { appendLogEntry, formatEntry, isLogOp, isRealDate, LOG_OPS, today } from "../vault/log.ts";
import { resolvePage } from "../vault/resolve.ts";
import type { Page, Vault } from "../vault/types.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { campaignFolderOf, CF, collect, envOptions, readInput, resolveEnv } from "./kit.ts";

interface LogFlags {
	vault?: string;
	root?: string;
	campaign?: string;
	op?: string;
	title?: string;
	page: string[];
	date?: string;
	dryRun?: boolean;
	json?: boolean;
}

/** Stable slug target and display title; qualify the path if a fixture has duplicate slugs. */
function linkTarget(vault: Vault, page: Page): string {
	const target =
		vault.pages.filter((p) => p.slug === page.slug).length === 1 ? page.slug : page.path.replace(/\.md$/, "");
	return `${target}|${page.name}`;
}

export function logCommand(): Command {
	const command = new Command("log")
		.description(
			"Append an entry to a Campaign folder's log.md: what the Agent did, and the pages it touched. Rotates yearly. Exits 0 done, 2 usage error.",
		)
		.option(
			"--campaign <Campaign>",
			"the Campaign whose folder's log.md to append to, by the Campaign's name (default: the only Campaign in the Wiki; required when there are several)",
		)
		.addOption(new Option("--op <op>", `the operation: ${LOG_OPS.join(", ")} (required)`))
		.option(
			"--title <Title>",
			"one line saying what was done, e.g. a Session or Raw file name (required; the entry runs through the log gate's Vale rules before writing, and a failing title is refused with its findings, while a semicolon or trailing punctuation is refused outright)",
		)
		.addOption(
			new Option(
				"--page <page>",
				"a page touched: name, vault-relative path or repo-relative wiki/… path; - reads the same forms from stdin, one per line; repeat for several",
			)
				.argParser(collect)
				.default([] as string[], "none"),
		)
		.option("--date <YYYY-MM-DD>", "the entry's real-world date (default: today)");
	envOptions(command);
	return command
		.option("--dry-run", "print the entry and any rotation without writing")
		.option("--json", "print {status,path,rotated,entry} JSON instead of text")
		.addHelpText(
			"after",
			`
Entry written:
  ## [YYYY-MM-DD] <op> | <Title>
  (blank line)
  - [[slug|Title]]     one bullet per page touched
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
  ${CF} log --campaign "Shattered Sea" --op ingest --title "Session 3 transcript" --page "Session 3 - Recap" --page "Mara Voss"
  ${CF} log --campaign "Shattered Sea" --op prep --title "Session 4 Prep" --page "Session 4 - Prep"
  printf 'Mara Voss\nOrsa\n' | ${CF} log --campaign "Shattered Sea" --op audit --title "Link sweep" --page -
  ${CF} log --campaign "Shattered Sea" --op query --title "Who holds the bridge" --page "Ravenhold" --dry-run`,
		)
		.action(async (flags: LogFlags) => {
			const { vault: vaultDir } = resolveEnv(flags, "log");
			const vault = buildVault(vaultDir, await readVaultFiles(vaultDir));
			const names = campaignNames(vault);
			// One Campaign in the Wiki is the answer whenever the flag is left out; several need the agent to name one.
			const campaign = flags.campaign ?? (names.length === 1 ? names[0]! : undefined);
			const example = `${CF} log --campaign "${campaign ?? "<Campaign>"}" --op prep --title "Session 2 Prep" --page "Session 2 - Prep"`;
			// The page resolver's hint names the invocation with the page that answers; with none, log after creating it.
			const pageHint = (candidate: string): string =>
				candidate ? example.replace(/--page ".*"/, `--page "${candidate}"`) : `Log after creating it. ${example}`;
			const fail = (message: string, hint: string = example): never => {
				throw new UsageError(message, hint);
			};

			if (!campaign)
				fail(
					"No --campaign given, and the Wiki holds several Campaigns.",
					`Campaigns here: ${names.join(", ") || "none"}. ${example}`,
				);
			const folder = campaignFolderOf(vault, campaign!, example);
			if (!flags.op) fail("No --op given.", `--op is one of ${LOG_OPS.join(", ")}. ${example}`);
			if (!isLogOp(flags.op!))
				fail(`Unknown --op \`${flags.op}\`.`, `--op is one of ${LOG_OPS.join(", ")}. ${example}`);
			const title = (flags.title ?? "").trim();
			if (title === "") fail("No --title given.", `--title is one line saying what was done. ${example}`);
			if (/[\r\n]/.test(title)) fail("--title must be one line.", example);
			// A semicolon and trailing heading punctuation are refused outright: the Vale rules cannot see them on a
			// bare entry (SemicolonUsage only fires before a clause-final full stop; MD026 is markdownlint, not Vale),
			// so the title would slip past the snippet check below and fail the next `check` on log.md.
			if (title.includes(";"))
				fail(
					"The --title holds `;`, which the page gate fails on log.md (`ai-tells.SemicolonUsage`).",
					`Replace the semicolon with a comma or a full stop. ${example}`,
				);
			const trailing = /[.,;:!]$/.exec(title)?.[0];
			if (trailing)
				fail(
					`The --title ends with \`${trailing}\`, which the page gate fails on a log heading (markdownlint MD026).`,
					`Drop the trailing punctuation. ${example}`,
				);
			const date = flags.date ?? today();
			if (!isRealDate(date)) fail(`--date \`${date}\` is not a real YYYY-MM-DD date.`, `${example} --date 2026-02-01`);

			const piped = flags.page.includes("-") ? (await readInput("-", example)).split("\n") : [];
			const pageNames = [...flags.page.filter((n) => n !== "-"), ...piped].map((n) => n.trim()).filter((n) => n !== "");
			if (pageNames.length === 0)
				fail(
					"No pages given: an entry lists each page touched.",
					`Pass --page once per page, or --page - with one name per line. ${example}`,
				);
			const pages: string[] = [];
			for (const name of pageNames) {
				const target = linkTarget(vault, resolvePage(vault, name, { campaignFolder: folder, hint: pageHint }));
				if (!pages.includes(target)) pages.push(target);
			}

			const entry = { date, op: flags.op!, title, pages };
			// The gate fails Vale findings on log.md, so the entry is checked before it is written, through the
			// gate's own text seam: the command cannot author text its own gate rejects. Only errors fail the
			// gate, so only errors refuse here. --dry-run refuses too: it must not print an entry that would be
			// refused.
			const gateFindings = (
				await gateText({ vault: vaultDir, cwd: process.cwd(), rel: `${folder}/log.md`, text: formatEntry(entry) })
			).filter((f) => f.severity === "error");
			if (gateFindings.length > 0) {
				fail(
					`The ${flags.op} entry fails the log gate on log.md, so nothing was written: ${formatEntry(entry).split("\n")[0]}`,
					[...gateFindings.map((f) => [`  ${f.rule}: ${f.message}`, `    fix: ${f.hint}`].join("\n")), example].join(
						"\n",
					),
				);
			}
			const show = (path: string): string => relative(process.cwd(), join(vaultDir, path)).split(sep).join("/");
			const result = await appendLogEntry(vaultDir, folder, entry, { dryRun: flags.dryRun ?? false, show, example });
			if (result.status === "error") throw new UsageError(result.message, result.hint);
			if (result.status === "already-logged") {
				if (flags.json)
					process.stdout.write(`${JSON.stringify({ status: "already-logged", path: result.path, entry }, null, 2)}\n`);
				else process.stdout.write(`already logged  ${show(result.path)}: ${formatEntry(entry).split("\n")[0]}\n`);
				return;
			}
			if (flags.json) {
				process.stdout.write(
					`${JSON.stringify({ status: "logged", dryRun: flags.dryRun ?? false, path: result.path, rotated: result.rotated ?? null, entry }, null, 2)}\n`,
				);
				return;
			}
			const out: string[] = [];
			if (result.rotated)
				out.push(
					`${flags.dryRun ? "would rotate" : "rotated"}  ${show(result.rotated.from)} -> ${show(result.rotated.to)}`,
				);
			out.push(`${flags.dryRun ? "would log" : "logged"}  ${show(result.path)}`, formatEntry(entry));
			process.stdout.write(`${out.join("\n")}\n`);
		});
}
