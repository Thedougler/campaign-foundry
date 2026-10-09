import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { walkBackup } from "../../src/backup/files.ts";
import { type BackupMap, emptyMap } from "../../src/backup/map.ts";
import { headerBlock, pendingHeader, ROOT_TITLE, rootCallout } from "../../src/backup/markers.ts";
import { ConcurrentRunError, planBackup, runBackup } from "../../src/backup/sync.ts";
import { backup, FakeGit, FakeNotion, repo, textOf } from "./helpers.ts";

const W = "wiki/shattered-sea";
const PARENT = "3f102166-35ec-8117-af9c-d05f042eea59";
const A = "aaaaaaa000000000000000000000000000000000";
const B = "bbbbbbb000000000000000000000000000000000";
const C = "ccccccc000000000000000000000000000000000";
const ILSE = `${W}/NPCs/Ilse Corran.md`;
const MAP_PNG = `${W}/attachments/Map.png`;

function campaign(): string {
	return repo({
		[`${W}/hot.md`]: "---\ntitle: hot\n---\n# Hot\n\nThe party meets [[Ilse Corran|Ilse]].\n\n![[Map.png]]\n",
		[ILSE]: "---\ntitle: Ilse Corran\ntype: NPC\n---\n\n> [!narration] First look\n> A tall woman.\n",
		[MAP_PNG]: Buffer.from("png bytes"),
		[`${W}/attachments/Token.png`]: Buffer.from("token bytes"),
		".agents/skills/npc-design/SKILL.md": "# NPC design\n",
		".agents/skills/npc-design/evals/cases.yaml": "cases: []\n",
	});
}

/** A first full run at commit A: the tree, the map and the fake git that remembers A's hashes. */
async function synced() {
	const root = campaign();
	const map = emptyMap(PARENT);
	const api = new FakeNotion();
	const git = new FakeGit();
	await backup(root, map, api, { kind: "all" }, { commit: A, git });
	api.calls = [];
	return { root, map, api, git, original: structuredClone(map) };
}

const live = (api: FakeNotion): number => [...api.pages.values()].filter((p) => !p.inTrash).length;
const titles = (api: FakeNotion): string[] => [...api.pages.values()].filter((p) => !p.inTrash).map((p) => `${p.parent}/${p.title}`);
const noDuplicates = (api: FakeNotion): void => expect(new Set(titles(api)).size).toBe(titles(api).length);

describe("the map is a cache: Notion is the record", () => {
	it("a deleted map is rebuilt from Notion one-for-one: no page created, written or uploaded", async () => {
		const { root, api, git, original } = await synced();
		const before = live(api);
		const map = emptyMap(PARENT);
		const { result, reconciled } = await backup(root, map, api, { kind: "all" }, { commit: B, git });
		expect(result).toMatchObject({ created: 0, written: 0, uploaded: 0, failures: [] });
		expect(reconciled.adopted.length).toBe(Object.keys(original.entries).length);
		expect(map.root).toEqual(original.root);
		expect(map.entries).toEqual(original.entries);
		expect(api.ops().filter((op) => op !== "update")).toEqual([]);
		expect(live(api)).toBe(before);
		noDuplicates(api);
	});

	it("a partial map (a folder, a page and an image missing, an upload id lost) is filled in, reusing the upload", async () => {
		const { root, map, api, git, original } = await synced();
		delete map.entries[`${W}/NPCs`];
		delete map.entries[ILSE];
		delete map.entries[MAP_PNG];
		delete map.entries[`${W}/attachments/Token.png`]?.fileUploadId;
		const { result, reconciled } = await backup(root, map, api, { kind: "all" }, { commit: B, git });
		expect(result).toMatchObject({ created: 0, written: 0, uploaded: 0 });
		expect(reconciled.adopted.sort()).toEqual([`${W}/NPCs`, ILSE, MAP_PNG].sort());
		expect(reconciled.uploadsReused).toBe(2);
		expect(map.entries).toEqual(original.entries);
		expect(api.calls).toEqual([]);
	});

	it("a stale entry pointing at a page id Notion never had is corrected from the page's marker", async () => {
		const { root, map, api, git, original } = await synced();
		const real = map.entries[ILSE]?.id;
		map.entries[ILSE] = { kind: "markdown", id: "p999", url: "https://www.notion.so/p999", hash: "stale" };
		const { result, reconciled } = await backup(root, map, api, { kind: "all" }, { commit: B, git });
		expect(reconciled.adopted).toEqual([ILSE]);
		expect(map.entries[ILSE]).toEqual(original.entries[ILSE]);
		expect(map.entries[ILSE]?.id).toBe(real);
		expect(result.created).toBe(0);
		noDuplicates(api);
	});

	it("an entry whose page was trashed is dropped and the page made again, once", async () => {
		const { root, map, api, git } = await synced();
		const old = map.entries[ILSE]?.id ?? "";
		await api.trash(old);
		api.calls = [];
		const { result, reconciled } = await backup(root, map, api, { kind: "all" }, { commit: B, git });
		expect(reconciled.dropped).toEqual([ILSE]);
		expect(result.created).toBe(1);
		expect(map.entries[ILSE]?.id).not.toBe(old);
		expect(api.all("Ilse Corran")).toHaveLength(1);
		// A rerun changes nothing.
		api.calls = [];
		const again = await backup(root, map, api, { kind: "all" }, { commit: C, git });
		expect(again.result.created).toBe(0);
		expect(api.calls).toEqual([]);
	});

	it("adopts an orphan left by a run stopped between creating a page and saving the map", async () => {
		const { root, map, api, git } = await synced();
		const path = `${W}/NPCs/Geoffrey Draves.md`;
		writeFileSync(join(root, path), "---\ntitle: Geoffrey Draves\n---\nGeoffrey\n");
		// The page exists in Notion, born with its pending header; the map never heard of it.
		const orphan = api.add(map.entries[`${W}/NPCs`]?.id ?? "", "Geoffrey Draves", [pendingHeader(path)]);
		const { result, reconciled } = await backup(root, map, api, { kind: "all" }, { commit: B, git });
		expect(reconciled.adopted).toEqual([path]);
		expect(result.created).toBe(0);
		expect(result.written).toBe(1);
		expect(map.entries[path]?.id).toBe(orphan);
		expect(textOf(api.pages.get(orphan)?.blocks ?? [])).toContain("Geoffrey");
		expect(api.all("Geoffrey Draves")).toHaveLength(1);
	});

	it("adopts an unmarked empty page (made before pages carried markers) by its title in the right folder", async () => {
		const { root, map, api, git } = await synced();
		const path = `${W}/NPCs/geoffrey-draves.md`;
		writeFileSync(join(root, path), "---\ntitle: Geoffrey Draves\n---\nGeoffrey\n");
		const orphan = api.add(map.entries[`${W}/NPCs`]?.id ?? "", "Geoffrey Draves");
		const { result } = await backup(root, map, api, { kind: "all" }, { commit: B, git });
		expect(result.created).toBe(0);
		expect(map.entries[path]?.id).toBe(orphan);
		expect(api.all("Geoffrey Draves")).toHaveLength(1);
	});

	it("a page stopped mid-write (pending header) is rewritten even when the map is lost", async () => {
		const { root, api, git } = await synced();
		const id = api.byTitle("Ilse Corran")?.id ?? "";
		const page = api.pages.get(id);
		if (page) Object.assign(page, { blocks: [pendingHeader(ILSE)], blockIds: ["bx"] });
		const map = emptyMap(PARENT);
		const { result } = await backup(root, map, api, { kind: "all" }, { commit: B, git });
		expect(result).toMatchObject({ created: 0, written: 1 });
		expect(textOf(api.pages.get(id)?.blocks ?? [])).toContain("A tall woman.");
		expect(textOf(api.pages.get(id)?.blocks.slice(0, 1) ?? [])).toContain(" at bbbbbbb.");
	});

	it("never creates a second root: an empty duplicate root is trashed, the map's root kept", async () => {
		const { root, map, api, git } = await synced();
		const extra = api.add(PARENT, ROOT_TITLE, [rootCallout()]);
		const { result, reconciled } = await backup(root, map, api, { kind: "all" }, { commit: B, git });
		expect(reconciled.duplicates).toEqual([{ path: "(backup root)", kept: map.root?.id, extras: [{ id: extra, action: "trashed (empty)" }] }]);
		expect(api.pages.get(extra)?.inTrash).toBe(true);
		expect(api.ops().filter((op) => op === "create")).toEqual([]);
		expect(result.created).toBe(0);
	});

	it("with the map lost and two roots, keeps the fuller one and leaves the other (with pages) in place, reported", async () => {
		const { root, api, git, original } = await synced();
		const older = api.add(PARENT, ROOT_TITLE, [rootCallout()], { createdTime: api.time(3600) });
		api.add(older, "stray", [pendingHeader(`${W}/stray.md`)]);
		const map = emptyMap(PARENT);
		const { result, reconciled } = await backup(root, map, api, { kind: "all" }, { commit: B, git });
		expect(map.root?.id).toBe(original.root?.id);
		expect(reconciled.duplicates).toEqual([{ path: "(backup root)", kept: original.root?.id, extras: [{ id: older, action: "left in place" }] }]);
		expect(api.pages.get(older)?.inTrash).toBe(false);
		expect(result.created).toBe(0);
	});

	it("a run with no root in the map refuses to create one unless Notion was checked and had none", async () => {
		const root = campaign();
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		const walk = walkBackup(root);
		const options = { walk, map, plan: planBackup(walk, map, { kind: "all" }), api, sourceUrl: () => undefined, save: () => {}, lfsPull: async () => {}, log: () => {} };
		await expect(runBackup({ ...options, reconciled: { rootAbsent: false } })).rejects.toThrow(/second root/);
		expect(api.calls).toEqual([]);
	});

	it("two pages for one path: the map's is kept; an empty copy is trashed, a copy with content is reported and left", async () => {
		const { root, map, api, git } = await synced();
		const folder = map.entries[`${W}/NPCs`]?.id ?? "";
		const shell = api.add(folder, "Ilse Corran", [pendingHeader(ILSE)]);
		const full = api.add(folder, "Ilse Corran", [headerBlock(ILSE, A, `https://github.com/o/r/blob/${A}/x`), { object: "block", type: "paragraph", paragraph: { rich_text: [] } }]);
		const { result, reconciled } = await backup(root, map, api, { kind: "all" }, { commit: B, git });
		expect(reconciled.duplicates).toEqual([
			{
				path: ILSE,
				kept: map.entries[ILSE]?.id,
				extras: expect.arrayContaining([
					{ id: shell, action: "trashed (empty)" },
					{ id: full, action: "left in place" },
				]),
			},
		]);
		expect(api.pages.get(shell)?.inTrash).toBe(true);
		expect(api.pages.get(full)?.inTrash).toBe(false);
		expect(result.created).toBe(0);
		// The next run reports the copy again and still adds nothing.
		const again = await backup(root, map, api, { kind: "all" }, { commit: C, git });
		expect(again.reconciled.duplicates.map((d) => d.path)).toEqual([ILSE]);
		expect(again.result.created).toBe(0);
		expect(api.all("Ilse Corran")).toHaveLength(2);
	});

	it("a concurrent run that made the same new page first wins: this run trashes its copy, stops, and the rerun adopts", async () => {
		const { root, map, api, git } = await synced();
		const path = `${W}/NPCs/Geoffrey Draves.md`;
		writeFileSync(join(root, path), "---\ntitle: Geoffrey Draves\n---\nGeoffrey\n");
		let theirs = "";
		api.onCreate = ({ parent, title }) => {
			if (title !== "Geoffrey Draves" || theirs) return;
			theirs = api.add(parent, title, [pendingHeader(path)], { createdTime: api.time(60) });
		};
		await expect(backup(root, map, api, { kind: "all" }, { commit: B, git })).rejects.toBeInstanceOf(ConcurrentRunError);
		api.onCreate = undefined;
		expect(api.all("Geoffrey Draves").map((p) => p.id)).toEqual([theirs]);
		const { result } = await backup(root, map, api, { kind: "all" }, { commit: B, git });
		expect(result.created).toBe(0);
		expect(map.entries[path]?.id).toBe(theirs);
		expect(api.all("Geoffrey Draves")).toHaveLength(1);
	});

	it("gives old folder pages their marker once, and finds unmarked folders by title when the map is lost", async () => {
		const { root, api, git, original } = await synced();
		// Folder pages made before markers: no first block.
		for (const [path, e] of Object.entries(original.entries)) {
			const page = api.pages.get(e.id);
			if (e.kind === "dir" && page) Object.assign(page, { blocks: [], blockIds: [] });
			expect(path).toBeTruthy();
		}
		const dirs = Object.values(original.entries).filter((e) => e.kind === "dir").length;
		const map = emptyMap(PARENT);
		const first = await backup(root, map, api, { kind: "all" }, { commit: B, git });
		expect(first.reconciled.markersAdded).toBe(dirs);
		expect(first.result.created).toBe(0);
		expect(map.entries).toEqual(original.entries);
		api.calls = [];
		const second = await backup(root, map, api, { kind: "all" }, { commit: C, git });
		expect(second.reconciled.markersAdded).toBe(0);
		expect(api.calls).toEqual([]);
	});

	it("a page flagged deleted from the repo is adopted as deleted when the map is lost, not flagged again", async () => {
		const { root, map, api, git } = await synced();
		rmSync(join(root, ILSE));
		await backup(root, map, api, { kind: "all" }, { commit: B, git });
		const flagged = structuredClone(map.entries[ILSE]);
		expect(flagged?.deletedAt).toBe("2026-10-07");
		api.calls = [];
		const lost: BackupMap = emptyMap(PARENT);
		const { result } = await backup(root, lost, api, { kind: "all" }, { commit: C, git });
		expect(lost.entries[ILSE]).toEqual(flagged);
		expect(result).toMatchObject({ created: 0, deleted: 0 });
		expect(api.calls).toEqual([]);
	});

	it("an empty parent gets exactly one root, and a rerun with the map deleted finds it rather than making another", async () => {
		const root = campaign();
		const api = new FakeNotion();
		const git = new FakeGit();
		await backup(root, emptyMap(PARENT), api, { kind: "all" }, { commit: A, git });
		await backup(root, emptyMap(PARENT), api, { kind: "all" }, { commit: B, git });
		await backup(root, emptyMap(PARENT), api, { kind: "all" }, { commit: C, git });
		expect(api.all(ROOT_TITLE)).toHaveLength(1);
		expect(api.ops().filter((op) => op === "create").length).toBe(Object.keys(walkBackup(root).dirs).length + walkBackup(root).files.length + 1);
		noDuplicates(api);
	});
});
