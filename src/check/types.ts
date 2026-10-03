import type { TemplateSet, Vault } from "../vault/types.ts";

/** One thing wrong with one page. */
export interface Finding {
	/** The layer that found it, e.g. `template`. */
	layer: string;
	/** A stable kebab-case id within the layer, e.g. `missing-section`. */
	rule: string;
	/** File path relative to the working directory. */
	path: string;
	/** 1-based line; 1 when the finding is about the whole page. */
	line: number;
	message: string;
	/** An actionable fix instruction, with an example wherever one helps. */
	hint: string;
	/** `error` fails the gate; `warning` is reported and does not. */
	severity: "error" | "warning";
}

/** A change to disk. `path`, `from` and `to` are vault-relative. */
export type FileEdit =
	| { type: "write"; path: string; content: string }
	| { type: "move"; from: string; to: string };

/** One mechanical fix a layer proposes. The runner applies (or, under `--dry-run`, only reports) it. */
export interface Fix {
	layer: string;
	rule: string;
	/** Page the fix concerns, relative to the working directory. */
	path: string;
	/** What changed, in one line, e.g. `added blank property parent`. */
	description: string;
	edit: FileEdit;
}

export interface FixResult {
	fixes: Fix[];
}

export interface CheckContext {
	vault: Vault;
	templates: TemplateSet;
	/** Repository root: `sources` paths and `archive/` resolve against it. */
	root: string;
	/** Turns a vault-relative path into the working-directory-relative path findings carry. */
	display(vaultPath: string): string;
}

/**
 * One layer of the gate. Add a layer by creating `src/check/layers/<name>.ts` that exports a `Layer`,
 * then adding one line to `src/check/layers/index.ts`.
 */
export interface Layer {
	/** Kebab-case; the value `--layer <name>` selects. */
	name: string;
	/** One line for `cf check --help`. */
	description: string;
	/** Read-only: returns the findings, never writes. May be async. */
	run(ctx: CheckContext): Finding[] | Promise<Finding[]>;
	/** Optional: proposes mechanical fixes for `--fix`. Must be idempotent: a clean page yields no fixes. */
	fix?(ctx: CheckContext): FixResult | Promise<FixResult>;
}
