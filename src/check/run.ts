import { mkdir, mkdtemp, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { buildVault, loadTemplates, readVaultFiles } from "../vault/vault.ts";
import type { VaultFiles } from "../vault/vault.ts";
import type { TemplateSet, Vault } from "../vault/types.ts";
import { layers as allLayers } from "./layers/index.ts";
import type { CheckContext, FileEdit, Finding, Fix, Layer } from "./types.ts";
import { UsageError } from "./errors.ts";

export { UsageError };

export interface CheckOptions {
	/** Absolute vault directory. */
	vault: string;
	/** Absolute templates directory; omit it when the run's layers read no templates. */
	templates?: string;
	/** Absolute repository root. */
	root: string;
	/** Working directory that finding paths are relative to. */
	cwd: string;
	/** Layer names to run, in report order; all when empty or omitted. */
	layers?: string[];
	/** Check only these files or directories, retaining the whole vault as read-only context. */
	paths?: string[];
	fix?: boolean;
	dryRun?: boolean;
	/** Page-check hooks omit the whole-vault repeated-prose scan; explicit checks retain it. */
	skipBoilerplate?: boolean;
	/** Override the layer registry (tests). */
	registry?: Layer[];
	/** Vault files, already read; default: read from `vault`. Commands that overlay virtual pages pass their own. */
	files?: VaultFiles;
	/** Read-only Wiki context, separate from virtual text targets; defaults to the vault built from `files`. */
	contextVault?: Vault;
	/** Display form of finding paths; default: the vault path relative to `cwd`. */
	display?: (vaultPath: string) => string;
	/** Exact vault-relative targets for virtual documents; unlike display paths these cannot select a context page by accident. */
	pagePaths?: readonly string[];
}

export interface CheckResult {
	findings: Finding[];
	/** Fixes applied, or, under `dryRun`, that would be applied. */
	fixes: Fix[];
	pages: number;
	layers: string[];
	durationMs: number;
}

/** One text gated before it is written (a `cfcli log` entry), over the Wiki as context. */
export interface GateTextOptions {
	/** Absolute vault directory: the Wiki read as context and name list. */
	vault: string;
	/** Working directory that finding paths are relative to. */
	cwd: string;
	/** Vault-relative path the text takes when written, e.g. `ashes-of-the-crown/log.md`. */
	rel: string;
	/** The text to gate. */
	text: string;
	/** Override the layer registry (tests). */
	registry?: Layer[];
}

const MAX_FIX_PASSES = 5;
const NO_TEMPLATES: TemplateSet = { byName: new Map(), types: new Map() };

function applyToFiles(files: VaultFiles, edit: FileEdit): void {
	if (edit.type === "write") {
		files.markdown.set(edit.path, edit.content);
		return;
	}
	const source = files.markdown.get(edit.from);
	if (source === undefined) return;
	files.markdown.delete(edit.from);
	files.markdown.set(edit.to, source);
}

async function applyToDisk(vaultDir: string, edit: FileEdit): Promise<void> {
	if (edit.type === "write") {
		await mkdir(dirname(join(vaultDir, edit.path)), { recursive: true });
		await writeFile(join(vaultDir, edit.path), edit.content);
		return;
	}
	await mkdir(dirname(join(vaultDir, edit.to)), { recursive: true });
	await rename(join(vaultDir, edit.from), join(vaultDir, edit.to));
}

export async function runCheck(options: CheckOptions): Promise<CheckResult> {
	const started = performance.now();
	const registry = options.registry ?? allLayers;
	const selected = options.layers?.length ? [...new Set(options.layers)] : registry.map((l) => l.name);
	const unknown = selected.filter((name) => !registry.some((l) => l.name === name));
	if (unknown.length > 0) {
		throw new UsageError(
			`Unknown layer ${unknown.map((n) => `\`${n}\``).join(", ")}.`,
			`Available layers: ${registry.map((l) => l.name).join(", ")}. Example: cfcli check --layer ${registry[0]?.name ?? "template"}`,
		);
	}
	let active = selected.flatMap((name) => {
		const layer = registry.find((l) => l.name === name);
		return layer ? [layer] : [];
	});
	const scope = (options.paths ?? []).map((p) => resolve(options.cwd, p));

	const files = options.files ?? (await readVaultFiles(options.vault));
	const display =
		options.display ??
		((vaultPath: string): string => relative(options.cwd, join(options.vault, vaultPath)).split(sep).join("/"));
	const exactTargets = options.pagePaths === undefined ? undefined : new Set(options.pagePaths);
	const exactDisplays = exactTargets && new Set([...exactTargets].map(display));
	const inScope = (path: string): boolean => {
		if (exactDisplays) return exactDisplays.has(path);
		if (scope.length === 0) return true;
		const abs = resolve(options.cwd, path);
		return scope.some((s) => abs === s || abs.startsWith(s + sep));
	};
	const scopedRun = exactTargets !== undefined || scope.length > 0;
	const targetFiles = [...files.markdown].filter(([path]) =>
		exactTargets ? exactTargets.has(path) : inScope(display(path)),
	);
	active = active.filter((layer) => {
		if (layer.name === "boilerplate" && options.skipBoilerplate) return false;
		if (layer.name === "index" && scopedRun) return false;
		if (layer.name === "hot") return targetFiles.some(([path]) => /(?:^|\/)hot\.md$/i.test(path));
		if (layer.name === "log") return targetFiles.some(([path]) => /(?:^|\/)log(?:-\d{4})?\.md$/i.test(path));
		if (layer.name === "mermaid")
			return targetFiles.some(([, source]) =>
				/^[ \t>]*(?:(?:[-+*]|\d+[.)])[ \t]+)?(?:`{3,}|~{3,})mermaid(?:[ \t].*)?$/m.test(source),
			);
		return true;
	});
	if (active.length === 0)
		return {
			findings: [],
			fixes: [],
			pages: targetFiles.length,
			layers: [],
			durationMs: Math.round(performance.now() - started),
		};
	let vault: Vault = buildVault(options.vault, files);
	let targets = scopedRun
		? vault.pages.filter((page) => (exactTargets ? exactTargets.has(page.path) : inScope(display(page.path))))
		: vault.pages;
	const templates = options.templates ? await loadTemplates(options.templates) : NO_TEMPLATES;
	const context = (layer: Layer): CheckContext => ({
		vault: options.contextVault ?? vault,
		pages: layer.scope === "vault" ? (options.contextVault ?? vault).pages : targets,
		templates,
		root: options.root,
		display,
	});
	// Page layers get only targets and cannot leak findings or writes silently. Vault comparisons
	// legitimately evaluate every page; the runner alone scopes their reports and proposed writes.
	const scoped = <T extends { path: string }>(layer: Layer, entries: T[]): T[] => {
		if (layer.scope === "vault") return entries.filter((entry) => inScope(entry.path));
		const leak = entries.find((entry) => !inScope(entry.path));
		if (leak) throw new Error(`Layer ${layer.name} emitted an out-of-scope path: ${leak.path}`);
		return entries;
	};

	const fixes: Fix[] = [];
	if (options.fix) {
		for (let pass = 0; pass < MAX_FIX_PASSES; pass++) {
			let changed = false;
			for (const layer of active) {
				if (!layer.fix) continue;
				const result = await layer.fix(context(layer));
				const proposed = scoped(layer, result.fixes);
				if (proposed.length === 0) continue;
				for (const fix of proposed) {
					applyToFiles(files, fix.edit);
					if (!options.dryRun) await applyToDisk(options.vault, fix.edit);
					fixes.push(fix);
				}
				vault = buildVault(options.vault, files, vault);
				targets =
					exactTargets || scope.length
						? vault.pages.filter((page) => (exactTargets ? exactTargets.has(page.path) : inScope(display(page.path))))
						: vault.pages;
				changed = true;
			}
			if (!changed) break;
		}
	}

	const found = (await Promise.all(active.map(async (layer) => scoped(layer, await layer.run(context(layer)))))).flat();
	const findings = found.sort(
		(a, b) =>
			a.path.localeCompare(b.path) || a.line - b.line || a.layer.localeCompare(b.layer) || a.rule.localeCompare(b.rule),
	);

	return {
		findings,
		fixes,
		pages: targets.length,
		layers: active.map((l) => l.name),
		durationMs: Math.round(performance.now() - started),
	};
}

/**
 * Gates one text (a `cfcli log` entry) through the style layer, read exactly as the gate reads the page the
 * text would become: the text is overlaid at `rel` in a virtual vault, the Wiki stays read-only context
 * and name list, and nothing is written. One-off text earns no cache entry, so the run works from a
 * scratch root instead of the Repo's `.cache/check`.
 */
export async function gateText(options: GateTextOptions): Promise<Finding[]> {
	const files = await readVaultFiles(options.vault);
	files.markdown.set(options.rel, options.text);
	const scratch = await mkdtemp(join(tmpdir(), "cf-gate-"));
	try {
		const result = await runCheck({
			vault: options.vault,
			root: scratch,
			cwd: options.cwd,
			layers: ["style"],
			pagePaths: [options.rel],
			files,
			registry: options.registry,
		});
		return result.findings;
	} finally {
		await rm(scratch, { recursive: true, force: true });
	}
}
