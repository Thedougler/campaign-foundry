import { type Block, textItems } from "./blocks.ts";

/**
 * How a Backup page says which repo path it holds, so Notion itself, not the map, is the record of what exists. Every
 * page is created with its marker in the same request, so no page exists without one:
 *   root    title "campaign-foundry backup" and a first callout starting with ROOT_NOTE
 *   folder  first block "Folder `<path>` of the campaign-foundry backup."
 *   file    first block (after a "deleted from repo" callout) "Backup of `<path>` …". While the page is being written it
 *           reads "… (being written …)"; the commit is added only after the last block lands, so a header naming a commit
 *           means the page holds that commit's file in full.
 */
export const ROOT_TITLE = "campaign-foundry backup";
export const ROOT_NOTE = "An automatic copy of the campaign-foundry repo's Shattered Sea Wiki and agent skills";

/** One rich text item as read back from Notion. */
export interface ReadText {
	text: string;
	code: boolean;
	href?: string;
}

/** A top-level block as read back from Notion: enough to find markers, child pages and the deleted-from-repo note. */
export interface ReadBlock {
	id: string;
	type: string;
	createdTime: string;
	/** A child page's title. */
	title?: string;
	text: ReadText[];
}

export type Marker = { kind: "dir"; path: string } | { kind: "file"; path: string; commit?: string };

export function rootCallout(): Block {
	return {
		object: "block",
		type: "callout",
		callout: {
			rich_text: textItems(`${ROOT_NOTE}, written by the Notion backup workflow on every push to main. GitHub is the working copy: edits made here are overwritten. Each page's first line names its source file; the backup finds its pages by that line, so leave it in place.`),
			icon: { type: "emoji", emoji: "🗄️" },
			color: "gray_background",
		},
	};
}

export function dirMarker(path: string): Block {
	const rich = [...textItems("Folder ", { color: "gray" }), ...textItems(path, { color: "gray", code: true }), ...textItems(" of the campaign-foundry backup.", { color: "gray" })];
	return { object: "block", type: "paragraph", paragraph: { rich_text: rich } };
}

/** The header a file page carries from creation until its content is fully written. */
export function pendingHeader(path: string): Block {
	const rich = [...textItems("Backup of ", { color: "gray" }), ...textItems(path, { color: "gray", code: true }), ...textItems(" (being written: the next run rewrites this page if it stops here).", { color: "gray" })];
	return { object: "block", type: "paragraph", paragraph: { rich_text: rich } };
}

/** The grey first line of every fully written page: where it came from, at which commit, and where to edit it. */
export function headerBlock(path: string, commit: string | undefined, url: string | undefined): Block {
	const rich = [
		...textItems("Backup of ", { color: "gray" }),
		...textItems(path, { color: "gray", code: true }, url),
		...textItems(`${commit ? ` at ${commit.slice(0, 7)}` : ""}. Edit it in GitHub: the next change to the file overwrites this page.`, { color: "gray" }),
	];
	return { object: "block", type: "paragraph", paragraph: { rich_text: rich } };
}

const plain = (b: ReadBlock): string => b.text.map((t) => t.text).join("");
const codeText = (b: ReadBlock): string =>
	b.text
		.filter((t) => t.code)
		.map((t) => t.text)
		.join("");

/** The marker a block carries, if it is one. */
export function parseMarker(block: ReadBlock): Marker | undefined {
	if (block.type !== "paragraph") return undefined;
	const text = plain(block);
	const path = codeText(block);
	if (!path) return undefined;
	if (text.startsWith("Folder ") && text.endsWith(" of the campaign-foundry backup.")) return { kind: "dir", path };
	if (!text.startsWith("Backup of ")) return undefined;
	if (text.includes("(being written")) return { kind: "file", path };
	const href = block.text.find((t) => t.code && t.href)?.href ?? "";
	const commit = /\/blob\/([0-9a-f]{40})\//.exec(href)?.[1] ?? /^ at ([0-9a-f]{7,40})\. Edit it in GitHub/.exec(text.slice(`Backup of ${path}`.length))?.[1];
	return commit ? { kind: "file", path, commit } : { kind: "file", path };
}

/** The first marker among a page's first blocks (a deleted page has its red note above the header). */
export function markerOf(blocks: ReadBlock[]): Marker | undefined {
	for (const b of blocks.slice(0, 4)) {
		const m = parseMarker(b);
		if (m) return m;
	}
	return undefined;
}

export function isRootCallout(block: ReadBlock | undefined): boolean {
	return block?.type === "callout" && plain(block).startsWith(ROOT_NOTE);
}

/** The date a page was flagged deleted from the repo, from its red note (`… on 2026-10-07. …`). */
export function deletedNote(blocks: ReadBlock[]): string | undefined {
	for (const b of blocks.slice(0, 2)) {
		const text = plain(b);
		if (b.type === "callout" && text.startsWith("Deleted from the repo")) return /on (\d{4}-\d{2}-\d{2})/.exec(text)?.[1] ?? "unknown";
	}
	return undefined;
}

/** The reason an image page holds a note instead of the image (`Not uploaded: <reason>. The image is in GitHub.`). */
export function uploadSkippedNote(blocks: ReadBlock[]): string | undefined {
	for (const b of blocks.slice(0, 4)) {
		const m = /^Not uploaded: (.*)\. The image is in GitHub\.$/.exec(plain(b));
		if (b.type === "paragraph" && m) return m[1];
	}
	return undefined;
}
