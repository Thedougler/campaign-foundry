/** Types shared by `scripts/lint.ts` and the scope modules in `scripts/lint/`. */

export type ScopeName = "agents" | "prose" | "code";

/** One objective issue at one place: the unit every scope reports. */
export interface LintFinding {
	/** Repo-root-relative, `/`-separated. */
	path: string;
	/** 1-based line. */
	line: number;
	/** 1-based column, when the tool gives one. */
	col?: number;
	/** Tool or engine id, e.g. `markdownlint`, `cspell`, `cfcli`. */
	tool: string;
	/** Stable rule id within the tool, e.g. `MD041`, `unknown-word`, `NoEmDash`. */
	rule: string;
	message: string;
}

/** What one scope found over its file set. `failures` are tool/setup errors, not findings. */
export interface ScopeResult {
	/** The in-domain files the scope checked. */
	files: string[];
	findings: LintFinding[];
	/** One line per applied fix, `path tool/rule what changed`, only under `--fix`. */
	fixes: string[];
	failures: string[];
	/** Info lines (word counts, chain lists) that are neither findings nor failures. */
	notes?: string[];
}

/** `files: null` means `--all`; otherwise the resolved in-domain file list. */
export interface ScopeRun {
	fix: boolean;
	files: string[] | null;
}

/** Each scope module: filter explicit paths into its domain, list its whole domain, run its tools. */
export interface ScopeModule {
	/** Filters paths to the scope's domain; explicit prose files may also be drafts outside it. */
	select(paths: string[], explicit?: boolean): Promise<string[]>;
	/** Informational notes for explicit named paths omitted by selection. */
	selectionNotes?(paths: string[], selected: string[]): string[];
	/** Every file in the scope's domain. */
	all(): Promise<string[]>;
	run(opts: ScopeRun): Promise<ScopeResult>;
}
