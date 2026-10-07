import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { emptyMap, loadMap, normalizeId, pageUrl, saveMap, serializeMap } from "../../src/backup/map.ts";
import { repo } from "./helpers.ts";

const PARENT = "3f102166-35ec-8117-af9c-d05f042eea59";

describe("backup map", () => {
	it("normalizes a bare id, a dashed id and a Notion URL to a dashed id", () => {
		expect(normalizeId("3f10216635ec8117af9cd05f042eea59")).toBe(PARENT);
		expect(normalizeId(PARENT)).toBe(PARENT);
		expect(normalizeId("https://app.notion.com/p/3f10216635ec8117af9cd05f042eea59")).toBe(PARENT);
		expect(normalizeId("https://www.notion.so/Shattered-Sea-campaign-3f10216635ec8117af9cd05f042eea59?pvs=4")).toBe(PARENT);
		expect(() => normalizeId("not a page")).toThrow(/not a Notion page id/);
	});

	it("serializes entries sorted by path so commits diff cleanly, and round-trips", () => {
		const map = emptyMap(PARENT);
		map.entries["b.md"] = { kind: "markdown", id: "2", url: "u2", hash: "h" };
		map.entries["a.md"] = { kind: "markdown", id: "1", url: "u1" };
		const text = serializeMap(map);
		expect(text.indexOf('"a.md"')).toBeLessThan(text.indexOf('"b.md"'));
		const root = repo({});
		const file = join(root, ".notion/backup-map.json");
		saveMap(file, map);
		expect(readFileSync(file, "utf8")).toBe(text);
		expect(loadMap(file, PARENT).entries["b.md"]).toEqual({ kind: "markdown", id: "2", url: "u2", hash: "h" });
	});

	it("starts empty when there is no map, and refuses a map made for another parent page", () => {
		const root = repo({});
		const file = join(root, "map.json");
		expect(loadMap(file, PARENT)).toEqual(emptyMap(PARENT));
		saveMap(file, emptyMap(PARENT));
		expect(() => loadMap(file, "11111111111111111111111111111111")).toThrow(/belongs to parent page/);
	});

	it("gives no URL for a page whose file was deleted", () => {
		const map = emptyMap(PARENT);
		map.entries["a.md"] = { kind: "markdown", id: "1", url: "u1" };
		map.entries["b.md"] = { kind: "markdown", id: "2", url: "u2", deletedAt: "2026-10-07" };
		expect(pageUrl(map, "a.md")).toBe("u1");
		expect(pageUrl(map, "b.md")).toBeUndefined();
	});
});
