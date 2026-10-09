import type { Page, Vault, WikiLink } from "./types.ts";

/** How a `[[link]]` or `![[embed]]` resolves, Obsidian-style. */
export type Resolution =
	| { status: "ok"; pages: Page[] }
	| { status: "attachment"; path: string }
	| { status: "empty" }
	| { status: "no-page" }
	| { status: "no-attachment" }
	| { status: "no-heading"; page: Page; heading: string }
	| { status: "no-block"; page: Page };

export interface ResolvedLink {
	link: WikiLink;
	resolution: Resolution;
}

export interface LinkGraph {
	/** Every link on every page, resolved. */
	links: Map<Page, ResolvedLink[]>;
	/**
	 * Pages linked with each page (never itself); only links that resolve to a page count. A body link
	 * counts one way, from the page holding it to its target. A link in a frontmatter property counts
	 * both ways, because the target's Base lists the linking page.
	 */
	inbound: Map<Page, Set<Page>>;
	/** Vault-relative attachment paths and page paths, for suggestions. */
	pageNames: string[];
	attachmentNames: string[];
}

const graphs = new WeakMap<Vault, LinkGraph>();

/** Lowercases and drops a trailing `.md` and any leading slash, the form Obsidian compares link targets in. */
function normalizeTarget(target: string): string {
	return target.replace(/^\/+/, "").replace(/\.md$/i, "").toLowerCase();
}

/** Obsidian treats these characters as spaces in heading subpaths, and ignores case. */
export function normalizeHeading(heading: string): string {
	return heading
		.replace(/[#|^:%[\]\\]/g, " ")
		.replace(/\s+/g, " ")
		.trim()
		.toLowerCase();
}

/** Every suffix of a path at a folder boundary: `a/b/c` gives `a/b/c`, `b/c`, `c`. */
function suffixes(path: string): string[] {
	const parts = path.split("/");
	return parts.map((_, i) => parts.slice(i).join("/"));
}

function index<T>(items: T[], keys: (item: T) => string[]): Map<string, T[]> {
	const map = new Map<string, T[]>();
	for (const item of items) {
		for (const key of keys(item)) {
			const list = map.get(key);
			if (list) list.push(item);
			else map.set(key, [item]);
		}
	}
	return map;
}

export function buildLinkGraph(vault: Vault): LinkGraph {
	const cached = graphs.get(vault);
	if (cached) return cached;

	// Links resolve by path suffix and by page name (ADR 0028): the frontmatter `title`, each alias, then the slug.
	const pageIndex = index(vault.pages, (p) => [
		...suffixes(p.path.replace(/\.md$/, "").toLowerCase()),
		...p.names.map((n) => n.toLowerCase()),
	]);
	const fileIndex = index(vault.attachments, (p) => suffixes(p.toLowerCase()));

	const resolve = (from: Page, link: WikiLink): Resolution => {
		if (link.target === "" && link.headings.length === 0 && link.block === undefined) return { status: "empty" };
		let pages: Page[];
		if (link.target === "") {
			pages = [from];
		} else {
			const key = normalizeTarget(link.target);
			pages = pageIndex.get(key) ?? [];
			if (pages.length === 0 && /\.[A-Za-z0-9]+$/.test(link.target) && !/\.md$/i.test(link.target)) {
				const files = fileIndex.get(link.target.replace(/^\/+/, "").toLowerCase());
				if (files?.[0]) return { status: "attachment", path: files[0] };
				return { status: "no-attachment" };
			}
			if (pages.length === 0) return { status: "no-page" };
			// Prefer the exact vault path over a shorter suffix match when a path was written out.
			const exact = pages.filter((p) => p.path.replace(/\.md$/, "").toLowerCase() === key);
			if (exact.length > 0) pages = exact;
		}
		if (link.headings.length > 0) {
			const wanted = link.headings.map(normalizeHeading);
			const ok = pages.some((page) => {
				const have = page.headings.map((h) => normalizeHeading(h.text));
				let at = -1;
				return wanted.every((w) => {
					const found = have.indexOf(w, at + 1);
					if (found === -1) return false;
					at = found;
					return true;
				});
			});
			if (!ok) {
				const last = link.headings[link.headings.length - 1] ?? "";
				return { status: "no-heading", page: pages[0]!, heading: last };
			}
		}
		if (link.block !== undefined && !pages.some((p) => p.blocks.has(link.block!))) {
			return { status: "no-block", page: pages[0]! };
		}
		return { status: "ok", pages };
	};

	const links = new Map<Page, ResolvedLink[]>();
	const inbound = new Map<Page, Set<Page>>();
	for (const page of vault.pages) inbound.set(page, new Set());
	for (const page of vault.pages) {
		const resolved = page.links.map((link) => ({ link, resolution: resolve(page, link) }));
		links.set(page, resolved);
		for (const { link, resolution } of resolved) {
			if (resolution.status !== "ok") continue;
			for (const target of resolution.pages) {
				if (target === page) continue;
				inbound.get(target)?.add(page);
				if (link.frontmatter) inbound.get(page)?.add(target);
			}
		}
	}
	const graph: LinkGraph = {
		links,
		inbound,
		pageNames: [...new Set(vault.pages.flatMap((p) => p.names))],
		attachmentNames: vault.attachments.map((p) => p.slice(p.lastIndexOf("/") + 1)),
	};
	graphs.set(vault, graph);
	return graph;
}
