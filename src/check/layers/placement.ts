import { bindingsFromPath, describe, matchDir, PLACEMENTS, resolveDir } from "../placement-table.ts";
import type { Location } from "../placement-table.ts";
import type { Page } from "../../vault/types.ts";
import type { CheckContext, Finding, Fix, FixResult, Layer } from "../types.ts";
import { checkedPages, dirOf, isSpecialPage, isTarget } from "../util.ts";

const LAYER = "placement";
/** Fixed and generated filenames repeat across Campaign folders. */
const FIXED_NAME = new Set(
	Object.values(PLACEMENTS).flatMap((locs) => locs.flatMap((l) => (typeof l.name === "string" ? [l.name] : []))),
);
const REPEATABLE = (slug: string): boolean =>
	FIXED_NAME.has(slug) || slug === "index" || slug === "log" || /^log-\d{4}$/.test(slug);

const segmentsOf = (page: Page): string[] => dirOf(page.path).split("/").filter(Boolean);
const wikiType = (page: Page): string | undefined => {
	const t = page.frontmatter?.type;
	return typeof t === "string" && t in PLACEMENTS ? t : undefined;
};

/** Fixed pages keep exactly the filename required by the placement table. */
const nameMatches = (page: Page, location: Location): boolean =>
	location.name === undefined || page.slug === location.name;

interface Verdict {
	ok: boolean;
	/** Set when the directory is right but the file name is not: the name it must have. */
	wrongName?: string;
	/** Where a move would put the page, when that is unambiguous. */
	target?: string;
	expected: Location[];
}

function judge(page: Page, type: string, taken: (path: string) => boolean): Verdict {
	const locations = PLACEMENTS[type]!;
	const segments = segmentsOf(page);
	let wrongName: string | undefined;
	for (const location of locations) {
		const bound = matchDir(location, segments);
		if (!bound) continue;
		if (nameMatches(page, location)) return { ok: true, expected: locations };
		wrongName = location.name;
	}
	if (wrongName) return { ok: false, wrongName, expected: locations };
	const fromPath = bindingsFromPath(segments);
	for (const location of locations) {
		const dir = resolveDir(location, fromPath);
		if (!dir || (location.name !== undefined && !nameMatches(page, location))) continue;
		// The file keeps its own slug on the way in; `cf rename` owns renames.
		const target = [...dir, `${page.slug}.md`].join("/");
		if (taken(target)) return { ok: false, expected: locations };
		return { ok: false, target, expected: locations };
	}
	return { ok: false, expected: locations };
}

/** A sample path for a location, with placeholders filled in, for hints. */
function example(location: Location, name: string): string {
	const sample = { campaign: "salt-and-lantern", session: "Session 1" };
	const dir = location.dir.map((s) => (typeof s === "string" ? s : sample[s.bind]));
	// `name` is the page's own slug: placement moves never rename, `cf rename` does (ADR 0028).
	const file = location.name === undefined ? name : location.name;
	return ["wiki", ...dir, `${file}.md`].join("/");
}

function specialFindings(ctx: CheckContext, page: Page, out: Finding[]): void {
	const segments = segmentsOf(page);
	const add = (rule: string, message: string, hint: string): void => {
		out.push({ layer: LAYER, severity: "error", rule, path: ctx.display(page.path), line: 1, message, hint });
	};
	if (page.slug === "index" && segments.length > 1) {
		add("misplaced-special", "`index.md` is not at the Wiki root or a Campaign folder.", "`index.md` is generated: one at the vault root listing the Campaigns, one per Campaign folder at `<Campaign folder>/index.md`. Regenerate it in the right place.");
	} else if (page.slug !== "index" && isSpecialPage(page) && segments.length !== 1) {
		add("misplaced-special", `\`${page.slug}.md\` is not directly in a Campaign folder.`, `The append-only log lives at \`<Campaign folder>/${page.slug}.md\`, e.g. wiki/salt-and-lantern/${page.slug}.md.`);
	}
}

/** Page kinds in a Session folder whose names carry the Session number; Handouts keep their in-world name. */
const SESSION_NAMED = new Set(["Prep", "Scene", "Recap", "Previously On"]);
/** For these kinds the part after `Session N - ` is the kind itself; a Scene uses its own title. */
const FIXED_TITLE = new Set(["Prep", "Recap", "Previously On"]);

/** Session display titles identify their Session; filenames remain stable slugs. */
function sessionNameProblem(page: Page, type: string): string | undefined {
	if (!SESSION_NAMED.has(type)) return undefined;
	const bound = matchDir(PLACEMENTS[type]![0]!, segmentsOf(page));
	const n = bound?.session ? /^Session (\d+)$/.exec(bound.session)?.[1] : undefined;
	if (!n) return undefined;
	const low = page.name.toLowerCase();
	if (FIXED_TITLE.has(type)) {
		const want = `Session ${n} - ${type}`;
		return low === want.toLowerCase() ? undefined : want;
	}
	return new RegExp(`^session ${n} - .+$`).test(low) ? undefined : `Session ${n} - <Scene title>`;
}

export function run(ctx: CheckContext): Finding[] {
	const findings: Finding[] = [];
	const exists = (path: string): boolean => ctx.vault.pageByPath.has(path);
	for (const page of checkedPages(ctx)) {
		const path = ctx.display(page.path);
		const add = (rule: string, message: string, hint: string): void => {
			findings.push({ layer: LAYER, severity: "error", rule, path, line: 1, message, hint });
		};
		if (isSpecialPage(page)) {
			specialFindings(ctx, page, findings);
			continue;
		}
		const type = wikiType(page);
		if (!type) continue;
		const verdict = judge(page, type, exists);
		if (verdict.ok) {
			const want = sessionNameProblem(page, type);
			if (want) {
				const example = want.replace("<Scene title>", "The Drowned Bell");
				add("session-page-name", `A ${type} page in a Session folder must have title \`${want}\`, not \`${page.name}\`.`, `Set \`title: "${example}"\`, with N the folder's number. The filename is its stable slug; use \`cf rename\` to change it.`);
			}
			continue;
		}
		const where = verdict.expected.map((l) => `\`${describe(l)}\``).join(" or ");
		if (verdict.wrongName) {
			add("wrong-file-name", `A page of type ${type} in \`${dirOf(page.path)}/\` must be named \`${verdict.wrongName}.md\`, not \`${page.slug}.md\`.`, `Rename the file to \`${verdict.wrongName}.md\`, and update links that spelled the old file name.`);
			continue;
		}
		const first = verdict.expected[0]!;
		const owners = first.dir.some((s) => typeof s !== "string") ? ", inside the Campaign folder that owns it" : "";
		const hint = verdict.target
			? `Move it to \`${verdict.target}\`. \`cf check --fix\` does this.`
			: `Move it to ${where}${owners}, e.g. \`${example(first, page.slug)}\`.`;
		const here = dirOf(page.path) ? `in \`${dirOf(page.path)}/\`` : "at the Wiki root";
		add("misplaced", `A page of type ${type} belongs in ${where}, but this one is ${here}.`, hint);
	}

	const byName = new Map<string, Page[]>();
	for (const page of ctx.vault.pages) {
		if (REPEATABLE(page.slug)) continue;
		const key = page.name.toLowerCase();
		byName.set(key, [...(byName.get(key) ?? []), page]);
	}
	for (const pages of byName.values()) {
		if (pages.length < 2) continue;
		for (const page of pages) {
			if (!isTarget(ctx, page.path)) continue;
			const others = pages.filter((p) => p !== page).map((p) => p.path);
			findings.push({
				layer: LAYER,
				severity: "error",
				rule: "duplicate-name",
				path: ctx.display(page.path),
				line: 1,
				message: `Page name \`${page.name}\` is also used by ${others.join(", ")}.`,
				hint: `Obsidian links by name, so every page name must be unique. Add a parenthetical saying what each is, e.g. \`${page.name} (Keep)\` and \`${page.name} (Guild)\`, then update the links.`,
			});
		}
	}
	return findings;
}

export function fix(ctx: CheckContext): FixResult {
	const fixes: Fix[] = [];
	const claimed = new Set<string>();
	const taken = (path: string): boolean => ctx.vault.pageByPath.has(path) || claimed.has(path);
	for (const page of checkedPages(ctx)) {
		const type = wikiType(page);
		if (!type || isSpecialPage(page)) continue;
		const verdict = judge(page, type, taken);
		if (verdict.ok || !verdict.target) continue;
		claimed.add(verdict.target);
		fixes.push({
			layer: LAYER,
			rule: "misplaced",
			path: ctx.display(page.path),
			description: `moved to ${ctx.display(verdict.target)}`,
			edit: { type: "move", from: page.path, to: verdict.target },
		});
	}
	return { fixes };
}

export const placementLayer: Layer = {
	name: LAYER,
	description: "Each page sits where docs/wiki-layout.md puts its kind; names are in-world and unique.",
	run,
	fix,
};
