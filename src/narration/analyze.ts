import { segment } from "sentencex";
import stopword from "stopword";
import { valePatterns } from "./vale.ts";

/** Text of a source with the source line each word sits on, for echo matching. */
export interface SourceWords {
	/** What the finding names: a vault path, or the path as given for a `--source` or `--old` file. */
	label: string;
	/** Normalised words (lowercase, no apostrophes) in reading order. */
	words: { word: string; line: number }[];
}

export interface Band {
	min: number;
	max: number;
}

export interface Finding {
	rule:
		| "band"
		| "echo"
		| "punctuation"
		| "compass"
		| "foot-mile-counts"
		| "fresh-starts"
		| "judgement-words"
		| "evaluative-adjectives"
		| "relative-clauses"
		| "invented-names"
		| "spoken-word-traps"
		| "dialogue-attribution"
		| "mechanical-terms"
		| "perception-hedges";
	severity: "error" | "warning";
	message: string;
	hint: string;
}

export interface EchoRun {
	/** The shared words, lowercase and without punctuation. */
	text: string;
	occurrences: { source: string; line: number }[];
}

export interface CalloutReport {
	words: number;
	sentences: { narration: number; spoken: number };
	band: (Band & { pass: boolean }) | null;
	echo: EchoRun[];
	punctuation: { emDashes: number; semicolons: number; colons: number };
	compass: string[];
	footMileCounts: string[];
	freshStarts: { starts: string[]; runs: { from: number; to: number; starts: string[] }[] };
	judgementWords: string[];
	mechanicalTerms: string[];
	perceptionHedges: string[];
	evaluativeAdjectiveStacks: string[];
	relativeClauseChains: string[];
	inventedProperNouns: string[];
	spokenWordTraps: { type: "tongue-twister" | "alliteration" | "pun-name" | "homophone"; text: string }[];
	dialogueAttributions: string[];
	findings: Finding[];
	ok: boolean;
}

const WORD = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
const SPEECH = /"[^"]*"|“[^”]*”/g;
const WIKILINK = /!?\[\[([^[\]\n]*)\]\]/g;
const MIN_RUN = 4;
const LIST_RUN = 3;

const normalise = (word: string): string => word.toLowerCase().replace(/['’]/g, "");
const STOP = new Set(stopword.eng.map(normalise));

/** Wikilinks reduced to what the reader sees (alias, else page name), and `^block` ids dropped. */
export function plainText(text: string): string {
	return text
		.replace(WIKILINK, (_, inner: string) => {
			const bar = inner.indexOf("|");
			if (bar !== -1) return inner.slice(bar + 1).trim();
			const target = inner.split("#")[0] ?? "";
			return (target.split("/").pop() ?? "").trim();
		})
		.replace(/[ \t]+\^[A-Za-z0-9-]+[ \t]*$/gm, "");
}

/** Words of `text`, each with the line it sits on (`firstLine` is the line of the text's first character). */
export function wordsWithLines(text: string, firstLine = 1): { word: string; line: number }[] {
	const out: { word: string; line: number }[] = [];
	let line = firstLine;
	let cursor = 0;
	for (const m of text.matchAll(WORD)) {
		const at = m.index ?? 0;
		for (let i = cursor; i < at; i++) if (text[i] === "\n") line++;
		cursor = at;
		out.push({ word: normalise(m[0]), line });
	}
	return out;
}

/** The text with each double-quoted span (straight or curly quotes) cut out, and the spans themselves. */
function splitSpeech(text: string): { outside: string[]; spoken: string[] } {
	const spoken = [...text.matchAll(SPEECH)].map((m) => m[0]);
	return { outside: text.split(SPEECH), spoken };
}

const PLACEHOLDER = "SPOKENLINE";

/** Narration sentences: the callout's sentences with spoken lines cut out; a sentence with nothing left is not one. */
function narrationSentences(text: string): string[] {
	const masked = text.replace(SPEECH, ` ${PLACEHOLDER} `).replace(/\s+/g, " ").trim();
	const sentences = segment("en", masked).map((s) => s.replaceAll(PLACEHOLDER, " ").replace(/\s+/g, " ").trim());
	return sentences.filter((s) => /[\p{L}\p{N}]/u.test(s));
}

const PREPOSITIONS = new Set(
	`in on at by under over behind beyond inside outside across along through beside above below beneath near past toward towards into onto from within around between against among atop before after upon without`.split(" "),
);
const ADVERBS_BEFORE_PREPOSITION = new Set(["back", "further", "farther", "out", "up", "down", "off", "just", "right"]);
const DETERMINERS = new Set(
	`the a an this that these those his her their its our my your some each every one two three four five six seven eight nine ten many several both another`.split(" "),
);

/** The "list" openers: You…, a preposition and its place, or a bare noun phrase. */
function listOpener(first: string[]): boolean {
	const w1 = (first[0] ?? "").toLowerCase();
	const w2 = (first[1] ?? "").toLowerCase();
	if (w1 === "you" || w1 === "your") return true;
	if (PREPOSITIONS.has(w1)) return true;
	if (ADVERBS_BEFORE_PREPOSITION.has(w1) && PREPOSITIONS.has(w2)) return true;
	return DETERMINERS.has(w1) || /^\d/.test(w1);
}

const JUDGEMENT =
	/\b(?:abandoned|ancient|mysterious|ominous|eerie|strange|bustling|dangerous|angry|afraid|sense of|can['’]t help but)\b/gi;
const MECHANICAL_TERMS = /\b(?:stunned|frightened|reaction|action|incapacitated)\b/gi;
const PERCEPTION_HEDGES = /\b(?:seems? to be|appears? to be)\b/gi;
const EVALUATIVE_ADJECTIVES = new Set(
	`abandoned ancient beautiful bleak bustling dangerous dreadful eerie elegant enormous extraordinary fierce grim horrible impressive lovely magnificent mysterious ominous perfect remarkable strange terrible tiny ugly vast wonderful`.split(
		" ",
	),
);
const PROPER_NAME_MAX = 3;
const PUN_NAME_FIRST = new Set(`Amanda Anita Barry Carrie Dewey Dustin Eileen Ella Justin Paige Sue`.split(" "));
const HOMOPHONE_GROUPS = [
	["allowed", "aloud"],
	["bare", "bear"],
	["break", "brake"],
	["dear", "deer"],
	["fair", "fare"],
	["flower", "flour"],
	["grate", "great"],
	["hole", "whole"],
	["knight", "night"],
	["knot", "not"],
	["pair", "pare", "pear"],
	["peace", "piece"],
	["right", "rite", "write"],
	["ring", "wring"],
	["road", "rode"],
	["sale", "sail"],
	["seam", "seem"],
	["sight", "site"],
	["sole", "soul"],
	["steel", "steal"],
	["their", "there", "they're"],
	["to", "too", "two"],
	["weak", "week"],
	["wear", "where"],
	["whose", "who's"],
];

const COMMON_SENTENCE_STARTS = new Set(`A An And But Cold Creature DM Each He In It Item Long NPC Once Party Players Scene Session She Some The They This You World`.split(" "));
function evaluativeStacks(text: string): string[] {
	const result = new Set<string>();
	for (const sentence of narrationSentences(text)) {
		const tokens = (sentence.match(WORD) ?? []).map((word) => word.toLowerCase());
		for (let i = 0; i < tokens.length - 2; i++) {
			if (!EVALUATIVE_ADJECTIVES.has(tokens[i] ?? "")) continue;
			let j = i + 1;
			while (j < tokens.length && (tokens[j] === "and" || EVALUATIVE_ADJECTIVES.has(tokens[j] ?? ""))) j++;
			if (tokens.slice(i, j).filter((word) => EVALUATIVE_ADJECTIVES.has(word)).length >= 2 && tokens[j]) {
				result.add(tokens.slice(i, j + 1).join(" "));
			}
		}
	}
	return [...result];
}

function relativeChains(text: string): string[] {
	return narrationSentences(text).filter((sentence) => count(sentence, /\b(?:which|that)\b/gi) >= 2);
}

function properNouns(text: string): string[] {
	const result = new Set<string>();
	for (const match of text.matchAll(/\b[A-Z][\p{L}'’-]*(?:[- ][A-Z][\p{L}'’-]*)*/gu)) {
		const at = match.index ?? 0;
		const previous = text.slice(0, at).trimEnd().at(-1);
		const value = match[0].trim();
		if ((previous === "." || previous === "!" || previous === "?" || previous === undefined) && COMMON_SENTENCE_STARTS.has(value)) continue;
		if (value.length > 1) result.add(value);
	}
	return [...result];
}

function spokenTraps(text: string): { type: "tongue-twister" | "alliteration" | "pun-name" | "homophone"; text: string }[] {
	const traps: { type: "tongue-twister" | "alliteration" | "pun-name" | "homophone"; text: string }[] = [];
	const words = [...text.matchAll(/\b[\p{L}][\p{L}'’-]*\b/gu)].map((match) => match[0]);
	for (let i = 0; i + 2 < words.length; i++) {
		const window = words.slice(i, i + 3);
		const initials = window.map((word) => word[0]?.toLowerCase());
		if (initials.every((initial) => initial === initials[0])) {
			const type = i + 3 < words.length && words[i + 3]?.[0]?.toLowerCase() === initials[0] ? "tongue-twister" : "alliteration";
			traps.push({ type, text: window.join(" ") });
		}
	}
	for (const match of text.matchAll(/\b([A-Z][\p{L}'’-]*)\s+([A-Z][\p{L}'’-]*)\b/gu)) {
		if (PUN_NAME_FIRST.has(match[1]!)) traps.push({ type: "pun-name", text: match[0] });
	}
	const lower = text.toLowerCase();
	for (const group of HOMOPHONE_GROUPS) {
		const found = group.filter((word) => new RegExp(`\\b${word.replace("'", "['’]")}\\b`, "i").test(lower));
		if (found.length > 1) traps.push({ type: "homophone", text: found.join(" / ") });
	}
	return traps;
}

function findDialogueAttributions(text: string): string[] {
	return [...text.matchAll(/[”"][, ]+\s*(?:he|she|they|it|[A-Z][\p{L}'’-]*)\s+(?:says?|said|asks?|asked|replies?|replied|mutters?|muttered|shouts?|shouted|whispers?|whispered)\b/gu)].map(
		(match) => match[0].trim(),
	);
}

/** Runs of `MIN_RUN`+ words `words` share with `source`, as `[start in words, length, start in source]`. */
function sharedRuns(words: string[], source: SourceWords): [number, number, number][] {
	const index = new Map<string, number[]>();
	for (let j = 0; j + MIN_RUN <= source.words.length; j++) {
		const key = source.words.slice(j, j + MIN_RUN).map((w) => w.word).join(" ");
		const at = index.get(key);
		if (at) at.push(j);
		else index.set(key, [j]);
	}
	const runs: [number, number, number][] = [];
	for (let i = 0; i + MIN_RUN <= words.length; i++) {
		for (const j of index.get(words.slice(i, i + MIN_RUN).join(" ")) ?? []) {
			// Only a maximal run's first word starts a report.
			if (i > 0 && j > 0 && words[i - 1] === source.words[j - 1]?.word) continue;
			let length = MIN_RUN;
			while (i + length < words.length && j + length < source.words.length && words[i + length] === source.words[j + length]?.word) length++;
			runs.push([i, length, j]);
		}
	}
	return runs;
}

function findEcho(outside: string[], sources: SourceWords[]): EchoRun[] {
	const byText = new Map<string, EchoRun>();
	for (const segmentText of outside) {
		const words = wordsWithLines(segmentText).map((w) => w.word);
		for (const source of sources) {
			for (const [i, length, j] of sharedRuns(words, source)) {
				const run = words.slice(i, i + length);
				if (run.every((w) => STOP.has(w))) continue;
				const text = run.join(" ");
				const entry = byText.get(text) ?? { text, occurrences: [] };
				entry.occurrences.push({ source: source.label, line: source.words[j]?.line ?? 0 });
				byText.set(text, entry);
			}
		}
	}
	return [...byText.values()];
}

const matches = (text: string, pattern: RegExp): string[] => [...text.matchAll(pattern)].map((m) => m[0]);
const count = (text: string, pattern: RegExp): number => matches(text, pattern).length;
const plural = (n: number, one: string, many = `${one}s`): string => `${n} ${n === 1 ? one : many}`;

export interface AnalyzeInput {
	/** The callout body, `>` markers already stripped. */
	body: string;
	sources: SourceWords[];
	band?: Band;
}

export function analyzeCallout({ body, sources, band }: AnalyzeInput): CalloutReport {
	const text = plainText(body);
	const words = (text.match(WORD) ?? []).length;
	const { outside, spoken } = splitSpeech(text);
	const sentences = narrationSentences(text);
	const unspoken = outside.join(" ");
	const evaluativeAdjectiveStacks = evaluativeStacks(unspoken);
	const relativeClauseChains = relativeChains(unspoken);
	const inventedProperNouns = properNouns(outside.join(" "));
	const spokenWordTraps = spokenTraps(text);
	const dialogueAttributions = findDialogueAttributions(text);

	const echo = findEcho(outside, sources);
	const punctuation = {
		emDashes: count(text, /—| -- /g),
		semicolons: count(text, /;/g),
		colons: count(text, /:/g),
	};
	const { compass: compassPattern, footMile } = valePatterns();
	const compass = matches(text, compassPattern);
	const footMileCounts = matches(text, footMile);

	const starts = sentences.map((s) => (s.match(WORD) ?? []).slice(0, 2));
	const runs: { from: number; to: number; starts: string[] }[] = [];
	for (let i = 0; i < starts.length; ) {
		if (!listOpener(starts[i] ?? [])) {
			i++;
			continue;
		}
		let end = i;
		while (end + 1 < starts.length && listOpener(starts[end + 1] ?? [])) end++;
		if (end - i + 1 >= LIST_RUN) runs.push({ from: i + 1, to: end + 1, starts: starts.slice(i, end + 1).map((s) => s.join(" ")) });
		i = end + 1;
	}
	const judgementWords = matches(unspoken, JUDGEMENT).map((w) => w.toLowerCase().replace("’", "'"));
	const mechanicalTerms = matches(unspoken, MECHANICAL_TERMS).map((w) => w.toLowerCase());
	const perceptionHedges = matches(unspoken, PERCEPTION_HEDGES).map((w) => w.toLowerCase());

	const bandResult = band ? { ...band, pass: words >= band.min && words <= band.max } : null;
	const findings: Finding[] = [];
	if (bandResult && !bandResult.pass) {
		const gap = words < band!.min ? `${band!.min - words} under` : `${words - band!.max} over`;
		findings.push({
			rule: "band",
			severity: "error",
			message: `${plural(words, "word")} is ${gap} the ${band!.min}-${band!.max} band.`,
			hint: words < band!.min ? "Add a thing the Players could picture or act on, drawn from the pages." : "Move the least useful things to the DM's side of the page.",
		});
	}
	if (echo.length > 0) {
		findings.push({
			rule: "echo",
			severity: "error",
			message: `${plural(echo.length, "run")} of ${MIN_RUN} or more words shared with a source: ${echo.map((e) => `"${e.text}"`).join(", ")}.`,
			hint: "Keep the fact, change the phrasing: a new name that adds a detail, and the source's nouns in a new order.",
		});
	}
	if (punctuation.emDashes + punctuation.semicolons + punctuation.colons > 0) {
		findings.push({
			rule: "punctuation",
			severity: "error",
			message: `Narration takes no em dash, semicolon or colon (found ${punctuation.emDashes} em dash, ${punctuation.semicolons} semicolon, ${punctuation.colons} colon).`,
			hint: "Join clauses with a comma, 'and' or a full stop.",
		});
	}
	if (compass.length > 0) {
		findings.push({
			rule: "compass",
			severity: "error",
			message: `Narration takes no compass direction: ${compass.map((c) => `"${c}"`).join(", ")}.`,
			hint: "Use the body's directions instead: ahead, behind, uphill, left, within reach.",
		});
	}
	if (footMileCounts.length > 0) {
		findings.push({
			rule: "foot-mile-counts",
			severity: "error",
			message: `Narration gives no foot or mile count: ${footMileCounts.map((c) => `"${c}"`).join(", ")}.`,
			hint: "Say it in the body's terms: within reach, a bowshot, a long walk.",
		});
	}
	for (const run of runs) {
		findings.push({
			rule: "fresh-starts",
			severity: "warning",
			message: `Sentences ${run.from} to ${run.to} open like a list: ${run.starts.map((s) => `"${s}"`).join(", ")}.`,
			hint: "Join two of them by cause or motion, or open one on what happens.",
		});
	}
	if (judgementWords.length > 0) {
		findings.push({
			rule: "judgement-words",
			severity: "warning",
			message: `Judgement words: ${judgementWords.map((w) => `"${w}"`).join(", ")}.`,
			hint: "Give the evidence that led to the conclusion instead of the conclusion.",
		});
	}
	if (mechanicalTerms.length > 0) {
		findings.push({
			rule: "mechanical-terms",
			severity: "warning",
			message: `Mechanical terms may imply rules effects: ${mechanicalTerms.map((term) => `"${term}"`).join(", ")}.`,
			hint: "Use the rules term only for its rules meaning. Otherwise describe what the characters perceive.",
		});
	}
	if (perceptionHedges.length > 0) {
		findings.push({
			rule: "perception-hedges",
			severity: "warning",
			message: `Perception hedges: ${perceptionHedges.map((hedge) => `"${hedge}"`).join(", ")}.`,
			hint: "State what reaches the characters directly and reserve uncertainty for a Perception or Investigation result.",
		});
	}
	if (evaluativeAdjectiveStacks.length > 0) {
		findings.push({
			rule: "evaluative-adjectives",
			severity: "warning",
			message: `Evaluative adjectives stack before a noun: ${evaluativeAdjectiveStacks.map((stack) => `"${stack}"`).join(", ")}.`,
			hint: "Keep one evaluative adjective and use specific nouns or physical evidence for the rest.",
		});
	}
	if (relativeClauseChains.length > 0) {
		findings.push({
			rule: "relative-clauses",
			severity: "warning",
			message: `A sentence chains two or more which/that clauses: ${relativeClauseChains.map((sentence) => `"${sentence}"`).join(", ")}.`,
			hint: "Make the second fact a direct sentence with a precise verb.",
		});
	}
	if (inventedProperNouns.length > PROPER_NAME_MAX) {
		findings.push({
			rule: "invented-names",
			severity: "warning",
			message: `The block introduces ${inventedProperNouns.length} proper-name candidates, over the ${PROPER_NAME_MAX}-name limit: ${inventedProperNouns.join(", ")}.`,
			hint: "Keep only names the Players need now. Put the rest in the DM-side notes.",
		});
	}
	if (spokenWordTraps.length > 0) {
		findings.push({
			rule: "spoken-word-traps",
			severity: "warning",
			message: `Spoken-word traps: ${spokenWordTraps.map((trap) => `${trap.type} "${trap.text}"`).join(", ")}.`,
			hint: "Read the block once at the table and replace tongue-twisters, accidental alliteration, pun names and ambiguous homophones.",
		});
	}
	if (dialogueAttributions.length > 0) {
		findings.push({
			rule: "dialogue-attribution",
			severity: "warning",
			message: `Speech is followed by a mid-block attribution: ${dialogueAttributions.map((tag) => `"${tag}"`).join(", ")}.`,
			hint: "Lead in with the speaker, then give the complete line without a mid-block speech tag.",
		});
	}

	return {
		words,
		sentences: { narration: sentences.length, spoken: spoken.length },
		band: bandResult,
		echo,
		punctuation,
		compass,
		footMileCounts,
		freshStarts: { starts: starts.map((s) => s.join(" ")), runs },
		judgementWords,
		mechanicalTerms,
		perceptionHedges,
		evaluativeAdjectiveStacks,
		relativeClauseChains,
		inventedProperNouns,
		spokenWordTraps,
		dialogueAttributions,
		findings,
		ok: findings.every((f) => f.severity !== "error"),
	};
}
