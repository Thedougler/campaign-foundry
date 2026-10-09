---
type: Location
kind: Site
summary: "A packed dirt shelf at the Quiet's edge, where Calveno prints run
  north and a Deer-Stalker marks the trees."
sources:
  - "archive/cutoff-lip.md"
parent: "[[The Quiet]]"
revealed: ""
title: ""
---

![[Cutoff Lip - Handout Art.jpg]]

## At a glance

- **Draws the Party because.** The Calveno trail is clear and northbound.
- **Entrance.** A shelf above the river, between grass slope and forest.
- **Occupants.** No one now. A Deer-Stalker prowls the edge at night.
- **Danger.** Sleeping or keeping watch alone past the knee-root fence draws the hunter.
- **Prize.** Clean spring water and the trail to Print Braid.

> [!narration] Entering
> A packed shelf no wider than a bedroll runs between steep grass and dark trees. Hollow knee-roots fence the forest. Torn bark and caught fur mark the hunter's ground, while a spring spills over black stones below.

## Play

### Areas

The shelf, knee-root fence, stripped marker trunks, feeding bowl and spring.

### Hazards

The knee-root fence is Difficult Terrain to cross. The forest heavily obscures beyond ten feet. The Deer-Stalker takes isolated sleepers after dark.

### Occupants

[[Deer-Stalker]] is the only occupant.

### Likely actions

Follow prints to [[Print Braid]], camp in a group, search the bowl for blood and bones, or descend for water.

## Depth

### History

The Calveno climbed from [[Slack Basin]] nineteen days ago and left the packed trail.

### Hidden truths

The stripped trunks and feeding bowl prove the Deer-Stalker claims the edge. The spring is not the otters' pool.

### Threads

[[Taking on Aruhe]].

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
