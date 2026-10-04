# Prose fixes

Read by whoever fixes lint's `narration`, `style` and `boilerplate` findings: the lint run itself, or a subagent given a page batch. The page check is the **checker**: it runs in about two seconds and names every rule a draft trips, with each echo's source and line, so draft, check at once and fix what it reports. A callout written fresh for a new stub page is judged the same way, pairing against the Canon facts it is drawn from.

Each rewrite is judged as a **pair**: the block as it stood when you started, and your rewrite. A pair passes when all of these hold:

- **No drift.** The rewrite asserts exactly what the original did: every event, name, count, cause, owner and the meaning of each quoted line, nothing added, dropped, merged, inverted or re-attributed. "Grey Crown hulls" keeps "Crown"; Aho and Felix stay two people; a ledger "promised as safer than an answer" stays a promise; "the Pearl of Souls" gains no owner.
- **Names stay names.** A Canon name (a page name or alias) stays as written; Players know them, and the checker never counts them. A recap names the Party's own people, ships and gods.
- **Plain speech.** English word order with the adjective before its noun: "silver scales", "clay bowls", "gold and green grass". When a rule trips, say the fact a different way in plain speech.
- **Aloud.** Read both aloud: the rewrite sounds at least as good as the original to a table of Players.
- **Presence.** Say what a thing is, has or does ("the crater is silent", "his hands are empty").
- **Every page is its own page.** Draw each callout and bullet from this page's own facts, so its sentences belong to it alone.

Every finding is fixed in the page's wording, warnings included, played Session records and heard Narration included. A finding that looks like an obvious misfire on literal campaign meaning (a ship that is literally a ship) is rewritten too, and named in your return for the DM to confirm, as `AGENTS.md` **Zero findings** sets out. A sentence an earlier edit broke ("at the Drowned The Maw matters", "His left leg of is splinted") is repaired to the bar too. Quoted lines keep their words wherever no finding touches them; a finding inside one rewords it to say the same thing, and a `dialogue-attribution` finding moves the speaker's tag ahead of the line, quoted words unchanged. Where theatre-of-the-mind differs (its step 5 File, its warning-as-judgement clause, its word-for-word heard speech), these rules govern under lint.

## Steps

1. **Gather.** Load `theatre-of-the-mind` once for the whole batch. For each page, read the page and its findings, and for each `echo` finding the source lines it names. **Done when** every flagged passage and every named source line is in context.
2. **Draft whole.** Rewrite each flagged callout as one block through theatre-of-the-mind steps 1–4, title kept; a flagged sentence outside a callout gets its paragraph rewritten. A whole-block draft settles every rule at once where a one-word patch trips the neighbouring rule. Write prose in British spelling ("sabre", "rowing boat"); a statblock fence is exempt, so its US forms stay inside it. **Done when** every finding has a drafted replacement.
3. **Check.** Save the batch, then check all its pages in one run: `bun run cf -- check "<page>" "<page>" …`. Fix each finding by its `fix:` line, redrafting the whole sentence to the bar; an echo naming a source you have not read sends you to those lines first, and for a rule new to you read `.vale/styles/<Style>/<Rule>.yml`. Rerun after each round of fixes. **Done when** the check reports zero findings on the batch pages.
4. **Ledger.** For each pair, list the original's facts (names, events, counts, causes, owners, quoted meanings) and tick each one in the rewrite; a fact the rewrite adds fails as surely as one it drops. Read each pair aloud against the bar. Redraft any failing pair and return to step 3. **Done when** every ledger matches and every pair meets the bar.
5. **Return.** List each touched page path with its pairs, before then after, and each suspected misfire with its rule and sentence. A review that sends pairs back gets the named sentences redrafted through steps 3–4 and the new pairs returned. The lint run owns `bun run cf -- check --fix`, the log and the slice's page gate. **Done when** every touched page and every pair is listed.

## What the gate counts

Consult while drafting; the checker has the last word. "Outside quotes" means the text left once every `"…"` / `“…”` line is cut out. Wikilinks read as their shown text. Page names and aliases, bare or linked, are masked before the `Narration.*` and `ai-tells.*` styles run, so a page's own name never trips a wording rule. A page of a concrete kind reads as its kind's noun (`Person` for an NPC, PC, Deity or Creature, `People` for a Faction, `Ship` for a Vehicle, `Object` for an Item, `Place` for a Location), any other page as a made-up `Placename…` word, and the finding quotes that stand-in: `'The Ship carried'` is the sentence where a Vehicle's name carried something. A finding that fires on the stand-in fires on the plain-English sentence too, so it binds like any other.

### `narration/*`: every `[!narration]` callout, warnings

| Rule | Fires on | Write instead |
| --- | --- | --- |
| `echo` | A run of four or more words outside quotes, across sentence boundaries, also found in the rest of this page (other sections, other callouts, frontmatter values) or in a page it links. Case, punctuation and apostrophes are ignored; a page name breaks a run; a run made only of small words (the, of, and, in) passes. The finding names each source and line. | The fact in new words. |
| `fresh-starts` | Three or more sentences in a row, each opening with You/Your, a preposition (In, Behind, Before, After, Without…), Back/Out/Up/Down/Off/Just/Right plus a preposition, a determiner (The, A, This, His, Her, Its, Their, Each, Some, Both, Another) or a number. A sentence wholly inside quotes drops out of the count. | In every three sentences, open one or more with a name, He/She/It/They, a verb or a clause (When, As, While). |
| `spoken-word-trap` | Anywhere in the callout, quotes included: three words in a row on the same first letter, small words counted ("to the tide", "over one of", "stops on one of"); both words of a content-word homophone pair (sail/sale, whole/hole; the finding names the pair); a pun first name (Justin, Sue…) before another capitalised word. | Every three-word window on two or more letters; one word per homophone pair per callout. |
| `evaluative-stack` | Two or more of abandoned, ancient, beautiful, bleak, bustling, dangerous, dreadful, eerie, elegant, enormous, extraordinary, fierce, grim, horrible, impressive, lovely, magnificent, mysterious, ominous, perfect, remarkable, strange, terrible, tiny, ugly, vast, wonderful in a row (commas ignored, "and" allowed) before a word. | One physical detail. |
| `relative-chain` | A sentence outside quotes holding two or more of which/that, every "that" counted. | One which/that per sentence. |
| `invented-names` | More than three distinct invented names outside quotes: capitalised words or runs that are not Canon ("X of Y" is one name). A sentence-opening single word counts only when it also appears mid-sentence or is no English word. | Canon names as written; past the third invented name, a role the page supports ("the harbourmaster"). |
| `dialogue-attribution` | A closing quote, then `, he/she/they/it/<Name>` and says/said, asks/asked, replies/replied, mutters/muttered, shouts/shouted or whispers/whispered. | Speaker and action, then the line: `Mara leans in and whispers, "Not here."` |

### `boilerplate/shared-line`: whole lines shared across pages, warnings

Body lines only (frontmatter, headings, callouts, fences, tables and comments are exempt) are normalised — list markers and emphasis stripped, wikilinks read as their shown text, lowercased — and any line of twenty-five characters or more carried verbatim by another page is flagged; generated index, hot and log pages are exempt. Only a whole shared line fires: a landmark phrase two pages share is fine. Each sharer rewrites its own line from its own facts — the cheap first move on a template bullet is one clause from this page's History or Depth ("Held by. ** [[X]], given by [[Y]] before her pilgrimage"), a whole fresh sentence on a prose paragraph.

### `Narration.*` and `ai-tells.*`

- **`Narration.*`** (callouts): theatre-of-the-mind's Craft and Hard lines name each rule. Its errors are em dashes, ` -- `, semicolons, colons, compass words in any form and a number with feet or miles.
- **`ai-tells.*`** (all prose on the page, errors): the frequent hits are absences ("leaves no trace", "No sound comes"), contrasts ("a Y, not a Z"), three -s/-ed/-ing phrases in one sentence (a closing absolute phrase counts), "the shape", "the surface", a comparative closer ("reaches longer than its body"), a ", so X" consequence clause, "announces itself" and "a single". Grammar flags "every one".
