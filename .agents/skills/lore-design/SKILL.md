---
name: lore-design
description: Makes or deepens a Lore page, World knowledge that belongs to no single other page (history, cosmology, custom, a past event, a legend), with the plain truth, the versions people tell, and the Clues that lead the Party to it. Use when a question about the World's past or workings needs a settled answer, or when a legend, custom or event needs a page.
---

# Lore design

Lore is knowledge that belongs to no one Location, NPC, Faction, Deity, Creature or Item. A good Lore page states the truth plainly for the DM and records who believes something else. It also makes the truth matter now. Someone acts on it, and the Party can uncover it through play.

## Steps

1. **Read the Canon.** With qmd, find the page if it exists, every page that links to it, and every page that tells part of the story, including Recaps and Transcripts in `archive/`. Note each claim with the page that makes it. Change each page as its `revealed` property allows (`CONTEXT.md` **Revealed**). Done when every telling in the Wiki is on the list.
2. **Source it** in the order `AGENTS.md` sets. Start with the Wiki's own tellings. Next, search the web for published or homebrew lore that fits and adapt it. Last, invent new lore inspired by the search.
3. **Answer the question.** Write the truth in one plain sentence. Then give the full account of what happened and when (in the World's Calendar), who did it and why, and what it left behind. Mark each claim from step 1 true, distorted (and how), or false (and who spreads it). Where the Canon is silent, decide it as Canon (ADR 0003).
4. **Make it matter now.** Why it matters to the current Campaign: a person, place or prize it touches. Who else knows or wants the truth, as named NPCs or Factions, and what each does about it on their own clock. What the Party gains by acting on it.
5. **Accounts and Clues.** Write two to four accounts people hold, each with its holder. Add the common telling a tavern would give. Quote verbatim any text the Party can read, such as an inscription, letter or song. For each conclusion the Party needs, place three independent Clues in different places (a person, an object, a place). Add the signs Players notice in the World before anyone explains them.
6. **Narration.** Hand `theatre-of-the-mind` the As it is told slot: the common telling, in a teller's voice.
7. **File** to `wiki/templates/Lore.md` in `<campaign-folder>/Lore/` (a page already filed keeps its folder):
   - **At a glance:** the truth in one sentence and who knows it. Add its limits and how it reaches play.
   - **Play:** what Players notice and the accounts with their holders. List each Clue with the page it appears on.
   - **Depth:** the full truth in `###` parts titled for their content, such as `Chronology`, `How it works` or `Tenets`.

   Link each page where a Clue appears, and add the Clue's line to that page. New facts decided as Canon are listed in your reply. Close per `skill://lint` § Commands with every touched page.

## Done

- Every telling in the Wiki is marked true, distorted or false.
- At least one named NPC or Faction acts on the truth on their own clock.
- Each account states its holder, and each needed conclusion has three Clues in different places.
- The page gate over every touched page reports `ok: 0 findings`, and the reply lists every new fact decided as Canon.
