---
name: theatre-of-the-mind
description: Writes Narration, the prose the DM speaks or shows to the Players, into `[!narration]` callouts. That covers Scene openings and closing images, first looks at NPCs, Creatures, Items, Locations and Vehicles, the Previously On, Handout text and every other narration slot. Use whenever a `[!narration]` callout needs writing or rewriting.
---

# Theatre of the mind

Narration is the one part of the Wiki the Players hear. The DM reads it aloud once, and from that one hearing the table has to see the place, know what matters and want to act. It has worked when the Players start proposing actions without asking the DM to say it again. It sounds like a confident DM telling a story at the table, with the economy of speech rather than the texture of a novel or the order of a report. A block that is accurate but flat fails as surely as one that is padded.

## Steps

1. **Find the slot.** Resolve the slot from the page's type or kind plus the callout's title, per the dispatch table in [references/recipes.md](references/recipes.md) — the title alone does not always name it. A `Previously on` callout follows [references/previously-on.md](references/previously-on.md), keeping the caller's spelling of the title; its sequence replaces steps 2 to 5. Done when you can quote the recipe's Job, Build and End, and name the final-check items that apply to this slot.
2. **Gather.** When rewriting, first save the old block to a scratch file for step 6, copy its facts onto your list as keywords, and close it: its phrasing is what you are replacing. Then read the page and every page it links that the moment touches: the Location and its `parent`, each NPC, Creature and Item present, and any Narration the Players have already heard about the same subject. Keep a private fact list of what the characters can perceive right now, each fact as bare keywords with its page (`ferryman: lantern, charcoal ring on the hull, [[Old Ferry]]`). Open every image of the subject in the World's `attachments/`. The art often holds the colour, the marks and the anchor. Done when every source is read and every fact on the list names its page. Only listed facts reach the block: a detail no page, image or DM line gives stays out, however well it would fit.
3. **Withhold.** Move to the DM's side of the page everything the characters cannot perceive from where they stand, and everything that waits on play: secrets, true names, mechanics, DCs, the inside of closed things, how anyone responds to the Party, alternative ways in that are hidden or contingent (a visible way out stays in the block), and what a carried Item does until someone uses it. Layer location notes beside the callout as **glance**, **closer look**, **specific action**, then **hidden**, an urgent threat note first. Order the remaining notes like the block and reuse its feature names. Put first-look Perception or knowledge checks directly beside the callout. Done when each withheld fact the DM needs is on the page outside the callout.
4. **Aim.** Write the **point**, one private sentence naming the single thing the block delivers: a threat, a Clue the Players can perceive, a choice of ways, a tone. Choose the **anchor**, the one feature the table will still mention next Session. The anchor usually carries the point.
5. **Draft.** Stand where the Party stands and tell what reaches them in the order it would. Open on the situation: who is doing what, in a kind of place the listener can furnish for themselves. Use second person for the Party's shared viewpoint, but never prescribe a PC's movement, words, feelings or choice. Danger leads in a fight-shaped Hook, in Cliffhanger and in Climax; in Development and non-fight first looks the layout may come first, and the block still ends on the threat. Build toward the point around the anchor, under the craft rules, inside the length band. End where the recipe's **End** says: a live event stops before the first undeclared outcome a Player could affect, on the **reaction point**, and history already established by play, documents, voices, Revelation, first looks and the Closing image stop where their recipes prescribe. Split a multi-beat live event at the first reaction into later callouts or turns. Done when the block exists and the selected recipe's End is satisfied.
6. **Revise.** Read the block silently once, then aloud once, and retell it from memory. Rewrite anything that forces a pause, a re-read, a spelling or a paraphrase; a pause placed for effect is not a defect. Pass newly authored prose through the installed `humanizer` skill in embedded mode to strip AI tells, returning only the final prose and keeping every hard line below. Canon and Player agency override its fiction exemption and its allowance for added opinions or reactions: add no fact, feeling or event, keep every supported claim (counts, negation, timing, uncertainty, names, quoted payload) even where a tell pattern suggests cutting it, and keep verbatim document text, speech quoted from a Transcript and speech already spoken at the table word for word. Then run `pnpm cf narration <page> --callout "<title>"`, adding `--old <file>` only when you replaced a block and `--band <min>-<max>` only where the recipe's band is a word count; where the band is a sentence or format constraint, check it by hand. The command counts words and sentences and finds echoes, banned punctuation, compass words, foot counts, list-like runs, judgement words, stacked evaluative adjectives, chained relative clauses, dense proper names, spoken-word traps and speech attribution out of order. Exit 0 means no error-severity findings, not that warning-only guidance passed. Inspect every finding against its source and the applicable rule: revise the real defects and account for each false positive — the CLI cannot tell a name the table already knows from a new one, a genuine clause chain from every `that`, or a Canon name from a pun. Done when no applicable defect is unresolved, the fact list is intact and the applicable final-check items pass, never by weakening a rule or inventing or renaming Canon to silence a heuristic.
7. **File.** Replace the callout's body and keep its title. Run `pnpm check <page>` until it passes.

## Craft

- **Situation first.** The first sentence says what is happening and to whom. Terrain alone is a caption.
- **Told.** Each sentence hands off to the next by cause, by motion or by where the eye goes next. Two neighbouring sentences that could swap places without loss are a list: join them or cut one. Write each sentence so it can be the last one before a player interrupts. Keep exits, counts and dimensions in short, reusable forms in the DM notes.
- **Evidence.** Every judgement word (abandoned, ancient, dangerous, angry, strange) is a conclusion. Give what led to it instead: "a bowl of stew skinned over on the table". At most one evaluative adjective rides a noun; specificity adjectives (material, species, shape — an oak table, a wedge-shaped hull) are exempt, and this is a limit on stacked judgement words, not a licence for them. Mood shows through bodies, purpose through use, and the past through what it left behind. Avoid mechanical words such as *stunned*, *frightened*, *reaction*, *action* and *incapacitated* unless the rules meaning is intended; describe the visible effect when it is not. Do not use *seems to be* or *appears to be* as perception hedges. State what reaches the characters, keep mechanical resolution on the DM's side, and reserve uncertainty for an actual Perception or Investigation result. A planned misdirection may select true, perceivable facts to lead with, but it never lies or supplies an omniscient history. One comparison per block, drawn from the characters' own world, and it names one image or clause rather than opening a second scene.
- **Speakable.** Each sentence has one clear subject, a strong verb and short clauses: specific nouns, and a direct clause or a new sentence where a chain of relative clauses would carry the same fact. The block must survive one silent read, one verbatim read aloud and a retelling from memory. Directions and distances are the body's: ahead, uphill, within reach, a bowshot. Compass bearings and foot counts belong to the DM's notes. Colours are one plain word or a comparison. Things carry the stable name a stranger would use, and a person's name enters once the Party knows it. At most three proper names new to the listeners enter one spoken block, each with a page behind it: a name the table already knows is not new, and "invented" never means the Agent may invent one. Move a surplus introduction to a later callout, a DM note or a Handout rather than dropping a required fact or renaming established Canon. Say the block aloud for tongue-twisters, accidental alliteration, pun names and homophones: rewrite ambiguous newly authored prose, and keep a Canon name or an exact quoted line, giving it an unambiguous lead-in or a DM pronunciation note where the sound still trips. A spoken block is one paragraph, the project's chosen form over bullet or nested-visible scripts; bullets serve the DM-side layers and delivery notes, and a Handout keeps the document's own formatting.
- **People.** An NPC who speaks gets a want, a physical cue and one line of about six seconds that asks, offers, presses or threatens, then stops for the Players. The speaker and their action lead in, then the complete line, and nothing follows it: no speech tag between or after the quoted words. Villain, quest-giver and other NPC plans are never an opening dump. Put later statements in Development, later callouts or combat rounds, about one round of information at a time. Keep the prose in the DM's natural speaking voice, not a more eloquent narrator.
- **Fresh words.** Take facts from the pages and leave their phrasing: the source's nouns said back in the source's order are an echo. Across a block, vary the phrasing only when it adds a detail. Across a Scene, repeat the stable noun for its salient anchor about three times across its natural beats, never by inventing callouts to hit a quota. Across the DM side, never rename a feature. Constants of a Site or Location are stated once at page or section level, then openings carry only differences: repeat what is salient now, state once what is always true. Speech already spoken at the table stays word for word.

## Delivery

How a block meets the table. The spoken items bind material the DM speaks; a Handout keeps its written form.

- **Chunking.** A block is a single pass, not a cutscene. Roughly two sentences is a pause heuristic, never a length or interrupt quota: pause there or sooner at a natural reaction point, and move every next beat to a later callout or turn. A single callout ends at only one reaction point.
- **Audience.** Calibrate emphasis to this table's need for humour, atmosphere, tactical features or mystery without weakening canon, perceivable-only or player agency.
- **Repetition and interruption.** Boxed text replaces conversation only briefly. Re-offer dimensions, exits and counts in DM-side bullets as play asks for them. Optional per-listener delivery distributes the same true facts to the listener who can use them, then invites a first Player to act; it never chooses the PC's action.
- **Verbal tools.** Put inscriptions, riddles, prophecies and other verbal information the table must reuse into the Handout slot, as reproducible text rather than ephemeral speech. A riddle must not depend on a single language's spelling, sound or pun.

## Hard lines

1. **The Players own their characters.** A PC does, says, decides and feels only what their player declared. Put the cause in the world: "the scream rattles the lantern glass".
2. **Only the perceivable.** The block holds what the characters can sense or already know. Omniscient narrator, cognitive experience, inferred history and judgement words stay out. Misdirection is allowed only by choosing which true perceivable facts lead.
3. **One event, stopped at the reaction point.** A live event ends at the first moment a player would act: the bowstring drawn, the beam groaning. Nothing lands until someone acts, and "What do you do?" is the DM's line. History already established by play may stand, and a multi-beat live event is split across callouts or turns, never freeze-framed into one opening.
4. **Canon only.** Every name has a page, and every fact comes from a page, an image or the DM. Where the sources are silent, the block is silent.
5. **Clean prose.** Commas, "and" and full stops join clauses. Narration carries no em dashes, semicolons or colons, and none of this skill's craft words (point, anchor, reaction point).

## Length

| Block | Band |
| --- | --- |
| Hook opening | 80–120 words |
| Development opening | 80–150 words |
| Cliffhanger opening | 60–100 words |
| Climax opening | 100–200 words |
| Closing image | 60–120 words |
| Transition | one to three sentences |
| First meeting on a World page | three to five sentences, plus the spoken line where the recipe has one |
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
- **Situation.** Quote the first sentence. Does it name who is doing what?
- **Canon.** Beside each detail in the block, name the page, image or DM line it came from. Any detail with no source comes out.
- **Evidence.** Is any judgement word, mood word or page label left? Does any of *stunned*, *frightened*, *reaction*, *action* or *incapacitated* falsely imply a rules effect? Is any *seems to be* or *appears to be* a perception hedge?
- **Told.** Quote every pair of neighbouring sentences that could swap places, and each sentence's first two words: a run of fresh starts (You crossed, In the tower, Back in) is a list.
- **Speakable.** For material actually spoken — a Handout keeps its written form and payload: is any sentence longer than a breath or chained from relative clauses? Does the block survive the silent read, the verbatim read aloud and the retelling from memory? Do more than three names land new on the listeners? Does any sound trip the tongue or mishear at the table? Is there a compass word, a foot count, an em dash, a semicolon or a colon?
- **Echo.** Word by word against the old block and each source page, quote every run of four or more words they share (quoted speech aside). Any quote means a rewrite.
- **Tells.** On a World page's first meeting, quote the tell for each signature ability or hidden property the page lists. Any without one is added.
- **Hard lines.** Do all five hold, every live event stopped at its reaction point and the recipe's End reached?
- **Length.** Is it inside the band?
- **Better.** When rewriting a block: is every fact of the old block kept or moved to the DM's side, and is the new block more vivid and more exact?

Branch items, where the recipe's Build calls for them:

- **Count.** Number the things the Players could picture or act on: four to six, around the anchor? List each person's and Creature's features: exactly one, beside one behaviour?
- **Felt.** One motion, two grounded channels with a nonvisual one where the sources and these PCs' capabilities support them, and nothing assumed of the listeners' bodies?
- **Placement.** Is every feature's position explicit? Are immediate blocking or lethal hazards in the first look? Is a fight-layout block paired with its map or sketch immediately after narration?
- **Delivery.** Can a player interrupt after any sentence? Are NPC attributions lead-in then line? Are no villain or quest-giver plans compressed into the opening? Are salient details repeated across the Scene and the first actor named?
- **Shape.** Is the actionable feature first or last, never buried? Does each neighbouring area get only a clause unless this is an overlook? Does each comparison stage only one image?
