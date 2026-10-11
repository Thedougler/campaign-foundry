import { Command } from "commander";
import { UsageError } from "../check/run.ts";
import type { Callout, Page } from "../vault/types.ts";
import { resolvePage } from "../vault/resolve.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { CF, envOptions, resolveEnv } from "./kit.ts";
import { graphCommand, packageCommand, validateCommand } from "./eval-authoring.ts";
import { descriptionReviewCommand, reviewCommand } from "./eval-review.ts";

const EXAMPLE = `${CF} eval extract "Ilse Corran" --callout "First look" --vault "$W/wiki" --root "$W"`;

interface ExtractFlags {
	callout?: string;
	json?: boolean;
	vault?: string;
	root?: string;
}

function pickCallouts(page: Page, title: string | undefined): Callout[] {
	const all = page.callouts.filter((c) => c.type === "narration");
	if (all.length === 0) {
		throw new UsageError(
			`Page \`${page.path}\` has no [!narration] callout.`,
			"Name a page that already has a Narration slot.",
		);
	}
	if (title === undefined) return all;
	const wanted = all.filter((c) => c.title.trim().toLowerCase() === title.trim().toLowerCase());
	if (wanted.length === 0) {
		throw new UsageError(
			`No [!narration] callout titled \`${title}\` on \`${page.path}\`. Callouts here: ${all.map((c) => `\`${c.title}\``).join(", ")}.`,
			`${CF} eval extract "${page.name}" --callout "${all[0]!.title}"`,
		);
	}
	return wanted;
}

function formatHuman(pagePath: string, callouts: Callout[]): string {
	return callouts.map((c) => `# ${c.title}  (${pagePath}:${c.line})\n\n${c.body}`).join("\n\n");
}

function extractCommand(): Command {
	const command = new Command("extract")
		.description("Print [!narration] bodies so a grader can read a small payload. Not a Grade.")
		.argument("<page>", "the page holding the callout: its name, vault path, or a path from here")
		.option(
			"--callout <title>",
			"print only the callout with this title (default: every [!narration] callout on the page)",
		);
	envOptions(command);
	return command
		.option("--json", "print {page, callouts:[{title,line,body}]} instead of markdown")
		.addHelpText(
			"after",
			`
Dumps callout text for token efficiency. The grader still reads the prose and judges it.
${CF} check reports mechanical Narration findings; this command does not grade drafts.

Exit codes:
  0  printed    2  usage error

Examples:
  ${CF} eval extract "Ilse Corran" --callout "First look"
  ${CF} eval extract "Session 12 - Dawn Strike" --callout Opening --vault "$W/wiki" --root "$W"
  ${CF} eval extract Crossing --json --vault test/narration/fixtures/wiki --root test/narration/fixtures`,
		)
		.action((pageInput: string, flags: ExtractFlags) => {
			const { vault: vaultDir } = resolveEnv(flags, "eval extract");
			return readVaultFiles(vaultDir).then((files) => {
				const vault = buildVault(vaultDir, files);
				const page = resolvePage(vault, pageInput, {
					hint: (candidate) => (candidate ? `${CF} eval extract "${candidate}"` : EXAMPLE),
				});
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
		.description(
			"Eval helpers: extract Narration, validate/package skills, print the skill graph, and render static authoring reviews.",
		)
		.addHelpText(
			"after",
			`
Examples:
  ${CF} eval extract "Ilse Corran" --callout "First look"
  ${CF} eval validate .omp/skills/skill-creator
  ${CF} eval graph
  ${CF} eval review --help
  ${CF} eval description-review --help`,
		)
		.addCommand(extractCommand())
		.addCommand(validateCommand())
		.addCommand(graphCommand())
		.addCommand(packageCommand())
		.addCommand(reviewCommand())
		.addCommand(descriptionReviewCommand());
}
