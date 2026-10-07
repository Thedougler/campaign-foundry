import { mkdirSync, mkdtempSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import type { Block } from "../../src/backup/blocks.ts";
import type { CreatedPage, NotionApi } from "../../src/backup/notion.ts";

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

/** An in-memory Notion: pages get ids p1, p2, …; every call is recorded; `failOn` makes one operation throw. */
export class FakeNotion implements NotionApi {
	calls: Call[] = [];
	pages = new Map<string, { parent: string; title: string; icon: string; blocks: Block[] }>();
	uploads = new Map<string, number>();
	limit: number | undefined = undefined;
	failOn?: (call: Call) => boolean;
	private n = 0;

	private record(call: Call): void {
		if (this.failOn?.(call)) throw new Error(`fake failure on ${call.op} ${call.id}`);
		this.calls.push(call);
	}

	async createPage(parentId: string, title: string, icon: string): Promise<CreatedPage> {
		this.record({ op: "create", id: parentId, arg: title });
		const id = `p${++this.n}`;
		this.pages.set(id, { parent: parentId, title, icon, blocks: [] });
		return { id, url: `https://www.notion.so/${id}` };
	}

	async append(blockId: string, blocks: Block[], atStart = false): Promise<void> {
		this.record({ op: atStart ? "prepend" : "append", id: blockId, arg: blocks.length });
		const page = this.pages.get(blockId);
		if (!page) throw new Error(`no page ${blockId}`);
		page.blocks = atStart ? [...blocks, ...page.blocks] : [...page.blocks, ...blocks];
	}

	async clear(pageId: string): Promise<void> {
		this.record({ op: "clear", id: pageId });
		const page = this.pages.get(pageId);
		if (page) page.blocks = [];
	}

	async retitle(pageId: string, title: string, icon: string): Promise<void> {
		this.record({ op: "retitle", id: pageId, arg: title });
		const page = this.pages.get(pageId);
		if (page) Object.assign(page, { title, icon });
	}

	async upload(filename: string, bytes: Buffer): Promise<string> {
		this.record({ op: "upload", id: filename });
		const id = `u${++this.n}`;
		this.uploads.set(id, bytes.length);
		return id;
	}

	async maxUploadBytes(): Promise<number | undefined> {
		return this.limit;
	}

	ops(): string[] {
		return this.calls.map((c) => c.op);
	}

	byTitle(title: string): { id: string; parent: string; title: string; icon: string; blocks: Block[] } | undefined {
		for (const [id, page] of this.pages) if (page.title === title) return { id, ...page };
		return undefined;
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
