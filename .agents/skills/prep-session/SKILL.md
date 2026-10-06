---
name: prep-session
description: Prep — build the next Session from settled intent into a complete Scene Chart and runnable Scene pages, then generate missing images, refresh hot.md and Push. Use when the DM requests Session prep or plan-session settles the intent.
---

# Prep a Session

Prep produces everything the DM needs to run the upcoming Session from the Wiki alone. The Scene Chart orders pressure and opportunities. The Party's choices and dice determine outcomes.

Read [the shared Scene procedure](../../../docs/agents/scene-pages.md) before charting. It owns Scripting the Game order, Scene page contracts, Encounter balance, Narration and conditional handoffs. This skill owns Session composition and the final hot/index/gate/log/Push cycle.

## Steps

1. **Establish intent and scope.** Take the settled `plan-session` intent, including the DM's fixed points, opening, Threads, Climax, Resolution, Spotlights and decisions left to Prep. An already-settled brief is sufficient. Use `plan-session` only when intent is missing. When no intent exists, settle it with the DM through plan-session's checks. Follow `AGENTS.md` orientation: read `user-config.md`, the Campaign's `campaign-config.md`, `hot.md`, World `index.md`, available last ten `log.md` entries and task pages. Read `CONTEXT.md`, `docs/wiki-layout.md`, applicable ADRs and the current Prep, Scene, hot and Previously On templates. Resolve the World, Campaign and upcoming Session number from the request and records. Preserve played Session pages. Step 8 handles an absent Previously On. **Done when** the Session question and fixed points are stated, the upcoming Session folder is identified, and all writes have an authorized destination.

2. **Ground the Party.** Use `qmd` to discover and retrieve the last played Session's Recap and final Scene, active Threads, open Quests, relevant Factions and House Rules, and every participating PC's Sheet, Goals and bonds, and Plans. Retrieve full source pages rather than treating search snippets as facts. Record the Party's actual Location, in-world date, knowledge, possessions, conditions, resources and live clocks that affect the opening. Distinguish played events from unplayed Prep alternatives. **Done when** the Hook has a supported entry state, each PC's current level and personal stake are known, and every opening dependency has a source or an explicit design decision consistent with Canon.

3. **Budget and chart.** Read `session_length_hours` from the Campaign overview, falling back to `DM Settings`. Convert it to table minutes. Normally reserve about ninety minutes for Hook, Climax and Resolution together. The middle-Scene ceiling is `max(0, floor((total minutes - 90) / 30))`, not a quota. A four-hour Session permits five middle Scenes. For a shorter Session, keep the three framing Scenes and shorten their allocations to fit. Assign explicit Minutes, leaving room for breaks and rules lookups. Distinguish table time from in-world clock units.

   Apply the shared procedure's **Scripting the Game** order and choose each row's card from its kind's skill:

   | Kind | Read for charting and filling |
   | --- | --- |
   | Hook | `hook-scene` |
   | Development | `development-scene` |
   | Cliffhanger | `cliffhanger-scene` |
   | Climax | `climax-scene` |
   | Resolution | `resolution-scene` |

   When the Party spends the middle of the Session moving between Locations, compose those rows with [the travel reference](references/journey.md). The Region page supplies the routes and their costs.

   Retain the Prep template's Scene Chart columns: number, linked Scene, exact Kind, Minutes and linked Threads. Under that chart, add numbered planning notes for each row, giving its situation, its independent trigger, the selected card, the Spotlight, incoming alternatives, the conditional destination and, where relevant, escalation. A situation comes to the Party through an arrival, a clock, an opposition move or a preceding consequence. The Party chooses how to answer. A Player-dependent detour is a labelled optional branch with a trigger and rejoin state. Make the first physical contest forgiving of sound choices and reserve the opposition's strongest established challenge and the highest stakes for the Climax. **Done when** every row has its kind, purpose, trigger, card, allocation and destination, the order satisfies the shared rules, and the complete allocation fits the Session length.

4. **Distribute Threads, pressure and Clues.** Select three to five live Threads consistent with the intent, urgent ones first: a Thread that could wait three Sessions is important rather than urgent. Keep faction-driven Threads to two per Session and let at most one major revelation land. Under `## Threads`, link each and record where it is planted, tested and moved or conditionally resolved. Add `### Spotlights` mapping every PC to a linked Scene, the goal, bond or fear that drives its decision, and a Thread touched by the Climax. Two PCs share a Scene only when each has a distinct opportunity with its own stakes.

   Under `## Opposition`, link the opposition and state its Session goal, means and why pursuing that goal brings it into the Party's path. Write its unopposed sequence as a timeline: in-world time or event trigger, action, observable sign, consequence and what interference changes. Derive the unopposed timeline by running `simulate-npcs` with purpose offscreen, over the opposition's leaders and across the Session's in-world span. Keep each move whose sign the Party can perceive. Each sign states what becomes visible and leaves its cause for the Party to infer. The agenda advances without requiring the Party to accept a job or follow a lead.

   Under `## Clues`, write about ten distinct true, concrete facts, each revealable in at least two linked Scenes. State the source or interaction that reveals the fact at each route, then give the Scene author those facts and routes to build into the Scene pages. Each conclusion or access essential to progress gets three independent discovery routes across the Session, not three attempts at the same roll. Put these critical routes in a `###` subsection under Clues. **Done when** every Scene advances a live Thread, the selection obeys the Thread and revelation caps, every PC has a driven opportunity, the unopposed timeline is runnable with each sign stating what becomes visible and leaving its cause for the Party to infer, and each Clue and necessary conclusion has concrete discovery routes.

5. **Cast before creating.** Inventory the chart's NPCs, Locations, Creatures, Items and rewards, plus needed Factions, Vehicles, Spells, Lore and Handouts. Follow the shared procedure's **Resolve the cast** and `AGENTS.md` source order: retrieve fitting Wiki pages first, then source missing rules or content before novel design. Use `npc-design`, `location-design`, `creature-design`, `item-design`, `faction-design`, `vehicle-design`, `spell-design` and `lore-design` for their corresponding missing owners. Use `dungeon-design` when a Site needs area-by-area exploration. Author required Handouts to their current template, with `theatre-of-the-mind` for spoken or shown text. Give each child its purpose, Canon, Party facts, target path and this enclosing Prep's completion ownership. Independent owner pages may be delegated concurrently. Each page has one writer. **Done when** every required named entity and rules owner exists and is linked from relevant content, NPC combat statistics resolve to Creature owners, and rewards have complete rules and conditional availability rather than name-only promises.

6. **File the Prep.** Fill `<vault>/templates/Prep.md` at `<World>/<Campaign>/Sessions/Session <N>/Session <N> - Prep.md` within the assigned Wiki. Preserve required properties, section order and Bases. Remove guidance comments. Use `type: Prep`, a useful summary, valid archived-Raw provenance in `sources` and the Session's in-world `date`. File the question, opening state, length, complete chart, planning notes, Threads, Spotlights, opposition timeline and distributed Clues. Under `## Opposition`, give each linked speaking cast member a **bench line**: the moment they grab the Scene and how to play them instantly. Assign each Scene its eventual path in the same folder: `Session <N> - <Scene title>.md`. **Done when** the filed Prep contains the settled intent and all composition material, every speaking cast member under Opposition has a bench line, and every chart row links its assigned Scene destination.

7. **Fill every Scene and reconcile.** Work in chart order through the five kind skills above and the shared procedure's **Composed** path. Each assignment includes its row and card, Minutes, Party, relevant owner pages, opposition state, Clues and discovery routes, Spotlight, every reachable predecessor outcome and exact destination paths. Keep final index/gate/log and Push with this Prep owner, including for cast, Narration and image children. Receive the completed page, touched paths, design decisions, incoming/outgoing states and remaining findings before relying on a child.

   Carry alternative knowledge, positions, ownership, conditions, resources and clock states forward as alternatives. A later opening supports success, partial result, failure, delay, refusal or withdrawal whenever those results are reachable. Its Narration and rulings select the corresponding branch. Proposed deaths, captures, rewards and Thread changes stay conditional in Prep and Scenes rather than changing current World pages or `hot.md`.

   After each return, update affected rows, routes and receiving entries. If a branch prevents a later premise, replace that premise with its actual consequence and recompute the remaining order and budget; keep the intent's purpose, not a guaranteed victory. If an earlier result can settle the central question, give it a direct Resolution handoff instead of requiring another showdown. **Done when** every charted Scene page is fully authored, its kind's cold-read criteria hold, each possible Encounter has the shared sourced 2024 Party-budget arithmetic and fought Creature embeds, and every reachable outcome has a coherent receiving entry or Session-ending carry-forward.

8. **Locate Previously On.** For Prep of Session N, reuse `Sessions/Session <N>/Session <N> - Previously On.md`: it recounts Session N-1 and is read at the start of N, and ingesting Session N-1's Transcript writes it. Link it from the upcoming Prep's opening material. If missing, retrieve the last Session's Recap and have `theatre-of-the-mind` fill the Previously On template at that Session N path, ending on the actual last played moment. An available Transcript supplies grounding. Ingesting unprocessed Raw is `ingest` work. A first Session skips this step. Preserve existing played Narration. **Done when** the correct prior record is available and linked, or this is the first Session, with no recap of imagined upcoming events.

9. **Supply missing images.** Inspect the actual attachments and embeds for the entire Session cast and Handouts. Reuse fitting existing images. Invoke `generate-image` for every missing Battle Map an Encounter needs, NPC or Creature portrait the Session needs, and Handout image. Supply the finished owner page, Canon, target path and Prep completion ownership. Independent image jobs may run concurrently. File and embed verified output in the World's `attachments/` with the layout's naming and scale. Check each map against its battlefield and inspect available Universal VTT data for walls, doors and lights. Report missing map data separately from a missing image.

   When image generation, credentials or allowed file operations are unavailable, complete the reachable text and record each missing asset, affected page, attempted operation and exact prerequisite. Keep missing assets out of embeds until real files exist. A spec or an empty placeholder does not count as a generated image. **Done when** each needed image is either verified and embedded or explicitly accounted for as unavailable, and the latter remains an unresolved Prep requirement.

10. **Cold-read the full Session.** Follow each entry and conditional exit across the actual pages and resolving embeds, as a DM with no chat or sourcebooks. Check the chart's shared order and Minutes against the chosen length, each row's trigger and live Thread, the opposition's independent advances, all PC Spotlights, Clue discovery routes and critical-route redundancy. Trace every Climax dependency to an earlier Scene or established Canon, and every Climax result to the matching Resolution payoff, reward, Thread state and closing Narration. Check branch transitions preserve losses and live choices without teleporting the Party or assuming acceptance. Fix local defects and recompute affected rows and entries. **Done when** every row has a runnable page, all conditional routes and payoffs agree, and every composition criterion is satisfied; capability gaps remain named requirements, not fictional successes.

11. **Refresh and file.** Rewrite the Campaign's `hot.md` from its current template, around 500 words and within its gate limit. Keep the actual Party date, Location, active Threads and last played changes. `## Next` links this Prep and its Hook and states the upcoming questions. Future outcomes remain conditional. Run the completion commands below and record one `prep` operation containing every touched content page, including dependent cast, Handouts, Previously On and hot. **Done when** hot is accurate, the generated index is current, the page gate over every touched page has passed and the prep log entry exists, or each unavailable operation has its exact blocker recorded.

12. **Push and report.** Invoke `push-session` with the World, Campaign, Session, Wiki root and complete touched paths. Read the current Push help rather than inheriting stale command examples from a child skill. Preview, fix Wiki-side warnings and rerun the gate/log cycle for any additional content edits, then run the actual build without `--dry-run`. A running Foundry or MCP bridge is not required for the offline Adventure build; installation uses only an explicitly supplied modules folder, and the DM performs Adventure import. Live touches remain the Push skill's conditional branch.

   If packing tools, permissions or another real prerequisite are unavailable, attempt the permitted path, retain the observed error and report exactly what remains unavailable. Count only the actual build as a Push. A built module does not prove live import. Report the chart briefly, authored and reused pages, design decisions left to Prep, image status, actual index/gate/log results, Push counts and module path when observed, warnings and remaining DM actions. **Done when** the actual Push or up-to-date result is observed and all Prep requirements hold. Otherwise return the completed artifacts with explicit unresolved requirements and no claim that Prep finished.

## Completion commands

Review the installed help before execution:

```bash
bun run cf -- index --help
bun run cf -- check --help
bun run cf -- log --help
bun run cf -- push --help
```

Check each page as you finish it, as `AGENTS.md` **Gate scope** sets out. After content is ready, regenerate the index and run the page gate, given every touched content page, hot included, to confirm the run:

```bash
bun run cf -- index
bun run cf -- check --fix "<page path>" "<page path>"
bun run cf -- check "<page path>" "<page path>"
```

Fix remaining findings without changing Canon and repeat until the page gate reports `ok: 0 findings`. A `--layer` filter is diagnostic only. Then append the operation:

```bash
bun run cf -- log --world "<World>" --op prep --title "Session <N> Prep" --page "<World>/<Campaign>/Sessions/Session <N>/Session <N> - Prep.md"
```

Repeat `--page` for every touched content page. The CLI owns generated index and log files. For an assigned filesystem root, add `--vault "<wiki>" --root "<root>"` to index, check, log and push, plus `--templates "<wiki>/templates"` to check.

Push through `push-session` using the current interface:

```bash
bun run cf -- push --campaign "<Campaign>" --session <N> --dry-run --json
bun run cf -- push --campaign "<Campaign>" --session <N> --json
```

Actual Push writes its own `push` log entry. Report observed results separately for text, images, gate and Push so one successful phase cannot hide an unavailable prerequisite in another.
