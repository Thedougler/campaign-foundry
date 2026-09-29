import { beforeAll, describe, expect, it } from "vitest";
import { adventureSource, moduleManifest } from "../../src/push/pack.ts";
import { buildPlan } from "../../src/push/adventure.ts";
import type { Plan } from "../../src/push/adventure.ts";
import { foundryCore, foundryInstalled } from "./foundry-core.ts";
import { CAMPAIGN, workspace } from "./helpers.ts";

/**
 * Validates what Push builds against Foundry v14's own data models, the ones its server enforces. Skipped where Foundry is
 * not installed. The dnd5e `system` blocks are not validated here: that model is client-only code, so Foundry's server does
 * not check them either. They were compared key by key against the dnd5e 5.3.3 compendium data (see the research note).
 */
describe.skipIf(!foundryInstalled)("Foundry v14 core data models", () => {
	let plan: Plan;
	beforeAll(async () => {
		plan = await buildPlan(await (await workspace()).load(), { campaign: CAMPAIGN, session: 2 });
	});

	it("accepts the whole Adventure, with every embedded Actor, Item, journal, Foundry scene and folder", async () => {
		const { documents } = await foundryCore();
		const { _key, ...source } = adventureSource(plan, plan.docs) as Record<string, unknown>;
		void _key;
		const adventure = new documents.BaseAdventure!(source as never, { strict: true });
		expect(adventure.toObject()).toBeTruthy();
	});

	it("accepts each document on its own, including a Foundry scene with walls, a door, a light and tokens", async () => {
		const { documents } = await foundryCore();
		const model = { JournalEntry: "BaseJournalEntry", Actor: "BaseActor", Item: "BaseItem", Scene: "BaseScene", Folder: "BaseFolder" } as const;
		for (const doc of plan.docs) {
			const Model = documents[model[doc.type]]!;
			expect(() => new Model(doc.data as never, { strict: true }), `${doc.type} ${doc.name}`).not.toThrow();
		}
	});

	it("keeps a Foundry scene's tokens, walls and lights as written (ID, coordinates, door state)", async () => {
		const { documents } = await foundryCore();
		const scene = plan.docs.find((d) => d.type === "Scene")!;
		const built = new documents.BaseScene!(scene.data as never, { strict: true }).toObject() as Record<string, any>;
		expect(built.grid.size).toBe(64);
		expect(built.walls).toHaveLength(6);
		expect(built.walls.find((w: Record<string, any>) => w.door === 1).ds).toBe(0);
		expect(built.tokens[0].width).toBe(1);
		expect(built.levels[0]._id).toBe("defaultLevel0000");
	});

	it("is a real check: the same models reject a bad ID and a bad wall", async () => {
		const { documents } = await foundryCore();
		const scene = plan.docs.find((d) => d.type === "Scene")!.data as Record<string, any>;
		expect(() => new documents.BaseScene!({ ...scene, _id: "short" } as never, { strict: true })).toThrow(/valid/i);
		expect(() => new documents.BaseScene!({ ...scene, walls: [{ ...scene.walls[0], c: [1, 2] }] } as never, { strict: true })).toThrow(/length-4/);
	});

	it("accepts the module manifest as a v14 module with an Adventure pack", async () => {
		const { packages } = await foundryCore();
		const Module = packages.BaseModule ?? packages.ModuleData;
		expect(Module, "foundry.packages has a module model").toBeTruthy();
		expect(() => new Module!(moduleManifest(plan, "0.1.0") as never)).not.toThrow();
	});
});
