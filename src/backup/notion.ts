import { APIErrorCode, Client, isHTTPResponseError, isNotionClientError, UnknownHTTPResponseError } from "@notionhq/client";
import type { Block } from "./blocks.ts";
import type { ReadBlock } from "./markers.ts";

/** The Notion API version the Backup is written against (`in_trash`, `position`, file uploads, markdown endpoints). */
export const NOTION_VERSION = "2026-03-11";

export interface CreatedPage {
	id: string;
	url: string;
	/** ISO time Notion created the page; when two pages claim one path, the older is kept. */
	createdTime?: string;
}

export interface PageInfo {
	id: string;
	url: string;
	inTrash: boolean;
	createdTime: string;
}

export interface UploadInfo {
	id: string;
	filename: string;
	contentLength?: number;
	status: string;
	createdTime: string;
	/** Set while an upload is not yet attached to a block; null once attached (it then never expires). */
	expiryTime?: string | null;
}

/** The Notion operations a Backup needs; the sync engine depends on this, so tests run it against a fake. */
export interface NotionApi {
	/** Creates a page with its first blocks in the same request, so the page is never without its marker. */
	createPage(parentId: string, title: string, icon: string, children?: Block[]): Promise<CreatedPage>;
	/** One append request (the caller chunks); returns the new top-level block ids in order. */
	append(blockId: string, blocks: Block[], atStart?: boolean): Promise<string[]>;
	/** Replaces one block's content (same type). */
	updateBlock(blockId: string, block: Block): Promise<void>;
	/** Moves a page under a new parent page (a layout change), leaving its content and child pages alone. */
	move(pageId: string, parentId: string): Promise<void>;
	/** Empties a page's content, leaving its title and child pages alone. */
	clear(pageId: string): Promise<void>;
	retitle(pageId: string, title: string, icon: string): Promise<void>;
	/** Moves a page to Notion's trash (restorable there for 30 days); the Backup trashes only empty pages: a second copy of one path, or a folder page the repo left with nothing under it. */
	trash(pageId: string): Promise<void>;
	/** Deletes one content block (a folder page's deleted-from-repo note, when the folder comes back). */
	removeBlock(blockId: string): Promise<void>;
	/** A page's top-level blocks, child pages included and trashed ones left out; `limit` reads only the first few. */
	children(blockId: string, limit?: number): Promise<ReadBlock[]>;
	/** A page, or undefined when it no longer exists or the integration cannot see it. */
	getPage(pageId: string): Promise<PageInfo | undefined>;
	/** The integration's completed file uploads, so a rebuilt map can reuse them instead of uploading again. */
	listUploads(): Promise<UploadInfo[]>;
	/** Uploads bytes once and returns the file upload id every image block reuses. */
	upload(filename: string, bytes: Buffer, contentType: string): Promise<string>;
	/** The workspace's per-file upload limit in bytes (5 MiB on a free plan), when Notion reports one. */
	maxUploadBytes(): Promise<number | undefined>;
}

/** A fetch that starts at most one request per `intervalMs` (Notion averages 3 requests a second per integration). */
export function throttle(fetchImpl: typeof fetch, intervalMs: number, sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))): typeof fetch {
	let next = 0;
	return (async (...args: Parameters<typeof fetch>) => {
		const now = Date.now();
		const at = Math.max(now, next);
		next = at + intervalMs;
		if (at > now) await sleep(at - now);
		return fetchImpl(...args);
	}) as typeof fetch;
}

const CONTENT_TYPES: Record<string, string> = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif", svg: "image/svg+xml" };
export const contentTypeOf = (filename: string): string => CONTENT_TYPES[filename.slice(filename.lastIndexOf(".") + 1).toLowerCase()] ?? "application/octet-stream";

interface RawRich {
	plain_text: string;
	href: string | null;
	annotations?: { code?: boolean };
}
interface RawBlock {
	id: string;
	type: string;
	created_time: string;
	in_trash?: boolean;
	archived?: boolean;
	[key: string]: unknown;
}
interface RawUpload {
	id: string;
	filename?: string;
	content_length?: number | null;
	status: string;
	created_time: string;
	expiry_time?: string | null;
}

function readBlock(b: RawBlock): ReadBlock {
	const body = (b[b.type] ?? {}) as { rich_text?: RawRich[]; title?: string };
	const text = (body.rich_text ?? []).map((r) => ({ text: r.plain_text, code: Boolean(r.annotations?.code), ...(r.href ? { href: r.href } : {}) }));
	return { id: b.id, type: b.type, createdTime: b.created_time, ...(b.type === "child_page" ? { title: body.title ?? "" } : {}), text };
}

const titleProp = (title: string) => ({ title: { title: [{ type: "text", text: { content: title.slice(0, 2000) } }] } });

/** Server and gateway failures worth another try; the SDK retries them itself only for GET and DELETE. */
const TRANSIENT = new Set([500, 502, 503, 504]);

/**
 * Whether a failed write can be sent again. An idempotent write (a retitle, a trash, a block update, a clear, a
 * move) repeats safely after any transient failure. A create or append repeats only when Notion's edge proxy
 * answered without a Notion response (an HTML 502 and the like), so the API never saw it and nothing was made.
 */
export function retryableWrite(error: unknown, idempotent: boolean): boolean {
	if (!isHTTPResponseError(error) || !TRANSIENT.has(error.status)) return false;
	return idempotent || error instanceof UnknownHTTPResponseError;
}

/** The live API through the official SDK: it retries 429 and 529 (and 5xx on GET and DELETE) with back-off, honouring Retry-After; writes get {@link retryableWrite}. */
export function notionClient(
	token: string,
	options: { intervalMs?: number; fetch?: typeof fetch; retryDelayMs?: number; sleep?: (ms: number) => Promise<void> } = {},
): NotionApi {
	const client = new Client({
		auth: token,
		notionVersion: NOTION_VERSION,
		fetch: throttle(options.fetch ?? fetch, options.intervalMs ?? 350),
		retry: { maxRetries: 6, initialRetryDelayMs: 1000, maxRetryDelayMs: 60_000 },
		timeoutMs: 120_000,
	});
	const sleep = options.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)));
	const retryDelayMs = options.retryDelayMs ?? 2000;
	const request = async <T extends object>(
		method: "get" | "post" | "patch" | "delete",
		path: string,
		body?: Record<string, unknown>,
		query?: Record<string, string>,
		idempotent = false,
	): Promise<T> => {
		for (let attempt = 0; ; attempt++) {
			try {
				return await client.request<T>({ method, path, ...(body ? { body } : {}), ...(query ? { query } : {}) });
			} catch (error) {
				if (method === "get" || method === "delete" || attempt >= 4 || !retryableWrite(error, idempotent)) throw error;
				await sleep(retryDelayMs * 2 ** attempt);
			}
		}
	};
	const idempotentWrite = <T extends object>(method: "post" | "patch", path: string, body: Record<string, unknown>): Promise<T> => request<T>(method, path, body, undefined, true);

	return {
		async createPage(parentId, title, icon, children = []) {
			const page = await request<{ id: string; url: string; created_time: string }>("post", "pages", {
				parent: { type: "page_id", page_id: parentId },
				icon: { type: "emoji", emoji: icon },
				properties: titleProp(title),
				...(children.length > 0 ? { children } : {}),
			});
			return { id: page.id, url: page.url, createdTime: page.created_time };
		},
		async append(blockId, blocks, atStart = false) {
			const r = await request<{ results: { id: string }[] }>("patch", `blocks/${blockId}/children`, { children: blocks, ...(atStart ? { position: { type: "start" } } : {}) });
			return r.results.map((b) => b.id);
		},
		async updateBlock(blockId, block) {
			await idempotentWrite("patch", `blocks/${blockId}`, { [block.type]: block[block.type] });
		},
		async move(pageId, parentId) {
			await idempotentWrite("post", `pages/${pageId}/move`, { parent: { type: "page_id", page_id: parentId } });
		},
		async trash(pageId) {
			await idempotentWrite("patch", `pages/${pageId}`, { in_trash: true });
		},
		async removeBlock(blockId) {
			await request("delete", `blocks/${blockId}`);
		},
		async children(blockId, limit) {
			const out: ReadBlock[] = [];
			let cursor: string | undefined;
			do {
				const page = await request<{ results: RawBlock[]; has_more: boolean; next_cursor: string | null }>("get", `blocks/${blockId}/children`, undefined, {
					page_size: String(Math.min(limit ?? 100, 100)),
					...(cursor ? { start_cursor: cursor } : {}),
				});
				out.push(...page.results.filter((b) => !b.in_trash && !b.archived).map(readBlock));
				cursor = page.has_more && (limit === undefined || out.length < limit) ? (page.next_cursor ?? undefined) : undefined;
			} while (cursor);
			return limit === undefined ? out : out.slice(0, limit);
		},
		async getPage(pageId) {
			try {
				const page = await request<{ id: string; url: string; created_time: string; in_trash?: boolean; archived?: boolean }>("get", `pages/${pageId}`);
				return { id: page.id, url: page.url, createdTime: page.created_time, inTrash: Boolean(page.in_trash ?? page.archived) };
			} catch (error) {
				if (isNotionClientError(error) && "code" in error && error.code === APIErrorCode.ObjectNotFound) return undefined;
				throw error;
			}
		},
		async listUploads() {
			const out: UploadInfo[] = [];
			let cursor: string | undefined;
			do {
				const page = await request<{ results: RawUpload[]; has_more: boolean; next_cursor: string | null }>("get", "file_uploads", undefined, { page_size: "100", status: "uploaded", ...(cursor ? { start_cursor: cursor } : {}) });
				out.push(...page.results.map((u) => ({ id: u.id, filename: u.filename ?? "", ...(u.content_length != null ? { contentLength: u.content_length } : {}), status: u.status, createdTime: u.created_time, expiryTime: u.expiry_time ?? null })));
				cursor = page.has_more ? (page.next_cursor ?? undefined) : undefined;
			} while (cursor);
			return out;
		},
		async clear(pageId) {
			try {
				await idempotentWrite("patch", `pages/${pageId}/markdown`, { type: "replace_content", replace_content: { new_str: "" } });
				return;
			} catch (error) {
				// Older workspaces or an empty-string rejection: fall back to deleting each top-level block.
				if (!isNotionClientError(error) || ("code" in error && error.code !== APIErrorCode.ValidationError && error.code !== APIErrorCode.InvalidRequest && error.code !== APIErrorCode.InvalidRequestURL)) throw error;
			}
			let cursor: string | undefined;
			const ids: string[] = [];
			do {
				const page = await request<{ results: { id: string; type: string }[]; has_more: boolean; next_cursor: string | null }>("get", `blocks/${pageId}/children`, undefined, { page_size: "100", ...(cursor ? { start_cursor: cursor } : {}) });
				ids.push(...page.results.filter((b) => b.type !== "child_page" && b.type !== "child_database").map((b) => b.id));
				cursor = page.has_more ? (page.next_cursor ?? undefined) : undefined;
			} while (cursor);
			for (const id of ids) await request("delete", `blocks/${id}`);
		},
		async retitle(pageId, title, icon) {
			await idempotentWrite("patch", `pages/${pageId}`, { icon: { type: "emoji", emoji: icon }, properties: titleProp(title) });
		},
		async upload(filename, bytes, contentType) {
			const created = await request<{ id: string }>("post", "file_uploads", { mode: "single_part", filename, content_type: contentType });
			await client.fileUploads.send({ file_upload_id: created.id, file: { filename, data: new Blob([new Uint8Array(bytes)], { type: contentType }) } });
			return created.id;
		},
		async maxUploadBytes() {
			const me = await request<{ bot?: { workspace_limits?: { max_file_upload_size_in_bytes?: number } } }>("get", "users/me");
			return me.bot?.workspace_limits?.max_file_upload_size_in_bytes;
		},
	};
}
