/**
 * Where each page kind lives in the Wiki.
 *
 * Source of truth: `docs/wiki-layout.md` (the tree at the top). When that layout changes, change this
 * table and nothing else; the placement layer reads only this module.
 *
 * A location is a directory pattern (segments from the vault root) plus a file-name rule. A segment is a
 * literal folder name, or a placeholder that binds the World, Campaign or Session folder the page sits in.
 * Folders are flat by kind, so a page must sit directly in the directory, never below it.
 */

export type Bind = "world" | "campaign" | "session";
export type Segment = string | { bind: Bind };

export interface Location {
	dir: Segment[];
	/** The file name (without `.md`) must be a literal, or equal the bound World or Campaign folder name. */
	name?: string | { bind: "world" | "campaign" };
}

const WORLD: Segment = { bind: "world" };
const CAMPAIGN: Segment = { bind: "campaign" };
const SESSION: Segment = { bind: "session" };

const inWorld = (folder: string): Location[] => [{ dir: [WORLD, folder] }];
const inCampaign = (folder: string): Location[] => [{ dir: [WORLD, CAMPAIGN, folder] }];
const inSession: Location[] = [{ dir: [WORLD, CAMPAIGN, "Sessions", SESSION] }];

/** Keyed by frontmatter `type`. Where a kind has several valid locations, the most specific comes first. */
export const PLACEMENTS: Record<string, Location[]> = {
	"DM Settings": [{ dir: [], name: "DM Settings" }],
	World: [{ dir: [WORLD], name: { bind: "world" } }],
	Location: inWorld("Locations"),
	NPC: inWorld("NPCs"),
	Creature: inWorld("Creatures"),
	Faction: inWorld("Factions"),
	Deity: inWorld("Deities"),
	Item: inWorld("Items"),
	Spell: inWorld("Spells"),
	Vehicle: inWorld("Vehicles"),
	Lore: inWorld("Lore"),
	"House Rule": [...inCampaign("House Rules"), ...inWorld("House Rules")],
	Campaign: [{ dir: [WORLD, CAMPAIGN], name: { bind: "campaign" } }],
	hot: [{ dir: [WORLD, CAMPAIGN], name: "hot" }],
	PC: inCampaign("PCs"),
	Thread: inCampaign("Threads"),
	Quest: inCampaign("Quests"),
	Prep: inSession,
	Scene: inSession,
	Recap: inSession,
	"Previously On": inSession,
	Handout: inSession,
};

/** A Session folder is named `Session N`. */
export const SESSION_FOLDER = /^Session \d+$/;

export type Bindings = Partial<Record<Bind, string>>;

/** Matches a page's directory segments against a location; returns the placeholders it binds, or null. */
export function matchDir(location: Location, segments: string[]): Bindings | null {
	if (location.dir.length !== segments.length) return null;
	const bound: Bindings = {};
	for (let i = 0; i < segments.length; i++) {
		const want = location.dir[i]!;
		const have = segments[i]!;
		if (typeof want === "string") {
			if (want !== have) return null;
		} else {
			if (want.bind === "session" && !SESSION_FOLDER.test(have)) return null;
			bound[want.bind] = have;
		}
	}
	return bound;
}

export function nameOk(location: Location, name: string, bound: Bindings): boolean {
	if (location.name === undefined) return true;
	if (typeof location.name === "string") return name === location.name;
	return name === bound[location.name.bind];
}

/** Folders that sit directly under a World and are not a Campaign folder. */
export const WORLD_ROOT_FOLDERS: ReadonlySet<string> = (() => {
	const folders = new Set<string>(["attachments"]);
	for (const locations of Object.values(PLACEMENTS)) {
		for (const loc of locations) {
			const [world, folder] = loc.dir;
			if (world !== undefined && typeof world !== "string" && world.bind === "world" && typeof folder === "string") {
				folders.add(folder);
			}
		}
	}
	return folders;
})();

export const isWorldRootFolder = (name: string): boolean => WORLD_ROOT_FOLDERS.has(name);

/** The placeholders a page's current path already fixes: its World folder, and Campaign and Session folders if it sits in them. */
export function bindingsFromPath(segments: string[]): Bindings {
	const bound: Bindings = {};
	if (segments[0] !== undefined) bound.world = segments[0];
	if (segments[1] !== undefined && !isWorldRootFolder(segments[1])) {
		bound.campaign = segments[1];
		if (segments[2] === "Sessions" && segments[3] !== undefined && SESSION_FOLDER.test(segments[3])) {
			bound.session = segments[3];
		}
	}
	return bound;
}

/** The directory a location resolves to under the given bindings, or null when a placeholder is unbound. */
export function resolveDir(location: Location, bound: Bindings): string[] | null {
	const out: string[] = [];
	for (const seg of location.dir) {
		if (typeof seg === "string") out.push(seg);
		else if (bound[seg.bind] !== undefined) out.push(bound[seg.bind]!);
		else return null;
	}
	return out;
}

const PLACEHOLDER: Record<Bind, string> = { world: "<World>", campaign: "<Campaign>", session: "<Session N>" };

/** Human-readable location, e.g. `<World>/Locations/`. */
export function describe(location: Location): string {
	const dir = location.dir.map((s) => (typeof s === "string" ? s : PLACEHOLDER[s.bind])).join("/");
	const file = location.name === undefined ? "" : typeof location.name === "string" ? `${location.name}.md` : `${PLACEHOLDER[location.name.bind]}.md`;
	return `${dir}${dir && "/"}${file}`;
}
