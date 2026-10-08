import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildActor } from "../../src/push/actor.ts";
import { parsePage } from "../../src/vault/parse.ts";

const vault = join(import.meta.dirname, "../fixtures/vault/salt-and-lantern");

function actorFor(creature: string, name = creature, extra: Partial<Parameters<typeof buildActor>[1]> = {}): ReturnType<typeof buildActor> {
	const path = `Creatures/${creature}.md`;
	const page = parsePage(path, readFileSync(join(vault, path), "utf8"));
	return buildActor(page, { campaign: "salt-and-lantern", name, biography: "<p>bio</p>", ...extra });
}

type Bag = Record<string, any>;
const sys = (a: ReturnType<typeof buildActor>): Bag => a.data.system as Bag;
const item = (a: ReturnType<typeof buildActor>, name: string): Bag => (a.data.items as Bag[]).find((i) => i.name === name)!;

describe("buildActor", () => {
	it("makes a dnd5e npc Actor from the Creature's statblock: abilities, AC, HP, speed, CR, type and size", () => {
		const a = actorFor("Mire Drowner");
		expect(a.data.type).toBe("npc");
		expect(a.data.name).toBe("Mire Drowner");
		expect(a.data._id).toMatch(/^[A-Za-z0-9]{16}$/);
		expect(sys(a).abilities.str.value).toBe(14);
		expect(sys(a).abilities.con.value).toBe(16);
		expect(sys(a).abilities.cha.value).toBe(5);
		expect(sys(a).attributes.ac).toEqual({ calc: "natural", flat: 13 });
		expect(sys(a).attributes.hp).toEqual({ value: 75, max: 75, formula: "10d8 + 30" });
		expect(sys(a).attributes.movement).toMatchObject({ walk: "30", swim: "30", units: "ft" });
		expect(sys(a).attributes.senses).toMatchObject({ ranges: { darkvision: 60 }, units: "ft" });
		expect(sys(a).details).toMatchObject({ cr: 1, alignment: "neutral", type: { value: "undead" } });
		expect(sys(a).traits.size).toBe("med");
	});

	it("carries saves, skills, immunities and languages", () => {
		const drowner = actorFor("Mire Drowner");
		expect(sys(drowner).skills.ste.value).toBe(1);
		expect(sys(drowner).traits.di.value).toEqual(["poison"]);
		expect(sys(drowner).traits.ci.value).toEqual(["exhaustion", "poisoned"]);
		expect(sys(drowner).traits.languages.custom).toBe("Understands the languages it knew in life but can't speak");

		const goblin = actorFor("Goblin Warrior");
		expect(sys(goblin).skills.ste.value).toBe(2); // Stealth +6 at Dex 15 and CR 1/4 is expertise
		expect(sys(goblin).traits.languages.value).toEqual(["common", "goblin"]);
		expect(sys(goblin).traits.size).toBe("sm");
		expect(sys(goblin).details.cr).toBe(0.25);
		expect(sys(goblin).details.type).toMatchObject({ value: "fey", subtype: "goblinoid" });
	});

	it("gives an attack that parses a real attack activity with the printed to-hit and damage", () => {
		const grasp = item(actorFor("Mire Drowner"), "Drowning Grasp");
		const activity = Object.values(grasp.system.activities as Record<string, Bag>)[0]!;
		expect(activity.type).toBe("attack");
		expect(activity.attack).toMatchObject({ flat: true, bonus: "4", type: { value: "melee", classification: "weapon" } });
		expect(activity.damage.includeBase).toBe(false);
		expect(activity.damage.parts).toHaveLength(1);
		expect(activity.damage.parts[0]).toMatchObject({ number: 2, denomination: 8, bonus: "2", types: ["bludgeoning"] });
		expect(activity.range).toMatchObject({ value: "5", units: "ft" });
		expect(activity.activation.type).toBe("action");
		expect(grasp.system.description.value).toContain("Grappled");
		expect(grasp.system.description.value).toContain("<em>Melee Attack Roll:</em>");
	});

	it("takes reach and range from the attack text and leaves a conditional rider out of the damage", () => {
		const goblin = actorFor("Goblin Warrior");
		const scimitar = Object.values(item(goblin, "Scimitar").system.activities as Record<string, Bag>)[0]!;
		expect(scimitar.damage.parts).toHaveLength(1);
		expect(scimitar.damage.parts[0]).toMatchObject({ number: 1, denomination: 6, bonus: "2", types: ["slashing"] });
		const bow = item(goblin, "Shortbow");
		const bowActivity = Object.values(bow.system.activities as Record<string, Bag>)[0]!;
		expect(bowActivity.attack.type.value).toBe("ranged");
		expect(bow.system.range).toMatchObject({ value: 80, long: 320, units: "ft" });
		expect(bowActivity.range).toMatchObject({ value: "80", units: "ft" });
	});

	it("makes traits and non-attack actions feats with their text, and a utility activity for an action", () => {
		const drowner = actorFor("Mire Drowner");
		const amphibious = item(drowner, "Amphibious");
		expect(amphibious.type).toBe("feat");
		expect(amphibious.system.description.value).toContain("breathe air and water");
		expect(amphibious.system.activities ?? {}).toEqual({});

		const escape = item(actorFor("Goblin Warrior"), "Nimble Escape");
		expect(escape.type).toBe("feat");
		const activity = Object.values(escape.system.activities as Record<string, Bag>)[0]!;
		expect(activity).toMatchObject({ type: "utility", activation: { type: "bonus" } });
	});

	it("gives every embedded Item and activity a stable 16-character ID", () => {
		const a = actorFor("Goblin Warrior");
		const b = actorFor("Goblin Warrior");
		const ids = (a.data.items as Bag[]).map((i) => i._id);
		expect(new Set(ids).size).toBe(ids.length);
		expect(ids).toEqual((b.data.items as Bag[]).map((i) => i._id));
		for (const i of a.data.items as Bag[]) {
			expect(i._id).toMatch(/^[A-Za-z0-9]{16}$/);
			for (const [key, act] of Object.entries(i.system.activities ?? {}) as [string, Bag][]) expect(act._id).toBe(key);
		}
	});

	it("uses the NPC's name and portrait for its own Actor and the given ID role", () => {
		const a = actorFor("Mire Drowner", "Sable", { img: "modules/m/assets/Sable - Portrait.webp", role: "actor" });
		expect(a.data.name).toBe("Sable");
		expect(a.data.img).toBe("modules/m/assets/Sable - Portrait.webp");
		expect((a.data.prototypeToken as Bag).name).toBe("Sable");
		expect((a.data.prototypeToken as Bag).texture.src).toBe("modules/m/assets/Sable - Portrait.webp");
		expect(a.data._id).not.toBe(actorFor("Mire Drowner").data._id);
	});
});
