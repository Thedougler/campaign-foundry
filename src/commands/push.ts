import { existsSync, statSync } from "node:fs";
import { relative, resolve } from "node:path";
import { Command } from "commander";
import { UsageError } from "../check/run.ts";
import { runPush } from "../push/push.ts";
import type { PushResult } from "../push/push.ts";
import { resolveVault } from "./vault-flags.ts";
import type { VaultFlags } from "./vault-flags.ts";

interface PushFlags extends VaultFlags {
	campaign?: string;
	session?: string;
	out?: string;
	install?: string;
	all?: boolean;
	dryRun?: boolean;
	json?: boolean;
}

const TYPES: [key: keyof PushResult["counts"], label: string][] = [
	["JournalEntry", "journals"],
	["Actor", "actors"],
	["Item", "items"],
	["Scene", "foundry scenes"],
	["Folder", "folders"],
];

function nextSteps(result: PushResult, campaign: string): string[] {
	if (result.upToDate) return [];
	const module = result.plan.moduleId;
	const steps = [];
	if (!result.installedTo) steps.push(`Copy ${result.modulePath} into the Foundry data folder's modules/ folder as modules/${module}/ (or rerun with --install <that modules folder>).`);
	steps.push(
		`In the Foundry world's Manage Modules, enable "${campaign} (Campaign Foundry)" (first Push only), then open the Compendium sidebar, the "${campaign} Adventure" pack, and the Adventure inside it.`,
		"Click Import. When it asks about documents that already exist, keep overwrite on: the same IDs mean an update, not a duplicate. Hand-tweaks to a document survive until its Wiki page changes.",
		"Then ask the Agent for the live touches through the Foundry MCP bridge: Player ownership and switching the active Foundry scene.",
	);
	return steps;
}

export function formatPush(result: PushResult, campaign: string, show: (path: string) => string): string {
	const { plan } = result;
	const out: string[] = [];
	const verb = result.dryRun ? "would push" : result.upToDate ? "up to date" : "pushed";
	out.push(`${verb}: Session ${plan.session} of ${campaign} (folder ${plan.campaignFolder}), module ${plan.moduleId}`);
	for (const [type, label] of TYPES) {
		const c = result.counts[type];
		if (c.added + c.updated + c.unchanged > 0) out.push(`  ${label.padEnd(15)} ${c.added} added, ${c.updated} updated, ${c.unchanged} unchanged`);
	}
	if (result.upToDate) out.push("", "Nothing changed in the Wiki since the last Push, so nothing was packed.");
	if (plan.warnings.length > 0) out.push("", "warnings:", ...plan.warnings.map((w) => `  - ${w}`));
	if (result.modulePath) out.push("", `module: ${show(result.modulePath)} (version ${result.version})`);
	if (result.installedTo) out.push(`installed: ${result.installedTo}`);
	if (result.logged) out.push(`log: ${result.logged} (push entry appended)`);
	if (result.dryRun) out.push("", "(dry run: nothing written)");
	const steps = nextSteps(result, campaign);
	if (steps.length > 0 && !result.dryRun) out.push("", "next:", ...steps.map((s, i) => `  ${i + 1}. ${s}`));
	return out.join("\n");
}

export function pushJson(result: PushResult, campaign: string): string {
	const { plan } = result;
	return JSON.stringify(
		{
			ok: true,
			dryRun: result.dryRun,
			upToDate: result.upToDate,
			campaignFolder: plan.campaignFolder,
			campaign,
			session: plan.session,
			module: { id: plan.moduleId, path: result.modulePath ?? null, version: result.version ?? null, installedTo: result.installedTo ?? null },
			adventureId: plan.adventureId,
			counts: result.counts,
			changed: result.changed,
			pages: result.pages,
			warnings: plan.warnings,
			manifest: result.manifest,
			logged: result.logged ?? null,
			next: nextSteps(result, campaign),
		},
		null,
		2,
	);
}

export function pushCommand(): Command {
	return new Command("push")
		.description(
			"Push a Session to its Foundry world: build everything the Session needs (its Prep, Scenes, Handouts and Recap, and the NPCs, Creatures, Locations and Items they link) as a Foundry Adventure, packed offline into a module. Only documents that changed since the last Push are packed. Exits 0 on success (warnings included), 2 on a usage error.",
		)
		.option("--campaign <Campaign>", "the Campaign to push (required)")
		.option("--session <N>", "the Session number to push (required)")
		.option("--out <dir>", "where to build the module (default: <root>/build/push/<module id>)")
		.option("--install <modules-dir>", "also copy the built module into this Foundry Data/modules folder (never defaulted)")
		.option("--all", "include every document, not only the ones that changed since the last Push")
		.option("--dry-run", "show what would be pushed without packing, logging or writing the manifest")
		.option("--json", "print machine-readable JSON instead of text")
		.option("--vault <dir>", "the Wiki folder (default: <root>/wiki)")
		.option("--root <dir>", "repository root, where .push/ and build/ live (default: nearest git root)")
		.addHelpText(
			"after",
			`
What it does:
  Reads the Session's pages, renders them as Foundry documents and compares each with the last Push (kept in
  <root>/.push/<Campaign folder>.json, outside the Wiki):
    journals       one per page, GM-only; a Handout is Player-visible and carries only its [!narration] callout and image
    actors         a dnd5e npc per Creature, and one per NPC that has a Creature, under the NPC's name
    items          a dnd5e Item per Item page, with its full rules text
    foundry scenes one per Scene whose page or linked Site embeds a "<Page> - Battle Map.webp": 64 px grid, a token per
                   embedded Creature, and walls, doors and lights from a "<Page> - Battle Map.uvtt" (or .dd2vtt) beside it
  Every document has an ID derived from its Wiki page, so importing again updates it instead of duplicating it. PCs are
  never pushed. The module is packed with the official Foundry CLI; nothing needs a running Foundry. Afterwards it appends
  a "push" entry to the Campaign folder's log.md. A second Push with no Wiki change packs nothing and says "up to date".

Examples:
  cf push --campaign "Salt and Lantern" --session 2
  cf push --campaign "Salt and Lantern" --session 2 --dry-run
  cf push --campaign "Salt and Lantern" --session 2 --install "$HOME/Library/Application Support/FoundryVTT/Data/modules"
  cf push --campaign "Salt and Lantern" --session 2 --all --json`,
		)
		.action(async (flags: PushFlags) => {
			const example = 'cf push --campaign "<Campaign>" --session <N>';
			if (!flags.campaign) throw new UsageError("No Campaign given.", example);
			const session = Number(flags.session);
			if (!flags.session || !Number.isInteger(session) || session < 1) throw new UsageError(flags.session ? `"${flags.session}" is not a Session number.` : "No Session given.", example);
			const cwd = process.cwd();
			const { root, vault } = resolveVault(flags, "push");
			const install = flags.install ? resolve(cwd, flags.install) : undefined;
			if (install && (!existsSync(install) || !statSync(install).isDirectory())) throw new UsageError(`The modules folder ${install} does not exist.`, `cf push --campaign "${flags.campaign}" --session ${session} --install <Foundry Data/modules folder>`);
			const result = await runPush({
				vault,
				root,
				campaign: flags.campaign,
				session,
				...(flags.out ? { out: resolve(cwd, flags.out) } : {}),
				...(install ? { install } : {}),
				all: flags.all ?? false,
				dryRun: flags.dryRun ?? false,
			});
			const show = (path: string): string => relative(cwd, path) || ".";
			process.stdout.write(`${flags.json ? pushJson(result, flags.campaign) : formatPush(result, flags.campaign, show)}\n`);
		});
}
