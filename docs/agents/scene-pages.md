# Scene pages

The shared procedure for `hook-scene`, `development-scene`, `cliffhanger-scene`, `climax-scene` and `resolution-scene`. Each kind's skill contains the ordered steps and references the section below that a step applies. Read this whole file once, at the kind skill's first step, and come back to a section when a step references it.

## Paths

Run every command from the repo root. A page path in a `cfcli` command starts with `wiki/`.

- **Content pages.** `wiki/<campaign>/<Folder>/<slug>.md`, in the folders `Locations`, `NPCs`, `Creatures`, `Factions`, `Deities`, `Items`, `Spells`, `Vehicles`, `Lore`, `House Rules`, `PCs`, `Threads` and `Quests`. `<slug>` is the slug of the page's `title` (`docs/wiki-layout.md` **Page names**). `<campaign>` is the Campaign folder (`shattered-sea`), which `user-config.md` names.
- **Session pages.** `wiki/<campaign>/Sessions/Session <N>/session-<N>-<slug>.md`, titled `Session <N> - <Title>`. The titles are `Prep`, `Recap`, `Previously On` (recounting Session N−1) and one per Scene, named for the Scene.
- **Template.** `wiki/templates/scene-<kind>.md`, the kind in lowercase (`scene-hook.md`).
- **Links.** A `[[<slug>|<Title>]]` link targets a page in its kind's folder above and shows its title. A Creature's or NPC's fighting statistics sit under its own page's `## Statblock`.
- **Archived sources.** Repo-relative paths under `archive/`, listed in each page's `sources` property.
- **PC level.** The `**Class, species and level.**` line in the PC page's `## Sheet`. A multiclass character's level is the sum of its class levels.

## Orient

1. Read these files in order:
   - repo-root `user-config.md`;
   - `wiki/<campaign>/campaign-config.md`;
   - `wiki/<campaign>/hot.md` (orientation, not evidence);
   - `wiki/<campaign>/story-so-far.md` when it exists, whose Open promises and PC trajectories are the continuity a Scene can put back within the Party's reach;
   - `wiki/<campaign>/index.md`, the catalogue for looking up page names;
   - the last ten entries of `wiki/<campaign>/log.md`;
   - `wiki/templates/scene-<kind>.md`.

   Reuse a caller's completed orientation when it covers this Campaign and request.
2. Resolve the Campaign, Session number, exact kind, destination path and completion owner:
   - A `prep-session` child receives its Scene Chart row, Party, Opposition, Clues, Spotlight, predecessor alternatives and destination paths.
   - A direct DM request names the Scene. When its page exists, the request is a redo: edit that page in place at its path.
   - A bounded brief without Prep supplies the kind, premise, entry state, Threads, Spotlight and intended carry-forward. Author the Scene from that brief and link it from the Campaign overview rather than inventing an incomplete Prep.
3. Add or update only this Scene's planning material, preserving the Session's objective. Missing Session intent goes to `plan-session`. Assembling or changing the whole chart belongs to `prep-session`.

## Ground

Find the pages that bear on this Scene by searching the Wiki (`.omp/AGENTS.md` § Wiki access) and following links on the pages you read, then read each page behind a hit. Which pages matter is your judgement. Look for:

- **The Session around it.** The Prep's Scene Chart row, Clues, Party and Opposition, the Scene's own page when it exists, and the archived files its `sources` list. For a Scene after the Hook, find the prepared outcomes that hand into it. A Resolution needs the Climax's, and a Hook needs the last played Recap and final Scene.
- **What play has settled.** For a played Session, its Recap and the next Session's Previously On, which record what happened.
- **The Party.** Read the Sheet, goals and current conditions of each PC who can take part.
- **What the Scene puts on stage.** The NPCs and Creatures with their statblocks, the Threads, Locations, Factions, Items, Vehicles and House Rules the Scene uses, including subjects the request names.

Apply what you read:

- The DM's stated corrections in the request override the page and its sources. Played events establish facts. Unplayed branches remain alternatives.
- Carry positions, knowledge, ownership, conditions, resources and any live clock that changes this Scene.
- Match each reused table-use fact to its owner passage: terrain costs, damage, checks, escape procedures and encounter state keep their sourced values and conditions. Read the linked owner before replacing a rule with local improvisation.
- Decide a truly missing design fact consistently with Canon and the DM's intent, and mark it apart from established events in the return.

Give every reachable predecessor branch its own entry state rather than assuming victory.

## Card

Select the kind's card against the entry state, Thread and requested purpose. When the chart row supplies a card, use it unless it conflicts with the established fiction, and return the reason for any local correction. Record the card in Prep's planning material, outside Scene properties and spoken Narration. Without Prep, give it in the return for later charting. Apply **Scripting the Game** below.

Fit the card's pressure or turn, table-time allotment, Spotlight and next destination to the kind and the chart or standalone brief.

## Cast

Reuse the first fitting source in `AGENTS.md` **Sourcing** order. Read the full facts on the page itself before using them.

- Create only missing owners, through the matching skill: `npc-design`, `creature-design`, `location-design`, `item-design`, `faction-design`, `vehicle-design`, `spell-design` or `lore-design`, and `statblock-design` for a fought Creature or NPC with no statblock. Supply Canon, local purpose, Party facts, intended paths and the enclosing operation. Wait for complete pages and touched paths before relying on them.
- Take each fighter's statistics from the `## Statblock` on its own Creature or NPC page.
- Copy each `sources` path exactly from a page or file you read, and confirm the file opens. List only archived-Raw paths there, and use `sources: []` when none applies. External rule sources go in a body attribution.

Link each new owner page from the Scene or another relevant content page.

## Page format

Start from the existing page for a redo, or from the template copied to `wiki/<campaign>/Sessions/Session <N>/session-<N>-<scene-slug>.md` for a new Scene.

- **Properties.** `title: "Session <N> - <Scene title>"`, `type: Scene`, `kind: <Kind>`, a one-line `summary` in double quotes, `sources` as a list of quoted archive paths, and `cssclasses` holding `cf-scene` and `cf-<kind>` as the template sets them.
- **Spine.** Keep every required `##` heading at its depth and in template order, and every required callout type. A `##` whose guidance opens with `Optional.` appears, in template order, only when its guidance condition holds for this Scene (`docs/wiki-layout.md` **Templates define pages**). A template `###` is optional structure: keep it where it has content. Add subheadings inside a section as its content calls for them, each titled for its content.
- **Guidance.** Delete every `%% %%` comment after filling its section with the content the comment specifies.
- **Layout callouts.** Three DM-side callouts lay the page out as cards in Obsidian's reading view: `[!cast]` in the lede, `[!tiles]` around a bold-led list and `[!checks]` in `## Checks`. The template places each one. Each contains one list, with a `>` line left blank between its header and the list, and the list's words follow their section's rules (`docs/wiki-layout.md` **Callouts**).
- **Checks.** One `[!checks]` callout with one item per uncertain action, in this format. The item gives the action in bold, then the Ability (Skill) and DC with the trigger and action or time cost. Under it, one nested item per result gives its label in bold, its ruling and its Cue (**Narration** below):

  ```markdown
  > [!checks]
  >
  > - **Climb the wall without rope.** Strength (Athletics) DC 15, one action.
  >   - **Success.** ==You get your fingers over the lip of the ledge, and the whole yard opens below you.==
  >   - **Failure.** 1d6 Bludgeoning damage. ==The stone crumbles under your boot and drops you back into the ditch, and the guard on the walk turns his lantern your way.==
  ```

  A failure Cue installs a false belief, a constraint or a consequence with its cause, never a blank. A check that can critically succeed adds a `**Critical.**` result with its own Cue paying out world-law (`theatre-of-the-mind` `references/recipes.md` § Cues). For a save, specify the ability, DC and effects. For a contest, specify both sides and the tie. A sensible action without real doubt simply works, without an item.
- **Outcomes.** Keep the template's `| If | Then | Hands to |` table, one row per result. `Hands to` links the receiving Scene under its short title, the title without its `Session <N> -` prefix, which fits on one line: `[[session-13-the-pantry\|The Pantry]]` (a pipe inside a table cell is escaped).
- **Statblocks.** Statistics stay on the Creature or NPC page that holds them. The Scene shows them only as `![[<page-slug>#Statblock|<page title>]]` embeds in its Encounter.
- **Prep link.** Link the page from Prep's Scene Chart when Prep exists, and update the row's planning notes or Clue routes where this Scene changes them.

Put every table-use fact on the page. State who wants what and by which means, and how each side responds. Give useful spatial relationships, pressure triggers, accessible choices and consequences. Each hidden truth has a concrete way to learn it. Each required conclusion is discoverable through three independent routes across the chart or the standalone Scene. A failed check changes cost or position and leaves a way forward open. It can also be what exposes something the Scene hides. Use **Encounters** wherever physical danger is present.

## Narration

Write each `[!narration]` callout and each Cue yourself with `theatre-of-the-mind`, once the DM-side facts exist. Read exactly these parts:

- `.agents/skills/theatre-of-the-mind/SKILL.md`: its drafting and revision steps, Craft and Hard lines. File the prose with this Scene and bring the page to `ok: 0 findings` with `bun run cfcli -- check "<page>"`.
- `.agents/skills/theatre-of-the-mind/references/recipes.md`: the shared rules at its top, `## Openings and first looks`, `## Scene openings`, `## Cues`, and the recipe heading for each callout you write. The template callout uses the kind's heading (`### Hook`, `### Development`, `### Cliffhanger`, `### Climax` or `### Closing image`). A callout titled with an NPC's or Creature's name uses `### NPC entering` or `### Creature entering`. A major reveal uses `### Revelation`, and a cut across unplayed time or space uses `### Transition`.
- `.agents/skills/theatre-of-the-mind/references/critique.md` at its Step 4.
- `reference/gm-voice/exemplars.md`: the three exemplar passages theatre-of-the-mind Step 2 reads, as that step sets out.

Its caller-supplied pages are this Scene and the pages you read in **Ground**. Give each callout its title, the Scene kind, the actual viewpoint, the entry condition and the spatial facts. Add what the Scene must change, and each speaker's want with the secret they talk around.

Place callouts and Cues in these formats:

- The template's callout keeps the template's title exactly, such as `> [!narration] Opening`.
- An NPC or Creature entering sits in the section where it enters, such as `## Situation` or `## Encounter`, titled with the subject's name: `> [!narration] Luca Ferrante`. A major Revelation gets its own conditional callout there.
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
- When the Scene expects the Party to split across places, give each place its own first-look callout in `## Situation`, titled with the place's name and built with recipes `## Openings and first looks`, and give the places contrasting tones. Cuts between them follow recipe `### Transition`, and the DM chooses their order.
- A Cue is written on a DM-side line, such as a `[!checks]` result, an Angles line or a Creatures tactic, right after its trigger, between `==` marks: `- **Failure.** ==One stone sits smoother than the rest, and your thumb finds the groove before your eyes do.==` The trigger, rules terms, DCs and damage numbers stay outside the marks. One to three sentences, 60 words at most. The gate reads each Cue as Narration.
- When an established result settles an unplayed cut of time or space, put a `Transition` callout immediately before the destination's opening or closing slot. Leave unresolved travel choices to the Players.

Read the filed prose against each entry that can select it. Repair mismatched carriers, companions, possessions or positions, and stop live events where the Players can respond.

## Outcomes

For Hook, Development, Cliffhanger and Climax, fill `## Outcomes`. Each materially different result gives its trigger, the concrete World change and the receiving Scene's link on the chart. Show the change on something the Party can see, such as a body or a person's manner.

- Cover offered approaches, failure, withdrawal, waiting or refusal where they change the situation. When some of the Party can leave while others stay, state what the departure costs those still there.
- Give the receiving Scene the resulting knowledge, positions, ownership, conditions, resources and clock state it needs. Results share a destination only when its entry works for each of them.
- A standalone Scene without a chart states its next pressure, trigger and handed-on state in the same rows, ready for charting, and links only pages that exist.
- Proposed deaths, captures, rewards and Thread changes remain conditional Prep, not updates to current Canon.

A Resolution instead gives its Climax-conditioned payoffs, reactions, rewards and next-Session carry-forward in `## Payoffs`, `## Reactions`, `## Rewards`, `## Stinger` and `## Threads`, as its template requires.

Update existing receiving pages for each prepared result. Return pending entry variants to the caller for pages not yet authored.

## Encounters

Use this section for any Scene with an Encounter, the Creatures the Party may fight and their battlefield. A violent fallback to negotiation counts. Most Encounters belong to Cliffhangers and Climaxes. `bun run cfcli -- encounter-budget` classifies Creature spend only. Choosing the opposition and judging other dangers remain your job. When a command exits 2, read its `--help` and correct the call.

Read `bun run cfcli -- encounter-budget --help` before budgeting. The invocations below show the required syntax. Replace the example levels and force with the Scene's sourced values.

1. **Budget.** Establish the participating PCs from their Sheets and incoming conditions, excluding anyone unable to participate and stating why. Choose Low, Moderate or High to match the row and the kind's craft. Print the Party's budgets with the sheet levels, comma-separated:

   `bun run cfcli -- encounter-budget --levels 5,5,5,5`

    Apply sourced House Rules first. Take every total from the CLI output, never from a table, memory or hand arithmetic. The CLI adds a +1 combat offset to each level because this Party fights above the calculator, so pass sheet levels without adding it.

2. **Spend.** Take each opposing type's count, CR and XP from its read Wiki or 2024 SRD statblock (Canon, then `dnd5e-srd-api`, then published material). Pass them to the same command, one `--creature` per type:

   `bun run cfcli -- encounter-budget --levels 5,5,5,5 --target high --creature "Terror-Bird,13,10000,2"`

   - Equal to a band ceiling is that band, and one XP over High is Beyond High. The bands follow the 2024 rules alone: no 2014 monster-count multiplier and no Easy/Medium/Hard/Deadly thresholds.
   - Read the printed band and any `Vs` delta, then decide whether that spend is the right fight.
   - When Canon fixes an over-budget force, keep the CLI's label, state the excess, and give playable avoidance, escape or objective routes rather than claiming a balanced fight or changing recorded statistics.
   - State when reinforcements arrive and whether waves overlap. Count every distinct opponent that can take part, once, however its tactics change.
   - Give mutually exclusive opposing forces a run each. A duel uses only the PCs actually fighting.

3. **Expose the plan.** Copy the CLI's Encounter Balance lines under `### Balance` in the Scene's `## Encounter`.
   - Identify `bun run cfcli -- encounter-budget` as the source, with the participating PCs and the Creature and NPC pages supplying XP.
   - Give quantities, deployment, battlefield features, opposition objectives, opening tactics, adaptations and break or escape conditions.
   - Embed each fought Creature or NPC as `![[<page-slug>#Statblock|<page title>]]` here and link it elsewhere.
   - State how terrain, surprise, allies, depleted resources, hazards and objectives change the actual danger.

A creature-free chase or hazard has no Creature XP to spend. A Cliffhanger of that kind leaves out its optional `## Encounter` and calibrates its danger in `## Stakes`, `## Pressure` and `## Terrain` with sourced DCs, damage or conditions, action costs, duration, escape routes and resource demands. A non-action Development or Resolution stays non-action, without an unplanned fight.

## Cold read

Read the Scene and its rendered embeds as the DM would, with no sourcebooks or chat available. Apply the kind skill's cold-read guidance, then trace each entry through its options to an exit. Resolve names and put rules and statistics on the page or its embeds. Advance pressure on stated triggers, give critical information several routes and fit Narration to each entry. Plant a detail for a later callback and include a contrast beat as DM-side material (`docs/agents/narrative-devices.md` § Callbacks and § Contrast). Leave the Party's answer open.

Compare the heading spine with the template, each `sources` path with its file, each reused ruling with its owner passage, and Balance numbers with the `bun run cfcli -- encounter-budget` output and Party evidence. Correct mismatches in the Scene and its local Prep material, and return any required chart recomputation to its owner.

## Scripting the Game

Mike Pondsmith's *Scripting the Game* is the pacing method, and it takes precedence over a loose pool of potential Scenes. A Session runs one Hook first, alternating non-action Developments and physical-risk Cliffhangers in the middle, then one Climax and its Resolution. After an action Hook the middle starts with a Development, and after a cerebral Hook it starts with a Cliffhanger. The final middle Scene can lead directly into the Climax. In a compact Session with no middle Scenes, the Hook leads straight into the Climax.

Use approximately thirty minutes per Scene and the actual chart's Minutes allocation. The Hook, Climax and Resolution reserve about ninety minutes together. Middle Scenes fit the remaining Session length, not a quota. A kind's shorter contest or closing image can leave room elsewhere. In-world clocks state their own units separately from table minutes. An uncertain result changes the next Scene's entry. The chart orders pressure and opportunities, and victories, accepted jobs and routes remain open.
