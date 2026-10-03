---
name: theatre-of-the-mind
description: Writes Narration, the prose the DM speaks or shows the Players, into `[!narration]` callouts — every slot from Scene openings and first looks to the Previously On and Handout text. Use whenever a `[!narration]` callout needs writing or rewriting.
---

# Theatre of the mind

This skill writes `[!narration]` boxed text the DM speaks or shows to the Players. Spoken Narration works when the table can picture the situation and propose actions after one hearing.

## Scope

The caller names the work: a page and its callout, a Transcript for the Previously On, a Handout to create. Every read and every write this run makes comes from those names.

**Read only:**

- the production start-here context required by `AGENTS.md`, then the caller's named pages/files and Transcript; `wiki/templates/Handout.md` for a requested new Handout
- this SKILL.md, [references/critique.md](references/critique.md) and one recipe file: [references/previously-on.md](references/previously-on.md) for the Previously On; [references/recipes.md](references/recipes.md) for every other slot, including Handout text
- an image only where a page you were given already points at it and the file is readable

**Write only:**

- the callout's body on the caller's named pages, title kept, the rest of each page as it is
- a new Handout page from the template, only when the caller asks for one, linked only where the caller asked
- mechanical fixes from the full `bun run cf -- check --fix` gate across the World, including a stale World `index.md`
- repo-root `user-config.md`, when the DM corrects returned Narration's wording or rhythm (see **The DM's voice**)
- the DM reply

This task writes Narration, not art or Foundry content.

Done when you can list every file this run will read and every page it will write, and each is on these lists.

## Steps

1. **Find the slot.** Read the named page's type or kind and callout title. For `Previously on`, read [references/previously-on.md](references/previously-on.md) and follow its sequence instead of steps 2–4. For every other slot, read the dispatch and selected recipe in [references/recipes.md](references/recipes.md). Done when the slot, its Job/Build/End and its applicable final-check items are identified.
2. **Gather.** Read the named page and only the caller-supplied source pages the slot needs for perceivable facts. Links select relevant subjects from that set, not further reading. Use an image only when the subject page already points at it and the file is readable. Keep source-backed facts and the old block in context, not a scratch file. Done when every candidate detail has a named source and every read stays within the allowed input.
3. **Draft.** Stand where the Party stands. Choose the **point**, the one thing the block delivers, and the **anchor**, the feature that carries it. Draft to the recipe's Job/Build/End and length band using the craft below; for a World-page first meeting, follow its ordered construction before moving to Revise. Keep secrets and mechanics in existing DM-side material. Done when every detail is sourced, the actual draft satisfies the recipe's construction checks where given, and the block stops at its End.
4. **Revise.** Read silently, read aloud and retell from memory. Rewrite forced pauses, re-reads and paraphrases; keep supported counts, timing, uncertainty and names, and preserve exact document payload and quoted table speech. Apply the hard lines and final check below. Then run the critique in [references/critique.md](references/critique.md). Done when the block survives one hearing, every applicable check is answered with quoted evidence and the critique's re-read is complete.
5. **File.** Replace only the callout body and keep its title. A requested new Handout uses the template; add links only where the caller asked. Run the full `bun run cf -- check --fix` then `bun run cf -- check`; a page filter is not File completion evidence. Errors fail the gate: fix them and repeat. A warning from a `Narration.*` or `narration/*` rule on the filed callout is evidence for judgment, not a verdict; the rule IDs beside the craft and hard lines name the guideline each one enforces. Rewrite the flagged line, or quote it in the DM reply with the reason it stands. Skip the gate only when the caller explicitly skips tooling; run it even when software suites are skipped. Done when the requested callouts are filed, unrelated content is unchanged apart from full-gate mechanical fixes, errors are gone, every Narration warning on the filed callout is rewritten or quoted in the DM reply with the reason it stands, any explicit skip is reported, and the DM reply is ready.

## Craft

- **Situation first.** The first sentence says what is happening and to whom, from inside the Party's sight. Terrain alone is a caption, and so is a subject alone in empty space. Keep the reaching with the world, which leaves a PC's senses theirs: "he drops in above you" holds the Party's frame where "you see him drop" decides a PC's eyes (`Narration.FilterVerbs`).
- **Told.** Each sentence hands off to the next by cause, by motion or by where the eye goes next. Two neighbouring sentences that could swap places without loss are a list: rewrite their hand-off within the slot's length band (`narration/fresh-starts`). Write each sentence so it can be the last one before a player interrupts. Keep exits, counts and dimensions in short, reusable forms in the DM notes.
- **Evidence.** Every judgement word (abandoned, ancient, dangerous, angry, strange) is a conclusion. Give what led to it instead: "a bowl of stew skinned over on the table" (`Narration.JudgementWords`). At most one evaluative adjective rides a noun; specificity adjectives (material, species, shape — an oak table, a wedge-shaped hull) are exempt, and this is a limit on stacked judgement words, not a licence for them (`narration/evaluative-stack`). Mood shows through bodies, purpose through use, and the past through what it left behind. Avoid mechanical words such as *stunned*, *frightened*, *reaction*, *action* and *incapacitated* unless the rules meaning is intended; describe the visible effect when it is not (`Narration.MechanicalTerms`). Do not use *seems to be* or *appears to be* as perception hedges (`Narration.PerceptionHedges`). State what reaches the characters, keep mechanical resolution on the DM's side, and reserve uncertainty for an actual Perception or Investigation result. A planned misdirection may select true, perceivable facts to lead with, but it never lies or supplies an omniscient history. One comparison per block, drawn from the characters' own world, and it names one image or clause rather than opening a second scene.
- **Speakable.** Each sentence has one clear subject, a strong verb and short clauses: specific nouns, and a direct clause or a new sentence where a chain of relative clauses would carry the same fact (`narration/relative-chain`). The block must survive one silent read, one verbatim read aloud and a retelling from memory. Directions and distances are the body's: ahead, uphill, within reach, a bowshot. Compass bearings and foot counts belong to the DM's notes (`Narration.NoCompass`, `Narration.NoFootMileCounts`). Colours are one plain word or a comparison. Things carry the stable name a stranger would use, and a person's name enters once the Party knows it. At most three proper names new to the listeners enter one spoken block, each with a page behind it: a name the table already knows is not new, and "invented" never means the Agent may invent one (`narration/invented-names`). Move a surplus introduction to a later callout, a DM note or a Handout rather than dropping a required fact or renaming established Canon. Say the block aloud for tongue-twisters, accidental alliteration, pun names and homophones: rewrite ambiguous newly authored prose, and keep a Canon name or an exact quoted line, giving it an unambiguous lead-in or a DM pronunciation note where the sound still trips (`narration/spoken-word-trap`). A spoken block is one paragraph, the project's chosen form over bullet or nested-visible scripts; bullets serve the DM-side layers and delivery notes, and a Handout keeps the document's own formatting.
- **The DM's voice.** When the DM corrects the wording or rhythm of returned Narration, state the correction as a rule and append it as one dated line under `## Prose voice` in repo-root `user-config.md`, adding the heading if absent and leaving the DM's own lines as written. Then apply that rule to the block and every later one.
- **People.** An NPC who speaks gets a want, a physical cue and one line of about six seconds that asks, offers, presses or threatens, then stops for the Players (`Narration.StockTells`). The speaker and their action lead in, then the complete line, and nothing follows it: no speech tag between or after the quoted words (`narration/dialogue-attribution`). Villain, quest-giver and other NPC plans are never an opening dump. Put later statements in Development, later callouts or combat rounds, about one round of information at a time. Keep the prose in the DM's natural speaking voice, not a more eloquent narrator.
- **Withhold.** Secrets, true names, mechanics, DCs, closed interiors, contingent responses and hidden routes remain outside Narration. A visible way out stays in the block. Keep existing DM-side material intact; if the old callout contains a fact that cannot be spoken, account for its omission in the DM reply rather than editing other sections.
- **Fresh words.** Take facts from the pages and leave their phrasing: the source's nouns said back in the source's order are an echo (`narration/echo`). Across a block, vary the phrasing only when it adds a detail. Across a Scene, repeat the stable noun for its salient anchor about three times across its natural beats, never by inventing callouts to hit a quota. Across the DM side, never rename a feature. Constants of a Site or Location are stated once at page or section level, then openings carry only differences: repeat what is salient now, state once what is always true. Speech already spoken at the table stays word for word.

## Delivery

How a block meets the table. The spoken items bind material the DM speaks; a Handout keeps its written form.

- **Chunking.** A block is a single pass, not a cutscene. Build one situation to the slot's length band and end at its first natural reaction point. Move subsequent beats to a later callout or turn.
- **Audience.** Calibrate emphasis to this table's need for humour, atmosphere, tactical features or mystery without weakening canon, perceivable-only or player agency.
- **Repetition and interruption.** Boxed text replaces conversation only briefly. Re-offer dimensions, exits and counts in DM-side bullets as play asks for them. Optional per-listener delivery distributes the same true facts to the listener who can use them, then invites a first Player to act; it never chooses the PC's action.
- **Verbal tools.** Put inscriptions, riddles, prophecies and other verbal information the table must reuse into the Handout slot, as reproducible text rather than ephemeral speech. A riddle must not depend on a single language's spelling, sound or pun.

## Hard lines

1. **The Players own their characters.** A PC does, says, decides and feels only what their player declared (`Narration.PcInterior`). Put the cause in the world: "the scream rattles the lantern glass".
2. **Only the perceivable.** The block holds what the characters can sense or already know. Omniscient narrator, cognitive experience, inferred history and judgement words stay out. Misdirection is allowed only by choosing which true perceivable facts lead.
3. **One event, stopped at the reaction point.** A live event ends at the first moment a player would act: the bowstring drawn, the beam groaning. Nothing lands until someone acts, and "What do you do?" is the DM's line. History already established by play may stand, and a multi-beat live event is split across callouts or turns, never freeze-framed into one opening.
4. **Canon only.** Every name has a page, and every fact comes from a page, an image or the DM. Where the sources are silent, the block is silent.
5. **Clean prose.** Commas, "and" and full stops join clauses. Narration carries no em dashes, semicolons or colons (`Narration.NoEmDash`, `Narration.NoSemicolon`, `Narration.NoColon`), and none of this skill's craft words (point, anchor, reaction point).

## Length

| Block | Band |
| --- | --- |
| Hook opening | 80–120 words |
| Development opening | 80–150 words |
| Cliffhanger opening | 60–100 words |
| Climax opening | 100–200 words |
| Closing image | 60–120 words |
| Transition | one to three sentences |
| First meeting on a World page | use the narration-and-speech construction in [references/recipes.md](references/recipes.md#first-meetings-on-world-pages) |
| NPC or Creature entering a Scene | three to five sentences |
| Revelation | two to four sentences |
| Casting | one to three sentences |
| World or Campaign pitch | about 100 words |
| Previously On | 120 to 160 words |
| Handout text | as long as the document |

A block that fits only by stretching sentences past a breath carries too much: move things to the DM's side or a later slot.

## Final check

Quote the block's own words for each item. Answer every shared item; answer the branch items only where the selected recipe's Build calls for them (the openings and first-look rules in [references/recipes.md](references/recipes.md)).

- **Slot.** Does it do the recipe's Job, contain its Build and stop at its End?
- **Situation.** Quote the first sentence. Does it name who is doing what, and, for a spoken slot, place the subject in the listeners' sight? For a physical first look, quote the Party-facing frame required by the recipe.
- **Canon.** Beside each detail in the block, name the page, image or DM line it came from. Any detail with no source comes out.
- **Evidence.** Is any judgement word, mood word or page label left? Does any of *stunned*, *frightened*, *reaction*, *action* or *incapacitated* falsely imply a rules effect? Is any *seems to be* or *appears to be* a perception hedge?
- **Told.** Quote every pair of neighbouring sentences that could swap places, and each sentence's first two words: a run of fresh starts (You crossed, In the tower, Back in) is a list.
- **Speakable.** For material actually spoken — a Handout keeps its written form and payload: is any sentence longer than a breath or chained from relative clauses? Does the block survive the silent read, the verbatim read aloud and the retelling from memory? Do more than three names land new on the listeners? Does any sound trip the tongue or mishear at the table? Is there a compass word, a foot count, an em dash, a semicolon or a colon?
- **Echo.** Against the old block and the sources already read, quote every shared run of four or more words. Exact document payload and quoted speech are preserved; every other echo means a rewrite.
- **Tells.** On a World page's first meeting, quote the tell for each signature ability or hidden property the page lists. Any without one is added.
- **Hard lines.** Do all five hold, every live event stopped at its reaction point and the recipe's End reached?
- **Length.** Name the band and give the count. For a World-page first meeting, use the recipe's construction check on the finished block.
- **Better.** When rewriting: is each old fact kept, already present in DM-side material, or accounted for in the DM reply, and is the new block more vivid and exact?

Branch items, where the recipe's Build calls for them:

- **Count.** Number the things the Players could picture or act on: four to six, around the anchor? List each person's and Creature's features: exactly one, beside one behaviour?
- **Felt.** One motion, two grounded channels with a nonvisual one where the sources and these PCs' capabilities support them, and nothing assumed of the listeners' bodies?
- **Placement.** Is every feature's position explicit? Are immediate blocking or lethal hazards in the first look? Is a fight-layout block paired with its map or sketch immediately after narration?
- **Delivery.** Can a player interrupt after any sentence? Are NPC attributions lead-in then line? Are no villain or quest-giver plans compressed into the opening? Are salient details repeated across the Scene and the first actor named?
- **Shape.** Is the actionable feature first or last, never buried? Does each neighbouring area get only a clause unless this is an overlook? Does each comparison stage only one image, and does size ride a body scale unless scale is the point?
