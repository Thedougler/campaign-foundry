/**
 * Where each page kind lives in the Wiki.
 *
 * Source of truth: `docs/wiki-layout.md` (the tree at the top). When that layout changes, change this
 * table and nothing else; the placement layer reads only this module.
 *
 * A location is a directory pattern (segments from the vault root) plus a file-name rule. A segment is a
 * literal folder name, or a placeholder that binds the Campaign or Session folder the page sits in.
 * Folders are flat by kind, so a page must sit directly in the directory, never below it.
 *
 * One folder per Campaign (`docs/adr/0024-campaign-folder-holds-its-world.md`): each Campaign folder
 * holds its World's pages next to its Campaign pages, and World-content kinds are also valid at a
 * shared top-level `<Kind>/` folder for pages several Campaigns reuse. Where a kind lists several
 * locations, the Campaign one comes first, so fixes and hints prefer it.
 */

export type Bind = "campaign" | "session";
export type Segment = string | { bind: Bind };

export interface Location {
	dir: Segment[];
	/** The file name (without `.md`) must equal this literal when set. */
	name?: string;
}

const CAMPAIGN: Segment = { bind: "campaign" };
const SESSION: Segment = { bind: "session" };

const inCampaign = (folder: string): Location[] => [{ dir: [CAMPAIGN, folder] }, { dir: [folder] }];
const inSession: Location[] = [{ dir: [CAMPAIGN, "Sessions", SESSION] }];

/** Keyed by frontmatter `type`. Where a kind has several valid locations, the most specific comes first. */
export const PLACEMENTS: Record<string, Location[]> = {
	"DM Settings": [{ dir: [], name: "DM Settings" }],
	World: [{ dir: [CAMPAIGN] }, { dir: [] }],
	Location: inCampaign("Locations"),
	NPC: inCampaign("NPCs"),
	Creature: inCampaign("Creatures"),
	Faction: inCampaign("Factions"),
	Deity: inCampaign("Deities"),
	Item: inCampaign("Items"),
	Spell: inCampaign("Spells"),
	Vehicle: inCampaign("Vehicles"),
	Lore: inCampaign("Lore"),
	"House Rule": inCampaign("House Rules"),
	Campaign: [{ dir: [CAMPAIGN] }],
	hot: [{ dir: [CAMPAIGN], name: "hot" }],
	"campaign-config": [{ dir: [CAMPAIGN], name: "campaign-config" }],
	"story-so-far": [{ dir: [CAMPAIGN], name: "story-so-far" }],
	PC: [{ dir: [CAMPAIGN, "PCs"] }],
	Thread: [{ dir: [CAMPAIGN, "Threads"] }],
	Quest: [{ dir: [CAMPAIGN, "Quests"] }],
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
			// A shared kind folder (NPCs, Locations, …) is never a Campaign folder.
			if (want.bind === "campaign" && isSharedRootFolder(have)) return null;
			bound[want.bind] = have;
		}
	}
	return bound;
}

/**
 * Folders that sit directly under the vault root and are not a Campaign folder: the vault's own
 * folders (`templates`, `attachments`, `.obsidian`) and the shared kind folders a page may sit in
 * when several Campaigns reuse it.
 */
export const SHARED_ROOT_FOLDERS: ReadonlySet<string> = (() => {
	const folders = new Set<string>(["attachments", "templates", ".obsidian"]);
	for (const locations of Object.values(PLACEMENTS)) {
		for (const loc of locations) {
			const first = loc.dir[0];
			if (typeof first === "string" && first !== "") folders.add(first);
		}
	}
	return folders;
})();

export const isSharedRootFolder = (name: string): boolean => SHARED_ROOT_FOLDERS.has(name);

/** The placeholders a page's current path already fixes: its Campaign folder, and Session folder if it sits in one. */
export function bindingsFromPath(segments: string[]): Bindings {
	const bound: Bindings = {};
	if (segments[0] !== undefined && !isSharedRootFolder(segments[0])) {
		bound.campaign = segments[0];
		if (segments[1] === "Sessions" && segments[2] !== undefined && SESSION_FOLDER.test(segments[2])) {
			bound.session = segments[2];
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

const PLACEHOLDER: Record<Bind, string> = { campaign: "<Campaign>", session: "<Session N>" };

/** Human-readable location, e.g. `<Campaign>/Locations/`. */
export function describe(location: Location): string {
	const dir = location.dir.map((s) => (typeof s === "string" ? s : PLACEHOLDER[s.bind])).join("/");
	const file = location.name === undefined ? "" : `${location.name}.md`;
	return `${dir}${dir && "/"}${file}`;
}
