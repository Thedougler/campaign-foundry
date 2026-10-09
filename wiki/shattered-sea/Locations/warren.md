---
type: Location
kind: Site
summary: "A Rattkin settlement beneath Le Paludi and deepest Passage anchor,
  reached through learned routes and trust."
sources:
  - "archive/warren.md"
  - "archive/ssw-session-04-ingest-recap.md"
  - "archive/collab-2026-10-04-authority-themes.md"
parent: "[[le-paludi|Le Paludi]]"
revealed: "Session 4"
title: "Warren"
---

## At a glance

- **Draws the Party because.** It shelters people and holds routes beneath Calveno.
- **Entrance.** A learned descent from Le Paludi or a run opened by a trusted Passage contact.
- **Occupants.** Rattkin elders, Passage contacts, Nona and Felix.
- **Danger.** Exposure closes routes. Every descent spends trust.
- **Prize.** A route, witness or lead on the taken 314.

> [!narration] Entering
> Low passages join homes, stores and hidden runs beneath the city. Hand marks guide each turn. Murmurs, taps and water overhead mark a refuge reached by a learned descent.

## Play

### Areas

Common rooms, family homes, stores, a lesson route and a sealed old run. A public canal route loops through Warren to another Calveno entry.

### Hazards

Tight passages are Difficult Terrain and cover. Crown scrutiny or a wrong mark can relocate a lesson and force an escort.

### Occupants

Rattkin elders and community. [[passage|Passage]], [[nona-black-jaw|Nona Black-Jaw]] and Felix Aho.

### Likely actions

Ask, prove trust, teach, conceal, map, shelter, escort and compare traces. Failure costs trust, time or supplies, never the clue itself.

## Depth

### History

Passage broke from Warren around 1240 DR under pressure. The settlement remains its deepest anchor beneath Le Paludi.

### Hidden truths

Different witnesses know different slices of where the taken moved. A coded lesson pattern or tincture vessel can expose the route.

Passage reports put Grung in the old runs in the days before the festival, six of them in all. Most were blue or green, one was purple, and every group moved stores and ran rather than fought. No Grung had ever crossed the [[central-strait|Central Strait]] before, as far as [[jean-claude-tabarnack|Jean-Claude Tabarnack]] knows.

### Threads

Passage's deepest refuge, sheltering [[nona-black-jaw|Nona Black-Jaw]] and Felix Aho, threads into [[perrin-and-nona|Perrin and Nona]] and [[simones-hunters|Simone's Hunters]]. Nona is the Warren's heart. She has been around nearly as long as it has, and she knows everyone's names and birthdays. Common knowledge holds that if the Dravosi pick up your loved one, you go to her, and she does what she can.

## Links

```base
filters:
 and:
  - file.hasLink(this.file)
views:
 - type: table
  name: Contains
  filters:
   and:
    - parent == this
  groupBy:
   property: note.kind
   direction: ASC
  order:
   - file.name
   - note.summary
 - type: table
  name: Linked from
  filters:
   and:
    - parent != this
  groupBy:
   property: note.type
   direction: ASC
  order:
   - file.name
   - note.summary
```
