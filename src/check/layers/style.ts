import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { UsageError } from "../errors.ts";
import { proseView, prosePages, toolRoot } from "../prose.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";

const LAYER = "style";

interface ValeAlert {
	Check: string;
	Message: string;
	Line: number;
	Match: string;
	Severity: string;
}

/** Bad setup (no Vale, no synced style): the CLI exits 2 with the message and hint. */
function setupError(message: string, hint: string): never {
	throw new UsageError(message, hint);
}

const NARRATION_HINTS: Record<string, string> = {
	"Narration.NoEmDash": "Join the clauses with a comma, 'and' or a full stop, e.g. 'A lantern hangs, still lit.'",
	"Narration.NoSemicolon": "Split into two sentences or join with a comma or 'and', e.g. 'The road bends past a cairn. A drop waits below.'",
	"Narration.NoColon": "Turn the colon into a full stop or a comma, e.g. 'Two figures wait. Both carry lanterns.'",
	"Narration.NoCompass": "Say it in the body's directions, e.g. 'the road bends left past a cairn' or 'uphill'; keep the compass bearing in the DM's notes (theatre-of-the-mind, Speakable).",
	"Narration.NoFootMileCounts": "Say it in the body's terms, e.g. 'a bowshot away' or 'within reach'; keep the figure in the DM's notes (theatre-of-the-mind, Speakable).",
};

function hintFor(check: string): string {
	const narration = NARRATION_HINTS[check];
	if (narration) return narration;
	const [style = "", rule = check] = check.split(".");
	return `Reword the flagged text in plain, concrete words, keeping what it says true. The rule is defined in .vale/styles/${style}/${rule}.yml. If it misfires on legitimate campaign prose, disable it in .vale.ini with a comment saying why.`;
}

/**
 * A list item's bold lead-in (`- **Found at.** Ravenhold`) is a field name from the template, not a sentence.
 * Vale would read `Found at.` as a clipped sentence and trip its staccato and mic-drop rules on every page, so the
 * label loses its full stop. Line numbers do not change.
 */
function valeText(text: string): string {
	return text.replace(/^([ \t]*(?:[-*+]|\d+\.)[ \t]+\*\*[^*\n]+?)\.(\*\*)/gm, "$1$2");
}

function runVale(args: string[]): Promise<{ stdout: string; missing: boolean }> {
	return new Promise((resolve, reject) => {
		execFile("vale", args, { maxBuffer: 256 * 1024 * 1024 }, (error, stdout, stderr) => {
			if (error && (error as NodeJS.ErrnoException).code === "ENOENT") return resolve({ stdout: "", missing: true });
			// `--no-exit` keeps a normal run at exit 0; anything else is Vale failing, not findings.
			if (error) return reject(new Error(`vale failed: ${stderr.trim() || error.message}`));
			resolve({ stdout, missing: false });
		});
	});
}

/**
 * Vale reads the prose view of every page in one invocation: the view is the page with frontmatter, code,
 * comments, embeds and callout markers removed, wikilinks shown as their alias (a name with no alias is masked), written to a scratch folder
 * with the page's own relative path and line numbers.
 */
export async function run(ctx: CheckContext): Promise<Finding[]> {
	const config = join(toolRoot, ".vale.ini");
	if (!existsSync(join(toolRoot, ".vale/styles/ai-tells"))) {
		setupError("The Vale ai-tells package is not installed.", "Run `pnpm run setup` (it runs `vale sync`), then `pnpm check` again.");
	}
	const pages = prosePages(ctx.vault);
	const scratch = await mkdtemp(join(tmpdir(), "cf-vale-"));
	try {
		await Promise.all(
			pages.map(async (page) => {
				const file = join(scratch, page.path);
				await mkdir(dirname(file), { recursive: true });
				await writeFile(file, valeText(proseView(page, "mask").text));
			}),
		);
		const { stdout, missing } = await runVale(["--config", config, "--output=JSON", "--no-exit", scratch]);
		if (missing) {
			setupError("Vale is not installed.", "Install Vale 3.23 or newer (https://vale.sh/docs/install; on macOS `brew install vale`), then run `pnpm run setup` and `pnpm check` again.");
		}
		const results = (stdout.trim() === "" ? {} : JSON.parse(stdout)) as Record<string, ValeAlert[]>;
		const byFile = new Map(Object.entries(results).map(([file, alerts]) => [file.startsWith(scratch) ? file.slice(scratch.length + 1) : file, alerts]));
		const findings: Finding[] = [];
		for (const page of pages) {
			for (const alert of byFile.get(page.path) ?? []) {
				findings.push({
					layer: LAYER,
					rule: alert.Check,
					path: ctx.display(page.path),
					line: alert.Line,
					message: alert.Message,
					hint: hintFor(alert.Check),
				});
			}
		}
		return findings;
	} finally {
		await rm(scratch, { recursive: true, force: true });
	}
}

export const styleLayer: Layer = {
	name: LAYER,
	description: "Vale: the ai-tells package on all prose, and the Narration hard lines inside [!narration] callouts.",
	run,
};
