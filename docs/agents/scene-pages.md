# Scene pages

The procedure every Scene skill (`hook-scene`, `development-scene`, `cliffhanger-scene`, `climax-scene`, `resolution-scene`) follows to fill one Scene page from its row on the Prep's Scene Chart. The kind's own skill adds its craft and its card catalogue.

## Steps

1. **Ground.** Read the Prep's Scene Chart row (kind, premise, card, Threads, Spotlight, what it hands to), the Prep's Opposition and Clues, the outcomes of the Scene before it (what the Party carries in: positions, conditions, resources, knowledge), and the pages of every person, place, Creature and Item the row names. Done when you can state where the Party is, what they know and what they carry as the Scene opens.
2. **Card.** Pick the card from the kind's catalogue that the fiction calls for. The card shapes the Scene and stays off the page.
3. **Cast.** Everyone and everything the Scene needs has a page before any text depends on it: reuse one from the Wiki first, and make what nothing fits with its design skill (`npc-design`, `creature-design`, `location-design`, `item-design`).
4. **Fill** the kind's template (`wiki/templates/Scene - <Kind>.md`) at `Sessions/Session <N>/Session <N> - <Scene title>.md`, with the kind's craft. Every check has its Ability (Skill) and DC; every person links their page; every Creature fought is embedded as `![[Creature#Statblock]]` in the Encounter, and linked everywhere else.
5. **Narration.** `theatre-of-the-mind` fills the `[!narration]` Opening (Closing image for a Resolution), plus an extra callout for each NPC or Creature the Party meets here and for a Revelation that lands.
6. **Outcomes.** One row for each result play can plausibly produce: what changes in the World, and the Scene it hands to. A result the page fixes before the Party acts is Narration, not play: rewrite it as a choice or a contest.
7. **Cold read.** Read the page as the DM would at the table, with nothing else open: every name linked, every roll ruled, every outcome handing on, nothing the Players must learn resting on one roll. Then `pnpm check <page>` until it passes.

## Encounters

A Cliffhanger's or Climax's Encounter is balanced against the Party under the 2024 rules: the XP budget per character for Low, Moderate or High difficulty, summed for the Party, spent on Creatures by their XP (confirm both tables with the `dnd5e-srd-api` skill). Record the difficulty and the arithmetic under `### Balance`, then say what the battlefield and the opposition's tactics add or take away from the number.
