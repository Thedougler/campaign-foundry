import type { Page, Vault } from "../../vault/types.ts";
import type { CachedFinding } from "../cache.ts";
import { runLanguageTool, type LanguageTool } from "../language.ts";
import { nameWords } from "../prose.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";
import { pageViews, valeViews } from "../views.ts";
import { valeSubprocess, type ValeAdapter, type ValeAlert, type ValeConfig } from "../vale.ts";

const LAYER = "style";

const NARRATION_HINTS: Record<string, string> = {
	"Narration.AtAGlance":
		"Migrate now to the shape of wiki/templates/<type>.md and follow its skill. Delete the 'At a glance' section; move any fact no other part of the page holds into the section where it belongs.",
	"Narration.Play":
		"Migrate now to the shape of wiki/templates/<type>.md and follow its skill. Delete the 'Play' section; move any fact no other part of the page holds into the specific section whose job it is.",
	"Narration.Depth":
		"Migrate to the shape of wiki/templates/<type>.md — see the page kind's design skill; move facts into the specific section whose job they are.",
	"Narration.InUse":
		"Migrate to the shape of wiki/templates/Item.md — see item-design; move rules into Properties, rulings into Rulings and spoken description into the First look entry.",
	"Narration.Story":
		"Migrate to the shape of wiki/templates/PC.md — see pull-pcs; move the character's past into Backstory and their aims and ties into Goals and bonds.",
	"Narration.Changes":
		"Migrate to the shape of wiki/templates/Recap.md — see ingest; move state changes into Changes to the World.",
	"Narration.Next":
		"Migrate to the shape of wiki/templates/hot.md — see prep-session; move the Party's position, Prep and Hook links and open questions into Next Session.",
	"Narration.NoEmDash":
		"Use theatre-of-the-mind, Clean prose: join the clauses with a comma, 'and' or a full stop, e.g. 'A lantern hangs, still lit.'",
	"Narration.NoSemicolon":
		"Use theatre-of-the-mind, Clean prose: split into two sentences or join with a comma or 'and', e.g. 'The road bends past a cairn. A drop waits below.'",
	"Narration.NoColon":
		"Use theatre-of-the-mind, Clean prose: turn the colon into a full stop or a comma, e.g. 'Two figures wait. Both carry lanterns.'",
	"Narration.JudgementWords":
		"Use theatre-of-the-mind, Evidence: replace the conclusion with what supports it, e.g. 'an abandoned room' becomes 'a bowl of stew has skinned over on the table'.",
	"Narration.MechanicalTerms":
		"Use theatre-of-the-mind, Evidence: describe the visible effect and keep rules resolution in the DM's notes, e.g. 'the guard is stunned' becomes 'the guard drops his spear and stares at the broken door'.",
	"Narration.PcInterior":
		"Use theatre-of-the-mind, Hard line 1: sensations and knowledge are the camera's ('you feel the cold of the stone'); the decision and the emotion belong to the player, e.g. 'you decide to run' becomes 'the road forks, and both paths hold their breath'.",
	"Narration.StockTells":
		"Use theatre-of-the-mind, People: give the person a physical cue tied to their want, e.g. 'her jaw clenches' becomes 'she plants a boot against the door and holds out her hand for the key'.",
};

function hintFor(check: string, span: string): string {
	const narration = NARRATION_HINTS[check];
	const [style = "", rule = check] = check.split(".");
	const hint =
		narration ??
		`Reword the flagged text in plain, concrete words, keeping what it says true. The rule is defined in .vale/styles/${style}/${rule}.yml. The rule stands: rewrite until it clears. Only an obvious misfire on literal campaign meaning (a ship that is a ship) goes to the DM, who alone may switch a rule off in .vale.ini.`;
	// The finding quotes the masked view, so a stand-in in the span must be explained there: the skill no longer holds the catalogue.
	const standIn = STAND_IN_WORD.exec(span)?.[0];
	return standIn ? `${hint} '${standIn}' in the quoted text is the checker's stand-in for a page's name.` : hint;
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
const STAND_INS = "Person|People|Place|Ship|Object|Placename[a-z]*";
const MASK_STAND_IN = new RegExp(`^(?:${STAND_INS})$`);
// The same stand-ins as a whole word inside a flagged span: the finding quotes the mask, not the name.
const STAND_IN_WORD = new RegExp(`\\b(?:${STAND_INS})\\b`);

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

const ENTRY_FIELD = /^[ \t]*(?:[-*+]\s+)?(?:\*\*[^*\n]+:\*\*|__[^_\n]+:__)[ \t]+\S/u;

/** Only the colon ending a bold entry-field label, never a colon later in its value. */
function isEntryFieldColon(line: string, alert: ValeAlert): boolean {
	if (!alert.Span) return false;
	const field = ENTRY_FIELD.exec(line);
	if (!field) return false;
	const colon = Math.max(field[0].lastIndexOf(":**"), field[0].lastIndexOf(":__"));
	// Vale counts characters, not UTF-16 units; an astral character in a label occupies one column.
	let column = 1;
	for (let index = 0; index < colon; index++) {
		column++;
		if (line.codePointAt(index)! > 0xffff) index++;
	}
	return alert.Span[0] === column;
}

/**
 * DM-confirmed Vale misfires, dropped here because the rules themselves cannot see the distinction.
 * - FillerIntensifier reads "a single" as padding, but inside quoted in-world speech it is a count: Hinewai's
 *   vow ("take a single fruit ... fish a single river ...") says exactly one, and the quoting is her voice.
 *   Dropped only when every occurrence of the match on the line sits inside double quotes, so narration keeps
 *   the rule at full strength.
 * - ColonUsage's message promises "unless it is a proper noun", but its token cannot see one. The confirmed
 *   misfire was ": Matteo" on Oren Vask ("Ship versus garden: Matteo calls men like Oren mad."), a given name
 *   the name mask does not cover.
 *   Published mechanics also use bold entry-field labels ending in a colon. Vale strips that emphasis
 *   before matching, so only the label's colon is exempted by its source column; value prose stays checked.
 */
function isConfirmedMisfire(line: string, alert: ValeAlert, names: Set<string>): boolean {
	if (alert.Check === "ai-tells.FillerIntensifier") {
		return allQuoted(line, alert.Match);
	}
	if (alert.Check === "ai-tells.ColonUsage") {
		if (isEntryFieldColon(line, alert)) return true;
		const word = /:\s(\p{L}[\p{L}'’-]*)$/u.exec(alert.Match)?.[1] ?? "";
		return word.length > 0 && (names.has(word.toLowerCase()) || MASK_STAND_IN.test(word));
	}
	return false;
}

/**
 * The ai-tells rules the exemplar fixture proved misfire on spoken Narration: the technique is DM craft, not AI
 * filler, and a rule that flags it would have rewritten both Brennan Lee Mulligan and Matt Mercer (ADR 0029).
 * Each entry is dropped only when the alert's line is spoken Narration ([!narration] callout or Cue); DM prose
 * keeps every rule at full strength.
 * - ai-tells.ColonUsage: the Cue label colon (`Failure:`, `Critical:`) precedes the `==…==` marks on a DM-side
 *   line, and its capitalised word is the Cue's first spoken word. A colon INSIDE the marks stays caught by
 *   Narration.NoColon on the Cue view, so the exemption only frees the label.
 */
const NARRATION_EXEMPT_AI_TELLS: Readonly<Record<string, true>> = { "ai-tells.ColonUsage": true };

/**
 * One Vale alert as a gate finding, or null for a DM-confirmed misfire. `onSpokenLine` says the alert's line is
 * Narration the DM speaks (a [!narration] callout line or a Cue line of the same page); it alone can drop an
 * ai-tells rule in NARRATION_EXEMPT_AI_TELLS, so DM prose keeps every rule at full strength.
 */
function findingFor(
	alert: ValeAlert,
	lineText: string,
	names: Set<string>,
	onSpokenLine = false,
): CachedFinding | null {
	if (isConfirmedMisfire(lineText, alert, names)) return null;
	if (onSpokenLine && NARRATION_EXEMPT_AI_TELLS[alert.Check]) return null;
	return {
		layer: LAYER,
		rule: alert.Check,
		severity: alert.Severity === "error" ? "error" : "warning",
		line: alert.Line,
		// The upstream ai-tells package ends messages with "Disable this rule for X prose."; only the DM disables a rule (.vale.ini).
		message: alert.Message.replace(/\s*Disable this rule\b[^.]*\./g, ""),
		hint: hintFor(alert.Check, alert.Match),
	};
}

/**
 * One craft-check alert as a gate finding, or null when every occurrence of the match on the line sits inside
 * double quotes: quoted speech is NPC voice, not the DM's narration. Craft checks always warn, whatever level
 * the package gives the rule.
 */
function narrationFinding(alert: ValeAlert, lineText: string): CachedFinding | null {
	if (allQuoted(lineText, alert.Match)) return null;
	return {
		layer: LAYER,
		rule: alert.Check,
		severity: "warning",
		line: alert.Line,
		// The upstream packages end messages with "Disable this rule ..."; only the DM disables a rule (.vale-narration.ini).
		message: alert.Message.replace(/\s*Disable this rule\b[^.]*\./g, ""),
		hint: hintFor(alert.Check, alert.Match),
	};
}

/**
 * The style layer as one language tool: Vale reads three prepared views of each cache miss — the gate's rules
 * over the prose view, the craft checks over spoken Narration, and the Narration token rules over Cues — with
 * one adapter call site for all three.
 */
function styleTool(vale: ValeAdapter): LanguageTool {
	return {
		name: LAYER,
		config: [".vale.ini", ".vale-narration.ini"],
		salt: async () =>
			`${vale.fingerprint ? await vale.fingerprint() : "canned"}|${Object.keys(NARRATION_EXEMPT_AI_TELLS).join(",")}|${MASK_STAND_IN.source}|item-properties-2026-10-11|entry-fields-2026-10-12`,
		async compute(pages, ctx) {
			const written: Record<string, string> = {};
			const narrated: Record<string, string> = {};
			const cued: Record<string, string> = {};
			for (const page of pages) {
				const views = valeViews(page, ctx.vault);
				written[page.path] = views.written;
				if (views.narrated !== null) narrated[page.path] = views.narrated;
				if (views.cued !== null) cued[page.path] = views.cued;
			}
			const run = async (config: ValeConfig, files: Record<string, string>): Promise<Map<string, ValeAlert[]>> =>
				Object.keys(files).length === 0 ? new Map() : vale.check({ config, files }, ctx.root);
			// The craft checks run over [!narration] callouts and Cues only, beside the gate's own rules, in parallel.
			const [main, craft, cue] = await Promise.all([
				run("gate", written),
				run("narration", narrated),
				run("gate", cued),
			]);
			const names = properNouns(ctx.vault);
			const byPage = new Map<Page, CachedFinding[]>(pages.map((page) => [page, []]));
			const add = (page: Page, finding: CachedFinding | null): void => {
				if (finding) byPage.get(page)!.push(finding);
			};
			for (const page of pages) {
				const views = pageViews(page);
				const lines = written[page.path]!.split("\n");
				for (const alert of main.get(page.path) ?? []) {
					add(page, findingFor(alert, lines[alert.Line - 1] ?? "", names, views.spoken.has(alert.Line)));
				}
				const narration = narrated[page.path]?.split("\n") ?? [];
				for (const alert of craft.get(page.path) ?? []) {
					add(page, narrationFinding(alert, narration[alert.Line - 1] ?? ""));
				}
				// Every Cue-pass line is spoken Narration by construction, so its Narration.* alerts may use the exemption.
				const cueLines = cued[page.path]?.split("\n") ?? [];
				for (const alert of cue.get(page.path) ?? []) {
					if (!alert.Check.startsWith("Narration.")) continue;
					add(page, findingFor(alert, cueLines[alert.Line - 1] ?? "", names, true));
				}
			}
			return byPage;
		},
	};
}

/** The style layer over one Vale adapter: the real binary in production, canned alerts in tests. */
export function styleLayerWith(vale: ValeAdapter): Layer {
	const tool = styleTool(vale);
	return {
		name: LAYER,
		scope: "page",
		description:
			"Vale: ai-tells on all prose, and Narration hard lines and craft warnings inside [!narration] callouts.",
		run: (ctx: CheckContext): Promise<Finding[]> => runLanguageTool(tool, ctx),
	};
}

export const styleLayer: Layer = styleLayerWith(valeSubprocess());
