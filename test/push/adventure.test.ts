import { beforeAll, describe, expect, it } from "vitest";
import { buildPlan } from "../../src/push/adventure.ts";
import type { Plan, PlanDoc } from "../../src/push/adventure.ts";
import { CAMPAIGN, workspace } from "./helpers.ts";

type Bag = Record<string, any>;
let plan: Plan;
const find = (type: PlanDoc["type"], name: string): Bag => {
	const doc = plan.docs.find((d) => d.type === type && d.name === name);
	if (!doc) throw new Error(`no ${type} named ${name}; have ${plan.docs.filter((d) => d.type === type).map((d) => d.name).join(", ")}`);
	return doc.data;
};
const names = (type: PlanDoc["type"]): string[] => plan.docs.filter((d) => d.type === type).map((d) => d.name);

beforeAll(async () => {
	const ws = await workspace();
	plan = await buildPlan(await ws.load(), { campaign: CAMPAIGN, session: 2 });
});

describe("buildPlan for Salt and Lantern, Session 2", () => {
	it("names the module and the Adventure for the Campaign", () => {
		expect(plan.world).toBe("Lowtide");
		expect(plan.moduleId).toBe("cf-lowtide-salt-and-lantern");
		expect(plan.adventureId).toMatch(/^[A-Za-z0-9]{16}$/);
	});

	it("makes a journal of the Session's Prep, Scenes, Handout and Recap, and of the linked NPCs and Locations", () => {
		const journals = names("JournalEntry");
		expect(journals).toEqual(
			expect.arrayContaining([
				"Session 2 - Prep", "Session 2 - The Bell Rings Early", "Session 2 - Nib's Tally", "Session 2 - Mud Under the Boards",
				"Session 2 - Low Water at the Chapel", "Session 2 - What the Ledger Says", "Session 2 - Recap", "Hobb's Warning",
				"Sable", "Nib Ashwater", "Pell Rushlight", "Hobb Tarrow", "Ilse Corran", "Reedholt", "The Drowned Chapel", "Crookback Sluice",
			]),
		);
		// Session 1's Previously On is linked from the Prep; the rest of Session 1 is out of scope.
		expect(journals).toContain("Session 1 - Previously On");
		expect(journals).not.toContain("Session 1 - Prep");
		expect(journals).not.toContain("Session 1 - The Lamp Room");
	});

	it("leaves the PCs out, and Creatures and Items out of the journals", () => {
		expect(plan.docs.map((d) => d.name)).not.toContain("Odalys Ferro");
		expect(names("JournalEntry")).not.toContain("Mire Drowner");
		expect(names("JournalEntry")).not.toContain("Ebb Lantern");
	});

	it("keeps every journal GM-only except the Handout, which Players observe", () => {
		for (const d of plan.docs.filter((d) => d.type === "JournalEntry")) {
			expect((d.data.ownership as Bag).default, d.name).toBe(d.name === "Hobb's Warning" ? 2 : 0);
		}
	});

	it("gives the Handout's journal only its narration and the image under it", () => {
		const page = (find("JournalEntry", "Hobb's Warning").pages as Bag[])[0]!;
		const html: string = page.text.content;
		expect(html).toContain("The lamp is lit, and I am keeping it.");
		expect(html).toContain("<img");
		expect(html).toContain("modules/cf-lowtide-salt-and-lantern/assets/Hobb-s-Warning-Handout.webp");
		expect(html).not.toMatch(/Kind\.|Letter|Presented as|DM hands|Play|Session 2 - Nib/);
	});

	it("rewrites wikilinks to UUID links for documents in the Adventure and to plain text for the rest", () => {
		const html: string = (find("JournalEntry", "Session 2 - Mud Under the Boards").pages as Bag[])[0]!.text.content;
		const reedholt = plan.docs.find((d) => d.name === "Reedholt" && d.type === "JournalEntry")!;
		expect(html).toContain(`@UUID[JournalEntry.${reedholt.id}]{Reedholt}`);
		const drowner = plan.docs.find((d) => d.name === "Mire Drowner" && d.type === "Actor")!;
		expect(html).toContain(`@UUID[Actor.${drowner.id}]{Mire Drowner}`);
		const ebb = plan.docs.find((d) => d.name === "Ebb Lantern" && d.type === "Item")!;
		expect(html).toContain(`@UUID[Item.${ebb.id}]{Ebb Lantern}`);
				expect(html).not.toContain("[[");
		expect(html).not.toContain("@UUID[undefined");
		expect(html).toContain('class="cf-callout cf-narration"');
	});

	it("makes an Actor for each Creature and one for each NPC that has a Creature, under the NPC's name", () => {
		expect(names("Actor")).toEqual(expect.arrayContaining(["Mire Drowner", "Goblin Warrior", "Sable", "Nib Ashwater"]));
		const sable = find("Actor", "Sable");
		expect(sable.type).toBe("npc");
		expect(sable.system.attributes.hp).toMatchObject({ max: 75, formula: "10d8 + 30" });
		expect(sable.system.abilities.str.value).toBe(14);
		expect(find("Actor", "Nib Ashwater").system.attributes.ac.flat).toBe(15);
		expect(find("Actor", "Sable")._id).not.toBe(find("Actor", "Mire Drowner")._id);
		expect(find("Actor", "Sable").ownership.default).toBe(0);
	});

	it("makes an Item of each Item page", () => {
		expect(names("Item").sort()).toEqual(["Ebb Lantern", "Harbormaster's Ledger of Vessen"]);
	});

	it("builds a Foundry scene for the Scene with a Battle Map: 64 px grid, image size, walls and a token per embedded Creature", () => {
		expect(names("Scene")).toEqual(["Session 2 - Mud Under the Boards"]);
		const scene = find("Scene", "Session 2 - Mud Under the Boards");
		expect(scene.grid).toMatchObject({ size: 64, distance: 5 });
		expect([scene.width, scene.height]).toEqual([640, 448]);
		expect(scene.levels[0].background.src).toBe("modules/cf-lowtide-salt-and-lantern/assets/Session-2-Mud-Under-the-Boards-Battle-Map.webp");
		expect(scene.walls).toHaveLength(6);
		expect(scene.lights).toHaveLength(1);
		expect(scene.tokens.map((t: Bag) => t.name)).toEqual(["Mire Drowner"]);
		expect(scene.tokens[0].actorId).toBe(plan.docs.find((d) => d.type === "Actor" && d.name === "Mire Drowner")!.id);
		expect(scene.thumb).toMatch(/^data:image\/webp;base64,/);
		const journal = plan.docs.find((d) => d.type === "JournalEntry" && d.name === "Session 2 - Mud Under the Boards")!;
		expect(scene.journal).toBe(journal.id);
	});

	it("ships the images the documents use", () => {
		expect(plan.assets.map((a) => a.to).sort()).toEqual(["Hobb-s-Warning-Handout.webp", "Session-2-Mud-Under-the-Boards-Battle-Map.webp"]);
	});

	it("warns about a Climax with no Battle Map and about links left as text, but not about PCs", () => {
		const text = plan.warnings.join("\n");
		expect(text).toContain("Session 2 - Low Water at the Chapel: no Foundry scene");
		expect(text).toMatch(/left as text/);
		expect(text).toContain("Reedrunner Tithe (Thread)");
		expect(text).not.toContain("Odalys Ferro");
	});

	it("puts documents in a Folder named for the Campaign", () => {
		const folders = plan.docs.filter((d) => d.type === "Folder");
		expect(folders.map((f) => f.data.type).sort()).toEqual(["Actor", "Item", "JournalEntry", "Scene"]);
		expect(folders.every((f) => f.name === CAMPAIGN)).toBe(true);
		expect(find("Item", "Ebb Lantern").folder).toBe(folders.find((f) => f.data.type === "Item")!.id);
	});

	it("is deterministic: building twice gives the same IDs and hashes", async () => {
		const ws = await workspace();
		const again = await buildPlan(await ws.load(), { campaign: CAMPAIGN, session: 2 });
		expect(again.docs.map((d) => [d.type, d.id, d.hash])).toEqual(plan.docs.map((d) => [d.type, d.id, d.hash]));
		expect(new Set(plan.docs.filter((d) => d.type !== "Folder").map((d) => `${d.type}:${d.id}`)).size).toBe(plan.docs.filter((d) => d.type !== "Folder").length);
	});
});
