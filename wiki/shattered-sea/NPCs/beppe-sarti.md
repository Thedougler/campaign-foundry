---
type: NPC
summary: "A Pantry survivor who stays beneath the vine, wrongly sure Hinewai's
  protection ends at the clearing."
sources:
  - "archive/the-pantry.md"
aliases:
  - "Beppe"
creature: "[[commoner|Commoner]]"
revealed: ""
title: "Beppe Sarti"
---

## At a glance

- **Role.** A Calveno survivor who stays at the Pantry when the column leaves.
- **Wants.** To stay beneath the vine with [[renzo-canale|Renzo Canale]].
- **Found at.** The Pantry, under the great vine.

> [!narration] First look
> A Calveno man keeps to the shade beneath the great vine, sure its bounds are his.

## Play

- **Will share.** His belief that Hinewai's protection ends at the clearing, offered as warning.

## Depth

### History

When the column set out, Beppe stayed, one of the three who kept to the clearing.

### Hidden truths

- The belief is wrong: Hinewai's protection covers everyone she counts, wherever on Aruhe they walk.

### Threads

The clearing is his post in [[taking-on-aruhe|Taking on Aruhe]].

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
