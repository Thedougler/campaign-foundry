import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { ADVENTURE_FIELD } from "./adventure.ts";
import type { Plan, PlanDoc } from "./adventure.ts";
import { DND5E_VERSION, FOUNDRY_MIN, FOUNDRY_VERIFIED, stats } from "./foundry.ts";
import type { Doc } from "./foundry.ts";

/** The compendium pack inside the module; its `name` is what the DM finds in Foundry's Compendium sidebar. */
export const PACK_NAME = "adventure";

export function moduleManifest(plan: Plan, version: string): Doc {
	return {
		id: plan.moduleId,
		title: `${plan.campaign} (Campaign Foundry)`,
		description: `The Adventure Campaign Foundry pushed for ${plan.campaign}. Import it from the Compendium sidebar to add its journals, Actors, Items and Foundry scenes to the Foundry world.`,
		version,
		authors: [{ name: "Campaign Foundry" }],
		compatibility: { minimum: FOUNDRY_MIN, verified: FOUNDRY_VERIFIED },
		relationships: { systems: [{ id: "dnd5e", type: "system", compatibility: { minimum: DND5E_VERSION, verified: DND5E_VERSION } }] },
		packs: [
			{
				name: PACK_NAME,
				label: `${plan.campaign} Adventure`,
				path: `packs/${PACK_NAME}`,
				type: "Adventure",
				system: "dnd5e",
				ownership: { PLAYER: "NONE", ASSISTANT: "OWNER" },
			},
		],
	};
}

/** The one Adventure document holding the changed documents, in the shape the CLI packs (`_key` marks its database key). */
export function adventureSource(plan: Plan, changed: PlanDoc[]): Doc {
	const source: Doc = {
		_id: plan.adventureId,
		name: plan.adventureName,
		img: null,
		caption: "",
		description: `<p>${plan.campaign}: what Session ${plan.session} needs, pushed from the Wiki.</p>`,
		actors: [],
		combats: [],
		items: [],
		journal: [],
		scenes: [],
		tables: [],
		macros: [],
		cards: [],
		playlists: [],
		folders: [],
		folder: null,
		sort: 0,
		flags: {},
		_stats: stats(),
		_key: `!adventures!${plan.adventureId}`,
	};
	for (const doc of changed) (source[ADVENTURE_FIELD[doc.type]] as Doc[]).push(doc.data);
	return source;
}

export interface PackOptions {
	/** Module folder to write: `module.json`, `packs/adventure` and `assets/`. */
	out: string;
	plan: Plan;
	changed: PlanDoc[];
	version: string;
}

/** Writes the module folder: packs the Adventure offline with the Foundry CLI and copies the images the documents use. */
export async function writeModule(options: PackOptions): Promise<void> {
	const { out, plan } = options;
	await mkdir(out, { recursive: true });
	await rm(join(out, "packs"), { recursive: true, force: true });
	await rm(join(out, "assets"), { recursive: true, force: true });
	const source = await mkdtemp(join(tmpdir(), "cf-push-src-"));
	try {
		await writeFile(join(source, `${plan.adventureId}.json`), JSON.stringify(adventureSource(plan, options.changed)));
		await mkdir(join(out, "packs"), { recursive: true });
		await compilePack(source, join(out, "packs", PACK_NAME));
	} finally {
		await rm(source, { recursive: true, force: true });
	}
	await mkdir(join(out, "assets"), { recursive: true });
	for (const asset of plan.assets) await cp(asset.from, join(out, "assets", asset.to));
	await writeFile(join(out, "module.json"), `${JSON.stringify(moduleManifest(plan, options.version), null, "\t")}\n`);
}

/** Copies the built module into a Foundry `Data/modules/` folder as `<modules>/<module id>/`, replacing an earlier copy. */
export async function installModule(out: string, modulesDir: string, moduleId: string): Promise<string> {
	const target = join(modulesDir, moduleId);
	await rm(target, { recursive: true, force: true });
	await mkdir(modulesDir, { recursive: true });
	await cp(out, target, { recursive: true });
	return target;
}
