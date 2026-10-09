import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { calloutLines } from "../../narration/sources.ts";
import { parsePage } from "../../vault/parse.ts";
import type { Page, Vault } from "../../vault/types.ts";
import { UsageError } from "../errors.ts";
import { isProsePage, nameWords, proseView, toolRoot } from "../prose.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";
import { checkedPages } from "../util.ts";

const LAYER = "style";

/** The gate's committed Vale config, shared by the page run and the snippet check, so there is one style vocabulary. */
const VALE_CONFIG = join(toolRoot, ".vale.ini");

/** Craft checks (proselint, write-good) over [!narration] callouts only; never added to .vale.ini, which reads all prose. */
const NARRATION_VALE_CONFIG = join(toolRoot, ".vale-narration.ini");

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

/** The synced packages are the gate's vocabulary; without them nothing can be judged. */
function requireStyles(): void {
	for (const style of ["ai-tells", "proselint", "write-good"]) {
		if (!existsSync(join(toolRoot, `.vale/styles/${style}`))) {
			setupError(`The Vale ${style} package is not installed.`, "Run `bun run setup` (it runs `vale sync`), then `cf check` again.");
		}
	}
}

/** Vale itself is missing; the run cannot start. */
function valeMissing(): never {
	setupError("Vale is not installed.", "Install Vale 3.23 or newer (https://vale.sh/docs/install; on macOS `brew install vale`), then run `bun run setup` and `cf check` again.");
}

const NARRATION_HINTS: Record<string, string> = {
	"Narration.NoEmDash": "Use theatre-of-the-mind, Clean prose: join the clauses with a comma, 'and' or a full stop, e.g. 'A lantern hangs, still lit.'",
	"Narration.NoSemicolon": "Use theatre-of-the-mind, Clean prose: split into two sentences or join with a comma or 'and', e.g. 'The road bends past a cairn. A drop waits below.'",
	"Narration.NoColon": "Use theatre-of-the-mind, Clean prose: turn the colon into a full stop or a comma, e.g. 'Two figures wait. Both carry lanterns.'",
	"Narration.NoCompass": "Say it in the body's directions, e.g. 'the road bends left past a cairn' or 'uphill'; keep the compass bearing in the DM's notes (theatre-of-the-mind, Speakable).",
	"Narration.NoFootMileCounts": "Say it in the body's terms, e.g. 'a bowshot away' or 'within reach'; keep the figure in the DM's notes (theatre-of-the-mind, Speakable).",
	"Narration.JudgementWords": "Use theatre-of-the-mind, Evidence: replace the conclusion with what supports it, e.g. 'an abandoned room' becomes 'a bowl of stew has skinned over on the table'.",
	"Narration.MechanicalTerms": "Use theatre-of-the-mind, Evidence: describe the visible effect and keep rules resolution in the DM's notes, e.g. 'the guard is stunned' becomes 'the guard drops his spear and stares at the broken door'.",
	"Narration.PerceptionHedges": "Use theatre-of-the-mind, Evidence: state what reaches the Party, e.g. 'the door appears to be locked' becomes 'a padlock hangs from the door's iron loop'.",
	"Narration.FilterVerbs": "Use theatre-of-the-mind, Situation first: put the event in the world, e.g. 'you see a rider approach' becomes 'a rider approaches along the towpath'.",
	"Narration.PcInterior": "Use theatre-of-the-mind, Hard line 1: leave the character's feelings and thoughts to their player, e.g. 'your heart races' becomes 'the scream rattles the lantern glass'.",
	"Narration.StockTells": "Use theatre-of-the-mind, People: give the person a physical cue tied to their want, e.g. 'her jaw clenches' becomes 'she plants a boot against the door and holds out her hand for the key'.",
};

function hintFor(check: string): string {
	const narration = NARRATION_HINTS[check];
	if (narration) return narration;
	const [style = "", rule = check] = check.split(".");
	return `Reword the flagged text in plain, concrete words, keeping what it says true. The rule is defined in .vale/styles/${style}/${rule}.yml. The rule stands: rewrite until it clears. Only an obvious misfire on literal campaign meaning (a ship that is a ship) goes to the DM, who alone may switch a rule off in .vale.ini.`;
}

/**
 * Words that are proper nouns in this vault: words that only ever appear capitalized across page names and
 * aliases. A word that also appears lowercased in a name ("the" in "Bring the Pearl of Souls to Umberlee") and
 * words under three letters ("A", "On") stay out, so ordinary sentence words are never excepted.
 */
function properNouns(vault: Vault): Set<string> {
	const capitalized = new Set<string>();
	const lowercased = new Set<string>();
	const add = (name: string): void => {
		for (const word of nameWords(name)) {
			if (word.length < 3) continue;
			(/^\p{Lu}/u.test(word) ? capitalized : lowercased).add(word.toLowerCase());
		}
	};
	for (const page of vault.pages) {
		for (const name of page.names) add(name);
	}
	for (const word of lowercased) capitalized.delete(word);
	return capitalized;
}

/** Per character, whether it sits inside double quotes (straight or curly): quoted speech, not narration. */
function quoteMask(line: string): boolean[] {
	const inside = new Array<boolean>(line.length).fill(false);
	let open = false;
	for (let i = 0; i < line.length; i++) {
		const ch = line[i];
		if (ch === "“") open = true;
		else if (ch === "”") open = false;
		else if (ch === `"`) open = !open;
		inside[i] = open;
	}
	return inside;
}

// A masked name's stand-in (see prose.ts): whatever its source, it is a name.
const MASK_STAND_IN = /^(?:Person|People|Place|Ship|Object|Placename[a-z]*)$/;

/** Whether every occurrence of `match` on the line sits inside double quotes: quoted speech is NPC voice, not narration. */
function allQuoted(line: string, match: string): boolean {
	if (match === "") return false;
	const inside = quoteMask(line);
	let count = 0;
	let quoted = 0;
	for (let i = line.indexOf(match); i !== -1; i = line.indexOf(match, i + 1)) {
		count++;
		if (inside.slice(i, i + match.length).every(Boolean)) quoted++;
	}
	return count > 0 && count === quoted;
}

/**
 * Two DM-confirmed Vale misfires, dropped here because the rules themselves cannot see the distinction.
 * - FillerIntensifier reads "a single" as padding, but inside quoted in-world speech it is a count: Hinewai's
 *   vow ("take a single fruit ... fish a single river ...") says exactly one, and the quoting is her voice.
 *   Dropped only when every occurrence of the match on the line sits inside double quotes, so narration keeps
 *   the rule at full strength.
 * - ColonUsage's message promises "unless it is a proper noun", but its token cannot see one. The confirmed
 *   misfire was ": Matteo" on Oren Vask ("Ship versus garden: Matteo calls men like Oren mad."), a given name
 *   the name mask does not cover.
 */
function isConfirmedMisfire(line: string, alert: ValeAlert, names: Set<string>): boolean {
	if (alert.Check === "ai-tells.FillerIntensifier") {
		return allQuoted(line, alert.Match);
	}
	if (alert.Check === "ai-tells.ColonUsage") {
		const word = /:\s(\p{L}[\p{L}'’-]*)$/u.exec(alert.Match)?.[1] ?? "";
		return word.length > 0 && (names.has(word.toLowerCase()) || MASK_STAND_IN.test(word));
	}
	return false;
}

/**
 * A list item's bold lead-in (`- **Found at.** Ravenhold`) is a field name from the template, not a sentence.
 * Vale would read `Found at.` as a clipped sentence and trip its staccato and mic-drop rules on every page, so the
 * label loses its full stop. Line numbers do not change.
 */
function valeText(text: string, page: Page): string {
	const narrationLines = new Set<number>();
	for (const callout of page.callouts) {
		if (callout.type !== "narration") continue;
		const [start, end] = calloutLines(page, callout);
		for (let line = start; line <= end; line++) narrationLines.add(line);
	}
	// Only narration stays a blockquote: other callouts and ordinary quotes are DM-side prose. A quote line under an
	// NPC's `## Quotes` is that person's verbatim speech, so it leaves the view (blanked) while its context line stays.
	let inQuotes = false;
	const scoped = text.split("\n").map((line, index) => {
		if (/^#{1,6}\s/.test(line)) inQuotes = /^##\s+Quotes\s*$/.test(line);
		if (inQuotes && /^[ \t]*>/.test(line)) return "";
		return narrationLines.has(index + 1) ? line : line.replace(/^[ \t]*(?:>[ \t]?)+/, "");
	}).join("\n");
	return scoped.replace(/^([ \t]*(?:[-*+]|\d+\.)[ \t]+\*\*[^*\n]+?)\.(\*\*)/gm, "$1$2");
}

/**
 * The view the craft checks read: the body lines of every [!narration] callout with their `>` markers stripped,
 * and every other line, the callout's title line included, blanked to "" so line numbers stay the page's. Null
 * when the page has no narration callout, so the craft pass is skipped entirely.
 */
function narrationValeText(text: string, page: Page): string | null {
	const narrationLines = new Set<number>();
	for (const callout of page.callouts) {
		if (callout.type !== "narration") continue;
		const [start, end] = calloutLines(page, callout);
		for (let line = start + 1; line <= end; line++) narrationLines.add(line);
	}
	if (narrationLines.size === 0) return null;
	return text.split("\n").map((line, index) =>
		narrationLines.has(index + 1) ? line.replace(/^[ \t]*(?:>[ \t]?)+/, "") : "",
	).join("\n");
}

function runVale(args: string[]): Promise<{ stdout: string; missing: boolean }> {
	const { promise, resolve, reject } = Promise.withResolvers<{ stdout: string; missing: boolean }>();
	execFile("vale", args, { maxBuffer: 256 * 1024 * 1024 }, (error, stdout, stderr) => {
		if (error && (error as NodeJS.ErrnoException).code === "ENOENT") return resolve({ stdout: "", missing: true });
		// `--no-exit` keeps a normal run at exit 0; anything else is Vale failing, not findings.
		if (error) return reject(new Error(`vale failed: ${stderr.trim() || error.message}`));
		resolve({ stdout, missing: false });
	});
	return promise;
}

/** One Vale alert as a gate finding, or null for a DM-confirmed misfire. Shared by the page run and the snippet check. */
function findingFor(alert: ValeAlert, lineText: string, path: string, names: Set<string>): Finding | null {
	if (isConfirmedMisfire(lineText, alert, names)) return null;
	return {
		layer: LAYER,
		rule: alert.Check,
		severity: alert.Severity === "error" ? "error" : "warning",
		path,
		line: alert.Line,
		// The upstream ai-tells package ends messages with "Disable this rule for X prose."; only the DM disables a rule (.vale.ini).
		message: alert.Message.replace(/\s*Disable this rule\b[^.]*\./g, ""),
		hint: hintFor(alert.Check),
	};
}

/**
 * One craft-check alert as a gate finding, or null when every occurrence of the match on the line sits inside
 * double quotes: quoted speech is NPC voice, not the DM's narration. Craft checks always warn, whatever level
 * the package gives the rule.
 */
function narrationFinding(alert: ValeAlert, lineText: string, path: string): Finding | null {
	if (allQuoted(lineText, alert.Match)) return null;
	return {
		layer: LAYER,
		rule: alert.Check,
		severity: "warning",
		path,
		line: alert.Line,
		// The upstream packages end messages with "Disable this rule ..."; only the DM disables a rule (.vale-narration.ini).
		message: alert.Message.replace(/\s*Disable this rule\b[^.]*\./g, ""),
		hint: hintFor(alert.Check),
	};
}

/**
 * Vale reads the prose view of every page in one invocation: the view is the page with frontmatter, code,
 * comments, embeds and callout markers removed, wikilinks shown as their alias (a name with no alias is masked), written to a scratch folder
 * with the page's own relative path and line numbers.
 */
export async function run(ctx: CheckContext): Promise<Finding[]> {
	requireStyles();
	const pages = checkedPages(ctx).filter(isProsePage);
	if (pages.length === 0) return [];
	const cacheDir = join(ctx.root, ".cache", "check");
	await mkdir(cacheDir, { recursive: true });
	const written: Record<string, string> = {};
	const narrated: Record<string, string> = {};
	for (const page of pages) {
		const view = proseView(page, ctx.vault).text;
		written[page.path] = valeText(view, page);
		const narration = narrationValeText(view, page);
		if (narration !== null) narrated[page.path] = narration;
	}
	const scratch = await mkdtemp(join(cacheDir, "vale-"));
	// The craft checks read a second view of the same pages, so they get their own scratch folder.
	const scratch2 = Object.keys(narrated).length > 0 ? await mkdtemp(join(cacheDir, "vale-")) : "";
	try {
		const writeViews = (dir: string, views: Record<string, string>) =>
			Promise.all(
				Object.entries(views).map(async ([path, text]) => {
					const file = join(dir, path);
					await mkdir(dirname(file), { recursive: true });
					await writeFile(file, text);
				}),
			);
		await Promise.all([writeViews(scratch, written), scratch2 ? writeViews(scratch2, narrated) : undefined]);
		// The craft checks run over [!narration] callouts only, beside the gate's own rules (.vale.ini), in parallel.
		const [main, craft] = await Promise.all([
			runVale(["--config", VALE_CONFIG, "--output=JSON", "--no-exit", scratch]),
			scratch2 ? runVale(["--config", NARRATION_VALE_CONFIG, "--output=JSON", "--no-exit", scratch2]) : undefined,
		]);
		if (main.missing || craft?.missing) valeMissing();
		const [byFile = new Map<string, ValeAlert[]>(), craftByFile = new Map<string, ValeAlert[]>()] = ([[main.stdout, scratch], [craft?.stdout ?? "", scratch2]] as const).map(
			([stdout, dir]) =>
				new Map(
					Object.entries((stdout.trim() === "" ? {} : JSON.parse(stdout)) as Record<string, ValeAlert[]>).map(
						([file, alerts]) => [file.startsWith(dir) ? file.slice(dir.length + 1) : file, alerts],
					),
				),
		);
		const names = properNouns(ctx.vault);
		const findings: Finding[] = [];
		for (const page of pages) {
			const lines = (written[page.path] ?? "").split("\n");
			for (const alert of byFile.get(page.path) ?? []) {
				const finding = findingFor(alert, lines[alert.Line - 1] ?? "", ctx.display(page.path), names);
				if (finding) findings.push(finding);
			}
			const narration = (narrated[page.path] ?? "").split("\n");
			for (const alert of craftByFile.get(page.path) ?? []) {
				const finding = narrationFinding(alert, narration[alert.Line - 1] ?? "", ctx.display(page.path));
				if (finding) findings.push(finding);
			}
		}
		return findings;
	} finally {
		await rm(scratch, { recursive: true, force: true });
		if (scratch2) await rm(scratch2, { recursive: true, force: true });
	}
}

/** A snippet finding keeps the text Vale matched, so a refusal can name the offending span. */
export interface StyleFinding extends Finding {
	match: string;
}

/**
 * The gate's Vale rules over one snippet, read exactly as the gate reads a page: the text is parsed and
 * name-masked like any page, written to a scratch file at the vault-relative `rel`, and checked in one Vale
 * invocation with the committed `.vale.ini` and its synced styles. `cf log` runs the entry it is about to
 * append through this, so the command cannot author text its own gate fails on `log.md`.
 */
export async function styleSnippet(vault: Vault, root: string, rel: string, text: string): Promise<StyleFinding[]> {
	requireStyles();
	const page = parsePage(rel, text);
	const body = valeText(proseView(page, vault).text, page);
	const cacheDir = join(root, ".cache", "check");
	await mkdir(cacheDir, { recursive: true });
	const scratch = await mkdtemp(join(cacheDir, "vale-"));
	try {
		const file = join(scratch, rel);
		await mkdir(dirname(file), { recursive: true });
		await writeFile(file, body);
		const { stdout, missing } = await runVale(["--config", VALE_CONFIG, "--output=JSON", "--no-exit", file]);
		if (missing) valeMissing();
		const results = (stdout.trim() === "" ? {} : JSON.parse(stdout)) as Record<string, ValeAlert[]>;
		const names = properNouns(vault);
		const lines = body.split("\n");
		const findings: StyleFinding[] = [];
		for (const alerts of Object.values(results)) {
			for (const alert of alerts) {
				const finding = findingFor(alert, lines[alert.Line - 1] ?? "", rel, names);
				if (finding) findings.push({ ...finding, match: alert.Match });
			}
		}
		return findings;
	} finally {
		await rm(scratch, { recursive: true, force: true });
	}
}

export const styleLayer: Layer = {
	name: LAYER,
	description: "Vale: ai-tells on all prose, and Narration hard lines and craft warnings inside [!narration] callouts.",
	run,
};
