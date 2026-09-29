---
name: theatre-of-the-mind
description: Writes Narration, the prose the DM speaks or shows to the Players, into `[!narration]` callouts. That covers Scene openings and closing images, first looks at NPCs, Creatures, Items, Locations and Vehicles, the Previously On, Handout text and every other narration slot. Use whenever a `[!narration]` callout needs writing or rewriting.
---

# Theatre of the mind

Narration is the one part of the Wiki the Players hear. The DM reads it aloud once, and from that one hearing the table has to see the place, know what matters and want to act. It has worked when the Players start proposing actions without asking the DM to say it again. It sounds like a confident DM telling a story at the table, with the economy of speech rather than the texture of a novel or the order of a report. A block that is accurate but flat fails as surely as one that is padded.

## Steps

1. **Find the slot.** The callout's title names it. Read its recipe in [references/recipes.md](references/recipes.md); a Previously On follows [references/previously-on.md](references/previously-on.md), which replaces steps 3 to 5. Done when you can quote the recipe's Job, Build and End.
2. **Gather.** When rewriting, first save the old block to a scratch file for step 6, copy its facts onto your list as keywords, and close it: its phrasing is what you are replacing. Then read the page and every page it links that the moment touches: the Location and its `parent`, each NPC, Creature and Item present, and any Narration the Players have already heard about the same subject. Keep a private fact list of what the characters can perceive right now, each fact as bare keywords with its page (`ferryman: lantern, charcoal ring on the hull, [[Old Ferry]]`). Open every image of the subject in the World's `attachments/`. The art often holds the colour, the marks and the anchor. Done when every source is read and every fact on the list names its page. Only listed facts reach the block: a detail no page, image or DM line gives stays out, however well it would fit.
3. **Withhold.** Move to the DM's side of the page everything the characters cannot perceive from where they stand, and everything that waits on play: secrets, true names, mechanics, DCs, the inside of closed things, how anyone responds to the Party, other ways in, and what a carried Item does until someone uses it. Done when each withheld fact the DM needs is on the page outside the callout.
4. **Aim.** Write the **point**, one private sentence naming the single thing the block delivers: a threat, a Clue the Players can perceive, a choice of ways, a tone. Choose the **anchor**, the one feature the table will still mention next Session. The anchor usually carries the point.
5. **Draft.** Stand where the Party stands and tell what reaches them in the order it would. Open on the situation: who is doing what, in a kind of place the listener can furnish for themselves. Danger leads when there is danger. Build toward the point around the anchor, under the craft rules, inside the length band, and end on the **reaction point**. Done when the block exists and its last sentence is the reaction point.
6. **Revise.** Read the block aloud once and rewrite every sentence that snags. Then run `pnpm cf narration <page> --callout "<title>" --band <min>-<max>` (with `--old <file>` holding the block you replaced): it counts words and sentences and finds echoes, banned punctuation, compass words, foot counts, list-like runs and judgement words. Rewrite until it passes. Then run the final check, answering each item by quoting the block. Rewrite on every no, and repeat until a full pass changes nothing.
7. **File.** Replace the callout's body and keep its title. Run `pnpm check <page>` until it passes.

## Craft

- **Situation first.** The first sentence says what is happening and to whom. Terrain alone is a caption; ground, light and air arrive later, where the body meets them.
- **Compress.** Choose words that imply many others: "a storm-beaten fishing village" brings the nets and gulls with it. Give four to six things the Players could picture or act on, arranged around the anchor; a group counts once when one noun covers it. A person gets a first read, one feature a player would use to describe them to a friend, and one thing they are already doing; their other clothes, gear and smells move to the DM's side of the page, never out of the Wiki. A Creature gets its silhouette, how it moves (even at rest, the way it shifts or settles), the part about to be used, and its size against something familiar.
- **Felt.** Something is already moving. Two senses work, one of them beyond sight and doing a second job: warm air deeper in the tunnel means something lives ahead. Something lands on the characters' bodies, such as spray, mud or heat.
- **Told.** Each sentence hands off to the next by cause, by motion or by where the eye goes next. Two neighbouring sentences that could swap places without loss are a list: join them or cut one.
- **Evidence.** Every judgement word (abandoned, ancient, dangerous, angry, strange) is a conclusion. Give what led to it instead: "a bowl of stew skinned over on the table". Mood shows through bodies, purpose through use, and the past through what it left behind. One comparison per block, drawn from the characters' own world.
- **Speakable.** Each sentence has one clear subject and a strong verb, and fits in one breath. Directions and distances are the body's: ahead, uphill, within reach, a bowshot. Compass bearings and foot counts belong to the DM's notes. Colours are one plain word or a comparison. Things carry the name a stranger would use, and a person's name enters once the Party knows it. The block is one paragraph.
- **People.** An NPC who speaks gets a want, a physical cue and one line of about six seconds that asks, offers, presses or threatens, then stops for the Players. What they know stays on the DM's side, given out as the Players ask.
- **Fresh words.** Take facts from the pages and leave their phrasing: the source's nouns said back in the source's order are an echo. Each return to a subject uses a new name that adds a detail (the falcon, then the peregrine). Speech already spoken at the table stays word for word.

## Hard lines

1. **The Players own their characters.** A PC does, says, decides and feels only what their player declared. Put the cause in the world: "the scream rattles the lantern glass".
2. **Only the perceivable.** The block holds what the characters can sense or already know.
3. **One event, stopped at the reaction point.** End at the first moment a player would act: the bowstring drawn, the beam groaning. Nothing lands until someone acts, and "What do you do?" is the DM's line.
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
- **Speakable.** Is any sentence longer than a breath? Is there a compass word, a foot count, an em dash, a semicolon or a colon?
- **Echo.** Word by word against the old block and each source page, quote every run of four or more words they share (quoted speech aside). Any quote means a rewrite.
- **Tells.** On a World page's first meeting, quote the tell for each signature ability or hidden property the page lists. Any without one is added.
- **Hard lines.** Do all five hold, with the block ending on one event's reaction point?
- **Length.** Is it inside the band?
- **Better.** When rewriting a block: is every fact of the old block kept or moved to the DM's side, and is the new block more vivid and more exact?
