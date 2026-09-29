import { existsSync, readdirSync, readFileSync } from "node:fs";
import { cp, mkdtemp } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { extractPack } from "@foundryvtt/foundryvtt-cli";
import { beforeAll, describe, expect, it } from "vitest";
import { buildPlan } from "../../src/push/adventure.ts";
import type { Plan } from "../../src/push/adventure.ts";
import { CAMPAIGN, workspace } from "./helpers.ts";

const systemDir = join(process.env.FOUNDRY_DATA ?? join(homedir(), "Library/Application Support/FoundryVTT"), "Data/systems/dnd5e");
const installed = existsSync(join(systemDir, "packs/actors24"));

type Bag = Record<string, any>;

/** Every key path in a document; the ids that key `activities` collapse to `*`, and array items to `[]`. */
function paths(value: unknown, prefix: string, out: Set<string>): void {
	if (Array.isArray(value)) {
		out.add(`${prefix}[]`);
		for (const v of value) paths(v, `${prefix}[]`, out);
	} else if (value && typeof value === "object") {
		for (const [k, v] of Object.entries(value)) paths(v, prefix ? `${prefix}.${k}` : k, out);
	} else out.add(prefix);
}
const norm = (set: Set<string>): Set<string> => new Set([...set].map((p) => p.replace(/\.activities\.[A-Za-z0-9]{16}\b/g, ".activities.*")));

/**
 * The dnd5e `system` data model is client-only code, so Foundry's server cannot validate it and neither can Node. The system's
 * own compendiums were written by that model, so every key path Push emits must occur in them. Skipped where dnd5e is not
 * installed. The packs are copied before they are opened (opening a LevelDB pack writes to it); nothing is written to Foundry.
 */
describe.skipIf(!installed)("dnd5e 5.3.3 system data shape", () => {
	let plan: Plan;
	let actorPaths: Set<string>;
	const itemPaths = new Map<string, Set<string>>();

	async function unpack(pack: string, type: string): Promise<Bag[]> {
		const dir = await mkdtemp(join(tmpdir(), `cf-${pack}-`));
		await cp(join(systemDir, "packs", pack), join(dir, "pack"), { recursive: true });
		await extractPack(join(dir, "pack"), join(dir, "src"), { documentType: type });
		return readdirSync(join(dir, "src")).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(readFileSync(join(dir, "src", f), "utf8")) as Bag);
	}

	beforeAll(async () => {
		plan = await buildPlan(await (await workspace()).load(), { campaign: CAMPAIGN, session: 2 });
		actorPaths = new Set();
		const own = (type: string): Set<string> => itemPaths.get(type) ?? itemPaths.set(type, new Set()).get(type)!;
		for (const actor of (await unpack("actors24", "Actor")).filter((a) => a.type === "npc")) {
			const { items, ...rest } = actor;
			paths(rest, "", actorPaths);
			for (const item of items as Bag[]) paths(item, "", own(item.type));
		}
		for (const [pack, type] of [["monsterfeatures24", "Item"], ["equipment24", "Item"]] as const) {
			for (const item of await unpack(pack, type)) paths(item, "", own(item.type));
		}
	}, 60_000);

	const normalized = new WeakMap<Set<string>, Set<string>>();
	const unknown = (mine: Set<string>, known: Set<string>): string[] => {
		if (!normalized.has(known)) normalized.set(known, norm(known));
		const ref = normalized.get(known)!;
		return [...norm(mine)].filter((p) => !ref.has(p));
	};

	it("emits only key paths the system's own npc Actors have", () => {
		const actors = plan.docs.filter((d) => d.type === "Actor");
		expect(actors.length).toBeGreaterThan(0);
		for (const actor of actors) {
			const { items, ...rest } = actor.data as Bag;
			const mine = new Set<string>();
			paths(rest, "", mine);
			expect(unknown(mine, actorPaths), actor.name).toEqual([]);
			void items;
		}
	});

	it("emits only key paths the system's own weapon and feat Items have, for each Actor's embedded Items", () => {
		for (const actor of plan.docs.filter((d) => d.type === "Actor")) {
			for (const item of (actor.data as Bag).items as Bag[]) {
				const mine = new Set<string>();
				paths(item, "", mine);
				expect(unknown(mine, itemPaths.get(item.type as string) ?? new Set()), `${actor.name} > ${item.name}`).toEqual([]);
			}
		}
	});

	it("emits only key paths the system's own equipment and loot Items have, for each Item", () => {
		for (const doc of plan.docs.filter((d) => d.type === "Item")) {
			const mine = new Set<string>();
			paths(doc.data, "", mine);
			expect(unknown(mine, itemPaths.get((doc.data as Bag).type as string) ?? new Set()), doc.name).toEqual([]);
		}
	});

	it("is a real check: a made-up key is unknown", () => {
		expect(unknown(new Set(["system.attributes.bogus"]), actorPaths)).toEqual(["system.attributes.bogus"]);
	});
});
