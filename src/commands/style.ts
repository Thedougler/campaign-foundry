import { existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import { glob } from "tinyglobby";
import { Command } from "commander";
import { narrationLayer } from "../check/layers/narration.ts";
import { styleLayer } from "../check/layers/style.ts";
import { formatHuman, formatJson, gateExitCode } from "../check/output.ts";
import type { CheckContext, Finding } from "../check/types.ts";
import type { CheckResult } from "../check/run.ts";
import { UsageError } from "../check/run.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import type { VaultFiles } from "../vault/vault.ts";
import { resolveCheckEnv } from "./check.ts";
import { readStdin } from "./stdin.ts";

interface StyleFlags {
	vault?: string;
	root?: string;
	json?: boolean;
}

/** Virtual vault prefix for the target files, stripped from reported findings. */
const PREFIX = "_style/";

/**
 * The `cf style` targets as cwd-relative virtual paths: `-` becomes `stdin.md`, a directory expands to its
 * `*.md` files, a missing path is a usage error.
 */
async function targetFiles(paths: string[]): Promise<Map<string, string>> {
	const targets = new Map<string, string>();
	const add = async (rel: string, abs: string): Promise<void> => {
		let source: string;
		try {
			source = await readFile(abs, "utf8");
		} catch {
			throw new UsageError(
				`No such file: ${rel}.`,
				"Pass markdown files or folders, or - for stdin. Example: bun run cf -- style notes/draft.md",
			);
		}
		targets.set(rel.split(sep).join("/"), source);
	};
	for (const input of paths) {
		if (input === "-") {
			targets.set("stdin.md", await readStdin());
			continue;
		}
		const abs = resolve(process.cwd(), input);
		if (!existsSync(abs)) {
			throw new UsageError(
				`No such path: ${input}.`,
				"Pass markdown files or folders, or - for stdin. Example: bun run cf -- style notes/draft.md",
			);
		}
		if (statSync(abs).isDirectory()) {
			// Same ignores as a vault read: generated and machine folders are not prose to review. A skill's eval
			// history (climb logs, frozen snapshots) quotes the prose it judged, so it is a record, not agent text.
			const md = await glob("**/*.md", {
				cwd: abs,
				onlyFiles: true,
				dot: false,
				ignore: ["templates/**", ".obsidian/**", "node_modules/**", "**/evals/climb.md", "**/evals/snapshot/**"],
			});
			for (const p of md.sort()) await add(join(relative(process.cwd(), abs), p), join(abs, p));
			continue;
		}
		if (!input.endsWith(".md")) {
			throw new UsageError(`Not markdown: ${input}.`, "Pass .md files or folders of them, or - for stdin.");
		}
		await add(relative(process.cwd(), abs), abs);
	}
	return targets;
}

/** Sort order matching `runCheck`, so output reads like `cf check`. */
const byLocation = (a: Finding, b: Finding): number =>
	a.path.localeCompare(b.path) || a.line - b.line || a.layer.localeCompare(b.layer) || a.rule.localeCompare(b.rule);

export function styleCommand(): Command {
	return new Command("style")
		.description("Lists findings for the style and narration layers over markdown; deciding what to change is the agent's job.")
		.argument("[paths...]", "markdown files or folders to check, or - for stdin (default: stdin)")
		.option("--vault <dir>", "the Wiki read as context and name list (default: <root>/wiki)")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.option("--json", "print machine-readable JSON instead of text")
		.addHelpText(
			"after",
			`
Runs only the style (Vale) and narration layers, over skills, templates, agent definitions and drafts,
with the Wiki pages as context and name list. Output and exit codes match \`cf check\`.

Exit codes:
  0  no errors (warnings may print)    1  errors remain    2  usage error

Examples:
  printf '> [!narration] Opening\\n> The door swings open, slowly.\\n' | bun run cf -- style -
  bun run cf -- style .agents/skills/npc-design
  bun run cf -- style draft.md --json`,
		)
		.action(async (paths: string[], flags: StyleFlags) => {
			const { root, vault: vaultDir } = resolveCheckEnv(flags);
			if (!existsSync(vaultDir) || !statSync(vaultDir).isDirectory()) {
				throw new UsageError(`The vault folder ${vaultDir} does not exist.`, "cf style --vault <folder>");
			}
			const files: VaultFiles = await readVaultFiles(vaultDir);
			const targets = await targetFiles(paths.length > 0 ? paths : ["-"]);
			for (const [rel, source] of targets) files.markdown.set(PREFIX + rel, source);
			const vault = buildVault(vaultDir, files);
			// ponytail: the target files join the vault's name mask, so a file stem like `SKILL` masks only that exact word; revisit if a target stem collides with a Wiki name.
			const ctx: CheckContext = {
				vault,
				// The style and narration layers read no templates; an empty set keeps the CheckContext shape.
				templates: { byName: new Map(), types: new Map() },
				root,
				display: (vaultPath) => vaultPath,
			};
			const started = performance.now();
			const found = (await Promise.all([styleLayer.run(ctx), narrationLayer.run(ctx)])).flat();
			const findings = found
				.filter((f) => f.path.startsWith(PREFIX))
				.map((f) => ({ ...f, path: f.path.slice(PREFIX.length) }))
				.sort(byLocation);
			const result: CheckResult = {
				findings,
				fixes: [],
				pages: vault.pages.length,
				layers: [styleLayer.name, narrationLayer.name],
				durationMs: Math.round(performance.now() - started),
			};
			process.stdout.write(`${flags.json ? formatJson(result) : formatHuman(result, { fix: false, dryRun: false })}\n`);
			process.exitCode = gateExitCode(result);
		});
}
