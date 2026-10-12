import { existsSync, statSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { glob } from "tinyglobby";
import { Command } from "commander";
import { formatHuman, formatJson, gateExitCode } from "../check/output.ts";
import { runCheck, UsageError, type CheckResult } from "../check/run.ts";
import { readVaultFiles } from "../vault/vault.ts";
import { CF, envOptions, readInput, resolveEnv } from "./kit.ts";

interface StyleFlags {
	vault?: string;
	root?: string;
	json?: boolean;
}

/** Virtual vault prefix for the target files; a target outside the cwd sits under its own prefix by absolute path. */
const PREFIX = "_style/";
const OUTSIDE = "_style-outside/";

/**
 * ADR 0038: Benchmark prompts are the DM's verbatim text, and the run log keeps samples as the
 * agents returned them. Neither is agent prose to style-gate, so both stay outside `cfcli style`
 * however they are selected — explicit file, or a folder expanded over them.
 */
function isBenchRecord(shown: string): boolean {
	const posix = shown.split(sep).join("/");
	return (
		posix === "evals/bench/prompts" ||
		posix.startsWith("evals/bench/prompts/") ||
		posix.startsWith("/evals/bench/prompts/") ||
		posix.startsWith("evals/bench/runs/") ||
		posix.startsWith("/evals/bench/runs/")
	);
}
async function targetFiles(paths: string[]): Promise<Map<string, string>> {
	const targets = new Map<string, string>();
	const add = async (abs: string): Promise<void> => {
		const rel = relative(process.cwd(), abs);
		const shown = rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel) ? abs : rel;
		if (isBenchRecord(shown)) return;
		let source: string;
		try {
			source = await readFile(abs, "utf8");
		} catch {
			throw new UsageError(
				`No such file: ${shown}.`,
				`Pass markdown files or folders, or - for stdin. Example: ${CF} style notes/draft.md`,
			);
		}
		targets.set(shown.split(sep).join("/"), source);
	};
	for (const input of paths) {
		if (input === "-") {
			targets.set("stdin.md", await readInput("-", `${CF} style -`));
			continue;
		}
		const abs = resolve(process.cwd(), input);
		if (!existsSync(abs)) {
			throw new UsageError(
				`No such path: ${input}.`,
				`Pass markdown files or folders, or - for stdin. Example: ${CF} style notes/draft.md`,
			);
		}
		if (statSync(abs).isDirectory()) {
			// Same ignores as a vault read: generated and machine folders are not prose to review. A skill's
			// frozen eval snapshots quote the prose they judged, and its eval fixtures keep researched
			// source notes as fetched, so both are records, not agent text.
			const md = await glob("**/*.md", {
				cwd: abs,
				onlyFiles: true,
				dot: false,
				ignore: ["templates/**", ".obsidian/**", "node_modules/**", "**/evals/snapshot/**", "**/evals/fixtures/**"],
			});
			for (const p of md.sort()) await add(join(abs, p));
			continue;
		}
		if (!input.endsWith(".md")) {
			throw new UsageError(`Not markdown: ${input}.`, "Pass .md files or folders of them, or - for stdin.");
		}
		await add(abs);
	}
	return targets;
}

export function styleCommand(): Command {
	return envOptions(new Command("style"))
		.description(
			"Lists findings for the style and narration layers over markdown; deciding what to change is the agent's job.",
		)
		.argument("[paths...]", "markdown files or folders to check, or - for stdin (default: stdin)")
		.option("--json", "print machine-readable JSON instead of text")
		.addHelpText(
			"after",
			`
Runs only the style (Vale) and narration layers, over skills, templates, agent definitions and drafts,
with the Wiki pages as context and name list. Output and exit codes match \`${CF} check\`.

Exit codes:
  0  no errors (warnings may print)    1  errors remain    2  usage error

Examples:
  printf '> [!narration] Opening\\n> The door swings open, slowly.\\n' | ${CF} style -
  ${CF} style .agents/skills/npc-design
  ${CF} style draft.md --json`,
		)
		.action(async (paths: string[], flags: StyleFlags) => {
			const { cwd, vault: vaultDir } = resolveEnv(flags, "style");
			const files = await readVaultFiles(vaultDir);
			const targets = await targetFiles(paths.length > 0 ? paths : ["-"]);
			const shownByKey = new Map<string, string>();
			for (const [shown, source] of targets) {
				// A target outside the cwd keys under OUTSIDE, so no key climbs out of the Vale scratch folder.
				const key = isAbsolute(shown)
					? OUTSIDE + shown.replace(/^[A-Za-z]:/, "").replace(/^[/\\]+/, "")
					: PREFIX + shown;
				shownByKey.set(key, shown);
				files.markdown.set(key, source);
			}
			// Virtual target names change the language-tool salt. Isolate their cache from the Wiki's cache.
			const scratch = await mkdtemp(join(tmpdir(), "cf-style-"));
			let result: CheckResult;
			try {
				result = await runCheck({
					vault: vaultDir,
					root: scratch,
					cwd,
					layers: ["style", "narration"],
					pagePaths: [...shownByKey.keys()],
					files,
					display: (vaultPath) => shownByKey.get(vaultPath) ?? vaultPath,
				});
			} finally {
				await rm(scratch, { recursive: true, force: true });
			}
			process.stdout.write(`${flags.json ? formatJson(result) : formatHuman(result, { fix: false, dryRun: false })}\n`);
			process.exitCode = gateExitCode(result);
		});
}
