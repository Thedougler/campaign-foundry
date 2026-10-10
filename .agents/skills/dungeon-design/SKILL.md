---
name: dungeon-design
description: Site stocking — use for direct dungeon, ruin, cave, wreck or keep requests explored room/area by area, and location-design's dungeon-like Site branch. Includes nested Sites and repeat expeditions; broad Region travel belongs to location-design.
---

# Dungeon design

Stock a Site that the Party moves through, investigates and changes under pressure. The output remains `type: Location`, `kind: Site`, in the flat `<campaign-folder>/Locations/` folder with a quoted `parent` wikilink. Rooms and areas are keys on that page. A large complex can contain child Sites. Each child Site is filed in the same flat folder, with the containing Site as its `parent`.

## Procedure

### 1. Establish the call

Resolve which Site the request means, its containing Location, the intended objective, the exploration scope and the caller's operation.

- **Direct request:** own Site authoring and the final `create` operation. For a missing Site, use the actual `wiki/templates/Location - Site.md` directly.
- **Composed request:** the caller supplies its Canon inventory and actual template with the Party facts and its operation. Return stocked content and dependent page paths to that caller. The caller does the final filing, the gate, the index and the one log entry. Pass this ownership to any skills used below.

Follow the common authoring guidance directly and skip the full `location-design` workflow. Broad Region travel belongs to `location-design`. Stock only the reachable Site(s) within it.

**Done when** the Site/parent paths, objective, scope and operation owner are explicit.

### 2. Establish the evidence

Use the caller's retrieved Canon where supplied. When orientation or sourcing is missing, read sections **1. Orient and establish Canon** and **2. Source applicable content** of [common authoring](../location-design/references/authoring.md) before designing. Those sections define the orientation sequence, Wiki retrieval, Canon precedence and source ladder.

Read the existing Site and actual Site template. Inventory every established entrance, area, occupant, hazard, date, object and hidden truth, including facts on linked pages. Read Party Sheets, carried Items and applicable House Rules when capabilities or encounter calibration affect choices. Preserve heard Narration, and change each page as its `revealed` property allows (`CONTEXT.md` **Revealed**). Use the DM's newer facts for changed current state without rewriting played Session records.

**Done when** every retained fact and dependency has a source path, and rules-dependent choices have the Party facts and applicable rules they need.

### 3. Explain the present situation

Decide the Site's original function, what disrupted it, what is happening now, the opportunity that draws the Party, and the deeper truth they can uncover. Give past occupants or events surviving traces that change a route, Clue, claim, hazard or reward. Write these facts as plain statements in the key or Depth section where the DM will use them.

Group areas into zones only when that helps run the Site: distinguish their activity, sensory cue, obstacle, occupants, access and what changes there over time. For a complex needing child Sites, or one intended for repeated expeditions, read [expedition scope](references/expeditions.md) now to bound the playable frontier before detailing it.

**Done when** the current situation follows from the Site's function and history, and every zone or historical detail affects play.

### 4. Connect the choices before writing keys

Build a graph of named areas and entrances. Each route states both endpoints, its travel cost, exposure or obstacle, what the Party can notice before committing, and what it reveals on arrival. Include exits beyond the Site and a usable retreat.

Use entrances, branch/rejoin routes, loops, bypasses and unusual connections where the geography supports them. On a tiny or deliberately constrained Site, work within its physical limits and give each available choice a different cost, risk or reward. Add passages only where the geography supports them. Hidden routes have discoverable signs and explicit DM-side locations. Flight, climbing, divination and other relevant capabilities work as their rules permit. Any limitation has a sourced rule or established fictional cause.

**Done when** an entrance leads to each objective and to the retreat, and the graph records each edge at both endpoints, including one-way restrictions. Alternative routes differ in cost, risk or information.

### 5. Stock each key

Keep stable area names in `Areas`. Order each entry for use at the table, in this sequence.

1. The first observable cue.
2. Current activity and occupants.
3. Things the Party can interact with.
4. Secrets, Clues and finds.
5. Mechanics for uncertain outcomes.
6. Usable exits.

Give dimensions where position matters and counts where occupants matter. State what a declared action reveals automatically, and use an Ability (Skill) check or saving throw with DC, timing and consequence only where uncertainty matters.

Distribute social choices, hazards, discoveries, resources, rewards and quiet landmarks according to the situation, not a fight quota. A quiet area can provide shelter, orientation or evidence of a route. Put each essential revelation behind three independent Clues: different evidence or interactions that survive losing one witness, route or roll. Give necessary progress a route the Party can see or take even when a check fails.

- **Hazards:** state the sign before exposure, trigger, effect, direct counterplay, a distinct bypass, and leverage from information, tools, terrain or relationships. When a mechanism invites study, each successful investigation or experiment gives the Party a new way to use it. Enough study lets the Party disable the mechanism or turn it to their own use. Keep essential information obtainable after a failed check. When a hazard repeats or escalates, change its information, options, position or stakes, not only its DC. Preserve existing mechanics unless the DM changes them. Source added rules figures through the common source ladder. Mark a bespoke hazard ruling as Site-specific.
- **Occupants and Factions:** link their existing pages. For each, state what it wants here and what it offers. Then state how it responds to the Party and what it does if ignored. Use `npc-design` or `faction-design` for a needed new owner page.
- **Confrontations:** decide each side's objective and the consequences of success/failure/retreat. Add the useful terrain, the information in play and how the fight escalates. Give a credible nonviolent resolution and a retreat route. Then reuse linked Creatures or use `creature-design`. Consult retrieved 2024 encounter guidance for any Low/Moderate/High budget, using the actual Party and occupant counts. Record the source and calculation in a DM-facing note or reply. Signal avoidable dangers beyond the Party's capabilities before commitment.
- **Rewards:** make information, access, leverage and treasure concrete. Reuse Items, and use `item-design` for a needed new Item. Creature statistics live on Creature pages, and the Site links to them. A stocking request does not require permanent Scene Prep.

**Done when** every key offers a usable choice or discovery and every essential truth has three independent Clues. Each hazard has all six elements. Each confrontation has a purpose, terrain, consequences and off-ramps, and its owner pages resolve.

### 6. Make time, rest and return playable

Write `Pressure` in Play as a Site-specific procedure with these parts.

- The starting clock or state.
- Explicit elapsed-time or action triggers, and how far each advances it.
- Observable signs.
- Consequences at thresholds.
- Ways the Party can alter its progress.

If a roll is useful, specify its cadence, die, odds, result and state changes. Carry time and state across area transitions. Label the procedure as chosen for this Site, separate from the 2024 exploration rules.

Write `Rest` beside it. Retrieve the applicable 2024 Short Rest and Long Rest timing, eligibility and interruption rules through `dnd5e-srd-api`, then official guidance if the SRD lacks them. Apply Wiki House Rules first. Then cover these points for resting.

- Plausible shelters, or the reason none is safe.
- Who can find the Party there, and how.
- The protection a shelter gives or what it costs.
- A safer alternative.
- Exactly how much time and pressure pass while resting.

Safety follows the fiction. Occupants, tides and objectives keep moving during a rest.

State what survives departure and what changes during absence. Opened access, damage, depleted rewards, dead occupants, alliances and learned routes persist until a named actor or process changes them. Any replacement, repair or restocking needs a cause, resources and elapsed time. For repeated expeditions, use the ledger and update procedure in the expedition reference already read in step 3.

**Done when** the page gives the DM a trigger, consequence and reset for a search, an alarm, a rest and a return visit.

### 7. File or return the stock

Place routes, keys, pressure and rest in Play. Put history and cross-area hidden truths with their revealing Clues in Depth. Keep the template's required properties, `##` sections, order and callout types. Use `theatre-of-the-mind` when writing Narration. Open each keyed area with a Cue (`==…==`) and keep hidden truths, DCs and procedures outside its marks. Remove template comments and authoring instructions from finished pages.

Walk an entrance-to-objective route and retreat using the keys alone, then a delay/rest scenario. Resolve conflicting exits, timings, counts or shared mechanisms against one authoritative procedure. Account for every fact in the step-2 inventory in its final home and ensure each new owner page and link resolves.

- **Composed:** return the stock to the caller for its one final authoring operation. Include the dependency paths and the complete touched-path set with any source or calibration notes. The caller runs the gate and writes the log entry.
- **Direct:** follow sections **3. Write and link pages** and **4. Gate and record the operation** of common authoring. File the Site(s) and dependencies, and read the current Bun CLI help for index, check and fix. Pass every gate layer, then append one `create` log entry that lists each touched page. Leave hot and played Session pages unchanged.

**Done when** the caller has a complete stock handoff, or the page gate over every standalone page reports `ok: 0 findings` and the one operation is logged. The reply lists the stocked Site paths with their usable routes, pressure and return changes.
