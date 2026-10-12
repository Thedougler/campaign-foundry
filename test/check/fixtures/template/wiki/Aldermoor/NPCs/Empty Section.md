---
type: NPC
summary: "A ferrywoman."
sources: []
creature: ""
revealed: ""
title: "Empty Section"
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

## History


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
