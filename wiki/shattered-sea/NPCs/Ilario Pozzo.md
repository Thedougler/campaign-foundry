---
type: NPC
summary: "A Pantry survivor who joins the column when it sets out."
sources:
 - "archive/the-pantry.md"
aliases:
 - "Ilario"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** One of seven Calveno survivors who eat what the vine drops at [[The Pantry]].
- **Wants.** To walk out with the nine.
- **Found at.** The Pantry clearing.

> [!narration] First look
> A Calveno man swings a packed bundle onto his shoulder and looks back once at the vine.

## Play

- **Will share.** The column's plan to travel by day and rest by night.

## Depth

### History

Ilario followed Hinewai's law into the clearing, and when the column set out he walked with it.

### Threads

He walks out with the nine, into the work of [[Taking on Aruhe]].

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
