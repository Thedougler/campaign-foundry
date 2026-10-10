# Scene pages

The shared procedure for `hook-scene`, `development-scene`, `cliffhanger-scene`, `climax-scene` and `resolution-scene`. Each kind's skill contains the ordered steps and references the section below that a step applies. Read this whole file once, at the kind skill's first step, and come back to a section when a step references it.

## Paths

Run every command from the repo root. A page path in a `cf` command starts with `wiki/`.

- **Content pages.** `wiki/<campaign>/<Folder>/<slug>.md`, in the folders `Locations`, `NPCs`, `Creatures`, `Factions`, `Deities`, `Items`, `Spells`, `Vehicles`, `Lore`, `House Rules`, `PCs`, `Threads` and `Quests`. `<slug>` is the slug of the page's `title` (`docs/wiki-layout.md` **Page names**). `<campaign>` is the Campaign folder (`shattered-sea`), which `user-config.md` names.
- **Session pages.** `wiki/<campaign>/Sessions/Session <N>/session-<N>-<slug>.md`, titled `Session <N> - <Title>`. The titles are `Prep`, `Recap`, `Previously On` (recounting Session N−1) and one per Scene, named for the Scene.
- **Template.** `wiki/templates/Scene - <Kind>.md`.
- **Links.** A `[[<slug>|<Title>]]` link targets a page in its kind's folder above and shows its title. An NPC's fighting statistics sit on the Creature page its `creature` property links.
- **Archived sources.** Repo-relative paths under `archive/`, listed in each page's `sources` property.
- **PC level.** The `**Class, species and level.**` line in the PC page's `## Sheet`. A multiclass character's level is the sum of its class levels.

## Orient

1. Read these files in order:
   - repo-root `user-config.md`;
   - `wiki/<campaign>/campaign-config.md`;
   - `wiki/<campaign>/hot.md` (orientation, not evidence);
   - `wiki/<campaign>/index.md`, the catalogue for looking up page names;
   - the last ten entries of `wiki/<campaign>/log.md`;
   - `wiki/templates/Scene - <Kind>.md`.

   Reuse a caller's completed orientation when it covers this Campaign and request.
2. Resolve the Campaign, Session number, exact kind, destination path and completion owner:
   - A `prep-session` child receives its Scene Chart row, Party, Opposition, Clues, Spotlight, predecessor alternatives and destination paths.
   - A direct DM request names the Scene. When its page exists, the request is a redo: edit that page in place at its path.
   - A bounded brief without Prep supplies the kind, premise, entry state, Threads, Spotlight and intended carry-forward. Author the Scene from that brief and link it from the Campaign overview rather than inventing an incomplete Prep.
3. Add or update only this Scene's planning material, preserving the Session's objective. Missing Session intent goes to `plan-session`. Assembling or changing the whole chart belongs to `prep-session`.

**Done when** the Scene's purpose, destination path and inputs are named, and either a composing caller or this standalone operation is set to run the final gate and log.

## Ground

Find the pages that bear on this Scene by searching the Wiki (`.omp/AGENTS.md` § Wiki access) and following links on the pages you read, then read each page behind a hit. Which pages matter is your judgement. Look for:

- **The Session around it.** The Prep's Scene Chart row, Clues, Party and Opposition, the Scene's own page when it exists, and the archived files its `sources` list. For a Scene after the Hook, find the prepared outcomes that hand into it. A Resolution needs the Climax's, and a Hook needs the last played Recap and final Scene.
- **What play has settled.** For a played Session, its Recap and the next Session's Previously On, which record what happened.
- **The Party.** Read the Sheet, goals and current conditions of each PC who can take part.
- **What the Scene puts on stage.** The NPCs and their Creature pages, the Threads, Locations, Factions, Items, Vehicles and House Rules the Scene uses, including subjects the request names.

Apply what you read:

- The DM's stated corrections in the request override the page and its sources. Played events establish facts. Unplayed branches remain alternatives.
- Carry positions, knowledge, ownership, conditions, resources and any live clock that changes this Scene.
- Match each reused table-use fact to its owner passage: terrain costs, damage, checks, escape procedures and encounter state keep their sourced values and conditions. Read the linked owner before replacing a rule with local improvisation.
- Decide a truly missing design fact consistently with Canon and the DM's intent, and mark it apart from established events in the return.

**Done when** each opening dependency and reused rule has a read source passage or a stated missing-fact decision, and every reachable predecessor branch has an entry state rather than an assumed victory.

## Card

Select the kind's card against the entry state, Thread and requested purpose. When the chart row supplies a card, use it unless it conflicts with the established fiction, and return the reason for any local correction. Record the card in Prep's planning material, outside Scene properties and spoken Narration. Without Prep, give it in the return for later charting. Apply **Scripting the Game** below.

**Done when** the chosen card, pressure or turn, table-time allotment, Spotlight and next destination fit the exact kind and the chart or bounded standalone brief.

## Cast

Reuse the first fitting source in `AGENTS.md` **Sourcing** order. Start with the Wiki, then the 2024 SRD through `dnd5e-srd-api`. Next come official or existing published or homebrew material through the harness's web search and fetch tools, then novel design. Read the full facts on the page itself before using them.

- Create only missing owners, through the matching skill: `npc-design`, `creature-design`, `location-design`, `item-design`, `faction-design`, `vehicle-design`, `spell-design` or `lore-design`. Supply Canon, local purpose, Party facts, intended paths and the enclosing operation. Wait for complete pages and touched paths before relying on them.
- Take an NPC's fighting statistics from its linked Creature page, separate from its identity page.
- Copy each `sources` path exactly from a page or file you read, and confirm the file opens. List only archived-Raw paths there, and use `sources: []` when none applies. External rule sources go in a body attribution.

**Done when** every needed named entity and rules owner exists, its links and provenance paths resolve, and each new page has a content link in from the Scene or another relevant page.

## Page format

Start from the existing page for a redo, or from the template copied to `wiki/<campaign>/Sessions/Session <N>/session-<N>-<scene-slug>.md` for a new Scene.

- **Properties.** `title: "Session <N> - <Scene title>"`, `type: Scene`, `kind: <Kind>`, a one-line `summary` in double quotes, and `sources` as a list of quoted archive paths.
- **Spine.** Keep every `##` heading at its depth and in template order, and every required callout type. A `##` whose guidance opens with `Optional.` appears, in template order, only when the Scene uses it. A `###` is optional structure: keep it where it has content. Add `####` subheadings inside that spine as content needs them.
- **Guidance.** Delete every `%% %%` comment after filling its section with the content the comment specifies.
- **At a glance.** Keep each template bullet's bold label and write its line after the label.
- **Checks.** One row per uncertain action, in this format. In `Intent`, give the trigger and action or time cost:

  ```markdown
  | Intent | Approach | DC | Success | Failure |
  | --- | --- | --- | --- | --- |
  | Climb the wall without rope | Strength (Athletics) | 15 | Up to the ledge. | Slide back and take 1d6 Bludgeoning damage. |
  ```

  For a save, specify the ability, DC and effects. For a contest, specify both sides and the tie. A sensible action without real doubt simply works, without a row.
- **Outcomes.** Keep the template's `| If | Then | Hands to |` table, one row per result. `Hands to` holds the receiving Scene's link, such as `[[session-12-terror-birds\|Session 12 - Terror-Birds]]` (a pipe inside a table cell is escaped).
- **Statblocks.** Creature statistics stay on their owner pages. The Scene shows them only as `![[<creature-slug>#Statblock|<Creature title>]]` embeds in its Encounter.
- **Prep link.** Link the page from Prep's Scene Chart when Prep exists, and update the row's planning notes or Clue routes where this Scene changes them.

Put every table-use fact on the page. State who wants what and by which means, and how each side responds. Give useful spatial relationships, pressure triggers, accessible choices and consequences. Each hidden truth has a concrete way to learn it. Each required conclusion is discoverable through three independent routes across the chart or the standalone Scene. A failed check changes cost or position and leaves a way forward open. Use **Encounters** wherever physical danger is present.

**Done when** the page matches the template's actual spine and the DM can adjudicate each offered action from its sourced rules and rendered owner embeds.

## Narration

Write each `[!narration]` callout yourself with `theatre-of-the-mind`, once the DM-side facts exist. Read exactly these parts:

- `.agents/skills/theatre-of-the-mind/SKILL.md`, Steps 1 to 4, Craft, Hard lines and Final check. Its Step 5 gate runs once, in **Completion** below.
- `.agents/skills/theatre-of-the-mind/references/recipes.md`: the shared rules at its top, `## Openings and first looks`, `## Scene openings`, and the recipe heading for each callout you write. The template callout uses the kind's heading (`### Hook`, `### Development`, `### Cliffhanger`, `### Climax` or `### Closing image`). A callout titled with an NPC's or Creature's name uses `### NPC entering` or `### Creature entering`. A major reveal uses `### Revelation`, and a cut across unplayed time or space uses `### Transition`.
- `.agents/skills/theatre-of-the-mind/references/critique.md`, once, at its Step 4.
- `reference/gm-voice/passages.md`: the three example passages theatre-of-the-mind Step 2 reads, as that step sets out.

Its caller-supplied pages are this Scene and the pages you read in **Ground**. Give each callout its title, the Scene kind, the actual viewpoint, the entry condition and the spatial facts.

Place callouts in these formats:

- The template's callout keeps the template's title exactly, such as `> [!narration] Opening`.
- An NPC or Creature entering sits under `## Play` or the Encounter, titled with the subject's name: `> [!narration] Luca Ferrante`. A major Revelation gets its own conditional callout there.
- When entry states change what the Party can perceive, write one variant per entry. Each variant keeps the same title, and a plain DM-side line directly above it specifies the entry that selects it:

  ```markdown
  Read when Skarn escaped with the Spinner.

  > [!narration] Closing image
  > …

  Read when the Party kept the Spinner.

  > [!narration] Closing image
  > …
  ```

  The narration gate compares variants with each other, so give each its own wording rather than shared runs of four or more words.
- When an established result settles an unplayed cut of time or space, put a `Transition` callout immediately before the destination's opening or closing slot. Leave unresolved travel choices to the Players.

Check the filed prose against the Final check items that apply, quoting its actual words, then against every entry that can select it. Repair mismatched carriers, companions, possessions or positions.

**Done when** every required spoken slot is filed, its applicable Narration checks have quoted evidence, each variant's visible facts are true on its own condition, and live events stop where the Players can respond.

## Outcomes

For Hook, Development, Cliffhanger and Climax, fill `## Outcomes`. Each materially different result gives its trigger, the concrete World change and the receiving Scene's link on the chart.

- Cover offered approaches, failure, withdrawal, waiting or refusal where they change the situation.
- Give the receiving Scene the resulting knowledge, positions, ownership, conditions, resources and clock state it needs. Results share a destination only when its entry works for each of them.
- A standalone Scene without a chart states its next pressure, trigger and handed-on state in the same rows, ready for charting, and links only pages that exist.
- Proposed deaths, captures, rewards and Thread changes remain conditional Prep, not updates to current Canon.

A Resolution instead gives its Climax-conditioned payoffs, reactions, rewards and next-Session carry-forward in `## Play` and `## Threads`, as its template requires.

**Done when** each prepared result has a usable successor state or Session-ending carry-forward and every existing receiving page accounts for it. Return pending entry variants to the caller for pages not yet authored.

## Encounters

Use this section for a Cliffhanger or Climax with Creatures the Party might fight, including a violent fallback to negotiation. Also use it for an action Hook borrowing Cliffhanger craft. `bun run cf -- encounter-budget` classifies Creature spend only. Choosing the opposition and judging other dangers remain your job. When a command exits 2, read its `--help` and correct the call.

Read `bun run cf -- encounter-budget --help` before budgeting. The invocations below show the required syntax. Replace the example levels and force with the Scene's sourced values.

1. **Budget.** Establish the participating PCs from their Sheets and incoming conditions, excluding anyone unable to participate and stating why. Choose Low, Moderate or High to match the row and the kind's craft. Print the Party's budgets with the sheet levels, comma-separated:

   `bun run cf -- encounter-budget --levels 5,5,5,5`

   Apply sourced House Rules first. Take every total from the CLI output, never from a table, memory or hand arithmetic. The CLI adds a +1 combat offset to each level because this Party fights above the calculator, so pass sheet levels without adding it. **Done when** the contributing PCs and levels match the entry and the CLI has printed that Party's Low, Moderate and High totals.

2. **Spend.** Take each opposing type's count, CR and XP from its read Wiki or 2024 SRD statblock (Canon, then `dnd5e-srd-api`, then published material). Pass them to the same command, one `--creature` per type:

   `bun run cf -- encounter-budget --levels 5,5,5,5 --target high --creature "Terror-Bird,13,10000,2"`

   - Equal to a band ceiling is that band, and one XP over High is Beyond High. The bands follow the 2024 rules alone: no 2014 monster-count multiplier and no Easy/Medium/Hard/Deadly thresholds.
   - Read the printed band and any `Vs` delta, then decide whether that spend is the right fight.
   - When Canon fixes an over-budget force, keep the CLI's label, state the excess, and give playable avoidance, escape or objective routes rather than claiming a balanced fight or changing recorded statistics.
   - State when reinforcements arrive and whether waves overlap. Count every distinct opponent that can take part, once, however its tactics change.
   - Give mutually exclusive opposing forces a run each. A duel uses only the PCs actually fighting.

   **Done when** each comparison is the CLI's printed totals for that force and the page's description of danger matches the planned contest, including what XP does not cover.

3. **Expose the plan.** Copy the CLI's Encounter Balance lines under `### Balance` in a Cliffhanger's `## Encounter`, or under `#### Balance` in `### Encounter` under `## Play` for a fighting Hook or Climax.
   - Identify `bun run cf -- encounter-budget` as the source, with the participating PCs and the Creature pages supplying XP.
   - Give quantities, deployment, battlefield features, opposition objectives, opening tactics, adaptations and break or escape conditions.
   - Embed each fought Creature as `![[<creature-slug>#Statblock|<Creature title>]]` here and link it elsewhere, with named NPC combatants resolved to their Creature owners.
   - State how terrain, surprise, allies, depleted resources, hazards and objectives change the actual danger.

   **Done when** the DM has the entire playable opposition, every XP figure traces to the CLI output and a read statblock, and the page states what the XP comparison does not measure.

A creature-free chase or hazard has no Creature XP to spend. A Cliffhanger of that kind leaves out its optional `## Encounter` and calibrates its danger under `## Play` with sourced DCs, damage or conditions, action costs, duration, escape routes and resource demands. A non-action Development or Resolution stays non-action, without an unplanned fight.

## Cold read

Read the Scene and its rendered embeds as the DM would, with no sourcebooks or chat available. Run the kind skill's cold-read criteria, then trace each entry through its options to an exit. Confirm on the way:

- names resolve, and rules and statistics are on the page or its embeds;
- pressure advances on stated triggers;
- critical information has several routes;
- the Narration fits each entry;
- no result depends on the Party accepting a predetermined answer.

Compare the heading spine with the template, each `sources` path with its file, each reused ruling with its owner passage, and Balance numbers with the `bun run cf -- encounter-budget` output and Party evidence. Correct mismatches in the Scene and its local Prep material, and return any required chart recomputation to its owner.

**Done when** the kind's criteria hold in the actual page, every entry and exit is runnable, every source and template comparison agrees, and each cited table-use fact is on the page.

## Completion

### Standalone

From the repo root, close per `skill://lint` § Commands over the Scene and every page this run touched, reading `bun run cf -- check --help` first for the installed syntax. Gate findings are unfinished authoring: rewrite the flagged sentence for every finding while keeping Canon, then rerun the gate to `ok: 0 findings` (`AGENTS.md` **Zero findings**). Keep every layer enabled. For an assigned filesystem root, see **Another root** there.

After the page gate passes, append one log entry listing every touched content page by its vault-relative path:

```bash
bun run cf -- log --op create --title "Author Session <N> <Scene title>" --page "<campaign>/Sessions/Session <N>/session-<N>-<scene-slug>.md"
```

**Done when** the page and all dependencies are runnable, the index is current, the page gate reported `ok: 0 findings`, and the log entry exists.

When an explicit caller runs the final operation, check each page you write by its **Page check** (`skill://lint` § Commands) and repair its findings. Return the authored Scene, owner pages, changed Prep material, every touched path, design decisions, conditional incoming and outgoing states, and any tooling findings. Give the caller the actual pending destination paths and entry variants, not name-only promises.

The caller closes per `skill://lint` § Commands over every touched path. Once the gate prints `ok: 0 findings`, the caller records one log entry for all touched pages, then performs its remaining hot and Push steps. Leave those duties with that caller. A child return is not a claim that Prep or Push has completed.

**Done when** every local craft and cold-read criterion holds, each page you wrote passed its own check, and the caller has the full return needed to finish end to end. A handoff with a failing gate is still an incomplete operation.

## Scripting the Game

Mike Pondsmith's *Scripting the Game* is the pacing method, and it takes precedence over a loose pool of potential Scenes. A Session runs one Hook first, alternating non-action Developments and physical-risk Cliffhangers in the middle, then one Climax and its Resolution. After an action Hook the middle starts with a Development, and after a cerebral Hook it starts with a Cliffhanger. The final middle Scene can lead directly into the Climax. In a compact Session with no middle Scenes, the Hook leads straight into the Climax.

Use approximately thirty minutes per Scene and the actual chart's Minutes allocation. The Hook, Climax and Resolution reserve about ninety minutes together. Middle Scenes fit the remaining Session length, not a quota. A kind's shorter contest or closing image can leave room elsewhere. In-world clocks state their own units separately from table minutes. An uncertain result changes the next Scene's entry. The chart orders pressure and opportunities, and victories, accepted jobs and routes remain open.
