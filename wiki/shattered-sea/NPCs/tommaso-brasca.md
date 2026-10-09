---
type: NPC
summary: "A Pantry survivor who passes Aruhe's rules to the departing survivors
  and leaves with the column."
sources:
  - "archive/the-pantry.md"
aliases:
  - "Tommaso"
creature: "[[commoner|Commoner]]"
revealed: ""
title: "Tommaso Brasca"
---

## At a glance

- **Role.** One of the seven Calveno survivors camped beneath the great vine at [[the-pantry|The Pantry]].
- **Wants.** To go when the column goes.
- **Found at.** The Pantry, until the column sets out.

> [!narration] First look
> A Calveno man cinches a travel bundle at the camp's edge, ready to walk the moment the column moves.

## Play

- **Will share.** The camp's rules for the road, taught with [[renzo-canale|Renzo Canale]]: fallen fruit is food, and fallen material is safe to build with. Night travel is forbidden, and water and open ground are hazards.

## Depth

### History

Tommaso followed Hinewai's law into the clearing with the other survivors. When the column left, he went with it, and he passed the camp's rules to the departing survivors beside [[renzo-canale|Renzo Canale]].

### Threads

He leaves with the survivor column of [[taking-on-aruhe|Taking on Aruhe]].

## Links

```base
filters:
 and:
  - file.hasLink(this.file)
views:
 - type: table
  name: Linked from
  groupBy:
   property: note.type
   direction: ASC
  order:
   - file.name
   - note.summary
```
