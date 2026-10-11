import { mkdir, rename as moveFile, unlink, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, relative, sep } from "node:path";
import { Command } from "commander";
import sharp from "sharp";
import { UsageError } from "../check/run.ts";
import { slugify } from "../vault/dialect.ts";
import { normalizeTarget, pathSuffixes } from "../vault/links.ts";
import { applyEdits, type LinkEdit, planLinkEdits } from "../vault/rewrite.ts";
import type { Page, Vault } from "../vault/types.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { CF, envOptions, resolveEnv } from "./kit.ts";

/** The kind suffixes a Visual's file name carries (`docs/wiki-layout.md`), longest first so `battle-map` beats `map`. */
const KINDS = [
	"battle-map",
	"reference-sheet",
	"handout-art",
	"portrait",
	"token",
	"scene",
	"render",
	"banner",
	"sigil",
	"symbol",
	"map",
] as const;
type Kind = (typeof KINDS)[number];
/** Kinds whose files keep their bytes: a map's grid and a sheet's fine print do not survive webp's lossy step. */
const LOSSLESS: ReadonlySet<Kind> = new Set(["battle-map", "reference-sheet"]);
/** Extensions re-encoded to webp. Gif (animation) and svg (vector) only rename. */
const CONVERTIBLE: ReadonlySet<string> = new Set(["jpg", "jpeg", "png", "tif", "tiff", "bmp", "avif"]);
/** Universal VTT sidecars: renamed beside their battle map, never converted or embedded. */
const COMPANIONS: ReadonlySet<string> = new Set(["uvtt", "dd2vtt"]);
const IMAGES: ReadonlySet<string> = new Set([...CONVERTIBLE, "webp", "gif", "svg"]);
/** The old skill's kind word for Handout art, before the vocabulary settled. */
const HANDOUT_ALIAS = "handout";
const WEBP_QUALITY = 85;

interface ConvertFlags {
	dryRun?: boolean;
	json?: boolean;
	vault?: string;
	root?: string;
}

/** One attachment that changes on disk: re-encoded when `convert`, byte-identical move otherwise. */
interface Move {
	from: string;
	to: string;
	convert: boolean;
}

/** One attachment left alone, and why the plan says so. */
interface Skip {
	path: string;
	reason: string;
}

/** The extension, lowercased: the form every extension comparison in this file uses. */
const extOf = (path: string): string => extname(path).slice(1).toLowerCase();

/** The stem of a file name: the whole base when there is no extension. */
const stemOf = (path: string): string => {
	const base = basename(path);
	return base.slice(0, base.length - extname(base).length);
};

/** The kind a slug names, `battle-map-descent` naming battle-map, or undefined when it names none. */
function kindOf(slug: string): Kind | undefined {
	for (const kind of KINDS) {
		if (slug === kind || slug.startsWith(`${kind}-`)) return kind;
	}
	return slug === HANDOUT_ALIAS || slug.startsWith(`${HANDOUT_ALIAS}-`) ? "handout-art" : undefined;
}

/** The kind segment of the new name: the old one slugged, with a legacy `Handout` spelled as the kind it names. */
function kindSegment(slug: string): string {
	for (const kind of KINDS) {
		if (slug === kind || slug.startsWith(`${kind}-`)) return slug;
	}
	return `handout-art${slug.slice(HANDOUT_ALIAS.length)}`;
}

/** Whether the stem, split on its hyphens, holds a kind segment-run with a subject in front of it. */
function namesKind(stem: string): boolean {
	const segments = stem.split("-");
	for (const kind of [...KINDS, HANDOUT_ALIAS]) {
		const parts = kind.split("-");
		for (let at = 1; at + parts.length <= segments.length; at++) {
			if (parts.every((part, j) => segments[at + j] === part)) return true;
		}
	}
	return false;
}

/**
 * Every change the run makes to attachments: art converts to webp and takes its slug name, lossless kinds
 * and unconvertible formats rename only, VTT companions ride with their battle map, and everything else
 * is skipped with its reason.
 */
function planFiles(vault: Vault): { moves: Move[]; skips: Skip[] } {
	const moves: Move[] = [];
	const skips: Skip[] = [];
	for (const path of vault.attachments) {
		const ext = extOf(path);
		if (COMPANIONS.has(ext)) continue; // planned beside their battle map below
		if (!IMAGES.has(ext)) {
			skips.push({ path, reason: "not an image" });
			continue;
		}
		const stem = stemOf(path);
		const separator = stem.lastIndexOf(" - ");
		if (separator === -1) {
			const slugKind = stem === slugify(stem) && namesKind(stem);
			skips.push({
				path,
				reason: slugKind
					? "already follows the naming"
					: `no "<Title> - <Kind>" separator and not already <slug>-<kind>`,
			});
			continue;
		}
		const title = stem.slice(0, separator);
		const kindWord = stem.slice(separator + 3);
		const slug = slugify(kindWord);
		const kind = kindOf(slug);
		if (kind === undefined) {
			skips.push({ path, reason: `no known kind in "${kindWord}" (kinds: ${KINDS.join(", ")})` });
			continue;
		}
		const titleSlug = slugify(title);
		if (titleSlug === "") {
			skips.push({ path, reason: `nothing names a subject before "${kindWord}"` });
			continue;
		}
		const convert = !LOSSLESS.has(kind) && CONVERTIBLE.has(ext) && ext !== "webp";
		const newExt = convert ? "webp" : extname(path).slice(1);
		moves.push({
			from: path,
			to: `${path.slice(0, path.lastIndexOf("/") + 1)}${titleSlug}-${kindSegment(slug)}.${newExt}`,
			convert,
		});
	}
	for (const path of vault.attachments) {
		if (!COMPANIONS.has(extOf(path))) continue;
		const stem = path.slice(0, path.length - extname(path).length);
		const ride = moves.find((move) => move.from.slice(0, move.from.length - extname(move.from).length) === stem);
		if (ride)
			moves.push({
				from: path,
				to: `${ride.to.slice(0, ride.to.lastIndexOf("/") + 1)}${stemOf(ride.to)}.${extname(path).slice(1)}`,
				convert: false,
			});
		else skips.push({ path, reason: "no map image of the same name beside it" });
	}
	return { moves, skips };
}

/** Refuses, before anything is touched, when two attachments would land on one name. */
function assertNoClashes(vault: Vault, moves: Move[]): void {
	const byTarget = new Map<string, Move[]>();
	for (const move of moves) byTarget.set(move.to.toLowerCase(), [...(byTarget.get(move.to.toLowerCase()) ?? []), move]);
	for (const [target, clash] of byTarget) {
		if (clash.length > 1) {
			throw new UsageError(
				`Two attachments would both become \`${target}\`: ${clash.map((move) => move.from).join(", ")}.`,
				"Rename one by hand first, so each keeps its own subject or variant.",
			);
		}
	}
	const moving = new Set(moves.map((move) => move.from));
	for (const move of moves) {
		const holder = vault.attachments.find((p) => !moving.has(p) && p.toLowerCase() === move.to.toLowerCase());
		if (holder) {
			throw new UsageError(
				`Converting \`${move.from}\` needs the name \`${move.to}\`, which \`${holder}\` already holds.`,
				"Rename or delete one of them by hand first, or give the files different subjects or variants.",
			);
		}
	}
}

/**
 * Every link that names a renamed attachment, rewritten on the page that holds it. A link may spell the file
 * by any suffix of its path (`![[map.webp]]`, `![[attachments/map.webp]]`), exactly as the link graph resolves
 * it, and keeps its embed marker, size alias and any heading or block fragment.
 */
function planRewrites(vault: Vault, moves: Move[]): Map<Page, LinkEdit[]> {
	const byKey = new Map<string, { move: Move; key: string; depth: number }>();
	for (const move of moves) {
		if (!IMAGES.has(extOf(move.from))) continue; // a VTT companion is never embedded
		for (const key of pathSuffixes(move.from.toLowerCase())) {
			if (!byKey.has(key)) byKey.set(key, { move, key, depth: key.split("/").length });
		}
	}
	return planLinkEdits(vault.pages, new Set(byKey.keys()), (span) => {
		const hit = byKey.get(normalizeTarget(span.link.target));
		if (!hit) return undefined;
		// The link spelled the file by the last `depth` segments of its path; it now spells the new one the same way.
		const tail = hit.move.to.split("/").slice(-hit.depth).join("/");
		const newTarget = `${span.link.target.slice(0, span.link.target.length - hit.key.length)}${tail}`;
		const fragments = [
			...span.link.headings.map((heading) => `#${heading}`),
			...(span.link.block !== undefined ? [`#^${span.link.block}`] : []),
		].join("");
		const bar = span.inner.indexOf("|");
		const aliasPart = bar === -1 ? undefined : span.inner.slice(bar + 1);
		const separator = span.table || (bar !== -1 && span.inner[bar - 1] === "\\") ? "\\|" : "|";
		return `${span.link.embed ? "!" : ""}[[${newTarget}${fragments}${aliasPart !== undefined ? `${separator}${aliasPart}` : ""}]]`;
	});
}

/** Where the run refuses to work: prior Wiki history and test fixtures are not the DM's vault. */
function assertNotGuarded(root: string, vault: string): void {
	const rel = relative(root, vault).split(sep).join("/");
	const inside = (folder: string): boolean => rel === folder || rel.startsWith(`${folder}/`);
	if (inside("prior") || inside("test")) {
		throw new UsageError(
			`The vault ${vault} sits inside ${inside("prior") ? "prior/, the kept history" : "test/, the fixtures"}, which cfcli convert never touches.`,
			`Run it on the live Wiki: ${CF} convert --vault wiki`,
		);
	}
	if (vault.split(sep).includes(".git"))
		throw new UsageError(
			`The vault ${vault} sits inside .git.`,
			`Point --vault at the Wiki folder, e.g. ${CF} convert --vault wiki`,
		);
}

export function convertCommand(): Command {
	const command = new Command("convert")
		.description(
			"Convert the Wiki's image attachments: art re-encodes to webp (quality 85, dimensions kept) and every file takes the slug name `<subject-slug>-<kind>[-<variant>].<ext>`; battle maps and reference sheets keep their bytes and only rename; a renamed battle map's .uvtt/.dd2vtt companion renames with it; every wikilink and embed across the vault is rewritten to the new names. Exits 0 done, 1 some files failed, 2 usage error.",
		)
		.option("--dry-run", "print every planned conversion, rename, skip and embed rewrite without touching anything");
	envOptions(command);
	return command
		.option("--json", "print {moves,rewrites,skips,failures} JSON instead of text")
		.addHelpText(
			"after",
			`
Naming:
  "<Title> - <Kind>.<ext>" becomes "<subject-slug>-<kind>[-<variant>].<ext>", all lowercase kebab-case.
  The name splits at the last " - ", so a title keeps its inner dash; a trailing qualifier on the kind
  stays as the variant.
    Nona Black-Jaw - Portrait.png              nona-black-jaw-portrait.webp
    Aruhe - Handout Art.jpg                   aruhe-handout-art.webp
    Session 13 - The Hearing - Battle Map.webp session-13-the-hearing-battle-map.webp
    Wolf Rabbit - Portrait 2.png               wolfrabbit-portrait-2.webp
    Hobb's Warning - Handout.webp              hobbs-warning-handout-art.webp  (legacy "Handout" names handout-art)
  Kinds: ${KINDS.join(", ")}. Battle maps and reference sheets stay lossless (their extension is kept);
  gif and svg rename only.

Skipped, with the reason printed: files with no known kind in the name, names already in slug form,
non-images, and a VTT file with no map image of the same name beside it. prior/, test/ and .git are
never touched.

Exit codes:
  0  done (or nothing to do)    1  some files failed    2  usage error

Examples:
  ${CF} convert --dry-run
  ${CF} convert
  ${CF} convert --vault wiki --dry-run
  ${CF} convert --json`,
		)
		.action(async (flags: ConvertFlags) => {
			const resolved = resolveEnv(flags, "convert");
			assertNotGuarded(resolved.root, resolved.vault);
			const vault = buildVault(resolved.vault, await readVaultFiles(resolved.vault));
			const { moves, skips } = planFiles(vault);
			assertNoClashes(vault, moves);
			const rewrites = planRewrites(vault, moves);

			const dry = flags.dryRun ?? false;
			const show = (path: string): string => relative(process.cwd(), join(resolved.vault, path)).split(sep).join("/");
			const would = (verb: string): string => (dry ? `would ${verb}` : verb);
			const out: string[] = [];
			const failures: { path: string; message: string }[] = [];

			if (!dry) {
				for (const move of moves) {
					const from = join(resolved.vault, move.from);
					const to = join(resolved.vault, move.to);
					try {
						await mkdir(dirname(to), { recursive: true });
						if (move.convert) {
							// Dimensions are kept: only the re-encode, no resize.
							await sharp(from).webp({ quality: WEBP_QUALITY }).toFile(to);
							await unlink(from);
						} else {
							await moveFile(from, to);
						}
					} catch (error) {
						failures.push({ path: move.from, message: (error as Error).message });
					}
				}
				for (const [page, edits] of rewrites) {
					try {
						await writeFile(join(resolved.vault, page.path), applyEdits(page.source, edits));
					} catch (error) {
						failures.push({ path: page.path, message: (error as Error).message });
					}
				}
			}

			for (const move of moves)
				out.push(`${would(move.convert ? "convert" : "rename")}  ${show(move.from)} -> ${show(move.to)}`);
			for (const [page, edits] of rewrites) {
				out.push(`${would("rewrite")}  ${show(page.path)}`);
				for (const edit of edits) out.push(`  ${edit.line}: ${edit.from} -> ${edit.to}`);
			}
			for (const skip of skips) out.push(`skip  ${show(skip.path)}  ${skip.reason}`);
			for (const failure of failures) out.push(`failed  ${show(failure.path)}  ${failure.message}`);

			const converted = moves.filter((move) => move.convert).length;
			const renamedOnly = moves.length - converted;
			const links = [...rewrites.values()].reduce((total, edits) => total + edits.length, 0);
			if (moves.length === 0 && rewrites.size === 0)
				out.push("nothing to do: every image attachment already follows the naming");
			else {
				out.push(
					`${would("finish")}: ${converted} ${converted === 1 ? "image" : "images"} converted, ${renamedOnly} ${renamedOnly === 1 ? "file" : "files"} renamed, ${links} ${links === 1 ? "embed" : "embeds"} rewritten in ${rewrites.size} ${rewrites.size === 1 ? "page" : "pages"}`,
				);
			}
			if (dry) out.push("", "(dry run: nothing written)");
			if (flags.json) {
				process.stdout.write(
					`${JSON.stringify(
						{
							dryRun: dry,
							moves: moves.map((m) => ({ from: m.from, to: m.to, convert: m.convert })),
							rewrites: [...rewrites].map(([page, edits]) => ({
								page: page.path,
								edits: edits.map((e) => ({ line: e.line, from: e.from, to: e.to })),
							})),
							skips,
							failures,
							converted,
							renamedOnly,
							links,
						},
						null,
						2,
					)}\n`,
				);
			} else process.stdout.write(`${out.join("\n")}\n`);
			if (failures.length > 0) process.exitCode = 1;
		});
}
