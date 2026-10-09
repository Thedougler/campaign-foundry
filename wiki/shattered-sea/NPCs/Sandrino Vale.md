---
type: NPC
summary: "A Pantry survivor who leaves with the column when it sets out."
sources:
  - "archive/the-pantry.md"
aliases:
  - "Sandrino"
creature: "[[Commoner]]"
revealed: ""
title: ""
---

## At a glance

- **Role.** A Calveno survivor of the wreck, one of the seven at [[The Pantry]].
- **Wants.** A place in the column that leaves.
- **Found at.** The Pantry, among the seven.

> [!narration] First look
> A quiet Calveno man stands at the trail's head, bundle tied, waiting on the word to go.

## Play

- **Opens them up.** Talk of the road back to the ship, which he means to walk with the others.

## Depth

### History

Sandrino followed Hinewai's law into the clearing with the other survivors, and he left with the column when it set out.

### Threads

He leaves with the nine, his road out part of [[Taking on Aruhe]].

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
