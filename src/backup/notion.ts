import { APIErrorCode, Client, isNotionClientError } from "@notionhq/client";
import type { Block } from "./blocks.ts";

/** The Notion API version the Backup is written against (`in_trash`, `position`, file uploads, markdown endpoints). */
export const NOTION_VERSION = "2026-03-11";

export interface CreatedPage {
	id: string;
	url: string;
}

/** The Notion operations a Backup needs; the sync engine depends on this, so tests run it against a fake. */
export interface NotionApi {
	createPage(parentId: string, title: string, icon: string): Promise<CreatedPage>;
	/** One append request (the caller chunks). */
	append(blockId: string, blocks: Block[], atStart?: boolean): Promise<void>;
	/** Empties a page's content, leaving its title and child pages alone. */
	clear(pageId: string): Promise<void>;
	retitle(pageId: string, title: string, icon: string): Promise<void>;
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

const titleProp = (title: string) => ({ title: { title: [{ type: "text", text: { content: title.slice(0, 2000) } }] } });

/** The live API through the official SDK: it retries 429 and 529 (and 5xx on idempotent calls) with back-off, honouring Retry-After. */
export function notionClient(token: string, options: { intervalMs?: number; fetch?: typeof fetch } = {}): NotionApi {
	const client = new Client({
		auth: token,
		notionVersion: NOTION_VERSION,
		fetch: throttle(options.fetch ?? fetch, options.intervalMs ?? 350),
		retry: { maxRetries: 6, initialRetryDelayMs: 1000, maxRetryDelayMs: 60_000 },
		timeoutMs: 120_000,
	});
	const request = <T extends object>(method: "get" | "post" | "patch" | "delete", path: string, body?: Record<string, unknown>, query?: Record<string, string>): Promise<T> =>
		client.request<T>({ method, path, ...(body ? { body } : {}), ...(query ? { query } : {}) });

	return {
		async createPage(parentId, title, icon) {
			const page = await request<{ id: string; url: string }>("post", "pages", { parent: { type: "page_id", page_id: parentId }, icon: { type: "emoji", emoji: icon }, properties: titleProp(title) });
			return { id: page.id, url: page.url };
		},
		async append(blockId, blocks, atStart = false) {
			await request("patch", `blocks/${blockId}/children`, { children: blocks, ...(atStart ? { position: { type: "start" } } : {}) });
		},
		async clear(pageId) {
			try {
				await request("patch", `pages/${pageId}/markdown`, { type: "replace_content", replace_content: { new_str: "" } });
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
			await request("patch", `pages/${pageId}`, { icon: { type: "emoji", emoji: icon }, properties: titleProp(title) });
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
