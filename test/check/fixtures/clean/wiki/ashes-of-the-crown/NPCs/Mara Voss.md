---
type: NPC
summary: "Harbormaster with a bandit's past."
sources: []
revealed: ""
title: "Mara Voss"
---

## Roleplaying

- **Role.** Text.
- **Wants.** Text.
- **Voice.** Text.
- **Found at.** [[Ravenhold]]

> [!narration] First look
> She smells of tar and wet rope.

- **Opens them up.** Text.
- **Shuts them down.** Text.
- **Will share.** Text.
- **Will not share.** Text.
- **If pressed.** Text.

She once led a [[Bandit Captain]].

## History

Text.

## Hidden truths

Text.

## Threads

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
