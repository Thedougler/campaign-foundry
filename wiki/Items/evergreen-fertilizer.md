---
title: Evergreen Fertilizer
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Common.*

Once sprinkled on the soil around a nonmagical plant, this pungent powder keeps the plant healthy for the next 365 days.

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
