import { randomInt } from "node:crypto";
import { UsageError } from "../check/errors.ts";

/**
 * Animal names for sample aliases (CONTEXT.md § Alias): one word each, so a sample's file name and
 * heading carry no family, model or quality hint. Enough for a full Matrix run and its amendments.
 */
const ANIMALS = [
	"adder",
	"albatross",
	"alligator",
	"anteater",
	"armadillo",
	"avocet",
	"badger",
	"barracuda",
	"bison",
	"bluejay",
	"bobcat",
	"bongo",
	"bustard",
	"capercaillie",
	"caracal",
	"cassowary",
	"chamois",
	"cheetah",
	"chinchilla",
	"cormorant",
	"cougar",
	"coyote",
	"crane",
	"curlew",
	"dhole",
	"dingo",
	"dunlin",
	"eagle",
	"echidna",
	"ermine",
	"falcon",
	"ferret",
	"flamingo",
	"fox",
	"gazelle",
	"gecko",
	"genet",
	"gerbil",
	"gibbon",
	"goshawk",
	"griffon",
	"grouse",
	"guanaco",
	"heron",
	"honeybadger",
	"houbara",
	"ibex",
	"ibis",
	"impala",
	"jackal",
	"jaguar",
	"junglefowl",
	"kestrel",
	"kingfisher",
	"kinkajou",
	"kudu",
	"lammergeier",
	"lemur",
	"leopard",
	"lion",
	"lynx",
	"magpie",
	"margay",
	"marten",
	"meerkat",
	"mongoose",
	"monkey",
	"moose",
	"narwhal",
	"ocelot",
	"octopus",
	"okapi",
	"opossum",
	"oryx",
	"osprey",
	"otter",
	"ovenbird",
	"pangolin",
	"panther",
	"partridge",
	"pintail",
	"plover",
	"puma",
	"quagga",
	"quokka",
	"ratel",
	"raven",
	"redpoll",
	"reindeer",
	"rhea",
	"saker",
	"serval",
	"shrike",
	"sifaka",
	"solitaire",
	"springbok",
	"stoat",
	"sunbittern",
	"tapir",
	"tarsier",
	"toucan",
	"urial",
	"vicuna",
	"vulture",
	"wallaby",
	"walrus",
	"wolverine",
	"wombat",
	"yak",
	"zoril",
];

/** Fresh, distinct animal aliases — one per sample, drawn anew on every `bench alias`, carried samples included. */
export function drawAliases(count: number): string[] {
	if (count > ANIMALS.length)
		throw new UsageError(
			`Cannot alias ${count} samples: the animal list holds ${ANIMALS.length}.`,
			"A run draws at most the four Matrix families per entry; split the entry if that changes.",
		);
	const pool = [...ANIMALS];
	const aliases: string[] = [];
	for (let drawn = 0; drawn < count; drawn++) aliases.push(pool.splice(randomInt(pool.length), 1)[0]!);
	return aliases;
}

/** Fisher–Yates with crypto randomness: each grader reads the samples in its own order. */
export function shuffled<T>(items: T[]): T[] {
	const out = [...items];
	for (let i = out.length - 1; i > 0; i--) {
		const j = randomInt(i + 1);
		[out[i], out[j]] = [out[j]!, out[i]!];
	}
	return out;
}

/** One anonymised sample file: the Runner's page verbatim, then its Sources list — no family, no model. */
export function renderSample(page: string, sources: string[]): string {
	const list = sources.map((source) => `- ${source}`).join("\n");
	return `${page.trimEnd()}\n\n## Sources\n\n${list}\n`;
}

/** One grader's council brief: the prompt, the rubric, then every sample in this grader's own random order. */
export function renderBrief(prompt: string, rubric: string, samples: { alias: string; content: string }[]): string {
	const body = samples.map(({ alias, content }) => `## Sample ${alias}\n\n${content.trimEnd()}\n`).join("\n");
	return `# Council brief\n\n## Benchmark prompt\n\n${prompt.trimEnd()}\n\n## Rubric\n\n${rubric.trimEnd()}\n\n## Samples\n\n${body}`;
}
