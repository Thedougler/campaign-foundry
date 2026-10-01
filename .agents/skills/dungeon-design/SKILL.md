---
name: dungeon-design
description: Site stocking — use for direct dungeon, ruin, cave, wreck or keep requests explored room/area by area, and location-design's dungeon-like Site branch. Includes nested Sites and repeat expeditions; broad Region travel belongs to location-design.
---

# Dungeon design

Stock a Site the Party can navigate, investigate and change under pressure. The output remains `type: Location`, `kind: Site`, in the flat `<World>/Locations/` folder with a quoted `parent` wikilink. Rooms and areas are keys on that page. A large complex can contain child Sites, also in the flat folder, whose parent is the containing Site.

## Procedure

### 1. Establish the call

Resolve the named Site, containing Location, intended objective, exploration scope and caller operation.

- **Direct request:** own Site authoring and the final `create` operation. For a missing Site, use the actual `wiki/templates/Location - Site.md` directly.
- **Composed request:** accept the caller's Canon inventory, actual template, Party facts and operation. Return stocked content and dependent page paths to that caller; it owns final filing, gate, index and the single log entry. Pass this ownership to any skills used below.

Use common authoring guidance, not a callback into the full `location-design` workflow. Keep broad Region travel with `location-design`; stock only the reachable Site(s) within it.

**Done when** the Site/parent paths, objective, scope and operation owner are explicit.

### 2. Establish the evidence

Use the caller's retrieved Canon where supplied. When orientation or sourcing is missing, read sections **1. Orient and establish Canon** and **2. Source applicable content** of [common authoring](../location-design/references/authoring.md) before designing. They own the hot → World index → recent log → relevant pages sequence, qmd-first retrieval, Canon precedence and source ladder.

Read the existing Site and actual Site template. Inventory every established entrance, area, occupant, hazard, date, object and hidden truth, including facts on linked pages. Read Party Sheets, carried Items and applicable House Rules when capabilities or encounter calibration affect choices. Preserve established and already-heard facts; use the DM's newer facts for changed current state without rewriting played Session records.

**Done when** every retained fact and dependency has a source path, and rules-dependent choices have the Party facts and applicable rules they need.

### 3. Explain the present situation

Decide the Site's original function, what disrupted it, what is happening now, the opportunity that draws the Party, and the deeper truth they can uncover. Give past occupants or events surviving traces that change a route, Clue, claim, hazard or reward. Put these facts in the appropriate key or Depth, rather than a design questionnaire.

Group areas into zones only when that helps run the Site: distinguish their activity, sensory cue, obstacle, occupants, access and what changes there over time. For a complex needing child Sites, or one intended for repeated expeditions, read [expedition scope](references/expeditions.md) now to bound the playable frontier before detailing it.

**Done when** the current situation follows from the Site's function and history, and every zone or historical detail affects play.

### 4. Connect the choices before writing keys

Build a graph of named areas and entrances. Each route names both endpoints, its travel cost, exposure or obstacle, what the Party can notice before committing, and what it reveals on arrival. Include exits beyond the Site and a usable retreat.

Use entrances, branch/rejoin routes, loops, bypasses and unusual connections where the geography supports them. On a tiny or deliberately constrained Site, retain its physical limits and make the available choices meaningful instead of manufacturing passages to meet a quota. Hidden routes have discoverable signs and explicit DM-side locations. Flight, climbing, divination and other relevant capabilities work as their rules permit; any limitation has a sourced rule or established fictional cause.

**Done when** each objective and retreat can be reached from an entrance, every edge is accounted for at both endpoints (including one-way restrictions), and alternative routes differ in cost, risk or information.

### 5. Stock each key

Keep stable area names in `Areas`. Order each entry for use at the table: first observable cue; current activity and occupants; things the Party can interact with; hidden truth, Clue or find; mechanics for uncertain outcomes; usable exits. Give dimensions where position matters and counts where occupants matter. State what a declared action reveals automatically, and use an Ability (Skill) check or saving throw with DC, timing and consequence only where uncertainty matters.

Distribute social choices, hazards, discoveries, resources, rewards and quiet landmarks according to the situation, not a fight quota. A quiet area can provide shelter, orientation or evidence of a route. Put each essential revelation behind three independent Clues: different evidence or interactions that survive losing one witness, route or roll. Necessary progress has an observable or actionable route without a single successful check.

- **Hazards:** state the sign before exposure, trigger, effect, direct counterplay, a distinct bypass, and leverage from information, tools, terrain or relationships. Preserve existing mechanics unless the DM changes them. Source added rules figures through the common source ladder; identify a bespoke hazard ruling as Site-specific.
- **Occupants and Factions:** link their existing pages and state what they want here, what they offer, how they respond to the Party and what they do if ignored. Use `npc-design` or `faction-design` for a needed new owner page.
- **Confrontations:** decide each side's objective, consequences of success/failure/retreat, useful terrain, information and escalation. Give a credible nonviolent resolution and a retreat route. Then reuse linked Creatures or use `creature-design`; consult retrieved 2024 encounter guidance for any Low/Moderate/High budget, using the actual Party and occupant counts. Record the source and calculation in a DM-facing note or reply. Signal avoidable dangers beyond the Party's capabilities before commitment.
- **Rewards:** make information, access, leverage and treasure concrete. Reuse Items; use `item-design` for a needed new Item. Creature statistics live on Creature pages and are linked here, not retyped or embedded on the Site. A stocking request does not require permanent Scene Prep.

**Done when** every key offers a usable choice or discovery, every essential truth has three independent Clues, hazards have all six elements, and confrontations have purpose, terrain, consequences and off-ramps with resolved owner pages.

### 6. Make time, rest and return playable

Write `Pressure` in Play as a Site-specific procedure: starting clock/state, explicit elapsed-time or action triggers, how much they advance it, observable signs, consequences at thresholds, and ways the Party can alter its progress. If a roll is useful, specify its cadence, die, odds, result and state changes. Carry time and state across area transitions. This is a chosen procedure for this Site, not a universal 2024 exploration rule.

Write `Rest` beside it. Retrieve the applicable 2024 Short Rest and Long Rest timing, eligibility and interruption rules through `dnd5e-srd-api`, then official guidance if the SRD lacks them; apply Wiki House Rules first. Identify plausible shelters or the reason none is safe, who can find the Party and how, protection or costs, a safer alternative, and exactly how much time and pressure pass while resting. Safety follows the fiction; a rest does not pause occupants, tides or objectives.

State what survives departure and what changes during absence. Opened access, damage, depleted rewards, dead occupants, alliances and learned routes persist until a named actor or process changes them. Any replacement, repair or restocking needs a cause, resources and elapsed time. For repeated expeditions, use the ledger and update procedure in the expedition reference already read in step 3.

**Done when** the DM can advance a search, an alarm, a rest and a return visit without inventing a trigger, consequence or reset.

### 7. File or return the stock

Place routes, keys, pressure and rest in Play; put history and cross-area hidden truths with their revealing Clues in Depth. Keep the template's required properties, `##` sections, order and callout types. Use `theatre-of-the-mind` when writing Narration; keep hidden truths, DCs and procedures outside spoken cues. Remove template comments and authoring instructions from finished pages.

Walk an entrance-to-objective route and retreat using the keys alone, then a delay/rest scenario. Resolve conflicting exits, timings, counts or shared mechanisms against one authoritative procedure. Account for every fact in the step-2 inventory in its final home and ensure each new owner page and link resolves.

- **Composed:** return the stock, dependency paths, complete touched-path set and any source/calibration notes to the caller for its one final authoring operation. Do not run a separate gate or append a second log entry.
- **Direct:** follow sections **3. Write and link pages** and **4. Gate and record the operation** of common authoring: file the Site(s) and dependencies, use the current Bun CLI help for index/check/fix, pass every gate layer, then append one `create` log covering all touched pages. Leave hot and played Session pages unchanged.

**Done when** the caller has a complete stock handoff, or every standalone page passes the gate and the one operation is logged; the reply names the stocked Site paths and their usable routes, pressure and return changes.
