---
type: Item
summary: "A lantern that shows what burned."
sources: []
revealed: ""
title: "Ashen Lantern"
---

## At a glance

- **Kind.** Text.
- **Rarity.** Text.
- **Attunement.** Text.
- **Changes.** Text.
- **Held by.** Text.

> [!narration] First look
> A slow red coal glows behind the glass.

## Play

Text.

### Properties

Text.

### In use

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
