---
type: NPC
summary: "A ferrywoman."
sources: "archive/real-transcript.md"
creature: ""
---

## At a glance

- **Role.** Text.
- **Wants.** Text.
- **Voice.** Text.
- **Found at.** Text.

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
