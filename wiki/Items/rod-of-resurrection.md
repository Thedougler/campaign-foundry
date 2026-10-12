---
title: Rod of Resurrection
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Rod, Legendary (Requires Attunement), 2 lb.*

The rod has 5 charges. While you hold it, you can cast one of the following spells from it: *Heal* (expends 1 charge) or *Resurrection* (expends 5 charges).

The rod regains 1 expended charge daily at dawn. If you expend the last charge, roll 1d20. On a 1, the rod disappears in a harmless burst of radiance.

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
