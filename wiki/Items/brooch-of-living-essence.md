---
title: Brooch of Living Essence
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Uncommon (Requires Attunement).*

While wearing this nondescript brooch, spells and anything else that would detect or reveal your creature type treat you as humanoid, and those that would reveal your alignment treat it as neutral.

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
