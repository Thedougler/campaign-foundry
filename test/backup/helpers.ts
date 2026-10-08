import { mkdirSync, mkdtempSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import type { Block } from "../../src/backup/blocks.ts";
import { walkBackup } from "../../src/backup/files.ts";
import type { BackupMap } from "../../src/backup/map.ts";
import { reconcile } from "../../src/backup/reconcile.ts";
import { planBackup, runBackup, type Scope } from "../../src/backup/sync.ts";
import type { ReadBlock } from "../../src/backup/markers.ts";
import type { CreatedPage, NotionApi, PageInfo, UploadInfo } from "../../src/backup/notion.ts";

export const OID = "a".repeat(64);
export const lfsPointer = (oid = OID, size = 1234): string => `version https://git-lfs.github.com/spec/v1\noid sha256:${oid}\nsize ${size}\n`;

/** Writes `files` (path to content) under a fresh temp repo root and returns it. A value of `{ link }` makes a symlink. */
export function repo(files: Record<string, string | Buffer | { link: string }>): string {
	const root = mkdtempSync(join(tmpdir(), "cf-backup-"));
	for (const [path, content] of Object.entries(files)) {
		const abs = join(root, path);
		mkdirSync(dirname(abs), { recursive: true });
		if (typeof content === "object" && !Buffer.isBuffer(content)) symlinkSync(content.link, abs);
		else writeFileSync(abs, content);
	}
	return root;
}

export interface Call {
	op: string;
	id: string;
	arg?: unknown;
}

export interface FakePage {
	parent: string;
	title: string;
	icon: string;
	blocks: Block[];
	blockIds: string[];
	inTrash: boolean;
	createdTime: string;
}

const WRITES = new Set(["create", "append", "prepend", "update", "clear", "retitle", "trash", "upload"]);

/**
 * An in-memory Notion holding a page tree: pages get ids p1, p2, …, child pages list under their parent, trashed pages
 * drop out of listings. `calls` records writes, `reads` the listing and lookups; `failOn` makes one operation throw and
 * `onCreate` lets a test act as a second run at the moment this one creates a page.
 */
export class FakeNotion implements NotionApi {
	calls: Call[] = [];
	reads: Call[] = [];
	pages = new Map<string, FakePage>();
	uploads = new Map<string, { filename: string; size: number; createdTime: string }>();
	limit: number | undefined = undefined;
	failOn?: (call: Call) => boolean;
	onCreate?: (page: { id: string; parent: string; title: string; children: Block[] }) => void;
	private n = 0;
	private clock = 0;

	private record(call: Call): void {
		if (this.failOn?.(call)) throw new Error(`fake failure on ${call.op} ${call.id}`);
		(WRITES.has(call.op) ? this.calls : this.reads).push(call);
	}

	/** The next creation time; `back` seconds earlier makes a page that predates everything made so far. */
	time(back = 0): string {
		return new Date(Date.UTC(2026, 9, 7, 12, 0, 0) + (this.clock++ - back) * 1000).toISOString();
	}

	/** Puts a page into the tree without recording a call, as something already in Notion (another run, a person). */
	add(parent: string, title: string, blocks: Block[] = [], options: { icon?: string; createdTime?: string } = {}): string {
		const id = `p${++this.n}`;
		this.pages.set(id, { parent, title, icon: options.icon ?? "📄", blocks: [...blocks], blockIds: blocks.map(() => `b${++this.n}`), inTrash: false, createdTime: options.createdTime ?? this.time() });
		return id;
	}

	async createPage(parentId: string, title: string, icon: string, children: Block[] = []): Promise<CreatedPage> {
		this.record({ op: "create", id: parentId, arg: title });
		const id = this.add(parentId, title, children, { icon });
		this.onCreate?.({ id, parent: parentId, title, children });
		return { id, url: `https://www.notion.so/${id}`, createdTime: this.pages.get(id)?.createdTime ?? "" };
	}

	async append(blockId: string, blocks: Block[], atStart = false): Promise<string[]> {
		this.record({ op: atStart ? "prepend" : "append", id: blockId, arg: blocks.length });
		const page = this.pages.get(blockId);
		if (!page) throw new Error(`no page ${blockId}`);
		const ids = blocks.map(() => `b${++this.n}`);
		page.blocks = atStart ? [...blocks, ...page.blocks] : [...page.blocks, ...blocks];
		page.blockIds = atStart ? [...ids, ...page.blockIds] : [...page.blockIds, ...ids];
		return ids;
	}

	async updateBlock(blockId: string, block: Block): Promise<void> {
		this.record({ op: "update", id: blockId });
		for (const page of this.pages.values()) {
			const i = page.blockIds.indexOf(blockId);
			if (i >= 0) {
				page.blocks[i] = block;
				return;
			}
		}
		throw new Error(`no block ${blockId}`);
	}

	async move(pageId: string, parentId: string): Promise<void> {
		this.record({ op: "move", id: pageId, arg: parentId });
		const page = this.pages.get(pageId);
		if (page) page.parent = parentId;
	}

	async clear(pageId: string): Promise<void> {
		this.record({ op: "clear", id: pageId });
		const page = this.pages.get(pageId);
		if (page) Object.assign(page, { blocks: [], blockIds: [] });
	}

	async retitle(pageId: string, title: string, icon: string): Promise<void> {
		this.record({ op: "retitle", id: pageId, arg: title });
		const page = this.pages.get(pageId);
		if (page) Object.assign(page, { title, icon });
	}

	async trash(pageId: string): Promise<void> {
		this.record({ op: "trash", id: pageId });
		const page = this.pages.get(pageId);
		if (page) page.inTrash = true;
	}

	async children(blockId: string, limit?: number): Promise<ReadBlock[]> {
		this.record({ op: "children", id: blockId });
		const page = this.pages.get(blockId);
		const content: ReadBlock[] = (page?.blocks ?? []).map((b, i) => {
			const body = b[b.type] as { rich_text?: { text: { content: string; link?: { url: string } | null }; annotations?: { code?: boolean } }[] };
			return { id: page?.blockIds[i] ?? "", type: b.type, createdTime: page?.createdTime ?? "", text: (body.rich_text ?? []).map((r) => ({ text: r.text.content, code: Boolean(r.annotations?.code), ...(r.text.link?.url ? { href: r.text.link.url } : {}) })) };
		});
		const kids: ReadBlock[] = [...this.pages].filter(([, p]) => p.parent === blockId && !p.inTrash).map(([id, p]) => ({ id, type: "child_page", createdTime: p.createdTime, title: p.title, text: [] }));
		const all = [...content, ...kids];
		return limit === undefined ? all : all.slice(0, limit);
	}

	async getPage(pageId: string): Promise<PageInfo | undefined> {
		this.record({ op: "getPage", id: pageId });
		const page = this.pages.get(pageId);
		return page ? { id: pageId, url: `https://www.notion.so/${pageId}`, inTrash: page.inTrash, createdTime: page.createdTime } : undefined;
	}

	async listUploads(): Promise<UploadInfo[]> {
		this.record({ op: "listUploads", id: "" });
		return [...this.uploads].map(([id, u]) => ({ id, filename: u.filename.replace(/ /g, "_"), contentLength: u.size, status: "uploaded", createdTime: u.createdTime, expiryTime: null }));
	}

	async upload(filename: string, bytes: Buffer): Promise<string> {
		this.record({ op: "upload", id: filename });
		const id = `u${++this.n}`;
		this.uploads.set(id, { filename, size: bytes.length, createdTime: this.time() });
		return id;
	}

	async maxUploadBytes(): Promise<number | undefined> {
		return this.limit;
	}

	ops(): string[] {
		return this.calls.map((c) => c.op);
	}

	/** The live (untrashed) pages with this title. */
	all(title: string): ({ id: string } & FakePage)[] {
		return [...this.pages].filter(([, p]) => p.title === title && !p.inTrash).map(([id, p]) => ({ id, ...p }));
	}

	byTitle(title: string): ({ id: string } & FakePage) | undefined {
		return this.all(title)[0];
	}
}

/** Every rich text string in a block tree, joined, for asserting on rendered text. */
export function textOf(blocks: Block[]): string {
	const out: string[] = [];
	const walk = (b: Block): void => {
		const body = b[b.type] as { rich_text?: { text: { content: string } }[]; children?: Block[]; cells?: { text: { content: string } }[][] };
		for (const r of body.rich_text ?? []) out.push(r.text.content);
		for (const cell of body.cells ?? []) for (const r of cell) out.push(r.text.content);
		for (const c of body.children ?? []) walk(c);
	};
	blocks.forEach(walk);
	return out.join("|");
}

/** Content hashes per commit, as git would answer `hashAt`: each run records the files it backs up at its commit. */
export class FakeGit {
	private snapshots = new Map<string, Map<string, string>>();
	record(commit: string, files: { path: string; hash: string }[]): void {
		this.snapshots.set(commit, new Map(files.map((f) => [f.path, f.hash])));
	}
	hashAt = (commit: string, path: string): string | undefined => {
		for (const [full, files] of this.snapshots) if (full.startsWith(commit)) return files.get(path);
		return undefined;
	};
}

export const COMMIT = "c0ffee0000000000000000000000000000000000";

/** One `cf backup` run against a fake: reconcile with Notion, plan, then sync, the order the command uses. */
export async function backup(
	root: string,
	map: BackupMap,
	api: FakeNotion,
	scope: Scope = { kind: "all" },
	extra: { commit?: string; saves?: BackupMap[]; pulled?: string[][]; pullFails?: boolean; git?: FakeGit; rewrite?: boolean } = {},
) {
	const walk = walkBackup(root);
	const commit = extra.commit ?? COMMIT;
	const save = (m: BackupMap): void => {
		extra.saves?.push(structuredClone(m));
	};
	const reconciled = await reconcile({ walk, map, api, hashAt: (extra.git ?? new FakeGit()).hashAt, save, log: () => {} });
	const plan = planBackup(walk, map, scope, { rewrite: extra.rewrite ?? false });
	extra.git?.record(commit, walk.files);
	const result = await runBackup({
		walk,
		map,
		plan,
		api,
		reconciled,
		commit,
		sourceUrl: (p) => `https://github.com/o/r/blob/${commit}/${p}`,
		save,
		lfsPull: async (paths) => {
			if (extra.pullFails) throw new Error("git lfs pull failed: batch response: rate limit exceeded");
			extra.pulled?.push(paths);
		},
		log: () => {},
		now: () => new Date("2026-10-07T12:00:00Z"),
	});
	return { plan, result, reconciled };
}
