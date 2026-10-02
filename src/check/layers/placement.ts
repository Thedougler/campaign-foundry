import { bindingsFromPath, describe, matchDir, nameOk, PLACEMENTS, resolveDir } from "../placement-table.ts";
import type { Location } from "../placement-table.ts";
import type { Page } from "../../vault/types.ts";
import type { CheckContext, Finding, Fix, FixResult, Layer } from "../types.ts";
import { dirOf, isSpecialPage } from "../util.ts";

const LAYER = "placement";
/** Exact file names the placement table requires, plus generated index and log pages. They repeat across Worlds and Campaigns. */
const FIXED_NAME = new Set(
	Object.values(PLACEMENTS).flatMap((locs) => locs.flatMap((l) => (typeof l.name === "string" ? [l.name] : []))),
);
const REPEATABLE = (name: string): boolean => FIXED_NAME.has(name) || name === "index" || name === "log" || /^log-\d{4}$/.test(name);

const segmentsOf = (page: Page): string[] => dirOf(page.path).split("/").filter(Boolean);
const wikiType = (page: Page): string | undefined => {
	const t = page.frontmatter?.type;
	return typeof t === "string" && t in PLACEMENTS ? t : undefined;
};

/** `black_lotus` becomes `black-lotus`. */
function unslug(name: string): string {
	return name.replaceAll("_", "-");
}

function isSlug(name: string): boolean {
	return name.includes("_");
}

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
		if (nameOk(location, page.name, bound)) return { ok: true, expected: locations };
		wrongName = typeof location.name === "string" ? location.name : bound[location.name?.bind ?? "world"];
	}
	if (wrongName) return { ok: false, wrongName, expected: locations };
	const fromPath = bindingsFromPath(segments);
	for (const location of locations) {
		const dir = resolveDir(location, fromPath);
		if (!dir) continue;
		if (!nameOk(location, page.name, fromPath)) continue;
		const target = [...dir, `${page.name}.md`].join("/");
		if (taken(target)) return { ok: false, expected: locations };
		return { ok: false, target, expected: locations };
	}
	return { ok: false, expected: locations };
}

/** A sample path for a location, with placeholders filled in, for hints. */
function example(location: Location, name: string): string {
	const sample = { world: "Aldermoor", campaign: "Ashes of the Crown", session: "Session 1" };
	const dir = location.dir.map((s) => (typeof s === "string" ? s : sample[s.bind]));
	const file = location.name === undefined ? name : typeof location.name === "string" ? location.name : sample[location.name.bind];
	return ["wiki", ...dir, `${file}.md`].join("/");
}

function specialFindings(ctx: CheckContext, page: Page, out: Finding[]): void {
	const segments = segmentsOf(page);
	const add = (rule: string, message: string, hint: string): void => {
		out.push({ layer: LAYER, rule, path: ctx.display(page.path), line: 1, message, hint });
	};
	if (page.name === "index" && segments.length > 1) {
		add("misplaced-special", "`index.md` is not at the Wiki root or a World's folder.", "`index.md` is generated: one at the vault root listing the Worlds, one per World at `<World>/index.md`. Regenerate it in the right place.");
	} else if (page.name !== "index" && isSpecialPage(page) && segments.length !== 1) {
		add("misplaced-special", `\`${page.name}.md\` is not directly in a World's folder.`, `The append-only log lives at \`<World>/${page.name}.md\`, e.g. wiki/Aldermoor/${page.name}.md.`);
	}
}

/** Page kinds in a Session folder whose names carry the Session number; Handouts keep their in-world name. */
const SESSION_NAMED = new Set(["Prep", "Scene", "Recap", "Previously On"]);
/** For these kinds the part after `Session N - ` is the kind itself; a Scene uses its own title. */
const FIXED_TITLE = new Set(["Prep", "Recap", "Previously On"]);

/** The name a Session page should have, or undefined when its name is fine (or the rule does not apply). */
function sessionNameProblem(page: Page, type: string): string | undefined {
	if (!SESSION_NAMED.has(type)) return undefined;
	const bound = matchDir(PLACEMENTS[type]![0]!, segmentsOf(page));
	const n = bound?.session ? /^Session (\d+)$/.exec(bound.session)?.[1] : undefined;
	if (!n) return undefined;
	if (FIXED_TITLE.has(type)) {
		const want = `Session ${n} - ${type}`;
		return page.name === want ? undefined : want;
	}
	return page.name.startsWith(`Session ${n} - `) && page.name.length > `Session ${n} - `.length ? undefined : `Session ${n} - <Scene title>`;
}

export function run(ctx: CheckContext): Finding[] {
	const findings: Finding[] = [];
	const exists = (path: string): boolean => ctx.vault.pageByPath.has(path);
	for (const page of ctx.vault.pages) {
		const path = ctx.display(page.path);
		const add = (rule: string, message: string, hint: string): void => {
			findings.push({ layer: LAYER, rule, path, line: 1, message, hint });
		};
		if (isSpecialPage(page)) {
			specialFindings(ctx, page, findings);
			continue;
		}
		if (!REPEATABLE(page.name) && isSlug(page.name)) {
			add("slug-name", `Page name \`${page.name}\` uses underscores.`, `Use kebab-case: rename to \`${unslug(page.name)}.md\`. Links use the name (\`[[${unslug(page.name)}]]\`), so update them too.`);
		}
		const type = wikiType(page);
		if (!type) continue;
		const verdict = judge(page, type, exists);
		if (verdict.ok) {
			const want = sessionNameProblem(page, type);
			if (want) {
				const example = want.replace("<Scene title>", "The Drowned Bell");
				add("session-page-name", `A ${type} page in a Session folder must be named \`${want}\`, not \`${page.name}\`.`, `Session pages are named \`Session <N> - <Prep, Recap, Previously On or the Scene's title>\`, with N the folder's number. Rename the file to \`${example}.md\` and update links to \`[[${page.name}]]\`.`);
			}
			continue;
		}
		const where = verdict.expected.map((l) => `\`${describe(l)}\``).join(" or ");
		if (verdict.wrongName) {
			add("wrong-file-name", `A page of type ${type} in \`${dirOf(page.path)}/\` must be named \`${verdict.wrongName}.md\`, not \`${page.name}.md\`.`, `Rename the file to \`${verdict.wrongName}.md\`, and update links to \`[[${page.name}]]\`.`);
			continue;
		}
		const first = verdict.expected[0]!;
		const owners = first.dir.some((s) => typeof s !== "string") ? `, inside the ${first.dir.some((s) => typeof s !== "string" && s.bind !== "world") ? "World, Campaign or Session" : "World"} folder that owns it` : "";
		const hint = verdict.target
			? `Move it to \`${verdict.target}\`. \`cf check --fix\` does this.`
			: `Move it to ${where}${owners}, e.g. \`${example(first, page.name)}\`.`;
		const here = dirOf(page.path) ? `in \`${dirOf(page.path)}/\`` : "at the Wiki root";
		add("misplaced", `A page of type ${type} belongs in ${where}, but this one is ${here}.`, hint);
	}

	const byName = new Map<string, Page[]>();
	for (const page of ctx.vault.pages) {
		if (REPEATABLE(page.name)) continue;
		const key = page.name.toLowerCase();
		byName.set(key, [...(byName.get(key) ?? []), page]);
	}
	for (const pages of byName.values()) {
		if (pages.length < 2) continue;
		for (const page of pages) {
			const others = pages.filter((p) => p !== page).map((p) => p.path);
			findings.push({
				layer: LAYER,
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
	for (const page of ctx.vault.pages) {
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
