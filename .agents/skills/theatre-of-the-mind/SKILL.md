---
name: theatre-of-the-mind
description: Writes Narration, the prose the DM speaks or shows to the Players, into `[!narration]` callouts. That covers Scene openings and closing images, first looks at NPCs, Creatures, Items, Locations and Vehicles, the Previously On, Handout text and every other narration slot. Use whenever a `[!narration]` callout needs writing or rewriting.
---

# Theatre of the mind

Narration is the one part of the Wiki the Players hear. The DM reads it aloud once, and from that one hearing the table has to see the place, know what matters and want to act. It has worked when the Players start proposing actions without asking the DM to say it again. It sounds like a confident DM telling a story at the table, with the economy of speech rather than the texture of a novel or the order of a report. A block that is accurate but flat fails as surely as one that is padded.

## Steps

1. **Find the slot.** The callout's title names it. Read its recipe in [references/recipes.md](references/recipes.md); a Previously On follows [references/previously-on.md](references/previously-on.md), which replaces steps 3 to 5. Done when you can quote the recipe's Job, Build and End.
2. **Gather.** When rewriting, first save the old block to a scratch file for step 6, copy its facts onto your list as keywords, and close it: its phrasing is what you are replacing. Then read the page and every page it links that the moment touches: the Location and its `parent`, each NPC, Creature and Item present, and any Narration the Players have already heard about the same subject. Keep a private fact list of what the characters can perceive right now, each fact as bare keywords with its page (`ferryman: lantern, charcoal ring on the hull, [[Old Ferry]]`). Open every image of the subject in the World's `attachments/`. The art often holds the colour, the marks and the anchor. Done when every source is read and every fact on the list names its page. Only listed facts reach the block: a detail no page, image or DM line gives stays out, however well it would fit.
3. **Withhold.** Move to the DM's side of the page everything the characters cannot perceive from where they stand, and everything that waits on play: secrets, true names, mechanics, DCs, the inside of closed things, how anyone responds to the Party, other ways in, and what a carried Item does until someone uses it. Layer location notes beside the callout as **glance**, **closer look**, **specific action**, then **hidden**. Put first-look Perception or knowledge checks directly beside the callout. Order the notes like the block and reuse its feature names. Front any threat in this key even when the spoken opening builds toward it. Done when each withheld fact the DM needs is on the page outside the callout.
4. **Aim.** Write the **point**, one private sentence naming the single thing the block delivers: a threat, a Clue the Players can perceive, a choice of ways, a tone. Choose the **anchor**, the one feature the table will still mention next Session. The anchor usually carries the point.
5. **Draft.** Stand where the Party stands and tell what reaches them in the order it would. Open on the situation: who is doing what, in a kind of place the listener can furnish for themselves. Use second person for the Party's shared viewpoint, but never prescribe a PC's movement, words, feelings or choice. Keep the opening true from any entrance, lighting state or current occupancy. Danger leads in fight-shaped Hook and Climax slots. In Development and first looks, the layout may come first, but the reaction point and the DM-side key always front the threat. Build toward the point around the anchor, under the craft rules, inside the length band, and end on the **reaction point**. Split a multi-beat event at the first reaction into later callouts or turns. Done when the block exists and its last sentence is the reaction point.
6. **Revise.** Read the block silently once, then aloud once, and retell it from memory. Rewrite anything that requires a pause, re-read, spelling or paraphrase. Pass the draft through the `humanizer` skill to strip AI tells, keeping every fact and every hard line below (it changes how the block reads, never what it says). Then run `pnpm cf narration <page> --callout "<title>" --band <min>-<max>` (with `--old <file>` holding the block you replaced): it counts words and sentences and finds echoes, banned punctuation, compass words, foot counts, list-like runs, judgement words, stacked evaluative adjectives, chained relative clauses, dense proper names and spoken-word traps. Rewrite until it passes. Then run the final check, answering each item by quoting the block. Rewrite on every no, and repeat until a full pass changes nothing.
7. **File.** Replace the callout's body and keep its title. Run `pnpm check <page>` until it passes.

## Craft

- **Situation first.** The first sentence says what is happening and to whom. Terrain alone is a caption. Use a place that remains true from any entrance, lighting state and occupancy, and do not assume eyes, lungs, hair, footsteps or class senses. Describe features of the place and use non-sight evidence that every listener can receive. A single entrance, light level or occupant belongs in a later variant or DM note.
- **Compress.** Choose words that imply many others: "a storm-beaten fishing village" brings the nets and gulls with it. Give four to six things the Players could picture or act on, arranged around the anchor. Spoken openings use Chekhov's rule: each named detail earns attention because it is actionable, a route, a clue or the anchor. Move picturable but inert extras to the DM side. Compression keeps the anchor's specific nouns rather than replacing them with any-room filler. A person gets a first read, one feature a player would use to describe them to a friend, and one thing they are already doing. A Creature gets its silhouette, how it moves (even at rest, the way it shifts or settles), the part about to be used, and its size against something familiar. Neighbour areas get one orienting clause, not a tour, except in an overlook recipe.
- **Felt.** Something is already moving. Two senses work, one of them beyond sight and doing a second job: warm air deeper in the tunnel means something lives ahead. Something lands on the characters' bodies, such as spray, mud or heat. Avoid mechanical words such as *stunned*, *frightened*, *reaction*, *action* and *incapacitated* unless the rules meaning is intended. Describe the visible effect when it is not.
- **Told.** Each sentence hands off to the next by cause, by motion or by where the eye goes next. Two neighbouring sentences that could swap places without loss are a list: join them or cut one. Write each sentence so it can be the last one before a player interrupts. Keep exits, counts and dimensions in short, reusable forms in the DM notes. Pause after roughly two sentences, or sooner at a natural reaction point.
- **Evidence.** Every judgement word (abandoned, ancient, dangerous, angry, strange) is a conclusion. Give what led to it instead: "a bowl of stew skinned over on the table". Mood shows through bodies, purpose through use, and the past through what it left behind. Do not use *seems to be* or *appears to be* as perception hedges. State what reaches the characters and reserve uncertainty for a Perception or Investigation result. A planned misdirection may select true, perceivable facts to lead with, but it never lies or supplies an omniscient history. One comparison per block, drawn from the characters' own world, and it names one image or clause rather than opening a second scene.
- **Speakable.** Each sentence has one clear subject and a strong verb, and fits in one breath. The block must survive one silent read, one verbatim read aloud and a retelling from memory. Directions and distances are the body's: ahead, uphill, within reach, a bowshot. Compass bearings and foot counts belong to the DM's notes. Colours are one plain word or a comparison. Things carry the stable name a stranger would use, and a person's name enters once the Party knows it. State a feature's position explicitly, such as between the Party and the door, never merely "nearby". A fight-layout block is followed immediately by its sketch or map. The block is one paragraph. The project chooses one paragraph for spoken openings rather than bullet or nested-visible scripts. Use bullets for DM-side layers and delivery notes.
- **People.** An NPC who speaks gets a want, a physical cue and one line of about six seconds that asks, offers, presses or threatens, then stops for the Players. Lead in with the speaker, then give the complete line. Do not insert a speech tag between quoted sentences. Villain, quest-giver and other NPC plans are never an opening dump. Put later statements in Development, later callouts or combat rounds, about one round of information at a time. Keep the prose in the DM's natural speaking voice, not a more eloquent narrator.
- **Fresh words.** Take facts from the pages and leave their phrasing: the source's nouns said back in the source's order are an echo. Across a block, vary the phrasing only when it adds a detail. Across a Scene, repeat the stable noun for its salient anchor about three times so listeners retain it. Across the DM side, never rename a feature. Constants of a Site or Location are stated once at page or section level, then openings carry only differences. Repeat what is salient now, and state once what is always true. Speech already spoken at the table stays word for word.

## Delivery and layout

- **Serial position.** Put the interactable or immediate decision first or last, never in the attention trough. In a fight-shaped opening, threat leads. In a layout-first Development or first look, let the route be heard before the threat, then end on the reaction point. The DM-side key fronts the threat in every slot.
- **Chunking.** A block is a single pass, not a cutscene. Give roughly two sentences, pause for a decision, and move every next beat to a later callout or turn. A single callout may end at only one reaction point.
- **Audience.** Calibrate emphasis to this table's need for humour, atmosphere, tactical features or mystery without weakening canon, perceivable-only or player agency. Before a tactical map reveal, read the narration so the table forms a first image. Reveal the map or sketch immediately after narration when spatial layout matters, including for players who do not form visual images.
- **Repetition and interruption.** Boxed text replaces conversation only briefly. Re-offer dimensions, exits and counts in DM-side bullets as play asks for them. Parcel salient details to the listener who can use them, then name the first actor and stop. The DM may invite players to retell the last Session before reading **Previously On**, but the crafted block remains the archive of the table's true moments.
- **Verbal tools.** Put inscriptions, riddles, prophecies and other verbal information the table must reuse into the Handout slot. Give a reproducible form and avoid riddles that depend on a single language's spelling, sound or pun.
- **Prominence.** Give a conspicuous needed object or exit its own sentence. Embed a true, perceivable environmental detail only when it is background and the first look does not owe it. Never embed an immediate hazard or route.

## Hard lines

1. **The Players own their characters.** A PC does, says, decides and feels only what their player declared. Put the cause in the world: "the scream rattles the lantern glass".
2. **Only the perceivable.** The block holds what the characters can sense or already know. Omniscient narrator, cognitive experience, inferred history and judgement words stay out. Misdirection is allowed only by choosing which true perceivable facts lead.
3. **One event, stopped at the reaction point.** End at the first moment a player would act: the bowstring drawn, the beam groaning. Nothing lands until someone acts, and "What do you do?" is the DM's line. A multi-beat event is split across callouts or turns, never freeze-framed into one opening.
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

Quote the block's own words for each item.

- **Slot.** Does it do the recipe's Job, contain its Build and stop at its End?
- **Situation.** Quote the first sentence. Does it name who is doing what?
- **Canon.** Beside each detail in the block, name the page, image or DM line it came from. Any detail with no source comes out.
- **Count.** Number the things the Players could picture or act on: four to six, around the anchor? List each person's and Creature's features: exactly one, beside one behaviour?
- **Evidence.** Is any judgement word, mood word or page label left?
- **Felt.** One motion, two senses, something on the body?
- **Told.** Quote every pair of neighbouring sentences that could swap places, and each sentence's first two words: a run of fresh starts (You crossed, In the tower, Back in) is a list.
- **Speakable.** Is any sentence longer than a breath? Does the block survive silent read, verbatim read aloud and retelling from memory? Is there a compass word, a foot count, an em dash, a semicolon or a colon?
- **Placement.** Is every feature's position explicit? Are immediate blocking or lethal hazards in the first look? Is a fight-layout block paired with its map or sketch immediately after narration?
- **Delivery.** Can a player interrupt after any sentence? Are NPC attributions lead-in then line? Are no villain or quest-giver plans compressed into the opening? Are salient details repeated across the Scene and the first actor named?
- **Shape.** Is the actionable feature first or last, never buried? Does each neighbouring area get only a clause unless this is an overlook? Does each comparison stage only one image?
- **Echo.** Word by word against the old block and each source page, quote every run of four or more words they share (quoted speech aside). Any quote means a rewrite.
- **Tells.** On a World page's first meeting, quote the tell for each signature ability or hidden property the page lists. Any without one is added.
- **Hard lines.** Do all five hold, with the block ending on one event's reaction point?
- **Length.** Is it inside the band?
- **Better.** When rewriting a block: is every fact of the old block kept or moved to the DM's side, and is the new block more vivid and more exact?
