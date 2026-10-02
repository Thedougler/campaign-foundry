import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import sharp from "sharp";
import { UsageError } from "../check/run.ts";
import { isWorldRootFolder } from "../check/placement-table.ts";
import { buildLinkGraph } from "../vault/links.ts";
import type { LinkGraph, Resolution } from "../vault/links.ts";
import type { Page, Vault, WikiLink } from "../vault/types.ts";
import { buildActor } from "./actor.ts";
import { OWNERSHIP, stats } from "./foundry.ts";
import type { Doc } from "./foundry.ts";
import { foundryId } from "./ids.ts";
import { buildItem } from "./item.ts";
import { renderMarkdown } from "./markdown.ts";
import type { RenderContext } from "./markdown.ts";
import { buildScene, parseUvtt } from "./scene.ts";
import type { SceneToken, Uvtt } from "./scene.ts";
import { statblockOf } from "./statblock.ts";

/** Foundry's four collections Push writes, and the Adventure field each lives in. */
export type DocType = "JournalEntry" | "Actor" | "Item" | "Scene" | "Folder";
export const ADVENTURE_FIELD: Record<DocType, string> = { JournalEntry: "journal", Actor: "actors", Item: "items", Scene: "scenes", Folder: "folders" };

export interface PlanDoc {
	type: DocType;
	id: string;
	name: string;
	/** Vault path of the Wiki page the document comes from; empty for a folder. */
	path: string;
	hash: string;
	data: Doc;
}

export interface Plan {
	world: string;
	campaign: string;
	session: number;
	moduleId: string;
	adventureId: string;
	adventureName: string;
	/** Every document the Session needs, changed or not. */
	docs: PlanDoc[];
	/** Attachment files the documents point at, to ship inside the module. */
	assets: { from: string; to: string }[];
	warnings: string[];
}

export interface PlanOptions {
	campaign: string;
	session: number;
}

/** Page types pulled in one hop from the Session's own pages: what the DM needs in play. PCs are left out. */
const HOP_TYPES = new Set(["NPC", "Creature", "Location", "Item", "Faction", "House Rule", "Vehicle", "Spell", "Previously On"]);
const HANDOUT = "Handout";
const IMAGE = /\.(webp|png|jpe?g|gif|svg|avif)$/i;
const slug = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** JSON with sorted keys, so a document's hash does not depend on how it was built. */
export function stableStringify(value: unknown): string {
	if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
	if (value && typeof value === "object") {
		const entries = Object.entries(value as Record<string, unknown>)
			.filter(([, v]) => v !== undefined)
			.sort(([a], [b]) => a.localeCompare(b));
		return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`).join(",")}}`;
	}
	return JSON.stringify(value) ?? "null";
}

export const hashOf = (data: Doc): string => createHash("sha256").update(stableStringify(data)).digest("hex");

const typeOf = (page: Page): string => (typeof page.frontmatter?.type === "string" ? page.frontmatter.type : "");
const kindOf = (page: Page): string => (typeof page.frontmatter?.kind === "string" ? page.frontmatter.kind : "");
const wikiName = (value: unknown): string => (typeof value === "string" ? (/^\[\[([^\]|#]+)/.exec(value)?.[1] ?? "").trim() : "");

export function moduleIdFor(world: string, campaign: string): string {
	return `cf-${slug(world)}-${slug(campaign)}`;
}

interface Located {
	world: string;
	sessionPages: Page[];
	campaignPath: string;
}

function locate(vault: Vault, options: PlanOptions): Located {
	const campaigns = new Map<string, string>();
	for (const page of vault.pages) {
		const m = /^([^/]+)\/([^/]+)\//.exec(page.path);
		if (m && !isWorldRootFolder(m[2]!)) campaigns.set(m[2]!, m[1]!);
	}
	const world = campaigns.get(options.campaign);
	if (!world) {
		const names = [...campaigns.keys()];
		throw new UsageError(
			`No Campaign named "${options.campaign}".`,
			names.length > 0 ? `Campaigns: ${names.join(", ")}. Example: cf push --campaign "${names[0]}" --session 1` : "Add a Campaign under <World>/<Campaign>/ first.",
		);
	}
	const prefix = `${world}/${options.campaign}/Sessions/Session ${options.session}/`;
	const sessionPages = vault.pages.filter((p) => p.path.startsWith(prefix));
	if (sessionPages.length === 0) {
		const sessions = [...new Set(vault.pages.flatMap((p) => (p.path.startsWith(`${world}/${options.campaign}/Sessions/`) ? [/Session (\d+)\//.exec(p.path)?.[1] ?? ""] : [])))].filter(Boolean);
		throw new UsageError(
			`No pages for Session ${options.session} of ${options.campaign}.`,
			sessions.length > 0 ? `Sessions with pages: ${sessions.join(", ")}. Example: cf push --campaign "${options.campaign}" --session ${sessions[0]}` : "Run Prep for the Session first.",
		);
	}
	return { world, sessionPages, campaignPath: `${world}/${options.campaign}/${options.campaign}.md` };
}

/** The pages a link resolves to, by the link's exact text, for one page. */
function linkIndex(graph: LinkGraph, page: Page): Map<string, Resolution> {
	const map = new Map<string, Resolution>();
	for (const { link, resolution } of graph.links.get(page) ?? []) if (!link.frontmatter && !map.has(link.raw)) map.set(link.raw, resolution);
	return map;
}

/** The Creature page a NPC's `creature` property links, if any. */
function creatureOf(vault: Vault, graph: LinkGraph, npc: Page): Page | undefined {
	const raw = wikiName(npc.frontmatter?.creature);
	if (!raw) return undefined;
	for (const { link, resolution } of graph.links.get(npc) ?? []) {
		if (link.frontmatter && link.target === raw && resolution.status === "ok") return resolution.pages.find((p) => typeof p.frontmatter?.type === "string" && p.frontmatter.type === "Creature");
	}
	return vault.pages.find((p) => p.name === raw && typeof p.frontmatter?.type === "string" && p.frontmatter.type === "Creature");
}

async function thumbnail(path: string): Promise<string> {
	const buffer = await sharp(path).resize({ width: 300, withoutEnlargement: true }).webp({ quality: 60 }).toBuffer();
	return `data:image/webp;base64,${buffer.toString("base64")}`;
}

/** Everything a Session needs as Foundry documents, with the module files they point at. Pure over the Wiki; touches only reads. */
export async function buildPlan(vault: Vault, options: PlanOptions): Promise<Plan> {
	const { world, sessionPages, campaignPath } = locate(vault, options);
	const graph = buildLinkGraph(vault);
	const moduleId = moduleIdFor(world, options.campaign);
	const warnings: string[] = [];

	// Scope: the Session's own pages, then one hop out to the pages the DM needs in play, then each NPC's Creature.
	const scope = new Map<string, Page>();
	for (const page of sessionPages) if (typeOf(page) !== "PC") scope.set(page.path, page);
	for (const page of sessionPages) {
		for (const { link, resolution } of graph.links.get(page) ?? []) {
			if (link.frontmatter || resolution.status !== "ok") continue;
			for (const target of resolution.pages) if (HOP_TYPES.has(typeOf(target)) && !scope.has(target.path)) scope.set(target.path, target);
		}
	}
	const creatureFor = new Map<string, Page>();
	for (const page of [...scope.values()]) {
		if (typeOf(page) !== "NPC") continue;
		const creature = creatureOf(vault, graph, page);
		if (!creature) continue;
		creatureFor.set(page.path, creature);
		if (!scope.has(creature.path)) scope.set(creature.path, creature);
	}
	const pages = [...scope.values()].sort((a, b) => a.path.localeCompare(b.path));

	// Document identities first, so links can point at documents built later.
	const uuidOf = new Map<string, string>();
	const journalId = (p: Page): string => foundryId(world, p.path);
	for (const page of pages) {
		const type = typeOf(page);
		if (type === "Creature") uuidOf.set(page.path, `Actor.${foundryId(world, page.path)}`);
		else if (type === "Item") uuidOf.set(page.path, `Item.${foundryId(world, page.path)}`);
		else uuidOf.set(page.path, `JournalEntry.${journalId(page)}`);
	}

	// Attachments the documents use, copied into the module under safe names.
	const assets = new Map<string, string>();
	const assetUrl = (vaultPath: string): string => {
		let name = assets.get(vaultPath);
		if (!name) {
			const clean = basename(vaultPath).replace(/[^A-Za-z0-9._]+/g, "-");
			name = [...assets.values()].includes(clean) ? `${slug(vaultPath.replace(/\.[^.]+$/, ""))}${extname(clean)}` : clean;
			assets.set(vaultPath, name);
		}
		return `modules/${moduleId}/assets/${name}`;
	};
	const attachmentByName = (wanted: string): string | undefined => vault.attachments.find((a) => basename(a).toLowerCase() === wanted.toLowerCase() && a.startsWith(`${world}/`));

	const unlinked = new Map<string, string>();
	const contextFor = (page: Page): RenderContext => {
		const index = linkIndex(graph, page);
		return {
			target(link: WikiLink) {
				const resolution = index.get(link.raw);
				const target = resolution?.status === "ok" ? resolution.pages.find((p) => uuidOf.has(p.path)) : undefined;
				if (target) return { uuid: uuidOf.get(target.path)!, label: target.name };
				if (link.target !== "" && !link.embed) {
					const kind = resolution?.status === "ok" ? typeOf(resolution.pages[0]!) : "missing page";
					if (kind !== "PC") unlinked.set(link.target, kind);
				}
				return undefined;
			},
			image(link: WikiLink) {
				const resolution = index.get(link.raw);
				return link.embed && resolution?.status === "attachment" && IMAGE.test(resolution.path) ? assetUrl(resolution.path) : undefined;
			},
		};
	};

	const folderId = (type: DocType): string => foundryId(world, campaignPath, `folder:${type}`);
	const docs: PlanDoc[] = [];
	const add = (type: DocType, data: Doc, path: string): void => {
		docs.push({ type, id: String(data._id), name: String(data.name), path, hash: hashOf(data), data });
	};
	const usedFolders = new Set<DocType>();
	const inFolder = (type: DocType, data: Doc): Doc => {
		usedFolders.add(type);
		return { ...data, folder: folderId(type) };
	};

	const actorIdOf = new Map<string, string>();
	for (const page of pages) {
		const type = typeOf(page);
		const ctx = contextFor(page);
		if (type === "Creature") {
			const portrait = attachmentByName(`${page.name} - Portrait.webp`);
			const biography = renderMarkdown(page, ctx, { omit: ["Statblock"] });
			try {
				const built = buildActor(page, { world, name: page.name, biography, ...(portrait ? { img: assetUrl(portrait) } : {}) });
				warnings.push(...built.warnings.map((w) => `${page.name}: ${w}`));
				actorIdOf.set(page.path, String(built.data._id));
				add("Actor", inFolder("Actor", built.data), page.path);
			} catch (error) {
				warnings.push(`${page.name}: no Actor, ${(error as Error).message}`);
			}
			continue;
		}
		if (type === "Item") {
			add("Item", inFolder("Item", buildItem(page, { world, render: ctx }).data), page.path);
			continue;
		}
		const handout = type === HANDOUT;
		const html = renderMarkdown(page, ctx, handout ? { narrationOnly: true } : {});
		if (handout && html === "") warnings.push(`${page.name}: the Handout has no [!narration] callout, so its journal is empty.`);
		const pageId = foundryId(world, page.path, "page");
		add(
			"JournalEntry",
			inFolder("JournalEntry", {
				_id: journalId(page),
				name: page.name,
				pages: [
					{
						_id: pageId,
						name: page.name,
						type: "text",
						title: { show: false, level: 1 },
						text: { format: 1, content: html },
						sort: 0,
						ownership: { default: -1 },
						flags: {},
						_stats: stats(),
					},
				],
				sort: 0,
				flags: {},
				// GM only, except a Handout: the only material Players see (CONTEXT.md "Handout").
				ownership: { default: handout ? OWNERSHIP.OBSERVER : OWNERSHIP.NONE },
				_stats: stats(),
			}),
			page.path,
		);
	}

	// An NPC with a Creature becomes its own Actor: the Creature's statistics under the NPC's name and portrait.
	for (const page of pages) {
		const creature = creatureFor.get(page.path);
		if (!creature || typeOf(page) !== "NPC") continue;
		const portrait = attachmentByName(`${page.name} - Portrait.webp`);
		const biography = `<p>@UUID[${uuidOf.get(page.path)}]{${page.name}}</p>${renderMarkdown(creature, contextFor(creature), { omit: ["Statblock"] })}`;
		try {
			const built = buildActor(creature, { world, name: page.name, biography, idPath: page.path, role: "actor", disposition: 0, ...(portrait ? { img: assetUrl(portrait) } : {}) });
			warnings.push(...built.warnings.map((w) => `${page.name}: ${w}`));
			add("Actor", inFolder("Actor", built.data), page.path);
		} catch (error) {
			warnings.push(`${page.name}: no Actor, ${(error as Error).message}`);
		}
	}

	// Foundry scenes: a Scene page whose own text or a linked Site embeds a Battle Map image.
	const chart = sessionPages.find((p) => typeOf(p) === "Prep");
	const chartOrder = chart ? (graph.links.get(chart) ?? []).flatMap(({ resolution }) => (resolution.status === "ok" ? resolution.pages.map((p) => p.path) : [])) : [];
	const scenes = sessionPages.filter((p) => typeOf(p) === "Scene").sort((a, b) => chartOrder.indexOf(a.path) - chartOrder.indexOf(b.path));
	let navOrder = 0;
	for (const scene of scenes) {
		const embedded = (page: Page): { path: string; link: WikiLink } | undefined => {
			for (const { link, resolution } of graph.links.get(page) ?? []) {
				if (link.embed && resolution.status === "attachment" && IMAGE.test(resolution.path) && /battle map/i.test(basename(resolution.path))) return { path: resolution.path, link };
			}
			return undefined;
		};
		const sites = (graph.links.get(scene) ?? []).flatMap(({ resolution }) => (resolution.status === "ok" ? resolution.pages.filter((p) => typeOf(p) === "Location" && kindOf(p) === "Site") : []));
		const map = embedded(scene) ?? sites.map(embedded).find(Boolean);
		if (!map) {
			if (["Cliffhanger", "Climax"].includes(kindOf(scene))) warnings.push(`${scene.name}: no Foundry scene, because no Battle Map image is embedded on the page or on a Site it links.`);
			continue;
		}
		const file = join(vault.dir, map.path);
		const meta = await sharp(file).metadata();
		const uvttPath = vault.attachments.find((a) => a.toLowerCase() === `${map.path.replace(/\.[^.]+$/, "")}.uvtt`.toLowerCase() || a.toLowerCase() === `${map.path.replace(/\.[^.]+$/, "")}.dd2vtt`.toLowerCase());
		let uvtt: Uvtt | undefined;
		if (uvttPath) {
			try {
				uvtt = parseUvtt(await readFile(join(vault.dir, uvttPath), "utf8"));
			} catch (error) {
				warnings.push(`${scene.name}: ${basename(uvttPath)} was not used: ${(error as Error).message}.`);
			}
		}
		const tokens: SceneToken[] = [];
		for (const { link, resolution } of graph.links.get(scene) ?? []) {
			if (!link.embed || link.headings.length === 0 || resolution.status !== "ok") continue;
			const creature = resolution.pages.find((p) => typeOf(p) === "Creature");
			const actorId = creature ? actorIdOf.get(creature.path) : undefined;
			if (!creature || !actorId) continue;
			const size = statblockOf(creature)?.size.toLowerCase() ?? "medium";
			const portrait = attachmentByName(`${creature.name} - Portrait.webp`);
			tokens.push({ name: creature.name, actorId, squares: { large: 2, huge: 3, gargantuan: 4 }[size] ?? 1, img: portrait ? assetUrl(portrait) : null });
		}
		const built = buildScene({
			world,
			path: scene.path,
			name: scene.name,
			journalId: journalId(scene),
			image: { url: assetUrl(map.path), width: meta.width ?? 0, height: meta.height ?? 0 },
			thumb: await thumbnail(file),
			navOrder: navOrder++,
			tokens,
			...(uvtt ? { uvtt } : {}),
		});
		warnings.push(...built.warnings);
		add("Scene", inFolder("Scene", built.data), scene.path);
	}

	for (const type of ["JournalEntry", "Actor", "Item", "Scene"] as const) {
		if (!usedFolders.has(type)) continue;
		add(
			"Folder",
			{ _id: folderId(type), name: options.campaign, type, folder: null, sorting: "a", color: null, description: "", sort: 0, flags: {}, _stats: stats() },
			"",
		);
	}

	if (unlinked.size > 0) {
		const names = [...unlinked.entries()].sort(([a], [b]) => a.localeCompare(b));
		const shown = names.slice(0, 10).map(([name, kind]) => `${name} (${kind || "page"})`);
		warnings.push(`${names.length} linked page${names.length === 1 ? "" : "s"} left as text, not in this Push: ${shown.join(", ")}${names.length > shown.length ? `, and ${names.length - shown.length} more` : ""}.`);
	}

	const adventureName = `${options.campaign}`;
	return {
		world,
		campaign: options.campaign,
		session: options.session,
		moduleId,
		adventureId: foundryId(world, campaignPath, "adventure"),
		adventureName,
		docs,
		assets: [...assets.entries()].map(([vaultPath, to]) => ({ from: join(vault.dir, vaultPath), to })),
		warnings,
	};
}
