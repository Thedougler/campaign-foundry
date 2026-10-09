import { createHash } from "node:crypto";
import { lstatSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { basename, extname, join, relative, sep } from "node:path";
import { parseDocument } from "yaml";

/**
 * What the Backup copies to Notion: the Shattered Sea Campaign folder and the agent skills. `.claude/skills/` is left
 * out because its entries are symlinks into `.agents/skills/`; every file is backed up once, under the first root that
 * reaches it.
 */
export const BACKUP_ROOTS = ["wiki/shattered-sea", ".agents/skills"] as const;

export type FileKind = "markdown" | "image" | "text";

export interface BackupFile {
	/** Repo-relative POSIX path, the key the map stores it under (`wiki/shattered-sea/NPCs/Ilse Corran.md`). */
	path: string;
	kind: FileKind;
	/** Absolute path to read the bytes from (the symlink's target for a linked skill). */
	abs: string;
	/** sha256 of the content; for a Git LFS pointer, the object id it points at (the same sha256 once smudged). */
	hash: string;
	/** True when the working file is an LFS pointer, so the bytes must be pulled before an upload. */
	lfsPointer: boolean;
	size: number;
	/** The markdown frontmatter `title` (ADR 0028: the title names the page), unset when absent or blank. */
	title?: string;
	/** The markdown frontmatter `aliases`, unset when absent. */
	aliases?: string[];
}

export interface WalkResult {
	files: BackupFile[];
	/** Every directory that holds a backed-up file, parents first, roots and their ancestors included. */
	dirs: string[];
	/** Paths left out on purpose, with the reason (excluded name, duplicate symlink, binary). */
	skipped: { path: string; reason: string }[];
	/** Symlinks followed out of the roots: git tracks the link, so a diff must also look at the target's repo path. */
	links: { alias: string; target: string }[];
}

export const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);
const EXCLUDED_DIRS = new Set([".obsidian", "node_modules", "src", ".git", ".trash"]);
const LOCKFILES = new Set(["bun.lock", "bun.lockb", "package-lock.json", "pnpm-lock.yaml", "yarn.lock", "uv.lock", "poetry.lock", "Cargo.lock", "Gemfile.lock", "composer.lock"]);
const LFS_POINTER = /^version https:\/\/git-lfs\.github\.com\/spec\/v1\noid sha256:([0-9a-f]{64})\nsize (\d+)\n?$/;

const posix = (p: string): string => p.split(sep).join("/");

/** Why a path is never backed up, or undefined when it may be. Applies to every segment of a repo-relative path. */
export function excludedBy(path: string): string | undefined {
	const parts = path.split("/");
	const dir = parts.slice(0, -1).find((part) => EXCLUDED_DIRS.has(part));
	if (dir) return `${dir}/ is excluded`;
	const name = parts.at(-1) ?? "";
	if (EXCLUDED_DIRS.has(name)) return `${name}/ is excluded`;
	if (LOCKFILES.has(name) || name.endsWith(".lock")) return "lockfile";
	if (name === ".DS_Store") return "OS file";
	return undefined;
}

export function kindOf(path: string, bytes: Buffer): FileKind | undefined {
	const ext = extname(path).toLowerCase();
	if (ext === ".md" || ext === ".markdown") return "markdown";
	if (IMAGE_EXTENSIONS.has(ext)) return "image";
	if (LFS_POINTER.test(bytes.toString("latin1"))) return undefined; // an LFS object that is not an image (a PDF)
	return bytes.subarray(0, 8000).includes(0) ? undefined : "text";
}

/** The content hash the map compares; an LFS pointer hashes to the object it names, so smudged and unsmudged checkouts agree. */
export function contentHash(bytes: Buffer): { hash: string; lfsPointer: boolean; size: number } {
	const pointer = LFS_POINTER.exec(bytes.toString("latin1"));
	if (pointer) return { hash: pointer[1] ?? "", lfsPointer: true, size: Number(pointer[2]) };
	return { hash: createHash("sha256").update(bytes).digest("hex"), lfsPointer: false, size: bytes.length };
}

/** Every ancestor directory of a repo-relative path, shallowest first (`a/b/c.md` gives `a`, `a/b`). */
export function ancestors(path: string): string[] {
	const parts = path.split("/");
	return parts.slice(0, -1).map((_, i) => parts.slice(0, i + 1).join("/"));
}

/** A markdown file's frontmatter `title` and `aliases`, read leniently: broken YAML and blank values give nothing (ADR 0028). */
export function frontmatterNames(source: string): { title?: string; aliases?: string[] } {
	const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
	if (!match) return {};
	const doc = parseDocument(match[1] ?? "");
	if (doc.errors.length > 0) return {};
	const data = doc.toJS();
	if (data === null || typeof data !== "object" || Array.isArray(data)) return {};
	const fm = data as Record<string, unknown>;
	const title = typeof fm.title === "string" && fm.title.trim() !== "" ? fm.title.trim() : undefined;
	const aliases = Array.isArray(fm.aliases)
		? fm.aliases.filter((a): a is string => typeof a === "string" && a.trim() !== "").map((a) => a.trim())
		: typeof fm.aliases === "string" && fm.aliases.trim() !== ""
			? [fm.aliases.trim()]
			: undefined;
	return { ...(title === undefined ? {} : { title }), ...(aliases === undefined || aliases.length === 0 ? {} : { aliases }) };
}

/**
 * Walks the Backup roots under `root`, following symlinks once: a link whose target was already reached (or lies inside
 * another root) is skipped as a duplicate, so a skill reached twice is backed up once.
 */
export function walkBackup(root: string, roots: readonly string[] = BACKUP_ROOTS): WalkResult {
	const files: BackupFile[] = [];
	const skipped: WalkResult["skipped"] = [];
	const links: WalkResult["links"] = [];
	const realRoot = realpathSync(root);
	const seen = new Set<string>();
	const rootReals = roots.map((r) => {
		try {
			return realpathSync(join(root, r));
		} catch {
			return undefined;
		}
	});

	const visit = (abs: string, rel: string, rootIndex: number): void => {
		const why = excludedBy(rel);
		if (why) {
			skipped.push({ path: rel, reason: why });
			return;
		}
		let real: string;
		try {
			real = realpathSync(abs);
		} catch {
			skipped.push({ path: rel, reason: "broken symlink" });
			return;
		}
		const linked = lstatSync(abs).isSymbolicLink();
		const otherRoot = rootReals.findIndex((r, i) => i !== rootIndex && r !== undefined && (real === r || real.startsWith(r + sep)));
		if (linked && otherRoot !== -1) {
			skipped.push({ path: rel, reason: `symlink into ${roots[otherRoot]}` });
			return;
		}
		if (seen.has(real)) {
			skipped.push({ path: rel, reason: "already backed up through another path" });
			return;
		}
		seen.add(real);
		if (linked) {
			const target = posix(relative(realRoot, real));
			if (!target.startsWith("..")) links.push({ alias: rel, target });
		}
		const stat = statSync(real);
		if (stat.isDirectory()) {
			// Real entries before symlinks, so a file is backed up under its own path rather than an alias's.
			const names = readdirSync(real).sort();
			const isLink = (name: string): boolean => lstatSync(join(real, name)).isSymbolicLink();
			for (const name of [...names.filter((n) => !isLink(n)), ...names.filter(isLink)]) visit(join(abs, name), `${rel}/${name}`, rootIndex);
			return;
		}
		if (!stat.isFile()) return;
		const bytes = readFileSync(real);
		const kind = kindOf(rel, bytes);
		if (!kind) {
			skipped.push({ path: rel, reason: "binary file that is not an image" });
			return;
		}
		const names = kind === "markdown" ? frontmatterNames(bytes.toString("utf8")) : {};
		files.push({ path: rel, kind, abs: real, ...contentHash(bytes), ...names });
	};

	roots.forEach((r, i) => {
		const abs = join(root, r);
		try {
			statSync(abs);
		} catch {
			return;
		}
		visit(abs, posix(relative(root, abs)), i);
	});

	const dirs = new Set<string>();
	for (const file of files) for (const dir of ancestors(file.path)) dirs.add(dir);
	return { files, dirs: [...dirs].sort(byDepthThenName), skipped, links };
}

export function byDepthThenName(a: string, b: string): number {
	const depth = a.split("/").length - b.split("/").length;
	return depth !== 0 ? depth : a.localeCompare(b);
}

/** The Notion title for a backed-up path: a Markdown page drops `.md`, like its Obsidian name; other files keep the extension. A markdown page with a frontmatter `title` carries that title instead (ADR 0028). */
export function titleOf(path: string, kind: FileKind | "dir", pageTitle?: string): string {
	if (kind === "markdown" && pageTitle !== undefined && pageTitle !== "") return pageTitle;
	const name = basename(path);
	return kind === "markdown" ? name.replace(/\.(md|markdown)$/i, "") : name;
}

/** Whether a repo-relative path lies under one of the Backup roots. */
export function inBackupRoots(path: string, roots: readonly string[] = BACKUP_ROOTS): boolean {
	return roots.some((r) => path === r || path.startsWith(`${r}/`));
}
