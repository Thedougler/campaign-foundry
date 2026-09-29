---
type: NPC
summary: "Harbormaster with a bandit's past."
sources: []
creature: "[[Bandit Captain]]"
---

## At a glance

- **Role.** Text.
- **Wants.** Text.
- **Voice.** Text.
- **Found at.** [[Ravenhold]]

> [!narration] First look
> Spoken text for the table.

## Play

- **Opens them up.** Text.
- **Shuts them down.** Text.
- **Will share.** Text.
- **Will not share.** Text.
- **If pressed.** Text.

## Depth

Text.

### History

Text.

### Hidden truths

Text.

### Threads

Keeps [[The Cold Hearth]] burning.

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
