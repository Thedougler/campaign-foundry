---
type: NPC
summary: "A ferrywoman."
sources: ["archive/nope.md", "wiki/Aldermoor/x.md", 42]
revealed: ""
title: "Bad Sources"
---


- **Role.** Text.
- **Wants.** Text.
- **Voice.** Text.
- **Found at.** Text.

> [!narration] First look
> Spoken text for the table.

## Roleplaying

- **Opens them up.** Text.
- **Shuts them down.** Text.
- **Will share.** Text.
- **Will not share.** Text.
- **If pressed.** Text.


Text.

## History

Text.

## Hidden truths

Text.

## Threads

Text.

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
