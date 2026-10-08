import { describe, expect, it } from "vitest";
import type { Block } from "../../src/backup/blocks.ts";
import { deletedNote, dirMarker, headerBlock, isRootCallout, markerOf, parseMarker, pendingHeader, type ReadBlock, rootCallout, uploadSkippedNote } from "../../src/backup/markers.ts";

/** A block as Notion reads it back. */
function read(block: Block): ReadBlock {
	const body = block[block.type] as { rich_text: { text: { content: string; link?: { url: string } | null }; annotations?: { code?: boolean } }[] };
	return { id: "b", type: block.type, createdTime: "", text: body.rich_text.map((r) => ({ text: r.text.content, code: Boolean(r.annotations?.code), ...(r.text.link?.url ? { href: r.text.link.url } : {}) })) };
}

describe("page markers", () => {
	const path = "wiki/shattered-sea/NPCs/Ilse Corran (NPC).md";
	const sha = "aeb0299c7d062857cc09c795fab4437ab7162150";

	it("reads back the repo path, and the commit only once the page is fully written", () => {
		expect(parseMarker(read(headerBlock(path, sha, `https://github.com/o/r/blob/${sha}/x`)))).toEqual({ kind: "file", path, commit: sha });
		expect(parseMarker(read(headerBlock(path, sha, undefined)))).toEqual({ kind: "file", path, commit: "aeb0299" });
		expect(parseMarker(read(pendingHeader(path)))).toEqual({ kind: "file", path });
		expect(parseMarker(read(dirMarker("wiki/shattered-sea")))).toEqual({ kind: "dir", path: "wiki/shattered-sea" });
		expect(parseMarker({ id: "b", type: "paragraph", createdTime: "", text: [{ text: "Backup of my notes", code: false }] })).toBeUndefined();
	});

	it("finds the header under a deleted-from-repo note, the root note, and the notes a lost map needs", () => {
		const note: ReadBlock = { id: "n", type: "callout", createdTime: "", text: [{ text: "Deleted from the repo at abc1234 on 2026-10-07. This page is kept as the last backed-up copy.", code: false }] };
		expect(markerOf([note, read(headerBlock(path, sha, undefined))])).toEqual({ kind: "file", path, commit: "aeb0299" });
		expect(deletedNote([note])).toBe("2026-10-07");
		expect(isRootCallout(read(rootCallout()))).toBe(true);
		const skipped: ReadBlock = { id: "s", type: "paragraph", createdTime: "", text: [{ text: "Not uploaded: 25.1 MB is over the 20.0 MB upload limit. The image is in GitHub.", code: false }] };
		expect(uploadSkippedNote([read(headerBlock(path, sha, undefined)), skipped])).toBe("25.1 MB is over the 20.0 MB upload limit");
	});
});
