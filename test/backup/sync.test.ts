import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { walkBackup } from "../../src/backup/files.ts";
import { type BackupMap, emptyMap } from "../../src/backup/map.ts";
import { throttle } from "../../src/backup/notion.ts";
import { estimate, planBackup, runBackup, type Scope } from "../../src/backup/sync.ts";
import { FakeNotion, lfsPointer, repo, textOf } from "./helpers.ts";

const W = "wiki/The Shattered Sea";
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

async function run(root: string, map: BackupMap, api: FakeNotion, scope: Scope = ALL, extra: { commit?: string; saves?: BackupMap[]; pulled?: string[][]; pullFails?: boolean } = {}) {
	const walk = walkBackup(root);
	const plan = planBackup(walk, map, scope);
	const result = await runBackup({
		walk,
		map,
		plan,
		api,
		commit: extra.commit ?? "c0ffee0000000000000000000000000000000000",
		sourceUrl: (p) => `https://github.com/o/r/blob/main/${p}`,
		save: (m) => extra.saves?.push(structuredClone(m)),
		lfsPull: async (paths) => {
			if (extra.pullFails) throw new Error("git lfs pull failed: batch response: rate limit exceeded");
			extra.pulled?.push(paths);
		},
		log: () => {},
		now: () => new Date("2026-10-07T12:00:00Z"),
	});
	return { plan, result };
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
		const world = api.byTitle("The Shattered Sea");
		const npcs = api.byTitle("NPCs");
		expect(wiki?.parent).toBe(rootPage?.id);
		expect(world?.parent).toBe(wiki?.id);
		expect(npcs?.parent).toBe(world?.id);
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
		// New pages are written without a clear; the header names the source.
		expect(api.ops()).not.toContain("clear");
		expect(textOf((api.byTitle("Ilse Corran")?.blocks ?? []).slice(0, 1))).toContain(`${W}/NPCs/Ilse Corran.md`);
		expect(api.byTitle("cases.yaml")?.blocks[1]?.type).toBe("code");
	});

	it("a rerun with nothing changed makes no Notion calls", async () => {
		const root = campaign();
		const map = emptyMap(PARENT);
		await run(root, map, new FakeNotion());
		const api = new FakeNotion();
		const { plan } = await run(root, map, api);
		expect(plan).toMatchObject({ createRoot: false, createDirs: [], createFiles: [], writeFiles: [], deletePaths: [] });
		expect(api.calls).toEqual([]);
	});

	it("a push rewrites only the changed files the diff names, in place at the recorded URL", async () => {
		const root = campaign();
		const map = emptyMap(PARENT);
		const first = new FakeNotion();
		await run(root, map, first);
		const ilse = map.entries[`${W}/NPCs/Ilse Corran.md`];
		writeFileSync(join(root, W, "NPCs/Ilse Corran.md"), "Ilse, rewritten.\n");
		writeFileSync(join(root, W, "hot.md"), "changed but not in this diff\n");
		const api = new FakeNotion();
		Object.assign(api, { pages: first.pages });
		await run(root, map, api, { kind: "diff", base: "c0ffee", changed: new Set([`${W}/NPCs/Ilse Corran.md`]), deleted: new Set() }, { commit: "d00d" });
		expect(api.calls.map((c) => [c.op, c.id])).toEqual([
			["clear", ilse?.id],
			["append", ilse?.id],
		]);
		expect(map.entries[`${W}/NPCs/Ilse Corran.md`]?.id).toBe(ilse?.id);
		expect(textOf(first.pages.get(ilse?.id ?? "")?.blocks ?? [])).toContain("Ilse, rewritten.");
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
});

describe("throttle", () => {
	it("spaces request starts by the interval", async () => {
		const waits: number[] = [];
		const fake = (async () => new Response("{}")) as unknown as typeof fetch;
		const t = throttle(fake, 350, async (ms) => {
			waits.push(ms);
		});
		await Promise.all([t("a"), t("b"), t("c")]);
		expect(waits.length).toBe(2);
		expect(waits[0]).toBeGreaterThan(300);
		expect(waits[1]).toBeGreaterThan(650);
	});
});

