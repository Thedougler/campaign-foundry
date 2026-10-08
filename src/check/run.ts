import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { buildVault, loadTemplates, readVaultFiles } from "../vault/vault.ts";
import type { VaultFiles } from "../vault/vault.ts";
import type { Vault } from "../vault/types.ts";
import { layers as allLayers } from "./layers/index.ts";
import type { CheckContext, FileEdit, Finding, Fix, Layer } from "./types.ts";
import { checkedPages } from "./util.ts";

import { UsageError } from "./errors.ts";

export { UsageError };

export interface CheckOptions {
	/** Absolute vault directory. */
	vault: string;
	/** Absolute templates directory. */
	templates: string;
	/** Absolute repository root. */
	root: string;
	/** Working directory that finding paths are relative to. */
	cwd: string;
	/** Layer names to run; all when empty or omitted. */
	layers?: string[];
	/** Check only these files or directories, retaining the whole vault as read-only context. */
	paths?: string[];
	fix?: boolean;
	dryRun?: boolean;
	/** Override the layer registry (tests). */
	registry?: Layer[];
}

export interface CheckResult {
	findings: Finding[];
	/** Fixes applied, or, under `dryRun`, that would be applied. */
	fixes: Fix[];
	pages: number;
	layers: string[];
	durationMs: number;
}

const MAX_FIX_PASSES = 5;

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
	const selected = options.layers?.length ? options.layers : registry.map((l) => l.name);
	const unknown = selected.filter((name) => !registry.some((l) => l.name === name));
	if (unknown.length > 0) {
		throw new UsageError(
			`Unknown layer ${unknown.map((n) => `\`${n}\``).join(", ")}.`,
			`Available layers: ${registry.map((l) => l.name).join(", ")}. Example: cf check --layer ${registry[0]?.name ?? "template"}`,
		);
	}
	const active = registry.filter((l) => selected.includes(l.name));
	const scope = (options.paths ?? []).map((p) => resolve(options.cwd, p));
	const inScope = (path: string): boolean => {
		if (scope.length === 0) return true;
		const abs = resolve(options.cwd, path);
		return scope.some((s) => abs === s || abs.startsWith(s + sep));
	};

	const [files, templates] = await Promise.all([readVaultFiles(options.vault), loadTemplates(options.templates)]);
	let vault: Vault = buildVault(options.vault, files);
	const display = (vaultPath: string): string => relative(options.cwd, join(options.vault, vaultPath)).split(sep).join("/");
	const target = scope.length === 0 ? undefined : (vaultPath: string): boolean => inScope(display(vaultPath));
	const context = (): CheckContext => ({ vault, templates, root: options.root, display, target });

	const fixes: Fix[] = [];
	if (options.fix) {
		for (let pass = 0; pass < MAX_FIX_PASSES; pass++) {
			let changed = false;
			for (const layer of active) {
				if (!layer.fix) continue;
				const result = await layer.fix(context());
				const proposed = result.fixes.filter((f) => inScope(f.path));
				if (proposed.length === 0) continue;
				for (const fix of proposed) {
					applyToFiles(files, fix.edit);
					if (!options.dryRun) await applyToDisk(options.vault, fix.edit);
					fixes.push(fix);
				}
				vault = buildVault(options.vault, files, vault);
				changed = true;
			}
			if (!changed) break;
		}
	}

	const ctx = context();
	const found = (await Promise.all(active.map(async (layer) => layer.run(ctx)))).flat();
	const findings = found
		.filter((f) => inScope(f.path))
		.sort((a, b) => a.path.localeCompare(b.path) || a.line - b.line || a.layer.localeCompare(b.layer) || a.rule.localeCompare(b.rule));

	return {
		findings,
		fixes,
		pages: checkedPages(ctx).length,
		layers: active.map((l) => l.name),
		durationMs: Math.round(performance.now() - started),
	};
}
