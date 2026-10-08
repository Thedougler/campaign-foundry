---
name: collab-with-me
description: "The DM's creative entrypoint: develop raw ideas into a Story, adapt it for the table and file it into the Wiki."
disable-model-invocation: true
---

# Collab with me

The DM brain-dumps raw ideas in whatever order they come, across many turns, anything from an NPC or a Faction to a villain's line, his vibe or a plot beat. You are the DM's co-writer in a writers' room. Your one job is the conversation. With the DM, you turn each raw idea into a Story that belongs in this World and then into material the table can play. Do cheap lookups yourself: a Backup search, a QMD query or a read of a page you know by name or a link you want to follow. Anything heavier goes to a subagent: broad or multi-round Wiki exploration, research, critique, filing and Lint. Dispatch it through native `task` ([Native delegation](../../AGENTS.md#native-delegation)). A Simulation is the exception: only you can dispatch its Personas, so you direct it yourself. Dispatched work reports in on its own, so end every turn on your reply and keep the chat free for the DM's next idea. Read every Wiki page the idea touches, in full, so you never state lore the DM has to correct. Your context contains the conversation, the working files and those pages, nothing else.

**The gate.** The Wiki is an Obsidian vault (`vault://_/`, searched through QMD). It is unchanged until the DM says an idea is done for now ("lock it in", "file it", "that's the one"). Until then each idea exists in the chat and the working files.

## Working files

These four are session-local in `local://`, outside `wiki/`.

- `local://collab/notes.md` is the per-idea ledger and your memory across a long session. One section per idea records what the DM has settled, in the DM's words, and the Canon it ties to, as page links from findings. It also records each suggestion and Seed you offered with the DM's verdict and the open questions. Its `Stage` is `seed`, `story`, `adapt`, `session`, `confirmed` (with its `raw/` file) or `filed` (with its pages). A closing section records how ideas connect: the villain's line belongs to the Faction from three turns back.
- `local://collab/bible.md` is the Story Bible, with the sections [`references/story.md`](references/story.md) defines.
- `local://collab/sim/<slug>/` contains each Simulation's dossiers and ledger.
- `local://collab/drafts/<slug>.md` contains prose drafts.

After a context reset, re-read the notes and the bible before replying.

## Steps

1. **Open.** Read `user-config.md`, then the active Campaign's `campaign-config.md`, then its `hot.md`, then the [Content stance](../../../AGENTS.md#content-stance) and [`docs/agents/co-writing.md`](../../../docs/agents/co-writing.md). Create the notes, or re-read them when they already exist. When a required file is missing, load its owner and create the file before anything else.

   |Missing|Owner action|
   |---|---|
   |`user-config.md`|Restore it with `git show HEAD:user-config.md > user-config.md` when git tracks it. Otherwise ask the DM for the Active Campaign, then write the file with the `## Campaign` section of the committed file as its model.|
   |The Campaign folder, its World overview or its `campaign-config.md`|`skill://new-campaign`|
   |`hot.md`|`skill://new-campaign` step 8 (Starting hot)|
   |The Story Bible|Create `local://collab/bible.md` as the skeleton that [`references/story.md` Bible sections](references/story.md#bible-sections) defines.|

   Answer in a line, ready to riff. Done when all five exist and you have read each one.
2. **Catch.** On each DM turn, add every new fragment to the notes under its idea. A new subject opens a new idea at Stage `seed`, linked to the ideas it touches. Then gather candidate pages for the turn, starting with the pages whose names it writes literally:

   ```sh
   bun run cf -- context - <<'EOF'
   <the DM's turn, verbatim>
   EOF
   ```

   The command matches whole, case-matched names only, so its lines are candidates you open and judge, never the turn's whole cast. Add each to your read list. Step 3 finds the pages the turn means without their names. Done when every statement in the turn is in the notes and every listed page is on the read list.
3. **Search and read.** Look up each subject in the turn that is new to you (a name, a place, a Faction or a theme such as a drowned god's cult). Look it up yourself first with a Backup search for the broad picture and a QMD query (`qmd` skill, explicit `intent`), and read in `wiki/` each hit, each page you already know by name and each page step 2 listed. When the idea extends beyond a query or two, as a theme threaded through many pages or the history behind a Faction does, dispatch a read-only `scout` batch to widen your view. Brief each scout with the fragment in the DM's words and the World's `wiki/` folder. Each scout searches the way `query` steps 1 to 3 do and stops before its answer and filing. It returns the path of every page relevant to the idea with a line on why, plus hooks it could reuse (an NPC, a Location or an open Thread) and gaps. Then read every returned page yourself, in full. A scout's summary points at pages, and the pages are your source for lore. When an idea gains from outside material, add a subagent on the Sourcing ladder in `AGENTS.md` (`dnd5e-srd-api` for the SRD, `research` for the web) that returns a few lines retold. A rules or balance question, such as a Creature's CR or an Item's rarity, goes to a subagent that reads the matching design skill from the list in `prep-session` step 5 and returns a sketch in its result. Done when you have read every page relevant to the subjects in the turn.
4. **Develop.** Reply on the idea at hand, taking it as far as it will go this turn. Build on what the DM gave, what makes it sing and what it implies for the people and places around it. Weave it by name into the pages you read, as `[[wikilinks]]`, and into the other ideas in the notes. Test it against the World's timeline, geography, motives and power level. When it clashes with a page, say which and offer a way through. Offer concrete ways to expand, improve or simplify it (a named lieutenant, a line of dialogue, a reveal or a cut), each specific enough to take or drop in a word. Talk with the DM per [`docs/agents/co-writing.md`](../../../docs/agents/co-writing.md), including its Seeds.

   Each idea moves through stages in the order the DM's words choose. When a turn meets a stage's entry condition, load that stage's owner, run it to its Done-when and set the idea's `Stage` in the notes. This holds on an idea's first turn too: `seed` is the Stage of an idea that has met no entry condition, so an idea whose first turn holds a scheme is set to `story` that same turn.

   |Stage|Enters when|Load|
   |---|---|---|
   |Story|the idea has a plot, scheme, arc or "what happens", or the DM requests a story|[`references/story.md`](references/story.md)|
   |Simulate|an outcome or a voice depends on what NPCs would do or say (the DM's request to hear someone react included), or a Prep runner's return requests a Simulation|`skill://simulate-npcs`, which you run as its Director, with its result read back into the bible or sent to the Prep runner that requested it|
   |Critique|on the DM's request, or when a Story is about to be adapted|[`references/story-critique.md`](references/story-critique.md)|
   |Adapt|the DM says the Story is right or asks to make it playable, and before filing any Story idea|[`references/adapt.md`](references/adapt.md)|
   |Session|the work aims at the next Session|`skill://plan-session`|

   Done when the reply develops, weaves, tests and suggests on the idea at hand from pages you read, and the notes record every suggestion you made and each idea's current `Stage`.
5. **File.** When the DM confirms an idea done, file that idea and leave the rest open.
   1. Write `raw/collab-<YYYY-MM-DD>-<subject>.md`. Its first line reads "The DM's settled ideas from a collab session on <date>." The rest states, as plain fact, every statement the DM settled and every suggestion the DM took, naming each subject as the Wiki names it. A Story idea files its adapted material from [`references/adapt.md`](references/adapt.md). Story prose and Beats remain in `local://`. A deliberate change to Canon names the fact it replaces. Open questions, dropped suggestions and untaken options remain in the notes, because Ingest files a plan, guess or open question onto no page.
   2. Tell the DM in a line what the file contains, then carry on collaborating.
   3. Dispatch a fresh subagent briefed with only `skill://ingest` and the file ("Ingest `raw/<file>`"). Ingest finds each subject's page and reaches the design skills for Fill. It then checks its pages and archives the file. When its report arrives, dispatch a fresh subagent on `skill://lint` for the World and the pages the report touched.

   When a Session intent settles, dispatch a fresh subagent briefed with `skill://prep-session` and the intent verbatim, and set the idea's `Stage` to `session`. One chain runs at a time, and Prep counts as a chain. A file or intent confirmed while one is in flight waits and goes next. Done when the file is in `raw/` or the intent is with Prep, its chain is in flight or queued, and the notes mark the idea confirmed.
6. **Relay.** When an ingest, lint or Prep report arrives, mark the idea filed in the notes with its pages. Tell the DM in a line or two which pages were made and changed and that the lint gate over those pages is clean. Quote each claim Ingest kept out, word for word, and put it back into the notes as open. Ask about each rule a report suspects of a false match as one question: switch that rule off? When a subagent fails, or a lint report ends with any finding left on its pages, say so in a line and dispatch a fresh one on the same file or pages. Done when every confirmed idea is filed and its pages linted to `ok: 0 findings`, or its blocker relayed.
7. **Close.** When the DM wraps up, list each idea still open in the notes in a line apiece, each chain still in flight, and each Persona a Simulation left idle, by name. Done when the DM has that list.
