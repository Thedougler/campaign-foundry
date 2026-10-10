import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { walkBackup } from "../../src/backup/files.ts";
import { type BackupMap, emptyMap } from "../../src/backup/map.ts";
import { notionClient, throttle } from "../../src/backup/notion.ts";
import { dirMarker, pendingHeader, rootCallout } from "../../src/backup/markers.ts";
import { estimate, linkIndex, planBackup, type Scope } from "../../src/backup/sync.ts";
import { backup, FakeNotion, lfsPointer, repo, textOf } from "./helpers.ts";

const W = "wiki/shattered-sea";
const PARENT = "3f102166-35ec-8117-af9c-d05f042eea59";
const ALL: Scope = { kind: "all" };

function campaign(): string {
	return repo({
		[`${W}/hot.md`]: "---\ntitle: hot\n---\n# Hot\n\nThe party meets [[Ilse Corran|Ilse]].\n\n![[Map.png]]\n",
		[`${W}/NPCs/Ilse Corran.md`]: "---\ntitle: Ilse Corran\ntype: NPC\n---\n\n> [!narration] First look\n> A tall woman.\n",
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
		// The converter produced this paragraph from the fixture's prose after its frontmatter and heading.
		const paragraph = hot[3]?.paragraph as { rich_text: { text: { content: string; link?: { url: string } } }[] };
		const link = paragraph.rich_text.find((r) => r.text.content === "Ilse");
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
		writeFileSync(join(root, W, "NPCs/Ilse Corran.md"), "---\ntitle: Ilse Corran\n---\nIlse, rewritten.\n");
		writeFileSync(join(root, W, "hot.md"), "---\ntitle: hot\n---\nchanged but not in this diff\n");
		api.calls = [];
		await run(root, map, api, { kind: "diff", base: "c0ffee", changed: new Set([`${W}/NPCs/Ilse Corran.md`]), deleted: new Set(), renamed: new Map() }, { commit: "d00d" });
		// Emptied, written under a pending header, then the header names the commit: a run stopped midway is rewritten.
		expect(api.calls.map((c) => c.op)).toEqual(["clear", "append", "update"]);
		expect(api.calls[0]?.id).toBe(ilse?.id);
		expect(map.entries[`${W}/NPCs/Ilse Corran.md`]?.id).toBe(ilse?.id);
		expect(textOf(api.pages.get(ilse?.id ?? "")?.blocks ?? [])).toContain("Ilse, rewritten.");
		expect(map.syncedCommit).toBe("d00d");
	});

	it("keeps slug identity while updating a Wiki title, then preserves the last title on deletion", async () => {
		const path = `${W}/NPCs/ilse-corran.md`;
		const root = repo({ [path]: "---\ntitle: Captain Ilse\n---\nA tall woman.\n" });
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		await run(root, map, api);
		const id = map.entries[path]?.id ?? "";
		expect(api.pages.get(id)?.title).toBe("Captain Ilse");
		writeFileSync(join(root, path), "---\ntitle: Admiral Ilse\n---\nA tall woman.\n");
		await run(root, map, api);
		expect(map.entries[path]).toMatchObject({ id, title: "Admiral Ilse" });
		expect(api.pages.get(id)?.title).toBe("Admiral Ilse");
		rmSync(join(root, path));
		await run(root, map, api);
		expect(api.pages.get(id)?.title).toBe("Admiral Ilse (deleted from repo)");
	});

	it("resolves titles before aliases and keeps slug paths as identity rather than display names", () => {
		const named = `${W}/NPCs/ilse-corran.md`;
		const alias = `${W}/NPCs/a.md`;
		const root = repo({
			[named]: "---\ntitle: Captain Ilse\naliases: [Ilse]\n---\n",
			[alias]: "---\ntitle: Other captain\naliases: [Captain Ilse]\n---\n",
		});
		const index = linkIndex(walkBackup(root).files);
		expect(index.page("Captain Ilse")).toBe(named);
		expect(index.page("Ilse")).toBe(named);
		expect(index.page("ilse-corran")).toBe(named);
		expect(index.page("shattered-sea/NPCs/ilse-corran")).toBe(named);
		expect(index.page("Ilse Corran")).toBeUndefined();
	});
	it("creates a new file's page in a push and flags a deleted file's page without trashing it", async () => {
		const root = campaign();
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		await run(root, map, api);
		const ilseId = map.entries[`${W}/NPCs/Ilse Corran.md`]?.id ?? "";
		rmSync(join(root, W, "NPCs/Ilse Corran.md"));
		writeFileSync(join(root, W, "NPCs/Geoffrey Draves.md"), "---\ntitle: Geoffrey Draves\n---\nGeoffrey\n");
		api.calls = [];
		await run(root, map, api, { kind: "diff", base: "c0ffee", changed: new Set([`${W}/NPCs/Geoffrey Draves.md`]), deleted: new Set([`${W}/NPCs/Ilse Corran.md`]), renamed: new Map() });
		expect(api.byTitle("Geoffrey Draves")?.parent).toBe(map.entries[`${W}/NPCs`]?.id);
		const ilse = api.pages.get(ilseId);
		expect(ilse?.title).toBe("Ilse Corran (deleted from repo)");
		expect(ilse?.blocks[0]?.type).toBe("callout");
		expect(textOf(ilse?.blocks ?? [])).toContain("A tall woman.");
		expect(map.entries[`${W}/NPCs/Ilse Corran.md`]).toMatchObject({ id: ilseId, deletedAt: "2026-10-07" });
		expect(api.ops()).not.toContain("trash");

		// Restoring the file revives the same page.
		writeFileSync(join(root, W, "NPCs/Ilse Corran.md"), "---\ntitle: Ilse Corran\n---\nIlse is back.\n");
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
			[`${W}/hot.md`]: "---\ntitle: hot\n---\n# Hot\n",
			[`${W}/NPCs/Ilse Corran.md`]: "---\ntitle: Ilse Corran\ntype: NPC\n---\n\nA tall woman.\n",
			[`${W}/PCs/Tam.md`]: "---\ntitle: Tam\ntype: PC\n---\n\nA ferry pilot.\n",
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
		const entry = (id: string, kind: "dir" | "markdown", movedFrom: string): BackupMap["entries"][string] => ({ kind, id, url: `https://www.notion.so/${id}`, movedFrom });
		map.entries["wiki"] = { kind: "dir", id: wikiId, url: `https://www.notion.so/${wikiId}` };
		map.entries[W] = entry(folderId, "dir", "wiki/The Shattered Sea");
		map.entries[`${W}/NPCs`] = entry(npcsId, "dir", "wiki/The Shattered Sea/NPCs");
		map.entries[`${W}/PCs`] = entry(pcsId, "dir", "wiki/The Shattered Sea/Shattered Sea/PCs");
		map.entries[`${W}/hot.md`] = entry(hotId, "markdown", "wiki/The Shattered Sea/hot.md");
		map.entries[`${W}/log.md`] = entry(logId, "markdown", "gone/Old/log.md");
		map.entries[`${W}/PCs/Tam.md`] = entry(tamId, "markdown", "wiki/The Shattered Sea/Shattered Sea/PCs/Tam.md");
		map.entries["wiki/The Shattered Sea/Shattered Sea"] = { kind: "dir", id: retiredId, url: `https://www.notion.so/${retiredId}` };

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

	it("a push that renames and moves a file moves its page and rewrites it, leaving no flagged copy, and trashes the emptied folder", async () => {
		const root = campaign();
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		await run(root, map, api);
		const ilseId = map.entries[`${W}/NPCs/Ilse Corran.md`]?.id ?? "";
		const npcsId = map.entries[`${W}/NPCs`]?.id ?? "";
		const from = `${W}/NPCs/Ilse Corran.md`;
		const to = `${W}/People/ilse-corran.md`;
		rmSync(join(root, from));
		rmSync(join(root, W, "NPCs"), { recursive: true });
		writeFileSync(join(root, W, "hot.md"), "---\ntitle: hot\n---\n# Hot\n");
		mkdirSync(join(root, W, "People"));
		writeFileSync(join(root, to), "---\ntitle: Captain Ilse\ntype: NPC\n---\n\nA tall woman.\n");
		api.calls = [];
		const { result } = await run(root, map, api, { kind: "diff", base: "c0ffee", changed: new Set([to, `${W}/hot.md`]), deleted: new Set([from]), renamed: new Map([[from, to]]) });

		expect(result.failures).toEqual([]);
		expect(result).toMatchObject({ created: 1, moved: 1, retired: 1, deleted: 0 });
		const ilse = api.pages.get(ilseId);
		expect(ilse?.parent).toBe(map.entries[`${W}/People`]?.id);
		expect(ilse?.title).toBe("Captain Ilse");
		expect(textOf(ilse?.blocks ?? [])).toContain(to);
		expect(map.entries[to]).toMatchObject({ id: ilseId });
		expect(map.entries[to]?.movedFrom).toBeUndefined();
		expect(map.entries[from]).toBeUndefined();
		expect([...api.pages.values()].some((p) => p.title.endsWith("(deleted from repo)"))).toBe(false);
		expect(api.pages.get(npcsId)?.inTrash).toBe(true);
		expect(map.entries[`${W}/NPCs`]).toBeUndefined();
	});

	it("trashes the copy a rename left beside the file's live page, whether flagged deleted or left live by a failed run", async () => {
		const root = campaign();
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		await run(root, map, api);
		const from = `${W}/NPCs/Ilse Corran.md`;
		const to = `${W}/NPCs/ilse-corran.md`;
		const oldId = map.entries[from]?.id ?? "";
		const source = readFileSync(join(root, from));
		rmSync(join(root, from));
		writeFileSync(join(root, to), source);
		// An older run that did not follow renames: a new page for the new path, the old one flagged.
		await run(root, map, api, { kind: "diff", base: "c0ffee", changed: new Set([to]), deleted: new Set([from]), renamed: new Map() });
		const newId = map.entries[to]?.id ?? "";
		expect(api.pages.get(oldId)?.title).toBe("Ilse Corran (deleted from repo)");
		// A failed run's leftover: another renamed file whose old page was never flagged.
		const hot = map.entries[`${W}/hot.md`]?.id ?? "";
		writeFileSync(join(root, W, "hot-2.md"), readFileSync(join(root, W, "hot.md")));
		await run(root, map, api, { kind: "diff", base: "c0ffee", changed: new Set([`${W}/hot-2.md`]), deleted: new Set(), renamed: new Map() });
		rmSync(join(root, W, "hot.md"));

		const { result } = await run(root, map, api, { kind: "diff", base: "c0ffee", changed: new Set([to, `${W}/hot-2.md`]), deleted: new Set([from, `${W}/hot.md`]), renamed: new Map([[from, to], [`${W}/hot.md`, `${W}/hot-2.md`]]) });

		expect(result.failures).toEqual([]);
		expect(result).toMatchObject({ superseded: 2, deleted: 0, created: 0 });
		expect(api.pages.get(oldId)?.inTrash).toBe(true);
		expect(api.pages.get(hot)?.inTrash).toBe(true);
		expect(api.pages.get(newId)?.inTrash).toBe(false);
		expect(map.entries[from]).toBeUndefined();
		expect(map.entries[`${W}/hot.md`]).toBeUndefined();
	});

	it("a full run pairs a vanished file with a new path holding the same content, and leaves ambiguous pairs to delete and add", async () => {
		const root = campaign();
		writeFileSync(join(root, W, "twin-a.md"), "---\ntitle: Twin\n---\nsame\n");
		writeFileSync(join(root, W, "twin-b.md"), "---\ntitle: Twin\n---\nsame\n");
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		await run(root, map, api);
		const ilseId = map.entries[`${W}/NPCs/Ilse Corran.md`]?.id ?? "";
		const source = readFileSync(join(root, W, "NPCs/Ilse Corran.md"));
		rmSync(join(root, W, "NPCs/Ilse Corran.md"));
		writeFileSync(join(root, W, "NPCs/ilse-corran.md"), source);
		rmSync(join(root, W, "twin-a.md"));
		rmSync(join(root, W, "twin-b.md"));
		writeFileSync(join(root, W, "twin-c.md"), "---\ntitle: Twin\n---\nsame\n");
		writeFileSync(join(root, W, "twin-d.md"), "---\ntitle: Twin\n---\nsame\n");
		const { result } = await run(root, map, api, ALL);

		expect(result.failures).toEqual([]);
		expect(map.entries[`${W}/NPCs/ilse-corran.md`]?.id).toBe(ilseId);
		expect(map.entries[`${W}/NPCs/Ilse Corran.md`]).toBeUndefined();
		expect(result).toMatchObject({ moved: 1, created: 2, deleted: 2 });
	});

	it("a deleted folder holding flagged pages is flagged too, never trashed, and comes back with its folder", async () => {
		const root = campaign();
		const map = emptyMap(PARENT);
		const api = new FakeNotion();
		await run(root, map, api);
		const evalsId = map.entries[".agents/skills/npc-design/evals"]?.id ?? "";
		const skillId = map.entries[".agents/skills/npc-design"]?.id ?? "";
		rmSync(join(root, ".agents/skills/npc-design"), { recursive: true });
		const { result } = await run(root, map, api, ALL);

		expect(result.failures).toEqual([]);
		expect(api.pages.get(evalsId)?.title).toBe("evals (deleted from repo)");
		expect(api.pages.get(skillId)?.title).toBe("npc-design (deleted from repo)");
		expect(api.ops()).not.toContain("trash");
		expect(map.entries[".agents/skills/npc-design"]?.deletedAt).toBe("2026-10-07");

		mkdirSync(join(root, ".agents/skills/npc-design"));
		writeFileSync(join(root, ".agents/skills/npc-design/SKILL.md"), "# NPC design\n");
		await run(root, map, api, ALL);
		expect(api.pages.get(skillId)?.title).toBe("npc-design");
		expect(api.pages.get(skillId)?.blocks.some((b) => b.type === "callout")).toBe(false);
		expect(map.entries[".agents/skills/npc-design"]?.deletedAt).toBeUndefined();
		expect(api.byTitle("SKILL")?.parent).toBe(skillId);
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

describe("notion client write retries", () => {
	const edge502 = (): Response => new Response("<html>bad gateway</html>", { status: 502, headers: { "content-type": "text/html", "cf-ray": "abc-IAD" } });
	const api500 = (): Response => new Response(JSON.stringify({ object: "error", status: 500, code: "internal_server_error", message: "boom", request_id: "r1" }), { status: 500, headers: { "content-type": "application/json" } });
	const page = (): Response => new Response(JSON.stringify({ object: "page", id: "p1", url: "https://www.notion.so/p1", created_time: "2026-10-07T12:00:00.000Z" }), { headers: { "content-type": "application/json" } });
	const client = (responses: (() => Response)[]) => {
		const sent: string[] = [];
		const fake = (async (url: string, init?: RequestInit) => {
			sent.push(`${init?.method} ${new URL(url).pathname}`);
			return (responses.shift() ?? page)();
		}) as unknown as typeof fetch;
		return { sent, api: notionClient("t", { fetch: fake, intervalMs: 0, sleep: async () => {} }) };
	};

	it("resends an idempotent write after a server error, and a create only when the edge proxy answered", async () => {
		const retitle = client([api500, edge502]);
		await retitle.api.retitle("p1", "Ilse", "📄");
		expect(retitle.sent).toHaveLength(3);

		const created = client([edge502]);
		expect((await created.api.createPage("parent", "Ilse", "📄")).id).toBe("p1");
		expect(created.sent).toHaveLength(2);

		// The API itself failed a create: it may have made the page, so it is not sent twice.
		const failed = client([api500]);
		await expect(failed.api.createPage("parent", "Ilse", "📄")).rejects.toThrow("boom");
		expect(failed.sent).toHaveLength(1);
	});

	it("gives up on a write after five attempts", async () => {
		const down = client(Array.from({ length: 10 }, () => edge502));
		await expect(down.api.retitle("p1", "Ilse", "📄")).rejects.toThrow(/502/);
		expect(down.sent).toHaveLength(5);
	});
});

