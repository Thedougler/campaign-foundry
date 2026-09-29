---
type: Vehicle
summary: "A river barge with a patched sail."
sources: []
---

## At a glance

- **Kind.** Text.
- **Size.** Text.
- **Speed.** Text.
- **Crew.** Text.
- **Captain.** Text.
- **Berth.** [[Ravenhold]]

> [!narration] First sight
> Spoken text for the table.

## Play

### Statistics

| Armor Class | Hit Points | Speed | Damage Threshold |
| ----------- | ---------- | ----- | ---------------- |
|             |            |       |                  |

### Crew and stations

Text.

### Components and weapons

Text.

### Underway

Text.

## Depth

Text.

### History

Text.

### Hidden truths

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
