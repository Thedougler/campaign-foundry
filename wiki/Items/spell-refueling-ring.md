---
title: Spell-Refueling Ring
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Ring, Uncommon (Requires Attunement By a Spellcaster).*

While wearing this ring, you can recover one expended spell slot as a Bonus Action. The recovered slot can be of level 3 or lower. Once used, the ring can't be used again until the next dawn.

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
