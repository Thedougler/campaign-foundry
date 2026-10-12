/**
 * The command kit (issue #59): the one seam every `cfcli` command shares. It owns the example
 * prefix, environment resolution (`--root`, `--vault`, `--templates`), the shared option
 * declarations, file and stdin input, the Campaign refusal, and the runner result/print
 * harness. Commands keep only their domain flags and domain logic.
 */

import { existsSync, realpathSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import type { Command } from "commander";
import { UsageError } from "../check/errors.ts";
import { suggest } from "../check/util.ts";
import { campaignFolders, campaignNames } from "../vault/indexes.ts";
import type { Vault } from "../vault/types.ts";
import { readStdin } from "./stdin.ts";

/**
 * How every Examples block, hint and approval command spells one invocation. ADR 0032 renamed
 * the script from its old name, which collided with Cloudflare's CLI.
 */
export const CF = "bun run cfcli --";

/** The repository root: the nearest ancestor of `from` holding `.git` or `bun.lock`, else `from`. */
export function findRepoRoot(from: string): string {
	for (let dir = from; ; dir = dirname(dir)) {
		if (existsSync(join(dir, ".git")) || existsSync(join(dir, "bun.lock"))) return dir;
		if (dirname(dir) === dir) return from;
	}
}

/**
 * realpath when the path exists, so resolved paths compare equal to `process.cwd()`, which the
 * OS reports resolved (macOS `/var` -> `/private/var`); a path nothing points at yet stays as written.
 */
export const realPath = (p: string): string => (existsSync(p) ? realpathSync(p) : p);

/** The repository root a `--root` flag names, else the nearest git root: what commands that work on the Repo but not the Wiki resolve. */
export function resolveRoot(rootFlag: string | undefined): string {
	return realPath(resolve(rootFlag ?? findRepoRoot(process.cwd())));
}

/** The shared environment flags every Wiki-reading command takes. */
export interface EnvFlags {
	vault?: string;
	templates?: string;
	root?: string;
}

/** One command's resolved environment: the working directory, the Repo, the Wiki and the templates. */
export interface CliEnv {
	cwd: string;
	root: string;
	vault: string;
	templates: string;
}

/**
 * The one environment resolver: `--root` names the Repo (default: the nearest git root),
 * `--vault` the Wiki (default: `<root>/wiki`), `--templates` the page templates (default:
 * `<root>/wiki/templates`, else the repo's own, so a fixture root still finds real templates).
 * A missing vault folder is a usage error naming the command; commands that read templates also
 * call {@link requireTemplates}.
 */
export function resolveEnv(flags: EnvFlags, command: string): CliEnv {
	const cwd = process.cwd();
	const root = resolveRoot(flags.root);
	const vault = realPath(flags.vault ? resolve(cwd, flags.vault) : join(root, "wiki"));
	const rootTemplates = join(root, "wiki/templates");
	const templates = realPath(
		flags.templates
			? resolve(cwd, flags.templates)
			: existsSync(rootTemplates)
				? rootTemplates
				: join(findRepoRoot(cwd), "wiki/templates"),
	);
	if (!existsSync(vault) || !statSync(vault).isDirectory()) {
		throw new UsageError(`The vault folder ${vault} does not exist.`, `${CF} ${command} --vault <folder>`);
	}
	return { cwd, root, vault, templates };
}

/** A missing templates folder is a usage error naming the command; only commands that read templates call this. */
export function requireTemplates(env: CliEnv, command: string): void {
	if (!existsSync(env.templates) || !statSync(env.templates).isDirectory()) {
		throw new UsageError(
			`The templates folder ${env.templates} does not exist.`,
			`${CF} ${command} --templates <folder>`,
		);
	}
}

const ROOT_HELP = "repository root (default: nearest git root)";

/** Adds the shared `--root` option: the declaration every Repo-working command uses. */
export function rootOption(command: Command): Command {
	return command.option("--root <dir>", ROOT_HELP);
}

/**
 * Adds the shared environment options: `--vault` and `--root` for every Wiki-reading command,
 * plus `--templates` for the ones that read page templates (`check`, `pull`).
 */
export function envOptions(command: Command, opts: { templates?: boolean } = {}): Command {
	command.option("--vault <dir>", "the Wiki folder (default: <root>/wiki)");
	if (opts.templates)
		command.option("--templates <dir>", "folder of page templates (default: <root>/wiki/templates, else the repo's)");
	return rootOption(command);
}

/** The argParser for repeatable options: `--layer links --layer orphans`. */
export const collect = (value: string, previous: string[]): string[] => [...previous, value];

/**
 * Reads a command's text input: `-` — or no file at all, for a command that reads stdin by
 * default — is stdin; anything else is a file from the working directory. A missing file is a
 * usage error carrying the command's own hint.
 */
export async function readInput(file: string | undefined, hint: string): Promise<string> {
	if (file === undefined || file === "-") return (await readStdin()).toString("utf8");
	try {
		return await readFile(resolve(process.cwd(), file), "utf8");
	} catch {
		throw new UsageError(`No such file: ${file}.`, hint);
	}
}

/**
 * Resolves a `--campaign` name to its Campaign folder, refusing with the shared did-you-mean
 * when the Wiki holds no Campaign of that name. The `example` is the command's own invocation.
 */
export function campaignFolderOf(vault: Vault, campaign: string, example: string): string {
	const folder = campaignFolders(vault).get(campaign);
	if (folder !== undefined) return folder;
	const names = campaignNames(vault);
	const closest = suggest(campaign, names);
	throw new UsageError(
		`No Campaign \`${campaign}\`.${closest ? ` Did you mean \`${closest}\`?` : ""}`,
		`Campaigns here: ${names.join(", ") || "none"}. ${example}`,
	);
}

/** What one runner did: the exit code the action sets, plus the lines to print. */
export interface CliResult {
	exitCode: number;
	/** stdout lines. */
	out: string[];
	/** stderr lines: message first, remedy indented under it. */
	err: string[];
}

/** Prints a runner's result: stdout lines, stderr lines, then the exit code on the process. */
export function printCliResult(result: CliResult): void {
	if (result.out.length > 0) process.stdout.write(`${result.out.join("\n")}\n`);
	if (result.err.length > 0) process.stderr.write(`${result.err.join("\n")}\n`);
	process.exitCode = result.exitCode;
}

/** Exit 2 with the message and the indented remedy: how every runner reports a UsageError. */
export function usageResult(error: UsageError): CliResult {
	return { exitCode: 2, out: [], err: [error.message, `  ${error.hint}`] };
}

/** Exit 2 with the plan and the exact approval command: the shape of every un-approved mutation. */
export function gateResult(plan: string[], approval: string): CliResult {
	return { exitCode: 2, out: [], err: [...plan, `  Approve with: ${approval}`] };
}
