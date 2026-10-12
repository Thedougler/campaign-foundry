---
title: Veteran's Cane
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Common.*

As a Bonus Action, you can transform this walking cane into an ordinary Longsword or change the Longsword back into a walking cane. In either case, you must be holding the item.

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
