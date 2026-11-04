---
name: theatre-of-the-mind
description: Writes Narration, the prose the DM speaks or shows the Players, into `[!narration]` callouts and inline `==…==` Cues — every slot from Scene openings, first looks and check results to the Previously On and Handout text. Use whenever a `[!narration]` callout or a Cue needs writing or rewriting.
---

# Theatre of the mind

This skill writes the Narration the DM speaks or shows to the Players: `[!narration]` boxed text and the Cues on DM-side lines. Spoken Narration works when the table can picture the situation and propose actions after one hearing. The bar is Brennan Lee Mulligan and Matt Mercer at the table (ADR 0029).

## Inputs

The caller names a page and its callout or Cue line, a Session Ledger and its Transcript (or a Transcript alone) for the Previously On, or a Handout to create. Change only the callout bodies and Cue text the caller names, a requested new Handout, the facts a step 2 `flesh-out` pass adds, the page gate's repairs, and repo-root `user-config.md` when the DM corrects returned Narration (**The DM's voice**). This skill writes Narration, not art or Foundry content.

## Steps

1. **Find the slot.** Read the type or kind of the caller's page and the callout's title, then find the slot's row in **Slots**. For `Previously on`, read [references/previously-on.md](references/previously-on.md) and follow its sequence instead of steps 2 to 4. For every other slot, read the recipe its row names and the shared rules in [references/recipes.md](references/recipes.md). Identify the slot's Job/Build/End, its band and the final-check items that apply to it.
2. **Gather.** Read the caller's page and the caller-supplied source pages the slot needs for perceivable facts, with the `## Quotes` section of each NPC who speaks in the block. When a subject's page is still generic and lacks a signature or enough facts to fill the slot's Build, run `flesh-out` on that page first and gather from the stocked page. Use an image only when the subject page already points at it and the file is readable. Keep source-backed facts and the old block in context. For a spoken slot, then read three passages from `reference/gm-voice/exemplars.md` whose moment label matches the slot (a scene opening for an Opening, a failed check for a failure Cue), at least one Brennan and one Mercer, and note the slot's exemplar DM in **Slots**. Study how each DM paces a description, where it stops and how it hands the Players a choice, and how each voices an NPC. Write the block in fresh words. When that file is absent, name it in the DM reply as a missing prerequisite and draft from **Craft**.
3. **Draft.** Take the Party's place and see what they see. Choose the **point**, the one thing the block delivers, and the **anchor**, the feature that shows it. Draft to the recipe's Job/Build/End and length band using the craft below, with a source behind every detail. For a World-page first meeting, follow its ordered construction before moving to Revise. Keep secrets and mechanics in existing DM-side material.
4. **Revise.** Read silently, read aloud and retell from memory, until the table could follow the block after one hearing. Rewrite forced pauses, re-reads and paraphrases. Keep supported counts, timing, uncertainty and names, and preserve exact document payload and quoted table speech. Apply the hard lines and final check below. Then run the critique in [references/critique.md](references/critique.md).
5. **File.** Replace only the callout body or the Cue's text. The title and the trigger stay as they are. A requested new Handout uses `wiki/templates/handout.md`. Add links only where the caller asked, then close per `skill://lint` § Commands over every page this run writes, regenerating a Campaign folder's `index.md` after a new Handout. Repair every finding on those pages, errors and warnings alike. Each finding's hint points to the **Craft** entry or hard line with its passing form, which `skill://lint/prose.md` § Gate rules restates. Check each recast against **Craft** and the hard lines, and recast again any that loses the Narration's facts or voice. Skip the gate only when the caller explicitly skips tooling, and report the skip in the DM reply.

## Craft

- **Spoken camera.** The DM speaks in the second person and the present tense, from inside the Party's view. "You see", "you hear", "you notice", "you feel the cold of the stone through your gloves" and "you know" are the DM's shot boundaries, and "You see…" may open sentence after sentence. The first sentence puts the table inside the situation, with who is doing what and how far it is from the Party. The camera moves from wide to mid and then onto the story object (from the grass plain to the hill fort, and then to black pennants where its crest should fly). Each description ends on a story object, an eye meeting the Party's, or one hand-off (Hard line 3).
- **Exemplar.** Each slot takes its exemplar DM from **Slots**. Brennan's way suits social, political, arrival, NPC and lore moments: worn, social nouns (firkins, a crust of bread), a comparison to a place the table already knows, and menace spoken as courtesy, with each joke still giving information. Mercer's way suits spatial and tactical moments. He walks the space in order (behind you, and then ahead for about forty feet), starting with the body at the threshold, and tells wonder as physics. His reveal comes in layers and ends on eye contact.
- **Breath.** The block fills its band in **Slots**, however briefly the DM chats. Run movement and landscape in one long sentence joined by "and" and commas, one thing tumbling into the next, and land each beat on one of the DM's short punchy lines of three to five words (**The DM's voice**): "The egg shatters." A participial trail keeps motion going ("Scattering dust and bone around you."), and a stack of short fragments flashes a reveal.
- **Told.** Each sentence hands off to the next by cause, by motion or by where the eye goes next, opening on "you", a pronoun or a name and its verb ("She banks low"), a connective ("Then", "Still") or a clause as often as on a place or a thing. Write each sentence so it can be the last one before a player interrupts.
- **Playable.** The table acts on what the description gives: door states, heights, sightlines, counts and spacing, distances, a clock folded into the scene ("the sun's getting low"). Measure what the table will use, in feet, paces or miles ("about twelve feet up on a brass rod", "the road runs north for more than fifty miles"), or against the body (knee-deep, shoulder-high) where that reads faster.
- **Evidence.** A judgement word is a conclusion. Give what led to it instead: "a bowl of stew skinned over on the table". Describe a thing by its material, kind and shape (an oak table, a wedge-shaped hull). Mood shows through bodies, purpose through use, and the past through what it left behind. Dread and wonder are objects, absences and numbers: a cage clanking somewhere about forty feet off, a lantern the dark swallows whole. Give each clue its diegetic cause (one stone worn smoother than the rest, where fingertips have pressed it for years). Hedged perception marks what the characters can't yet confirm: "what looks to be a crystal", "you could swear the stars have shifted". The effect the characters perceive takes the place of every rules term. A planned misdirection works only by choosing which perceivable facts lead. Every sentence in it is true and perceivable. Use one comparison per block, drawn from the characters' own world or a place the table knows.
- **Speakable.** Each sentence has one clear subject, a strong verb and short clauses: specific nouns, and a direct clause or a new sentence for each fact. The block must still work after one silent read, one verbatim read aloud and a retelling from memory. Colours are one plain word or a comparison. Things go by the stable name a stranger would use, and a person's name enters once the Party knows it. Up to three proper names new to the listeners enter one spoken block, each with a page behind it. A name the table already knows is not new, and every new name is one a page already gives. Move a surplus introduction to a later callout, a DM note or a Handout. The block still gives every required fact, with each Canon name as established. Say the block aloud and smooth what trips the tongue or could be misheard. Keep a Canon name or an exact quoted line as written, and give it an unambiguous lead-in or a DM pronunciation note where the sound still trips. A spoken block is one paragraph, the project's chosen form over bullet or nested-visible scripts. Bullets serve the DM-side layers and delivery notes, and a Handout keeps the document's own formatting.
- **The DM's voice.** Brennan and Mercer set the craft in this section and the sound of a spoken block: its camera, breath and register. The DM's own lines in `## Prose voice` of repo-root `user-config.md` season every spoken block with his diction, humour, warmth and hand-offs to the players, so it sounds like him without drifting toward his texting register. Follow his line over the exemplars only on what is his alone (his words, his joke shapes, how he builds a player's moment up), never on register or length. When the DM corrects the wording or rhythm of returned Narration, state the correction as a rule and append it there as one dated line. The DM's own lines stay as written. Then apply that rule to the block and every later one.
- **People.** An NPC who speaks gets a want, a physical action and a line in their own diction, identifiable blind, per `npc-design` [craft.md, Voice](../npc-design/references/craft.md#voice). Word count follows power and comfort: the killer gets one courteous line, the comfortable monster talks at length. When the NPC's page has `## Quotes`, read them first and give the new line that person's diction, rhythm, register and habits in fresh words. The speaker and their action lead in, then the complete line, which closes the beat. Villain, quest-giver and other NPC plans come out a round of information at a time, in Development, later callouts, Cues or combat rounds. Keep the prose in the DM's natural speaking voice.
- **Withhold.** Secrets, true names, mechanics, DCs, closed interiors, contingent responses and hidden routes remain outside Narration. Lore enters only when a player asks or a roll buys it, as an NPC's line or as "here's what you would know". A visible way out stays in the block. Keep existing DM-side material intact. If the old callout contains a fact that cannot be spoken, account for its omission in the DM reply rather than editing other sections.
- **Fresh words.** Take facts from the pages and tell them in your own words and order. Across a block, vary the phrasing only when it adds a detail. Across a Scene, repeat the stable noun for its main anchor about three times, at the Scene's natural beats and within the callouts it already has. Keep each feature's name the same across the DM side. Constants of a Site or Location are stated once at page or section level, and each opening then gives only what differs: repeat what matters now, and state once what is always true. Quote speech already spoken at the table word for word.

## Delivery

How a block meets the table. The spoken items bind material the DM speaks. A Handout keeps its written form.

- **Chunking.** A block is one pass, and it hands play back to the table. Build one situation to the slot's length band and end at its first natural reaction point. Move subsequent beats to a later callout or turn.
- **Audience.** Calibrate emphasis to this table's need for humour, atmosphere, tactical features or mystery without weakening canon, perceivable-only or player agency. Humour and tonal pivots follow `docs/agents/narrative-devices.md` § Contrast.
- **Repetition and interruption.** Boxed text replaces conversation only briefly. Re-offer dimensions, exits and counts in DM-side bullets as play asks for them. Optional per-listener delivery distributes the same true facts to the listener who can use them, then invites a first Player to act. Each PC's action stays with their player.
- **Verbal tools.** Put inscriptions, riddles, prophecies and other verbal information the table must reuse into the Handout slot, as reproducible text rather than ephemeral speech. A riddle must work without relying on one language's spelling, sound or pun.

## Hard lines

1. **The Players own their characters.** A PC does, says, decides and feels only what their player declared. Sensation and knowledge are the DM's to give ("you feel the heat on your face", "you know half the watch stood in that yard"). The decision and the emotion stay with the player. Put the cause in the world: "the scream rattles the lantern glass".
2. **Only the perceivable.** The block contains only what the characters can sense or already know. Omniscient narrator, inferred history and judgement words stay out. Misdirection is allowed only by choosing which true perceivable facts lead.
3. **One event, stopped at the reaction point.** A live event stops at the first moment a player would act: the bowstring drawn, the beam groaning. The outcome waits until someone acts. The block may end on one hand-off built from this situation. It is a question with the pressure inside it, or an either/or the place offers with each side's cost in view ("the river road, quick and watched, or the hill track, a day longer and empty?"). A bare "What do you do?" stays the DM's live line. History already established by play may stand, and a multi-beat live event is split across callouts, Cues or turns, never freeze-framed into one opening.
4. **Canon only.** Use only names that have a page, and take each fact from a page, an image or the DM. Where the sources are silent, the block is silent.
5. **Clean prose.** Commas, "and" and full stops join clauses. In each sentence the doer comes before an active verb, and the words are plain and fresh. Narration names the thing itself, and this skill's craft words (point, anchor, reaction point) stay in your working notes.

## Slots

Identify the slot by the page's type or kind plus the callout's title, because the title alone does not always identify it. A Cue's slot is its trigger. The Recipe column gives the file and heading that hold the slot's Job, Build and End. Every recipe except the Previously On runs through the shared rules in [references/recipes.md](references/recipes.md), wherever the recipe lives. The Exemplar column gives the DM whose way the slot follows (**Craft**, **Exemplar**). A Session's last image takes Brennan's mid-effect cut or Mercer's decompression coda, whichever the Session's last Scene needs.

| Slot | Found on | Recipe | Exemplar | Band |
| --- | --- | --- | --- | --- |
| Hook opening | Scene, kind Hook · `Opening` | [recipes.md, Hook](references/recipes.md#hook) | Brennan | 80 to 120 words |
| Development opening | Scene, kind Development · `Opening` | [recipes.md, Development](references/recipes.md#development) | Brennan | 80 to 150 words |
| Cliffhanger opening | Scene, kind Cliffhanger · `Opening` | [recipes.md, Cliffhanger](references/recipes.md#cliffhanger) | Mercer | 60 to 100 words |
| Climax opening | Scene, kind Climax · `Opening` | [recipes.md, Climax](references/recipes.md#climax) | Mercer | 100 to 200 words |
| Closing image | Scene, kind Resolution · `Closing image`, or an older `Opening` | [recipes.md, Closing image](references/recipes.md#closing-image) | cut or coda | 60 to 120 words |
| Transition | any page · `Transition` | [recipes.md, Transition](references/recipes.md#transition) | Brennan | one to three sentences |
| NPC entering | Scene · a callout titled with an NPC's name | [recipes.md, NPC entering](references/recipes.md#npc-entering) | Brennan | three to five sentences |
| Creature entering | Scene · a callout titled with a Creature's name | [recipes.md, Creature entering](references/recipes.md#creature-entering) | Mercer | three to five sentences |
| Revelation | Scene · a callout titled with a subject's name whose job is a major reveal | [recipes.md, Revelation](references/recipes.md#revelation) | Brennan | two to four sentences |
| Cue | any DM-side line · `==…==` right after its trigger | [recipes.md, Cues](references/recipes.md#cues) | combat Mercer, otherwise Brennan | one to three sentences, 60 words at most |
| NPC first look | NPC · `First look` | [npc-design craft.md, First look](../npc-design/references/craft.md#first-look) | Brennan | 50 to 120 words |
| Creature first sight | Creature · `First sight` | [recipes.md, First meetings on World pages](references/recipes.md#first-meetings-on-world-pages) | Mercer | 50 to 120 words |
| Item first look | Item · `First look` | [recipes.md, First meetings on World pages](references/recipes.md#first-meetings-on-world-pages) | Mercer | 50 to 120 words |
| Vehicle first sight | Vehicle · `First sight` | [recipes.md, First meetings on World pages](references/recipes.md#first-meetings-on-world-pages) | Mercer | 50 to 120 words |
| Arrival | Location, kind Region or Settlement · `Arrival` | [recipes.md, First meetings on World pages](references/recipes.md#first-meetings-on-world-pages) | Brennan | 50 to 120 words |
| Entering | Location, kind Site · `Entering` | [recipes.md, First meetings on World pages](references/recipes.md#first-meetings-on-world-pages) | Mercer | 50 to 120 words |
| Public face | Faction · `Public face` | [recipes.md, First meetings on World pages](references/recipes.md#first-meetings-on-world-pages) | Brennan | 50 to 120 words |
| The offer | Quest · `The offer` | [recipes.md, First meetings on World pages](references/recipes.md#first-meetings-on-world-pages) | Brennan | 50 to 120 words |
| Portrait | PC · `Portrait` | [recipes.md, First meetings on World pages](references/recipes.md#first-meetings-on-world-pages) | Brennan | 50 to 120 words |
| As it is told | Lore · `As it is told` | [recipes.md, Voices](references/recipes.md#voices) | Brennan | stop at the End |
| Invocation | Deity · `Invocation` | [recipes.md, Voices](references/recipes.md#voices) | Brennan | stop at the End |
| Casting | Spell · `Casting` | [recipes.md, Voices](references/recipes.md#voices) | Mercer | one to three sentences |
| Handout text | Handout · `Handout text` | [recipes.md, Voices](references/recipes.md#voices) | the document's own | as long as the document |
| World or Campaign pitch | World · `The World`, Campaign · `The Campaign` | [recipes.md, Voices](references/recipes.md#voices) | Brennan | about 100 words |
| Previously On | Previously On · `Previously on`, whatever spelling the caller used | [references/previously-on.md](references/previously-on.md) | Mercer, closing on Brennan | 120 to 160 words |

A block that fits only by stretching sentences past a breath is overloaded. Move things to the DM's side or a later slot.

## Final check

Test the block against every shared item. Test the branch items only where the selected recipe's Build calls for them (the openings and first-look rules in [references/recipes.md](references/recipes.md)).

- **Slot.** Does it do the recipe's Job, contain its Build and stop at its End?
- **Situation.** Does the first sentence put the table inside the situation, who is doing what and where the Party stands? A physical first look opens on the Party-facing frame the recipe requires.
- **Landing.** Is the last sentence a story object, an eye meeting the Party's or one hand-off built from this situation, and does the beat before it close on a short sentence?
- **Canon.** Does every detail trace to a page, image or DM line? Cut any detail with no source.
- **Evidence.** Is any judgement word, mood word, page label or rules term left? Does each clue carry its diegetic cause?
- **Playable.** Does the block give the doors, heights, sightlines, counts and distances the table can act on, where the slot gives any?
- **Told.** Does each sentence hand off to the next by cause, motion or the eye's path?
- **Speakable.** Check spoken material only, since a Handout keeps its written form and payload. Recast any sentence longer than a breath or chained from relative clauses and any sound that trips the tongue or mishears at the table, and keep new names to three at most. The block still works after the silent read, the verbatim read aloud and the retelling from memory.
- **Echo.** Rewrite every run of four or more words shared with the old block or the sources already read, apart from exact document payload and quoted speech.
- **Tells.** On a World page's first meeting, does each signature ability or hidden property the page lists have its tell? Add any that is missing.
- **Hard lines.** Do all five hold, every live event stopped at its reaction point and the recipe's End reached?
- **Length.** Is the block within its band?
- **Better.** When rewriting, keep each old fact, leave it in DM-side material or explain its omission in the DM reply. Does every line read aloud as published-grade prose in the DM's own voice, at least as vivid and exact as the old block?

Branch items, where the recipe's Build calls for them:

- **Zoom.** Does the block move through wide, mid and close shots and end on its story object?
- **Felt.** One motion, two grounded channels with a nonvisual one where the sources and these PCs' capabilities support them, each routed to the PC who can perceive it?
- **Placement.** Is every feature's position explicit, and are immediate blocking or lethal hazards in the first look? Is a fight-layout block paired with its map or sketch immediately after narration?
- **Delivery.** Can a player interrupt after any sentence, and is each NPC attribution lead-in then line? Are villain and quest-giver plans kept out of the opening, with the key details repeated across the Scene and the first actor named?
- **Shape.** Does each neighbouring area get only a clause unless this is an overlook? Does each comparison stage only one image, and does size ride a measure or a body scale the table can use?
