import { relative, resolve, sep } from "node:path";
import { Command } from "commander";
import { UsageError } from "../check/run.ts";
import { suggest } from "../check/util.ts";
import type { Callout, Page, Vault } from "../vault/types.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { resolveVault } from "./vault-flags.ts";

const EXAMPLE = 'cf eval extract "Ilse Corran" --callout "First look" --vault "$W/wiki" --root "$W"';

interface ExtractFlags {
	callout?: string;
	json?: boolean;
	vault?: string;
	root?: string;
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
			throw new UsageError(
				`More than one page is named \`${raw}\`: ${named.map((p) => p.path).join(", ")}.`,
				`Pass the vault path of the one you mean. cf eval extract "${named[0]!.path}"`,
			);
		}
	}
	const closest = suggest(raw.replace(/\.md$/, "").split("/").at(-1) ?? raw, vault.pages.map((p) => p.name));
	throw new UsageError(`No page \`${raw}\` in the Wiki.${closest ? ` Did you mean \`${closest}\`?` : ""}`, `Name a page that exists, by name or vault path. ${EXAMPLE}`);
}

function pickCallouts(page: Page, title: string | undefined): Callout[] {
	const all = page.callouts.filter((c) => c.type === "narration");
	if (all.length === 0) {
		throw new UsageError(`Page \`${page.path}\` has no [!narration] callout.`, "Name a page that already has a Narration slot.");
	}
	if (title === undefined) return all;
	const wanted = all.filter((c) => c.title.trim().toLowerCase() === title.trim().toLowerCase());
	if (wanted.length === 0) {
		throw new UsageError(
			`No [!narration] callout titled \`${title}\` on \`${page.path}\`. Callouts here: ${all.map((c) => `\`${c.title}\``).join(", ")}.`,
			`cf eval extract "${page.name}" --callout "${all[0]!.title}"`,
		);
	}
	return wanted;
}

function formatHuman(pagePath: string, callouts: Callout[]): string {
	return callouts
		.map((c) => `# ${c.title}  (${pagePath}:${c.line})\n\n${c.body}`)
		.join("\n\n");
}

function extractCommand(): Command {
	return new Command("extract")
		.description("Print [!narration] bodies so a grader can read a small payload. Not a Grade.")
		.argument("<page>", "the page holding the callout: its name, vault path, or a path from here")
		.option("--callout <title>", "print only the callout with this title (default: every [!narration] callout on the page)")
		.option("--json", "print {page, callouts:[{title,line,body}]} instead of markdown")
		.option("--vault <dir>", "the Wiki folder (default: <root>/wiki)")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.addHelpText(
			"after",
			`
Dumps callout text for token efficiency. The grader still reads the prose and judges it.
cf narration scores drafts; this command does not.

Exit codes:
  0  printed    2  usage error

Examples:
  cf eval extract "Ilse Corran" --callout "First look"
  cf eval extract "Session 12 - Dawn Strike" --callout Opening --vault "$W/wiki" --root "$W"
  cf eval extract Crossing --json --vault test/narration/fixtures/wiki --root test/narration/fixtures`,
		)
		.action((pageInput: string, flags: ExtractFlags) => {
			const { vault: vaultDir } = resolveVault(flags, "eval extract");
			return readVaultFiles(vaultDir).then((files) => {
				const vault = buildVault(vaultDir, files);
				const page = findPage(vault, pageInput);
				const callouts = pickCallouts(page, flags.callout);
				const payload = {
					page: page.path,
					callouts: callouts.map((c) => ({ title: c.title, line: c.line, body: c.body })),
				};
				process.stdout.write(`${flags.json ? JSON.stringify(payload, null, 2) : formatHuman(page.path, callouts)}\n`);
			});
		});
}

export function evalCommand(): Command {
	return new Command("eval")
		.description("Fixture-eval helpers. extract dumps Narration text for a grader to read; it is not a Grade.")
		.addHelpText(
			"after",
			`
Examples:
  cf eval extract "Ilse Corran" --callout "First look"
  cf eval extract --help`,
		)
		.addCommand(extractCommand());
}
