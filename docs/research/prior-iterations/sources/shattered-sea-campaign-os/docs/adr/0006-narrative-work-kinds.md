# ADR-0006: Narrative Work Kinds

**Status:** Accepted
**Date:** 2026-08-17
**Absorbs:** former ADR-0018, ADR-0019, ADR-0021, ADR-0022, ADR-0024, ADR-0025

How beats, situations, seasons, cold opens, trials, and player gravity are modeled as Work.

---

## 1. Beat Subtypes Are Dramatic Functions

*(former ADR-0018)*

### Context

`kind: beat` suggested subtypes (`reveal`, `confrontation`, `twist`, `escalation`, `resolution`, `quiet-moment`) for a planned moment with Setup / Trigger / Payoff. The session-writing skills treat a beat as an atomic playable unit with one dramatic function: Hook → Development ↔ Cliffhanger → Climax → Resolution. Keeping both axes would collide. Keeping only the old list would gut those skills. `kind: hook` already names a world-entry rumor or request — the same word as the opening function.

### Decision

Beat subtypes are `hook`, `development`, `cliffhanger`, `climax`, `resolution`. The old names survive only as patterns inside a function, not a second axis. `kind: hook` remains a world-entry page, never a beat.

A Beat Chart composes those functions as prepared possibility, not a predicted plot. The situation owns the chart when a situation page exists. Otherwise the chart lives on that session-plan and dies with it.

### Consequences

- Beat schema and template drop Setup / Trigger / Payoff as the required body
- Function-specific body contracts live in the `writing-*-beats` skills
- Lint treats the five functions as the valid subtype list
- Agents must never call a hook page a Hook beat

---

## 2. Situation Is a Kind; Narrative Island Is the Method

*(former ADR-0019)*

### Context

Sandbox topology is bigger than a session-plan Situations section and different from a front. Folding it into `front` would force every opportunity into a doom. Making `narrative-island` a kind would freeze a method name as an entity type. Minting every dockside scuffle would fill the vault with Work debris; minting nothing would leave Beat Charts and later sessions nothing to cite.

### Decision

`kind: situation` is the Work page for a bounded, causally live campaign situation. **Narrative island** is the default authoring method for that page, and for session-scoped situations that do not yet merit a page. There is no `kind: narrative-island`.

Mint a situation when another page, a future session, or a Beat Chart must refer to this topology as a node — the same spirit as [ADR-0004](0004-time-and-events.md) §3. A night-only pressure stays a session-plan section. The situation owns the Beat Chart; the session-plan cites tonight's slice.

### Consequences

- Situation needs a schema, template, and placement rule for the active campaign locality
- Session-plan Situations sections remain legal and are the default for night-only pressure
- Fronts stay threat-shaped; a situation may contain fronts, clocks, locations, and candidate beats

---

## 3. The Campaign Contract Is a Campaign-Plan

*(former ADR-0021)*

### Context

Campaign architecture needed seasons as first-class pages. The exemplar stored the contract on `campaign-overview.md` and seasons as `type: season`. This vault already has `kind: campaign-plan` (with a suggested `season` subtype) and uses `_system/state/` for cursors and compiled projections (`time.md`, `geography.json`, `atlas.md`). Putting premise, tone, and ending intent in state would hide authored canon in a cursor folder. A third overview file would fight `campaign-plan`.

### Decision

The contract — premise, player promise, tone, anchors, ending intent, runtime — lives on `kind: campaign-plan` subtype `full-campaign`. `kind: season` holds the chapters (narrative function, season question, transition conditions). `campaign-plan` loses subtype `season` and may still use `arc` for finer grain inside a season. No campaign-overview state file.

Horizon and anchors live on the full-campaign plan; season pages obey them. An anchor is a DM commitment that survives planning revision. A possibility is an attractive future that may never be reached.

### Consequences

- Season needs a schema, template, and placement rule for the active campaign locality
- Campaign-planning writes `campaign-plan` and `season` pages, not an overview file
- Campaign-plan lint must drop `season` from valid subtypes

---

## 4. A Cold Open Is a Borrowed-POV Hook Beat

*(former ADR-0022)*

### Context

*Cold* already means retrieval temperature and “runnable without further invention.” The exemplar skill also uses it for a 20–30 minute borrowed-NPC prelude — one Hook beat, not a mini-adventure. A new kind would split Hook craft. Importing the foreign five-d20 group-check would smuggle a house rule into a writing skill. Recap, Strong Start, and cold open would collapse if left unnamed.

### Decision

A cold open is `kind: beat`, `subtype: hook`, `framing: borrowed-pov`. The table plays a borrowed NPC or NPC group, then hard-cuts to the PCs' own Hook.

Three session openers stay distinct: Recap (Last Time, spoken), Strong Start (PCs as themselves), cold open (borrowed viewpoint, then cut). Knowledge uses `audience` and `reveals:` — no third secrecy model. Table math stays out of the skill unless a `kind: ruling` is authored later.

### Consequences

- Beat schema gains an optional `framing` field
- `writing-cold-opens` instantiates a Hook beat, then hands to `writing-hook-beats` for the PCs' own Hook
- Retrieval temperature `cold` and “open the session cold” are different words and stay that way

---

## 5. Puzzle Is a Trial Subtype

*(former ADR-0024)*

### Context

The challenge skill authors trap / puzzle / hazard / trial / composite. This vault already has `kind: trap`, `kind: hazard`, and `kind: trial` (with suggested subtype `puzzle`). Adding `kind: puzzle` would split non-combat structured challenges across two kinds. Collapsing traps and hazards into trial would delete kinds session prep already uses.

### Decision

A puzzle is `trial` subtype `puzzle`. There is no `kind: puzzle`. A composite challenge is one page of the dominant form, linking the others. Traps, hazards, and trials stay separate kinds. The challenge skill authors the mechanism; situation and session composition own placement.

### Consequences

- `writing-traps-trials` instantiates trap, hazard, or trial schemas — never a puzzle template
- Trial subtype list already includes `puzzle`; no new kind in doctor or AGENTS.md

---

## 6. Gravity Lives on the Beat

*(former ADR-0025)*

### Context

The exemplar skills required a Link of Relevance on every beat and consulted `player-gravity.md` as a compiled map. This vault already stores queryable relationships in frontmatter and narrative in the body (`factions:` / `## Relationships`). A gravity kind or a dedicated gravity file would duplicate Party Goals on the campaign-plan and investments on PC pages.

### Decision

**Gravity** is established player investment, not a kind. A **Link of Relevance** is written in the beat body (`## Player Gravity`). Frontmatter holds a flat `pcs:` list of PC wikilinks for query. There is no `player-gravity.md` and no gravity kind. Campaign-plan Party Goals and PC pages remain the sources of the investment itself.

### Consequences

- Beat schema gains a `pcs:` relationship targeting `kind: pc`
- Beat body requires `## Player Gravity`
- Skills retrieve gravity from `kind: pc` pages and the campaign-plan, not a side file

---

## 7. Player Characters Are a Kind

### Context

PCs could have been `kind: npc` with `subtype: pc` — one person model, and `beat.pcs:` already targeted `npc`. That collapses the party into the same query as every merchant and captain. Player characters are the primary source of gravity and narrative direction; a subtype does not make them first-class to retrieve or to protect.

### Decision

`kind: pc` is its own entity. File: `shattered-sea/pc.<slug>.md` (or another locality accepted by placement rules). Not an `npc` subtype, not a `campaign/pcs/` folder. `beat.pcs:` lists `kind: pc` pages. `npc` remains a named individual the party can interact with.

Rejected: `subtype: pc` on `npc` (hides gravity's subject); type folder `campaign/pcs/` ([ADR-0001](0001-vault-organization.md) §1).

### Consequences

- Closed vocabulary grows by one; doctor validates the page through frontmatter and placement rules
- Convert, don't fork (rare): confirm identity, hybrid-interview against the npc page, then move the page into the campaign locality and patch wikilinks
- Interview originates the page at `canon: established`, `audience: [agent, dm]`, `importance: key`
- Schema is gravity-first (Overview, Gravity, Relationships, Interview). No Session Log
- Mechanical build state, table state, and the PC projection are [ADR-0007](0007-player-character-mechanics.md). No live HP/AC on the page. No sibling `statblock`
- Typed `pcs:` lives on `beat`, `campaign-plan`, and `session-plan` only
