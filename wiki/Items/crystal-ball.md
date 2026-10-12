---
title: Crystal Ball
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Very Rare (Requires Attunement), 3 lb.*

While touching this crystal orb, you can cast *Scrying* (save DC 17) with it.

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
