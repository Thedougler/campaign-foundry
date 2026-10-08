import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildScene, parseUvtt } from "../../src/push/scene.ts";

const fixtures = join(import.meta.dirname, "fixtures");
const uvttText = readFileSync(join(fixtures, "Session 2 - Mud Under the Boards - Battle Map.uvtt"), "utf8");
const base = {
	campaign: "salt-and-lantern",
	path: "salt-and-lantern/Sessions/Session 2/Session 2 - Mud Under the Boards.md",
	name: "Session 2 - Mud Under the Boards",
	journalId: "JournalEntry0001",
	image: { url: "modules/m/assets/map.webp", width: 640, height: 448 },
	navOrder: 3,
	tokens: [
		{ name: "Mire Drowner", actorId: "ActorMireDrown01", squares: 1, img: null },
		{ name: "Ogre", actorId: "ActorOgre0000001", squares: 2, img: null },
	],
};

type Bag = Record<string, any>;

describe("parseUvtt", () => {
	it("reads the Universal VTT shape: resolution, wall polylines, portals and lights in grid squares", () => {
		const uvtt = parseUvtt(uvttText);
		expect(uvtt.resolution.map_size).toEqual({ x: 10, y: 7 });
		expect(uvtt.line_of_sight).toHaveLength(2);
		expect(uvtt.portals).toHaveLength(1);
		expect(uvtt.lights).toHaveLength(1);
	});

	it("rejects a file that is not Universal VTT with a message that names the missing part", () => {
		expect(() => parseUvtt("{}")).toThrow(/resolution/);
		expect(() => parseUvtt("not json")).toThrow(/JSON/);
	});
});

describe("buildScene", () => {
	it("makes a Foundry scene with a 64 px, 5 ft square grid sized from the image", () => {
		const { data } = buildScene({ ...base });
		expect(data._id).toMatch(/^[A-Za-z0-9]{16}$/);
		expect(data.name).toBe("Session 2 - Mud Under the Boards");
		expect(data.width).toBe(640);
		expect(data.height).toBe(448);
		expect(data.grid).toMatchObject({ size: 64, distance: 5, units: "ft", type: 1 });
		expect(data.padding).toBe(0);
		const levels = data.levels as Bag[];
		expect(levels).toHaveLength(1);
		expect(levels[0]!.background.src).toBe("modules/m/assets/map.webp");
		expect(data.initialLevel).toBe(levels[0]!._id);
		expect(data.journal).toBe("JournalEntry0001");
		expect((data.ownership as Bag).default).toBe(0);
	});

	it("places one token per embedded Creature in a row along the top edge, sized by creature size", () => {
		const { data } = buildScene({ ...base });
		const tokens = data.tokens as Bag[];
		expect(tokens.map((t) => [t.name, t.actorId, t.x, t.y, t.width, t.height])).toEqual([
			["Mire Drowner", "ActorMireDrown01", 64, 0, 1, 1],
			["Ogre", "ActorOgre0000001", 128, 0, 2, 2],
		]);
		expect(tokens.every((t) => t.actorLink === false && /^[A-Za-z0-9]{16}$/.test(t._id))).toBe(true);
	});

	it("wraps a long row of tokens onto the next row down instead of running off the map", () => {
		const many = Array.from({ length: 12 }, (_, i) => ({ name: `G${i}`, actorId: "ActorGob00000001", squares: 1, img: null }));
		const tokens = buildScene({ ...base, tokens: many }).data.tokens as Bag[];
		expect(Math.max(...tokens.map((t) => t.x + t.width * 64))).toBeLessThanOrEqual(640);
		expect(tokens.some((t) => t.y === 64)).toBe(true);
	});

	it("takes walls, a door and lights from the Universal VTT file, in scene pixels", () => {
		const { data, warnings } = buildScene({ ...base, uvtt: parseUvtt(uvttText) });
		const walls = data.walls as Bag[];
		// 4 outer edges + 1 inner wall + 1 door
		expect(walls).toHaveLength(6);
		expect(walls.map((w) => w.c)).toContainEqual([0, 0, 640, 0]);
		expect(walls.map((w) => w.c)).toContainEqual([320, 0, 320, 192]);
		const door = walls.find((w) => w.door === 1)!;
		expect(door.c).toEqual([320, 192, 320, 256]);
		expect(door.ds).toBe(0);
		expect(walls.every((w) => Array.isArray(w.levels) && w.levels.length === 1)).toBe(true);
		const lights = data.lights as Bag[];
		expect(lights).toHaveLength(1);
		expect(lights[0]).toMatchObject({ x: 160, y: 160 });
		expect(lights[0]!.config).toMatchObject({ dim: 20, bright: 10, color: "#ffcc88" });
		expect(warnings).toEqual([]);
	});

	it("has no walls, doors or lights and warns when there is no Universal VTT file", () => {
		const { data, warnings } = buildScene({ ...base });
		expect(data.walls).toEqual([]);
		expect(data.lights).toEqual([]);
		expect(warnings.join("\n")).toMatch(/no walls/i);
	});

	it("warns when the Universal VTT grid does not match the image", () => {
		const uvtt = parseUvtt(uvttText);
		uvtt.resolution.map_size = { x: 20, y: 14 };
		const { warnings } = buildScene({ ...base, uvtt });
		expect(warnings.join("\n")).toMatch(/does not match the image/);
	});
});
