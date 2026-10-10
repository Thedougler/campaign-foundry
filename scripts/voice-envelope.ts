// Builds the GM voice envelope (src/narration/envelope.json) that the narration gate measures [!narration]
// rhythm against, plus the local example library agents read (reference/gm-voice/passages.md). The corpus is
// human-written actual-play GM text: speaker-labelled Critical Role transcripts on criticalrole.fandom.com,
// restricted to the two studied GMs (ADR 0029): Brennan Lee Mulligan and Matt Mercer.
// Everything under reference/ stays local and is never committed.
//
//   node scripts/voice-envelope.ts [--transcripts <n>]   (default 80; cap per GM on titles tried)
//
// Floors: at least 180 passages (90 per GM) from both studied GM labels (BRENNAN, MATT), else exit 1.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { segment } from "sentencex";
import { sentenceShape } from "../src/narration/analyze.ts";

const API = "https://criticalrole.fandom.com/api.php";
const HEADERS = { "User-Agent": "campaign-foundry-voice-envelope/1 (home project)" };
const SEED = 20261008;
const SOURCE = "criticalrole.fandom.com Category:Transcripts";
/** Talk shows and extras, not play. */
const TALK_SHOW = /Tale Gate|Talks|Wrap[- ]?Up|Twitter|4-Sided|Q&A|Chat|Panel|Interview|Reaction|Post-finale|Announcement/i;
/** Only these GMs are studied (ADR 0029); transcripts led by anyone else are skipped. */
const GMS: Record<string, true> = { MATT: true, BRENNAN: true };
/** The two studied episodes; always sampled first, one exemplar per studied GM. */
const EXEMPLARS = [/^To the Hounds!/, /^The Stowaway/];
const TITLES_PER_GM = 80;
const PASSAGES_PER_GM = 90;
const PASSAGE_FLOOR = 180;
const GM_FLOOR = 2;
const TRANSCRIPTS_PER_GM_SHARE = 0.35;
const PASSAGE_MIN_WORDS = 60;
const PASSAGE_MIN_SENTENCES = 4;
const PASSAGES_PER_TRANSCRIPT = 15;
const WORD = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const rawDir = join(repoRoot, "reference", "gm-voice", "raw");
const envelopePath = join(repoRoot, "src", "narration", "envelope.json");

interface Passage {
  gm: string;
  title: string;
  text: string;
  meanWords: number;
  spread: number;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: readonly T[], rng: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const at = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(at);
  const hi = Math.ceil(at);
  return sorted[lo]! + (sorted[hi]! - sorted[lo]!) * (at - lo);
}

const round2 = (n: number): number => Math.round(n * 100) / 100;

const sleep = (ms: number): Promise<void> => {
  const { promise, resolve } = Promise.withResolvers<void>();
  setTimeout(resolve, ms);
  return promise;
};

/** Titles in Category:Transcripts, following cmcontinue. Throws with the HTTP status when the API blocks us. */
async function listTranscripts(): Promise<string[]> {
  const titles: string[] = [];
  let cmcontinue = "";
  do {
    const url = new URL(API);
    url.searchParams.set("action", "query");
    url.searchParams.set("list", "categorymembers");
    url.searchParams.set("cmtitle", "Category:Transcripts");
    url.searchParams.set("cmlimit", "500");
    url.searchParams.set("format", "json");
    if (cmcontinue) url.searchParams.set("cmcontinue", cmcontinue);
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`category listing failed: HTTP ${res.status}`);
    const data = await res.json() as {
      query?: { categorymembers?: { title: string }[] };
      continue?: { cmcontinue?: string };
    };
    for (const member of data.query?.categorymembers ?? []) titles.push(member.title);
    cmcontinue = data.continue?.cmcontinue ?? "";
  } while (cmcontinue);
  return titles;
}

/** Raw wikitext of one transcript page, reusing the local cache; null and a reason on failure. */
async function fetchWikitext(title: string, cachePath: string): Promise<{ wikitext: string | null; reason?: string }> {
  try {
    return { wikitext: await readFile(cachePath, "utf8") };
  } catch {
    // Not cached: fetch below.
  }
  await sleep(1000);
  try {
    const url = new URL(API);
    url.searchParams.set("action", "parse");
    url.searchParams.set("page", title);
    url.searchParams.set("prop", "wikitext");
    url.searchParams.set("format", "json");
    url.searchParams.set("formatversion", "2");
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return { wikitext: null, reason: `HTTP ${res.status}` };
    const data = await res.json() as { parse?: { wikitext?: string }; error?: { info?: string } };
    const wikitext = data.parse?.wikitext;
    if (typeof wikitext !== "string") return { wikitext: null, reason: data.error?.info ?? "no parse wikitext" };
    await writeFile(cachePath, wikitext);
    return { wikitext };
  } catch (error) {
    return { wikitext: null, reason: error instanceof Error ? error.message : String(error) };
  }
}

const TURN = /^([A-Z][A-Z' .&-]+):\s*(.*)/;

function stripMarkup(text: string): string {
  let templates = text;
  for (let previous = ""; previous !== templates; ) {
    previous = templates;
    templates = templates.replace(/\{\{[^{}]*\}\}/g, " ");
  }
  return templates
    .replace(/\[\[([^\]|]*)\|([^\]]*)\]\]/g, "$2")
    .replace(/\[\[([^\]]*)\]\]/g, "$1")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Speaker turns of a transcript: `LABEL: text` opens a turn, following non-empty lines continue it. */
function turns(wikitext: string): { label: string; text: string }[] {
  const turns: { label: string; text: string }[] = [];
  let current: { label: string; lines: string[] } | null = null;
  for (const rawLine of wikitext.split("\n")) {
    const line = rawLine.replaceAll("'''", "").replaceAll("''", "");
    const match = line.match(TURN);
    if (match) {
      if (current) turns.push({ label: current.label, text: stripMarkup(current.lines.join(" ")) });
      current = { label: match[1]!.trim(), lines: [match[2]!] };
    } else if (line.trim() && current) {
      current.lines.push(line);
    }
  }
  if (current) turns.push({ label: current.label, text: stripMarkup(current.lines.join(" ")) });
  return turns.filter((turn) => turn.text);
}

/** Canonical studied-GM label for a transcript speaker label; null when the speaker is not studied. */
function canonicalGm(label: string): "MATT" | "BRENNAN" | null {
  const name = label.toUpperCase();
  if (name.includes("BRENNAN")) return "BRENNAN";
  if (name.includes("MATT")) return "MATT";
  return null;
}

const wordCount = (text: string): number => (text.match(WORD) ?? []).length;

const isSentence = (sentence: string): boolean => /[\p{L}\p{N}]/u.test(sentence);

async function main(): Promise<number> {
  let cap = TITLES_PER_GM;
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--transcripts") {
      const value = Number(argv[i + 1]);
      if (!Number.isInteger(value) || value <= 0) {
        console.error("usage: node scripts/voice-envelope.ts [--transcripts <n>]");
        return 2;
      }
      cap = value;
      i++;
    }
  }

  const allTitles = (await listTranscripts()).filter((title) => !TALK_SHOW.test(title));
  const exemplarTitles: string[] = [];
  for (const pattern of EXEMPLARS) {
    const found = allTitles.find((title) => pattern.test(title));
    if (found) exemplarTitles.push(found);
    else console.log(`exemplar transcript not found: ${pattern.source}`);
  }
  const rng = mulberry32(SEED);
  const titles = [...exemplarTitles, ...shuffle(allTitles.filter((title) => !exemplarTitles.includes(title)), rng)];

  await mkdir(rawDir, { recursive: true });
  const passages: Passage[] = [];
  const usedTitles: string[] = [];
  const gmPassages = new Map<string, number>();
  const titlesTried = new Map<string, number>();
  const passagesFor = (gm: string): number => gmPassages.get(gm) ?? 0;
  for (const title of titles) {
    if (Object.keys(GMS).every((gm) => passagesFor(gm) >= PASSAGES_PER_GM)) break;
    const cachePath = join(rawDir, `${title.replaceAll("/", "__")}.txt`);
    const { wikitext, reason } = await fetchWikitext(title, cachePath);
    if (wikitext === null) {
      console.log(`skip ${title}: ${reason}`);
      continue;
    }
    const speakerTurns = turns(wikitext);
    const wordsBySpeaker = new Map<string, number>();
    let totalWords = 0;
    for (const turn of speakerTurns) {
      const words = wordCount(turn.text);
      wordsBySpeaker.set(turn.label, (wordsBySpeaker.get(turn.label) ?? 0) + words);
      totalWords += words;
    }
    const [topSpeaker, gmWords] = [...wordsBySpeaker.entries()].sort((a, b) => b[1] - a[1])[0] ?? [null, 0];
    if (topSpeaker === null || totalWords === 0) {
      console.log(`skip ${title}: GM none not studied`);
      continue;
    }
    const gm = canonicalGm(topSpeaker);
    if (!gm || !GMS[gm]) {
      console.log(`skip ${title}: GM ${topSpeaker} not studied`);
      continue;
    }
    if (passagesFor(gm) >= PASSAGES_PER_GM) continue;
    const tried = titlesTried.get(gm) ?? 0;
    if (tried >= cap) continue;
    titlesTried.set(gm, tried + 1);
    if (gmWords / totalWords < TRANSCRIPTS_PER_GM_SHARE) {
      console.log(`skip ${title}: GM share ${Math.round((gmWords / (totalWords || 1)) * 100)}% < ${TRANSCRIPTS_PER_GM_SHARE * 100}%`);
      continue;
    }
    const candidates = speakerTurns
      .filter((turn) => turn.label === topSpeaker)
      .map((turn) => ({ text: turn.text, sentences: segment("en", turn.text).filter(isSentence) }))
      .filter((turn) => wordCount(turn.text) >= PASSAGE_MIN_WORDS && turn.sentences.length >= PASSAGE_MIN_SENTENCES)
      .map((turn) => ({ text: turn.text, sentences: turn.sentences, ...sentenceShape(turn.sentences) }));
    const chosen = shuffle(candidates, rng).slice(0, Math.min(PASSAGES_PER_TRANSCRIPT, PASSAGES_PER_GM - passagesFor(gm)));
    if (chosen.length === 0) {
      console.log(`skip ${title}: no GM turn with ${PASSAGE_MIN_WORDS}+ words and ${PASSAGE_MIN_SENTENCES}+ sentences`);
      continue;
    }
    usedTitles.push(title);
    gmPassages.set(gm, passagesFor(gm) + chosen.length);
    passages.push(...chosen.map((shape) => ({ gm, title, text: shape.text, meanWords: shape.meanWords, spread: shape.spread })));
  }

  const wordsPerGm = new Map<string, number>();
  for (const passage of passages) wordsPerGm.set(passage.gm, (wordsPerGm.get(passage.gm) ?? 0) + 1);
  const gms = [...wordsPerGm.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  const meanWordsSorted = passages.map((p) => p.meanWords).sort((a, b) => a - b);
  const spreadSorted = passages.map((p) => p.spread).sort((a, b) => a - b);
  const envelopeJson = {
    version: 1,
    built: new Date().toISOString().slice(0, 10),
    seed: SEED,
    source: SOURCE,
    transcripts: usedTitles,
    gms: Object.fromEntries(gms),
    passages: passages.length,
    meanWords: { p5: round2(percentile(meanWordsSorted, 5)), p95: round2(percentile(meanWordsSorted, 95)) },
    spread: { p5: round2(percentile(spreadSorted, 5)), p95: round2(percentile(spreadSorted, 95)) },
  };
  await writeFile(envelopePath, `${JSON.stringify(envelopeJson, null, "\t")}\n`);

  const outside = (passage: Passage): boolean =>
    passage.meanWords < envelopeJson.meanWords.p5 || passage.meanWords > envelopeJson.meanWords.p95 ||
    passage.spread < envelopeJson.spread.p5 || passage.spread > envelopeJson.spread.p95;

  const markdown: string[] = [];
  for (const [label] of gms) {
    markdown.push(`## ${label}`, "");
    let index = 0;
    for (const passage of passages.filter((p) => p.gm === label)) {
      index++;
      markdown.push(
        `### ${passage.title} · passage ${index}`,
        "",
        passage.text,
        "",
        `mean ${round2(passage.meanWords)} words · spread ${round2(passage.spread)}${outside(passage) ? " · outlier" : ""}`,
        "",
      );
    }
  }
  await writeFile(join(rawDir, "..", "passages.md"), `${markdown.join("\n").trimEnd()}\n`);
  await writeFile(
    join(rawDir, "..", "passages.jsonl"),
    `${passages.map((p) => JSON.stringify({ gm: p.gm, title: p.title, text: p.text, meanWords: p.meanWords, spread: p.spread })).join("\n")}\n`,
  );

  console.log(
    `voice envelope: ${usedTitles.length} transcripts, ${passages.length} passages — ${gms.map(([label, n]) => `${label}: ${n}`).join(", ")}`,
  );
  if (passages.length < PASSAGE_FLOOR || gms.length < GM_FLOOR) {
    console.log(`voice envelope: ${passages.length} passages from ${gms.length} GMs; need ≥${PASSAGE_FLOOR} passages and ≥${GM_FLOOR} GMs`);
    return 1;
  }
  return 0;
}

process.exitCode = await main();
