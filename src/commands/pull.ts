import { existsSync, realpathSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { Command, Option } from "commander";
import { formatHuman, formatJson } from "../check/output.ts";
import { UsageError } from "../check/run.ts";
import { runPull } from "../pull/pull.ts";
import type { PcOutcome, PullResult } from "../pull/pull.ts";
import { findRepoRoot } from "./check.ts";

interface PullFlags {
	campaign?: string;
	pc: string[];
	vault?: string;
	templates?: string;
	root?: string;
	dryRun?: boolean;
	json?: boolean;
}

const collect = (value: string, previous: string[]): string[] => [...previous, value];

const VERB: Record<PcOutcome["status"], string> = {
	updated: "pulled",
	"would-update": "would pull",
	unchanged: "unchanged",
	skipped: "skipped",
	failed: "failed",
};

function describe(o: PcOutcome): string {
	const parts: string[] = [];
	if (o.sections.length > 0) parts.push(`${o.sections.join(", ")} (+${o.added} -${o.removed} lines)`);
	if (o.summarySet) parts.push("summary set");
	return parts.join("; ");
}

export function formatPull(result: PullResult, dryRun: boolean): string {
	const out: string[] = [];
	for (const o of result.outcomes) {
		const detail = o.status === "failed" || o.status === "skipped" ? (o.message ?? "") : describe(o);
		out.push(`${VERB[o.status].padEnd(11)} ${o.pc}  ${o.path}${detail ? `\n            ${detail}` : ""}`);
	}
	const count = (s: PcOutcome["status"]): number => result.outcomes.filter((o) => o.status === s).length;
	const failed = count("failed");
	const summary = [
		`${dryRun ? count("would-update") : count("updated")} ${dryRun ? "to pull" : "pulled"}`,
		`${count("unchanged")} unchanged`,
		`${count("skipped")} skipped`,
		`${failed} failed`,
	].join(", ");
	out.push("", `${summary}${dryRun ? " (dry run: nothing written)" : ""}`);
	for (const path of result.logged) out.push(`log: ${path} (pull entry appended)`);
	return out.join("\n");
}

export function pullJson(result: PullResult, dryRun: boolean): string {
	return JSON.stringify(
		{
			ok: !result.outcomes.some((o) => o.status === "failed") && (result.gate?.findings.length ?? 0) === 0,
			dryRun,
			pcs: result.outcomes.map(({ pc, path, status, sections, summarySet, added, removed, message }) => ({
				pc, path, status, sections, summarySet, added, removed, ...(message ? { message } : {}),
			})),
			logged: result.logged,
			gate: result.gate ? JSON.parse(formatJson(result.gate)) : null,
		},
		null,
		2,
	);
}

export function pullCommand(): Command {
	return new Command("pull")
		.description(
			"Pull PCs from D&D Beyond: refresh the sheet side (Sheet, Spells, Inventory) of every PC page that has a dndbeyond_url, then log it and run the gate. The Story, Goals and bonds and Plans sections are never touched. Exits 0 clean, 1 if a PC failed or the gate found problems, 2 usage error.",
		)
		.option("--campaign <Campaign>", "only the PCs of this Campaign (default: every Campaign)")
		.addOption(new Option("--pc <PC name>", "only this PC; repeat for several").argParser(collect).default([] as string[], "every PC with a link"))
		.option("--vault <dir>", "the Wiki folder (default: <root>/wiki)")
		.option("--templates <dir>", "folder of page templates for the gate (default: <root>/wiki/templates)")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.option("--dry-run", "show what would change per PC without writing, logging or gating")
		.option("--json", "print machine-readable JSON instead of text")
		.addHelpText(
			"after",
			`
What it does:
  For each PC page under <World>/Campaigns/<Campaign>/PCs/ with a dndbeyond_url, it fetches the public character from
  D&D Beyond and rewrites the Sheet, Spells and Inventory sections whole. The summary is set only when blank.
  Afterwards it appends "## [date] pull | Pulled PCs from D&D Beyond" to the World's log.md (only when a page changed)
  and runs the gate (cf check) over the pulled pages. A second pull with the same character changes nothing.

Private characters:
  D&D Beyond only shares public characters. A private or missing one fails with the PC's name and the fix: set the
  character to public on D&D Beyond (Settings, Character Privacy, Public). The other PCs are still pulled.

Exit codes:
  0  every PC pulled or unchanged, gate clean    1  a PC failed or the gate found problems    2  usage error

Examples:
  cf pull
  cf pull --dry-run
  cf pull --campaign "Ashes of the Crown"
  cf pull --pc "Tam Brightwater" --pc "Mara Voss"
  cf pull --json --dry-run`,
		)
		.action(async (flags: PullFlags) => {
			const cwd = process.cwd();
			const real = (p: string): string => (existsSync(p) ? realpathSync(p) : p);
			const root = real(flags.root ? resolve(cwd, flags.root) : findRepoRoot(cwd));
			const vault = real(flags.vault ? resolve(cwd, flags.vault) : join(root, "wiki"));
			const templates = real(flags.templates ? resolve(cwd, flags.templates) : join(root, "wiki/templates"));
			for (const [label, dir, flag] of [["vault", vault, "--vault"], ["templates", templates, "--templates"]] as const) {
				if (!existsSync(dir) || !statSync(dir).isDirectory()) throw new UsageError(`The ${label} folder ${dir} does not exist.`, `cf pull ${flag} <folder>`);
			}
			const result = await runPull({
				vault,
				templates,
				root,
				cwd,
				...(flags.campaign === undefined ? {} : { campaign: flags.campaign }),
				pcs: flags.pc,
				dryRun: flags.dryRun ?? false,
				fetch: globalThis.fetch,
			});
			const dryRun = flags.dryRun ?? false;
			if (flags.json) {
				process.stdout.write(`${pullJson(result, dryRun)}\n`);
			} else {
				process.stdout.write(`${formatPull(result, dryRun)}\n`);
				if (result.gate) process.stdout.write(`\ngate: ${formatHuman(result.gate, { fix: false, dryRun: false })}\n`);
			}
			const failed = result.outcomes.some((o) => o.status === "failed");
			process.exitCode = failed || (result.gate?.findings.length ?? 0) > 0 ? 1 : 0;
		});
}
