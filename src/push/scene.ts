import { OWNERSHIP, stats } from "./foundry.ts";
import type { Doc } from "./foundry.ts";
import { foundryId } from "./ids.ts";

/** Every Battle Map is drawn at 64 px per 5-foot square (`docs/wiki-layout.md`), which is the Foundry scene's grid. */
export const GRID_SIZE = 64;
/** The Level every v14 scene starts with; walls, lights and tokens belong to it. */
const LEVEL_ID = "defaultLevel0000";

interface Point {
	x: number;
	y: number;
}

/** The parts of a Universal VTT (`.uvtt` / `.dd2vtt`) file Push reads. Lengths are in grid squares. */
export interface Uvtt {
	resolution: { map_origin: Point; map_size: Point; pixels_per_grid: number };
	line_of_sight: Point[][];
	objects_line_of_sight?: Point[][];
	portals?: { position?: Point; bounds: Point[]; rotation?: number; closed?: boolean; freestanding?: boolean }[];
	lights?: { position: Point; range: number; intensity?: number; color?: string; shadows?: boolean }[];
}

const isPoint = (p: unknown): p is Point => typeof p === "object" && p !== null && typeof (p as Point).x === "number" && typeof (p as Point).y === "number";

/** Parses and shape-checks a Universal VTT file, throwing an error that names what is missing. */
export function parseUvtt(text: string): Uvtt {
	let data: unknown;
	try {
		data = JSON.parse(text);
	} catch {
		throw new Error("not valid JSON; a Universal VTT file is the JSON export of Dungeondraft or a similar map maker");
	}
	const d = data as Partial<Uvtt> | null;
	const res = d?.resolution;
	if (!res || !isPoint(res.map_size) || !isPoint(res.map_origin) || typeof res.pixels_per_grid !== "number") {
		throw new Error("no resolution with map_origin, map_size and pixels_per_grid");
	}
	if (!Array.isArray(d?.line_of_sight)) throw new Error("no line_of_sight list of wall polylines");
	return d as Uvtt;
}

export interface SceneToken {
	name: string;
	actorId: string;
	/** Creature size in grid squares (Large is 2). */
	squares: number;
	/** Module path of the token image; the default token icon when null. */
	img: string | null;
}

export interface SceneInput {
	world: string;
	/** Vault path of the Scene page the Foundry scene derives from. */
	path: string;
	name: string;
	/** The Scene page's own JournalEntry, linked from the Foundry scene. */
	journalId: string;
	image: { url: string; width: number; height: number };
	/** A 300 px WebP data URI for the scene directory. */
	thumb?: string;
	navOrder: number;
	tokens: SceneToken[];
	uvtt?: Uvtt;
}

export interface BuiltScene {
	data: Doc;
	warnings: string[];
}

/** UVTT grid squares to scene pixels: 64 px per square, relative to the map origin, padding being 0. */
function px(v: number, origin: number): number {
	return Math.round((v - origin) * GRID_SIZE);
}

function walls(uvtt: Uvtt, world: string, path: string): Doc[] {
	const { map_origin: o } = uvtt.resolution;
	const out: Doc[] = [];
	const add = (c: number[], extra: Doc = {}): void => {
		if (c[0] === c[2] && c[1] === c[3]) return;
		out.push({ _id: foundryId(world, path, `wall:${out.length}`), c, levels: [LEVEL_ID], ...extra });
	};
	for (const line of [...uvtt.line_of_sight, ...(uvtt.objects_line_of_sight ?? [])]) {
		for (let i = 0; i + 1 < line.length; i++) {
			const [a, b] = [line[i]!, line[i + 1]!];
			add([px(a.x, o.x), px(a.y, o.y), px(b.x, o.x), px(b.y, o.y)]);
		}
	}
	for (const portal of uvtt.portals ?? []) {
		const [a, b] = portal.bounds;
		if (!a || !b) continue;
		// CONST.WALL_DOOR_TYPES.DOOR = 1; WALL_DOOR_STATES CLOSED = 0, OPEN = 1.
		add([px(a.x, o.x), px(a.y, o.y), px(b.x, o.x), px(b.y, o.y)], { door: 1, ds: portal.closed === false ? 1 : 0 });
	}
	return out;
}

/** Dungeondraft writes colours as `aarrggbb`; Foundry wants `#rrggbb`. */
function lightColor(color: string | undefined): string | null {
	const hex = (color ?? "").replace(/^#/, "");
	if (hex.length === 8) return `#${hex.slice(2)}`;
	if (hex.length === 6) return `#${hex}`;
	return null;
}

function lights(uvtt: Uvtt, world: string, path: string): Doc[] {
	const { map_origin: o } = uvtt.resolution;
	return (uvtt.lights ?? []).map((light, i) => {
		const dim = light.range * 5;
		return {
			_id: foundryId(world, path, `light:${i}`),
			x: px(light.position.x, o.x),
			y: px(light.position.y, o.y),
			levels: [LEVEL_ID],
			rotation: 0,
			walls: light.shadows !== false,
			vision: false,
			config: { angle: 360, dim, bright: dim / 2, color: lightColor(light.color), alpha: Math.min(1, 0.5 * (light.intensity ?? 1)) },
		};
	});
}

function tokens(input: SceneInput): Doc[] {
	const { width } = input.image;
	const out: Doc[] = [];
	let x = GRID_SIZE;
	let y = 0;
	let rowHeight = 0;
	input.tokens.forEach((token, i) => {
		const size = token.squares * GRID_SIZE;
		if (x + size > width && x > GRID_SIZE) {
			x = GRID_SIZE;
			y += rowHeight;
			rowHeight = 0;
		}
		out.push({
			_id: foundryId(input.world, input.path, `token:${i}:${token.name}`),
			name: token.name,
			actorId: token.actorId,
			actorLink: false,
			x,
			y,
			width: token.squares,
			height: token.squares,
			level: LEVEL_ID,
			disposition: -1,
			displayName: 20,
			displayBars: 20,
			bar1: { attribute: "attributes.hp" },
			texture: { src: token.img ?? "icons/svg/mystery-man.svg", anchorX: 0.5, anchorY: 0.5, fit: "contain", scaleX: 1, scaleY: 1 },
		});
		x += size;
		rowHeight = Math.max(rowHeight, size);
	});
	return out;
}

/** A Foundry scene (a v14 scene with one Level) from a Battle Map image, its optional Universal VTT file and the Encounter's Creatures. */
export function buildScene(input: SceneInput): BuiltScene {
	const warnings: string[] = [];
	const { uvtt } = input;
	if (!uvtt) {
		warnings.push(`${input.name}: no walls, doors or lights, because no Universal VTT file (<Page> - Battle Map.uvtt or .dd2vtt) sits beside the Battle Map.`);
	} else {
		const { map_size: size, pixels_per_grid: ppg } = uvtt.resolution;
		if (Math.round(size.x * ppg) !== input.image.width || Math.round(size.y * ppg) !== input.image.height) {
			warnings.push(`${input.name}: the Universal VTT map (${size.x} by ${size.y} squares at ${ppg} px) does not match the image (${input.image.width} by ${input.image.height} px); wall positions may be off.`);
		}
		if (ppg !== GRID_SIZE) warnings.push(`${input.name}: the Universal VTT file is ${ppg} px per square, not ${GRID_SIZE}; walls are scaled to ${GRID_SIZE}.`);
	}
	const data: Doc = {
		_id: foundryId(input.world, input.path, "scene"),
		name: input.name,
		navigation: true,
		navOrder: input.navOrder,
		active: false,
		width: input.image.width,
		height: input.image.height,
		padding: 0,
		grid: { type: 1, size: GRID_SIZE, distance: 5, units: "ft" },
		levels: [{ _id: LEVEL_ID, name: input.name, background: { src: input.image.url } }],
		initialLevel: LEVEL_ID,
		tokens: tokens(input),
		walls: uvtt ? walls(uvtt, input.world, input.path) : [],
		lights: uvtt ? lights(uvtt, input.world, input.path) : [],
		journal: input.journalId,
		...(input.thumb ? { thumb: input.thumb } : {}),
		folder: null,
		sort: 0,
		flags: {},
		ownership: { default: OWNERSHIP.NONE },
		_stats: stats(),
	};
	return { data, warnings };
}
