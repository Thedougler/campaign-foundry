// Runs after `vale sync` (package.json `setup`): applies DM-confirmed exceptions and token narrowings to the
// downloaded ai-tells package, which is not committed. Idempotent. Each entry was confirmed by the DM as a
// misfire on literal campaign meaning.
import { readFileSync, writeFileSync } from "node:fs";

const patches: { file: string; exception: string }[] = [
  // The DM is a person: "the DM asks for", "the DM decides".
  { file: ".vale/styles/ai-tells/AnthropomorphicCognition.yml", exception: String.raw`  - "(?i)\\bDMs?\\b"` },
  // "them" is the person pronoun the teaching span keeps ("the sages teach them"): the DM-confirmed misfire,
  // where grung sages teach their people in the world. "him" and "her" are already excepted; "them" was not.
  { file: ".vale/styles/ai-tells/AnthropomorphicCognition.yml", exception: String.raw`  - "(?i)\\bthem\\b"` },
  // The Party, the Players' characters, are people: "the Party answers with cover".
  { file: ".vale/styles/ai-tells/AnthropomorphicCognition.yml", exception: String.raw`  - "(?i)\\bpart(?:y|ies)\\b"` },
  // A Player is a person: "a Player asks what is above" (DM-confirmed 2026-10). Upstream excepts "users" and
  // "readers" but not "players"; the span keeps the subject ("A Player asks what"), so excepting the word works.
  { file: ".vale/styles/ai-tells/AnthropomorphicCognition.yml", exception: String.raw`  - "(?i)\\bplayers?\\b"` },
];

// A replacement narrows a token the DM confirmed misfiring on a literal campaign meaning; the figurative
// reading the rule exists for keeps firing. `old` is the exact upstream text and `replacement` the narrowed
// text: a no-op once `replacement` is present, an error when neither is, so an upstream reword surfaces here
// instead of silently dropping the narrowing.
const replacements: { file: string; old: string; replacement: string }[] = [
  // BareReaches, the object-fronted token: the D&D attack-range noun ("beyond its fifteen-foot tendril reach").
  // The modifier slot refusing a measurement compound ("fifteen-foot", number words) is the range-noun reading;
  // the arrival metaphors the rule comments name ("the items a query reaches") carry no measurement modifier.
  {
    file: ".vale/styles/ai-tells/BareReaches.yml",
    old: String.raw`(?:[a-z'-]+ )?(?!(?:is|are|was|were|be|been|being|get|gets|got|getting)\\b)[a-z]+ (?:never `,
    replacement: String.raw`(?!(?:[a-z'-]+-)?(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred)[a-z'-]* )(?:[a-z'-]+ )?(?!(?:is|are|was|were|be|been|being|get|gets|got|getting)\\b)[a-z]+ (?:never `,
  },
  // BareHolds, the determiner-gated token: the nautical idiom "hold(s/ing)/held course" ("the pilot holds
  // course along the shallows", "holds its course"). The object head refusing "course" keeps every other
  // figurative hold ("the table holds every stage's tables") and only drops the course-steering sense.
  {
    file: ".vale/styles/ai-tells/BareHolds.yml",
    old: String.raw`nothing|exactly|at least|at most|more|fewer|less|up to) (?:[a-z'-]+ )?[a-z]+\\b`,
    replacement: String.raw`nothing|exactly|at least|at most|more|fewer|less|up to) (?!(?:[a-z'-]+ )?course\\b)(?:[a-z'-]+ )?[a-z]+\\b`,
  },
  // FigurativePays, the count-as-invoice "at <number> ... hits" token: the D&D readout "at 0 Hit Points" /
  // "at 3 hit points" reads "hit" as the invoice noun. Refusing a following "points" keeps the counted corpus
  // hits ("at zero corpus hits") flagged and only drops the hit-point readout.
  {
    file: ".vale/styles/ai-tells/FigurativePays.yml",
    old: String.raw`(?:corpus )?hits?\b(?! (?:per|a|an|each|every)\b)`,
    replacement: String.raw`(?:corpus )?hits?\b(?! (?:per|a|an|each|every|points?)\b)`,
  },
  // MortalityMetaphors, the survival tokens: people surviving hazards ("The Party must survive the unfinished
  // ambush", "Survive the grassland hunt"). The subject token refuses a modal in the head slot (where
  // "Party must survive" hid the people), and the bare-form token refuses the imperative or plural "survive"
  // before a determined object, so only the third-person singular and past forms that carry the figure
  // ("survives the rebase untouched", "survive too") stay covered.
  {
    file: ".vale/styles/ai-tells/MortalityMetaphors.yml",
    old: String.raw` (?:[a-z'-]+ )?[a-z]+ (?:that |which |then |never |still |also |just |simply )?(?:survives?|survived|surviving)\\b(?! (?:all|every)\\b)`,
    replacement: String.raw` (?:[a-z'-]+ )?(?!(?:must|should|will|would|can|could|may|might|cannot|can't)\\b)[a-z]+ (?:that |which |then |never |still |also |just |simply )?(?:survives?|survived|surviving)\\b(?! (?:all|every)\\b)`,
  },
  {
    file: ".vale/styles/ai-tells/MortalityMetaphors.yml",
    old: String.raw`\\b(?:survives?|survived|surviving) (?:a|an|the|this|that|these|those|each|its|their|both|any|unchanged|intact|untouched|as|into|too|to|as-is)\\b`,
    replacement: String.raw`\\b(?:(?:survives|survived|surviving)|survive (?! (?:a|an|the|this|that|these|those|each|its|their|both|any)\\b)) (?:a|an|the|this|that|these|those|each|its|their|both|any|unchanged|intact|untouched|as|into|too|to|as-is)\\b`,
  },
  // AnthropomorphicCognition, the wanting token: people wanting ("Matteo knows the woman in the woods and
  // wants the ship", "what the Crown wanted to learn"). The head slot refusing a conjunction stops the match
  // that walks across a coordination ("the woods and wants"), and refusing a following "to" drops the human
  // desiderative ("wanted to learn") while keeping the artifact figure ("the spec wants us to retry").
  {
    file: ".vale/styles/ai-tells/AnthropomorphicCognition.yml",
    old: String.raw`(?<!ing )\\b(?:a|an|the|this|that|these|those|each|every|its|their) (?:[a-z]+ )?[a-z]+ (?:really |only |always |never |still |also |just |often |actually )?want(?:s|ed)?\\b`,
    replacement: String.raw`(?<!ing )\\b(?:a|an|the|this|that|these|those|each|every|its|their) (?:[a-z]+ )?(?!(?:and|or|but|nor|yet|so)\\b)[a-z]+ (?:really |only |always |never |still |also |just |often |actually )?want(?:s|ed)?\\b(?! to\\b)`,
  },
  // AnthropomorphicCognition, the teaching tokens: a person teaching people ("Renzo taught the camp how to
  // survive"). The skill-teaching "how" complement leaves both frames — the ditransitive lookahead no longer
  // accepts it and the tool-pupil token refuses a pupil followed by "how", with the articles forced into the
  // determiner slot so the pupil cannot dodge the guard — while the figure the rule exists for ("teach the
  // compiler that", "teaches the reviewer a contract") keeps firing.
  {
    file: ".vale/styles/ai-tells/AnthropomorphicCognition.yml",
    old: String.raw`(?= (?:the|a|an|its|this|that|every|each) (?:[a-z]+ )?[a-z]+ (?:a|an|the|its|this|that|which|what|how|to|about|nothing|something|everything|one)\\b)`,
    replacement: String.raw`(?= (?:the|a|an|its|this|that|every|each) (?:[a-z]+ )?(?!how\\b)[a-z]+ (?:a|an|the|its|this|that|which|what|to|about|nothing|something|everything|one)\\b)`,
  },
  {
    file: ".vale/styles/ai-tells/AnthropomorphicCognition.yml",
    old: String.raw`\\bt(?:each(?:es|ing)?|aught) (?:the |a |an |its |this |that |every |each )?(?!in |at |by |about |over |during |through |for |with |from )[a-z][a-z-]*`,
    replacement: String.raw`\\bt(?:each(?:es|ing)?|aught) (?:the |a |an |its |this |that |every |each )?(?!in |at |by |about |over |during |through |for |with |from |the |a |an |its |this |that |every |each )[a-z][a-z-]*\\b(?! how\\b)`,
  },
  // AnthropomorphicCognition, the honesty tokens: people telling the truth ("Jean-Claude told the truth").
  // Requiring the "about" complement keeps the candor figure the rule comments name ("the refusal text was
  // telling the truth about what the task wanted"); the pronoun subjects outside the span cannot reach the
  // exceptions, so the token itself carries the narrowing.
  {
    file: ".vale/styles/ai-tells/AnthropomorphicCognition.yml",
    old: String.raw`\\btell(?:s|ing)? the truth\\b`,
    replacement: String.raw`\\btell(?:s|ing)? the truth(?= about\\b)`,
  },
  {
    file: ".vale/styles/ai-tells/AnthropomorphicCognition.yml",
    old: String.raw`\\btold the truth\\b`,
    replacement: String.raw`\\btold the truth(?= about\\b)`,
  },
  // CataphoricForecasting, the broad sentence-initial cardinal token: in-world narrative counts ("Three
  // otters the length of longboats roll", "Four strangers are together aboard the Saltwright", "Two Talons
  // claim the same order"). The third word must now be a forward-pointing verb, the tell Pattern B already
  // relies on, so the listicle leads keep firing ("Eight repos seed the list", "Two options exist") and the
  // colon lead-in keeps its own token ("Three reasons this matters:").
  {
    file: ".vale/styles/ai-tells/CataphoricForecasting.yml",
    old: String.raw`  - "\\b(?:Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve) (?!(?i:of|or|to|and|in|out|more|percent|dozen|hundred|thousand|million|billion|seconds?|minutes?|hours?|days?|weeks?|months?|quarters?|years?|decades?|times)\\b)[A-Za-z][a-z]+ [A-Za-z][a-z]+"`,
    replacement: String.raw`  - "\\b(?:Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve) (?!(?i:of|or|to|and|in|out|more|percent|dozen|hundred|thousand|million|billion|seconds?|minutes?|hours?|days?|weeks?|months?|quarters?|years?|decades?|times)\\b)[A-Za-z][a-z]+ (?:(?:define|shape|drive|guide|underpin|govern|anchor|frame|characterize|distinguish|separate|comprise|structure|determine|dominate|inform|explain|power|fuel|motivate|unite)s?|seed|exist)\\b"`,
  },
  // FigurativeEarns, the bare verb token: XP is an awarded game currency, not a wage figure ("Each PC earned
  // 1,620 XP"). Refusing a following amount-and-XP keeps every figurative earning ("the rule earns its keep")
  // flagged.
  {
    file: ".vale/styles/ai-tells/FigurativeEarns.yml",
    old: String.raw`  - earn(?:s|ed|ing)?`,
    replacement: String.raw`  - earn(?:s|ed|ing)?\b(?! (?:[0-9][0-9,.]* )?XP\b)`,
  },
  // FigurativeWorth, the bare value-verdict token: literal appraisal of a person's price ("what a man is
  // worth" as a marriage-provision price). The lookbehind refusing a person subject with a copula leaves the
  // graded-abstraction figure untouched ("the migration is worth the effort", "worth knowing about").
  {
    file: ".vale/styles/ai-tells/FigurativeWorth.yml",
    old: String.raw`(?<!net )(?<!-)\\bworth\\b(?! of\\b)`,
    replacement: String.raw`(?<!net )(?<!-)(?<!\\b(?:man|men|woman|women|person|people|players?|PCs?) (?:is|was|are|were) )\\bworth\\b(?! of\\b)`,
  },
];

for (const { file, exception } of patches) {
  const text = readFileSync(file, "utf8");
  if (text.includes(exception)) continue;
  if (!/^exceptions:\n/m.test(text)) throw new Error(`${file}: no exceptions list to patch`);
  writeFileSync(file, text.replace(/^exceptions:\n/m, `exceptions:\n${exception}\n`));
}

for (const { file, old, replacement } of replacements) {
  const text = readFileSync(file, "utf8");
  if (text.includes(replacement)) continue;
  if (!text.includes(old)) throw new Error(`${file}: neither the upstream token nor its narrowing is present`);
  writeFileSync(file, text.replace(old, replacement));
}
