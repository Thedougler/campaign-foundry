---
type: Location
kind: Site
summary: "A pale pollen stand whose cloud makes breathing creatures hallucinate
  hostile spirits and attack their companions."
sources:
  - "archive/spiritpollen.md"
parent: "[[aruhe|Aruhe]]"
revealed: ""
title: "Spiritpollen"
---

![[Spiritpollen - Handout Art.jpg]]

## At a glance

- **Draws the Party because.** It turns a crossing or touch into a choice with visible counter play.
- **Entrance.** Old growth, marsh edges, treelines and wet crossings.
- **Occupants.** White flowers with swollen pollen sacs.
- **Danger.** Disturbance releases a fifteen-foot hallucination cloud.
- **Prize.** Knowledge of the island's learned boundaries.

> [!narration] Entering
> White flowers rise from green leaves, their pollen sacs swollen like blisters. Old claw marks and scorch rings scar the mud around plants that remain untouched. Powder hangs whenever the stalks stir.

## Play

### Areas

The untouched stand, fifteen-foot cloud and marked edge where prior travellers learned to stop.

### Hazards

Touching, cutting, shaking, burning or striking releases pollen. A failed Wisdom DC 15 save makes a breathing creature Spirit-Haunted until it repeats the save.

### Occupants

[[spiritpollen|Spiritpollen]].

### Likely actions

Notice with Perception or Nature DC 15, cover mouth and nose, wait, use strong wind, or disturb it from beyond fifteen feet. A successful save grants one hour's immunity.

## Depth

### History

Clawed animals and travellers leave old marks around untouched stands in old Aruhe growth.

### Hidden truths

Only a successful save grants one hour's immunity. Avoidance leaves immunity unchanged. This hazard works best when the crossing choice is visible.

### Threads

[[taking-on-aruhe|Taking on Aruhe]].

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
