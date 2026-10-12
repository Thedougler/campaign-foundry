---
title: Ring of Animal Influence
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Ring, Rare.*

This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can expend 1 charge to cast one of the following spells (save DC 13) from it:

- *Animal Friendship*
- *Fear* (affects Beasts only)
- *Speak with Animals*

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
