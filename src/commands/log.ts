import { join, relative, resolve, sep } from "node:path";
import { Command, Option } from "commander";
import { UsageError } from "../check/run.ts";
import { suggest } from "../check/util.ts";
import { worldsOf } from "../vault/indexes.ts";
import { appendLogEntry, formatEntry, isLogOp, isRealDate, LOG_OPS, today } from "../vault/log.ts";
import type { Page, Vault } from "../vault/types.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { resolveVault } from "./vault-flags.ts";

interface LogFlags {
	vault?: string;
	root?: string;
	world?: string;
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

/** A page named on the command line: `Mara Voss`, `[[Mara Voss]]`, `Aldermoor/NPCs/Mara Voss.md` or a path from the working directory. */
function resolvePage(vault: Vault, input: string, world: string, example: string): Page {
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
			const here = named.filter((p) => p.path.startsWith(`${world}/`));
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
		.description("Append an entry to a World's log.md: what the Agent did, and the pages it touched. Rotates yearly. Exits 0 done, 2 usage error.")
		.option("--world <World>", "the World whose log.md to append to (required)")
		.addOption(new Option("--op <op>", `the operation: ${LOG_OPS.join(", ")} (required)`))
		.option("--title <Title>", "one line saying what was done, e.g. a Session or Raw file name (required)")
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

Rotation:
  If the last entry in log.md is from an earlier year than the new one, log.md is first renamed to
  log-<that year>.md and a fresh log.md is started.

Retries:
  Repeating the last entry (same date, op, title and pages) changes nothing and prints "already logged".

Exit codes:
  0  logged, or already logged    2  usage error (nothing written)

Examples:
  cf log --world Aldermoor --op ingest --title "Session 3 transcript" --page "Session 3 - Recap" --page "Mara Voss"
  cf log --world Aldermoor --op prep --title "Session 4 Prep" --page "Session 4 - Prep"
  printf 'Mara Voss\nOrsa\n' | cf log --world Aldermoor --op audit --title "Link sweep" --stdin
  cf log --world Aldermoor --op query --title "Who holds the bridge" --page "Ravenhold" --dry-run`,
		)
		.action(async (flags: LogFlags) => {
			const { vault: vaultDir } = resolveVault(flags, "log");
			const vault = buildVault(vaultDir, await readVaultFiles(vaultDir));
			const worlds = worldsOf(vault).map((w) => w.name);
			const world = flags.world ?? worlds[0] ?? "<World>";
			const example = `cf log --world ${world} --op prep --title "Session 2 Prep" --page "Session 2 - Prep"`;
			const fail = (message: string, hint: string = example): never => {
				throw new UsageError(message, hint);
			};

			if (!flags.world) fail("No --world given.", `Worlds here: ${worlds.join(", ") || "none"}. ${example}`);
			if (!worlds.includes(flags.world!)) {
				const closest = suggest(flags.world!, worlds);
				fail(`No World \`${flags.world}\`.${closest ? ` Did you mean \`${closest}\`?` : ""}`, `Worlds here: ${worlds.join(", ") || "none"}. ${example}`);
			}
			if (!flags.op) fail("No --op given.", `--op is one of ${LOG_OPS.join(", ")}. ${example}`);
			if (!isLogOp(flags.op!)) fail(`Unknown --op \`${flags.op}\`.`, `--op is one of ${LOG_OPS.join(", ")}. ${example}`);
			const title = (flags.title ?? "").trim();
			if (title === "") fail("No --title given.", `--title is one line saying what was done. ${example}`);
			if (/[\r\n]/.test(title)) fail("--title must be one line.", example);
			const date = flags.date ?? today();
			if (!isRealDate(date)) fail(`--date \`${date}\` is not a real YYYY-MM-DD date.`, `${example} --date 2026-02-01`);

			const names = [...flags.page, ...(flags.stdin ? (await readStdin()).split("\n") : [])].map((n) => n.trim()).filter((n) => n !== "");
			if (names.length === 0) fail("No pages given: an entry lists each page touched.", `Pass --page once per page, or --stdin with one name per line. ${example}`);
			const pages: string[] = [];
			for (const name of names) {
				const target = linkTarget(vault, resolvePage(vault, name, flags.world!, example));
				if (!pages.includes(target)) pages.push(target);
			}

			const entry = { date, op: flags.op!, title, pages };
			const show = (path: string): string => relative(process.cwd(), join(vaultDir, path)).split(sep).join("/");
			const result = await appendLogEntry(vaultDir, flags.world!, entry, { dryRun: flags.dryRun ?? false, show, example });
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
