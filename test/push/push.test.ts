import { existsSync } from "node:fs";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { extractPack } from "@foundryvtt/foundryvtt-cli";
import { describe, expect, it } from "vitest";
import { runCheck } from "../../src/check/run.ts";
import { runPush } from "../../src/push/push.ts";
import type { PushResult } from "../../src/push/push.ts";
import { parseEntries } from "../../src/vault/log.ts";
import { CAMPAIGN, workspace } from "./helpers.ts";
import type { Workspace } from "./helpers.ts";

type Bag = Record<string, any>;
const now = (): Date => new Date(2026, 8, 29, 12, 0, 0);

const push = (ws: Workspace, extra: Partial<Parameters<typeof runPush>[0]> = {}): Promise<PushResult> =>
	runPush({ vault: ws.vaultDir, root: ws.root, campaign: CAMPAIGN, session: 2, now, ...extra });

/** Unpacks the built pack the way an agent can inspect it: the Adventure document with every embedded document. */
async function unpack(modulePath: string): Promise<Bag> {
	const dest = await mkdtemp(join(tmpdir(), "cf-unpack-"));
	await extractPack(join(modulePath, "packs/adventure"), dest, { documentType: "Adventure" });
	const files = (await import("node:fs")).readdirSync(dest).filter((f) => f.endsWith(".json"));
	expect(files).toHaveLength(1);
	return JSON.parse(await readFile(join(dest, files[0]!), "utf8")) as Bag;
}

const total = (r: PushResult, change: "added" | "updated" | "unchanged"): number => Object.values(r.counts).reduce((n, c) => n + c[change], 0);

describe("runPush", () => {
	it("packs the Session into an Adventure module: module.json, one Adventure pack and the images", async () => {
		const ws = await workspace();
		const result = await push(ws);
		expect(result.upToDate).toBe(false);
		expect(result.modulePath).toBe(join(ws.root, "build/push/cf-lowtide-salt-and-lantern"));
		const manifest = JSON.parse(await readFile(join(result.modulePath!, "module.json"), "utf8")) as Bag;
		expect(manifest).toMatchObject({
			id: "cf-lowtide-salt-and-lantern",
			compatibility: { minimum: "14", verified: "14.367" },
			relationships: { systems: [{ id: "dnd5e", compatibility: { minimum: "5.3.3" } }] },
			packs: [{ name: "adventure", type: "Adventure", system: "dnd5e", path: "packs/adventure" }],
		});
		expect(existsSync(join(result.modulePath!, "assets/Session-2-Mud-Under-the-Boards-Battle-Map.webp"))).toBe(true);
		expect(existsSync(join(result.modulePath!, "assets/Hobb-s-Warning-Handout.webp"))).toBe(true);
	});

	it("unpacks to an Adventure whose documents are the ones planned", async () => {
		const ws = await workspace();
		const result = await push(ws);
		const adventure = await unpack(result.modulePath!);
		expect(adventure._id).toBe(result.plan.adventureId);
		expect((adventure.journal as Bag[]).map((j) => j.name)).toEqual(expect.arrayContaining(["Hobb's Warning", "Session 2 - Prep", "Sable"]));
		expect((adventure.actors as Bag[]).map((a) => a.name).sort()).toEqual(expect.arrayContaining(["Goblin Warrior", "Mire Drowner", "Nib Ashwater", "Sable"]));
		expect((adventure.items as Bag[]).map((i) => i.name).sort()).toEqual(["Ebb Lantern", "Harbormaster's Ledger of Vessen"]);
		expect((adventure.scenes as Bag[]).map((s) => s.name)).toEqual(["Session 2 - Mud Under the Boards"]);
		const handout = (adventure.journal as Bag[]).find((j) => j.name === "Hobb's Warning")!;
		expect(handout.ownership.default).toBe(2);
		const scene = (adventure.scenes as Bag[])[0]!;
		expect(scene.grid.size).toBe(64);
		expect(scene.walls).toHaveLength(6);
		// Embedded Items and Actors survive the round trip through the database.
		const drowner = (adventure.actors as Bag[]).find((a) => a.name === "Mire Drowner")!;
		expect(drowner.items.map((i: Bag) => i.name)).toEqual(["Amphibious", "Mire Step", "Drowning Grasp"]);
	});

	it("reports what was added, and logs the push with the pages", async () => {
		const ws = await workspace();
		const result = await push(ws);
		expect(total(result, "added")).toBe(result.plan.docs.length);
		expect(total(result, "updated") + total(result, "unchanged")).toBe(0);
		expect(result.counts.Scene.added).toBe(1);
		expect(result.logged).toBe("Lowtide/log.md");
		const entry = parseEntries(await ws.read("Lowtide/log.md")).at(-1)!;
		expect(entry).toMatchObject({ date: "2026-09-29", op: "push" });
		expect(entry.pages).toEqual(expect.arrayContaining(["Session 2 - Prep", "Hobb's Warning", "Mire Drowner", "Sable"]));
		expect(entry.pages).not.toContain("");
	});

	it("leaves the Wiki as clean for the gate as it found it: its log entry is well formed", async () => {
		const ws = await workspace();
		const gate = async (): Promise<string[]> => {
			const result = await runCheck({ vault: ws.vaultDir, templates: join(import.meta.dirname, "../../wiki/templates"), root: ws.root, cwd: ws.root, layers: ["log", "index", "links", "placement"] });
			return result.findings.map((f) => `${f.path} ${f.rule}`);
		};
		const before = await gate();
		await push(ws);
		expect(await gate()).toEqual(before);
	});

	it("keeps its manifest outside the Wiki, per World and Campaign", async () => {
		const ws = await workspace();
		const result = await push(ws);
		expect(result.manifest).toBe(join(ws.root, ".push/Lowtide/Salt and Lantern.json"));
		const manifest = JSON.parse(await readFile(result.manifest, "utf8")) as Bag;
		expect(manifest.adventureId).toBe(result.plan.adventureId);
		expect(Object.keys(manifest.docs)).toHaveLength(result.plan.docs.length);
	});

	it("packs nothing and says up to date when the Wiki has not changed", async () => {
		const ws = await workspace();
		await push(ws);
		const again = await push(ws);
		expect(again.upToDate).toBe(true);
		expect(again.modulePath).toBeUndefined();
		expect(again.changed).toEqual([]);
		expect(total(again, "unchanged")).toBe(again.plan.docs.length);
		// The log entry from the first push is not repeated.
		const entries = parseEntries(await ws.read("Lowtide/log.md")).filter((e) => e.op === "push");
		expect(entries).toHaveLength(1);
	});

	it("after a Wiki edit, packs only the edited document, with the same ID", async () => {
		const ws = await workspace();
		const first = await push(ws);
		const before = first.plan.docs.find((d) => d.name === "Nib Ashwater" && d.type === "JournalEntry")!;
		const page = "Lowtide/NPCs/Nib Ashwater.md";
		await ws.write(page, (await ws.read(page)).replace("Soft and careful.", "Soft, careful and a little frightened."));

		const second = await push(ws);
		expect(second.upToDate).toBe(false);
		expect(second.changed).toEqual([{ type: "JournalEntry", id: before.id, name: "Nib Ashwater", change: "updated" }]);
		expect(total(second, "added")).toBe(0);
		const adventure = await unpack(second.modulePath!);
		expect((adventure.journal as Bag[]).map((j) => j._id)).toEqual([before.id]);
		expect(adventure.actors).toEqual([]);
		expect(adventure.scenes).toEqual([]);
		expect((adventure.journal as Bag[])[0]!.pages[0].text.content).toContain("a little frightened");
		expect(second.pages).toEqual(["Nib Ashwater"]);
		// The module keeps every image, since the earlier documents still point at them.
		expect(existsSync(join(second.modulePath!, "assets/Session-2-Mud-Under-the-Boards-Battle-Map.webp"))).toBe(true);
	});

	it("updates the Actors that share a Creature when its statblock changes", async () => {
		const ws = await workspace();
		await push(ws);
		const page = "Lowtide/Creatures/Mire Drowner.md";
		await ws.write(page, (await ws.read(page)).replace("ac: 13", "ac: 14"));
		const second = await push(ws);
		expect(second.changed.map((c) => `${c.type}:${c.name}`).sort()).toEqual(["Actor:Mire Drowner", "Actor:Sable"]);
	});

	it("includes every document again with --all", async () => {
		const ws = await workspace();
		const first = await push(ws);
		const all = await push(ws, { all: true });
		expect(all.upToDate).toBe(false);
		expect(all.changed).toHaveLength(first.plan.docs.length);
		expect(all.changed.every((c) => c.change === "updated")).toBe(true);
	});

	it("writes nothing on a dry run", async () => {
		const ws = await workspace();
		const result = await push(ws, { dryRun: true });
		expect(result.dryRun).toBe(true);
		expect(result.changed.length).toBe(result.plan.docs.length);
		expect(existsSync(join(ws.root, "build"))).toBe(false);
		expect(existsSync(join(ws.root, ".push"))).toBe(false);
		expect(parseEntries(await ws.read("Lowtide/log.md")).filter((e) => e.op === "push")).toEqual([]);
	});

	it("copies the module into a modules folder given to --install, and only there", async () => {
		const ws = await workspace();
		const modules = await mkdtemp(join(tmpdir(), "cf-modules-"));
		const result = await push(ws, { install: modules });
		expect(result.installedTo).toBe(join(modules, "cf-lowtide-salt-and-lantern"));
		expect(existsSync(join(modules, "cf-lowtide-salt-and-lantern/module.json"))).toBe(true);
		expect(existsSync(join(modules, "cf-lowtide-salt-and-lantern/packs/adventure"))).toBe(true);
	});

	it("names the Campaigns when the Campaign is unknown, and the Sessions when the Session is", async () => {
		const ws = await workspace();
		await expect(push(ws, { campaign: "Nope" })).rejects.toThrow(/No Campaign named "Nope"/);
		await expect(push(ws, { session: 9 })).rejects.toThrow(/No pages for Session 9/);
	});
});
