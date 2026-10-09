import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { walkBackup } from "../../src/backup/files.ts";
import { type BackupMap, emptyMap } from "../../src/backup/map.ts";
import { throttle } from "../../src/backup/notion.ts";
import { dirMarker, pendingHeader, rootCallout } from "../../src/backup/markers.ts";
import { estimate, planBackup, type Scope } from "../../src/backup/sync.ts";
import { backup, FakeNotion, lfsPointer, repo, textOf } from "./helpers.ts";

const W = "wiki/shattered-sea";
const PARENT = "3f102166-35ec-8117-af9c-d05f042eea59";
const ALL: Scope = { kind: "all" };

function campaign(): string {
	return repo({
		[`${W}/hot.md`]: "# Hot\n\nThe party meets [[Ilse Corran|Ilse]].\n\n![[Map.png]]\n",
		[`${W}/NPCs/Ilse Corran.md`]: "---\ntype: NPC\n---\n\n> [!narration] First look\n> A tall woman.\n",
		[`${W}/attachments/Map.png`]: Buffer.from("png bytes"),
		".agents/skills/npc-design/SKILL.md": "# NPC design\n",
		".agents/skills/npc-design/evals/cases.yaml": "cases: []\n",
	});
}

async function run(root: string, map: BackupMap, api: FakeNotion, scope: Scope = ALL, extra: Parameters<typeof backup>[4] = {}) {
	return backup(root, map, api, scope, extra);
}

describe("backup sync", () => {
	it("first run: builds the tree under a new root, uploads images, links pages, records every URL", async () => {
		const root = campaign();
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		const { result } = await run(root, map, api);
		expect(result.failures).toEqual([]);
		const rootPage = api.byTitle("campaign-foundry backup");
		expect(rootPage?.parent).toBe(PARENT);
		expect(map.root?.id).toBe(rootPage?.id);
		// Directory names become parent pages, mirroring repo paths.
		const wiki = api.byTitle("wiki");
		const folder = api.byTitle("shattered-sea");
		const npcs = api.byTitle("NPCs");
		expect(wiki?.parent).toBe(rootPage?.id);
		expect(folder?.parent).toBe(wiki?.id);
		expect(npcs?.parent).toBe(folder?.id);
		expect(api.byTitle("Ilse Corran")?.parent).toBe(npcs?.id);
		expect(api.byTitle("skills")?.parent).toBe(api.byTitle(".agents")?.id);
		// Every file and directory is in the map by repo path, with its URL.
		for (const path of [W, `${W}/NPCs`, `${W}/hot.md`, `${W}/NPCs/Ilse Corran.md`, `${W}/attachments/Map.png`, ".agents/skills/npc-design/SKILL.md", ".agents/skills/npc-design/evals/cases.yaml"]) {
			expect(map.entries[path]?.url).toMatch(/^https:\/\/www\.notion\.so\/p\d+$/);
		}
		expect(map.syncedCommit).toBe("c0ffee0000000000000000000000000000000000");
		// The wikilink points at Ilse's page even though hot.md sorts first, and the embed reuses the upload.
		const hot = api.byTitle("hot")?.blocks ?? [];
		const link = (hot[2]?.paragraph as { rich_text: { text: { content: string; link?: { url: string } } }[] }).rich_text.find((r) => r.text.content === "Ilse");
		expect(link?.text.link?.url).toBe(map.entries[`${W}/NPCs/Ilse Corran.md`]?.url);
		const upload = map.entries[`${W}/attachments/Map.png`]?.fileUploadId;
		expect(upload).toBeDefined();
		expect(hot.find((b) => b.type === "image")?.image).toMatchObject({ file_upload: { id: upload } });
		expect(api.byTitle("Map.png")?.blocks.map((b) => b.type)).toEqual(["paragraph", "image"]);
		expect(api.calls.filter((c) => c.op === "upload")).toHaveLength(1);
		// Every page carries its marker: the root its note, a folder its path, a file the header naming path and commit.
		expect(textOf(rootPage?.blocks ?? [])).toContain("An automatic copy of the campaign-foundry repo");
		expect(textOf((npcs?.blocks ?? []).slice(0, 1))).toBe(`Folder |${W}/NPCs| of the campaign-foundry backup.`);
		expect(textOf((api.byTitle("Ilse Corran")?.blocks ?? []).slice(0, 1))).toMatch(new RegExp(`^Backup of \\|${W}/NPCs/Ilse Corran.md\\| at c0ffee0\\.`));
		expect(api.byTitle("cases.yaml")?.blocks[1]?.type).toBe("code");
	});

	it("a rerun with nothing changed only reads Notion: no page created, written or trashed", async () => {
		const root = campaign();
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		await run(root, map, api);
		api.calls = [];
		const { plan, reconciled } = await run(root, map, api);
		expect(plan).toMatchObject({ createRoot: false, createDirs: [], createFiles: [], writeFiles: [], deletePaths: [] });
		expect(reconciled).toMatchObject({ adopted: [], dropped: [], markersAdded: 0, duplicates: [] });
		expect(api.calls).toEqual([]);
	});

	it("a push rewrites only the changed files the diff names, in place at the recorded URL", async () => {
		const root = campaign();
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		await run(root, map, api);
		const ilse = map.entries[`${W}/NPCs/Ilse Corran.md`];
		writeFileSync(join(root, W, "NPCs/Ilse Corran.md"), "Ilse, rewritten.\n");
		writeFileSync(join(root, W, "hot.md"), "changed but not in this diff\n");
		api.calls = [];
		await run(root, map, api, { kind: "diff", base: "c0ffee", changed: new Set([`${W}/NPCs/Ilse Corran.md`]), deleted: new Set() }, { commit: "d00d" });
		// Emptied, written under a pending header, then the header names the commit: a run stopped midway is rewritten.
		expect(api.calls.map((c) => c.op)).toEqual(["clear", "append", "update"]);
		expect(api.calls[0]?.id).toBe(ilse?.id);
		expect(map.entries[`${W}/NPCs/Ilse Corran.md`]?.id).toBe(ilse?.id);
		expect(textOf(api.pages.get(ilse?.id ?? "")?.blocks ?? [])).toContain("Ilse, rewritten.");
		expect(map.syncedCommit).toBe("d00d");
	});

	it("creates a new file's page in a push and flags a deleted file's page without trashing it", async () => {
		const root = campaign();
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		await run(root, map, api);
		const ilseId = map.entries[`${W}/NPCs/Ilse Corran.md`]?.id ?? "";
		rmSync(join(root, W, "NPCs/Ilse Corran.md"));
		writeFileSync(join(root, W, "NPCs/Geoffrey Draves.md"), "Geoffrey\n");
		api.calls = [];
		await run(root, map, api, { kind: "diff", base: "c0ffee", changed: new Set([`${W}/NPCs/Geoffrey Draves.md`]), deleted: new Set([`${W}/NPCs/Ilse Corran.md`]) });
		expect(api.byTitle("Geoffrey Draves")?.parent).toBe(map.entries[`${W}/NPCs`]?.id);
		const ilse = api.pages.get(ilseId);
		expect(ilse?.title).toBe("Ilse Corran (deleted from repo)");
		expect(ilse?.blocks[0]?.type).toBe("callout");
		expect(textOf(ilse?.blocks ?? [])).toContain("A tall woman.");
		expect(map.entries[`${W}/NPCs/Ilse Corran.md`]).toMatchObject({ id: ilseId, deletedAt: "2026-10-07" });
		expect(api.ops()).not.toContain("trash");

		// Restoring the file revives the same page.
		writeFileSync(join(root, W, "NPCs/Ilse Corran.md"), "Ilse is back.\n");
		await run(root, map, api, ALL);
		expect(api.pages.get(ilseId)?.title).toBe("Ilse Corran");
		expect(textOf(api.pages.get(ilseId)?.blocks ?? [])).toContain("Ilse is back.");
		expect(map.entries[`${W}/NPCs/Ilse Corran.md`]?.deletedAt).toBeUndefined();
	});

	it("pulls only the LFS images it uploads, and notes an image over the workspace limit instead of failing", async () => {
		const root = campaign();
		writeFileSync(join(root, W, "attachments/Big.png"), Buffer.alloc(2048, 1));
		writeFileSync(join(root, W, "attachments/Pointer.png"), lfsPointer());
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		api.limit = 1024;
		const pulled: string[][] = [];
		const { result } = await run(root, map, api, ALL, { pulled });
		expect(pulled).toEqual([[`${W}/attachments/Pointer.png`]]);
		expect(map.entries[`${W}/attachments/Big.png`]?.uploadSkipped).toMatch(/over the 0\.0 MB upload limit/);
		expect(textOf(api.byTitle("Big.png")?.blocks ?? [])).toContain("Not uploaded");
		// The pointer was not smudged by the fake pull, so that one image fails and the synced commit holds back.
		expect(result.failures.map((f) => f.path)).toEqual([`${W}/attachments/Pointer.png`]);
		expect(map.syncedCommit).toBeUndefined();
		expect(map.entries[`${W}/attachments/Pointer.png`]?.hash).toBeUndefined();
	});

	it("a failed git lfs pull fails only the pointer images, and the rest of the run still lands", async () => {
		const root = campaign();
		writeFileSync(join(root, W, "attachments/Pointer.png"), lfsPointer());
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		const { result } = await run(root, map, api, ALL, { pullFails: true });
		expect(result.failures.map((f) => f.path)).toEqual([`${W}/attachments/Pointer.png`]);
		expect(map.entries[`${W}/attachments/Map.png`]?.fileUploadId).toBeDefined();
		expect(map.entries[`${W}/hot.md`]?.hash).toBeDefined();
		expect(map.syncedCommit).toBeUndefined();
	});

	it("saves the map after every page it creates, so a run cancelled midway never duplicates a page", async () => {
		const root = campaign();
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		let creates = 0;
		api.failOn = (c) => c.op === "create" && ++creates > 6;
		const saves: BackupMap[] = [];
		const { result } = await run(root, map, api, ALL, { saves });
		expect(result.failures.length).toBeGreaterThan(0);
		const last = saves.at(-1);
		const made = [...api.pages.keys()];
		expect(Object.values(last?.entries ?? {}).map((e) => e.id).concat(last?.root?.id ?? "").sort()).toEqual(made.sort());
		// The next run creates only what is missing.
		api.failOn = undefined;
		api.calls = [];
		await run(root, map, api);
		const titles = [...api.pages.values()].map((p) => p.title);
		expect(new Set(titles).size).toBe(titles.length);
		expect(map.syncedCommit).toBeDefined();
	});

	it("estimates blocks and requests for a dry run without calling Notion", () => {
		const root = campaign();
		const walk = walkBackup(root);
		const map = emptyMap(PARENT);
		const plan = planBackup(walk, map, ALL);
		const est = estimate(walk, map, plan, (f) => readFileSync(f.abs, "utf8"));
		expect(est).toMatchObject({ markdown: 3, text: 1, images: 1, skills: 1, dirs: 8 });
		expect(est.blocks).toBeGreaterThan(5);
		expect(est.requests).toBeGreaterThanOrEqual(2 + 8 + 5 + 5 + 2);
	});

	it("a folder renamed around its children moves only what really changed parents, retitles the folder, retires the emptied one", async () => {
		const root = repo({
			[`${W}/hot.md`]: "# Hot\n",
			[`${W}/NPCs/Ilse Corran.md`]: "---\ntype: NPC\n---\n\nA tall woman.\n",
			[`${W}/PCs/Tam.md`]: "---\ntype: PC\n---\n\nA ferry pilot.\n",
		});
		const api = new FakeNotion();
		// Notion as the failed run left it: the old World folder page became the Campaign folder page (stale
		// title), its kind subfolders stayed put, and the old nested Campaign folder page is emptied of dirs
		// but the rerun must tolerate a page it already moved, and one whose old parent has no map entry.
		const rootId = api.add(PARENT, "campaign-foundry backup", [rootCallout()]);
		const wikiId = api.add(rootId, "wiki", [dirMarker("wiki")]);
		const folderId = api.add(wikiId, "The Shattered Sea", [dirMarker(W)]);
		const npcsId = api.add(folderId, "NPCs", [dirMarker(`${W}/NPCs`)]);
		const retiredId = api.add(folderId, "Shattered Sea", [dirMarker("wiki/The Shattered Sea/Shattered Sea")]);
		const pcsId = api.add(retiredId, "PCs", [dirMarker(`${W}/PCs`)]);
		const tamId = api.add(pcsId, "Tam", [pendingHeader("wiki/The Shattered Sea/Shattered Sea/PCs/Tam.md")]);
		const hotId = api.add(folderId, "hot", [pendingHeader("wiki/The Shattered Sea/hot.md")]);
		const logId = api.add(folderId, "log", [pendingHeader("gone/Old/log.md")]);
		const map = emptyMap(PARENT);
		map.root = { id: rootId, url: `https://www.notion.so/${rootId}` };
		const entry = (id: string, kind: "dir" | "markdown", movedFrom: string, retired?: true): BackupMap["entries"][string] => ({ kind, id, url: `https://www.notion.so/${id}`, movedFrom, ...(retired ? { retired } : {}) });
		map.entries["wiki"] = { kind: "dir", id: wikiId, url: `https://www.notion.so/${wikiId}` };
		map.entries[W] = entry(folderId, "dir", "wiki/The Shattered Sea");
		map.entries[`${W}/NPCs`] = entry(npcsId, "dir", "wiki/The Shattered Sea/NPCs");
		map.entries[`${W}/PCs`] = entry(pcsId, "dir", "wiki/The Shattered Sea/Shattered Sea/PCs");
		map.entries[`${W}/hot.md`] = entry(hotId, "markdown", "wiki/The Shattered Sea/hot.md");
		map.entries[`${W}/log.md`] = entry(logId, "markdown", "gone/Old/log.md");
		map.entries[`${W}/PCs/Tam.md`] = entry(tamId, "markdown", "wiki/The Shattered Sea/Shattered Sea/PCs/Tam.md");
		map.entries["wiki/The Shattered Sea/Shattered Sea"] = { kind: "dir", id: retiredId, url: `https://www.notion.so/${retiredId}`, retired: true };

		const { result } = await backup(root, map, api, ALL);

		expect(result.failures).toEqual([]);
		// Ilse Corran is not in the map, so it is created; the six moved pages all count, whatever moved them.
		expect(result.created).toBe(1);
		expect(result.moved).toBe(6);
		expect(result.retired).toBe(1);
		const moves = api.calls.filter((c) => c.op === "move");
		// No move is sent for a page whose parent page the layout renamed around it: the folder page, NPCs,
		// hot and Tam (his parent page, PCs, is the renamed one). PCs moves out of the retired page for real.
		// Log's old parent has neither a map key nor a rename, so its move is attempted even though it sits
		// in place already — and Notion's same-parent refusal is taken as moved, not a failure.
		expect(moves.map((c) => c.id).sort()).toEqual([logId, pcsId].sort());
		expect(api.calls.some((c) => c.op === "retitle" && c.id === folderId && c.arg === "shattered-sea")).toBe(true);
		expect(api.calls.some((c) => c.op === "trash" && c.id === retiredId)).toBe(true);
		expect(api.pages.get(retiredId)?.inTrash).toBe(true);
		for (const path of [W, `${W}/NPCs`, `${W}/PCs`, `${W}/hot.md`, `${W}/log.md`, `${W}/PCs/Tam.md`]) {
			expect(map.entries[path]?.movedFrom, path).toBeUndefined();
		}
		expect(map.entries["wiki/The Shattered Sea/Shattered Sea"]).toBeUndefined();
	});
});

describe("throttle", () => {
	it("spaces request starts by the interval", async () => {
		const starts: number[] = [];
		const fake = (async () => {
			starts.push(Date.now());
			return new Response("{}");
		}) as unknown as typeof fetch;
		const t = throttle(fake, 350);
		await Promise.all([t("a"), t("b"), t("c")]);
		expect(starts.length).toBe(3);
		// The first goes at once; the other two start a full interval and two after it. Real sleeps and
		// start stamps, because the invariant is the spacing, and late scheduling may only widen it.
		expect(starts[1]! - starts[0]!).toBeGreaterThanOrEqual(340);
		expect(starts[2]! - starts[0]!).toBeGreaterThanOrEqual(690);
	});
});

