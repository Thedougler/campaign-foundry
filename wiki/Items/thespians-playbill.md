---
title: Thespian's Playbill
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Uncommon (Requires Attunement).*

While holding this magical theatre program, whenever you take the Study action and make an Intelligence check, you gain a bonus to the check equal to your Charisma modifier (minimum of +1).

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
