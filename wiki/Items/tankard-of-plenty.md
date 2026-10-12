---
title: Tankard of Plenty
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Common.*

This golden stein is decorated with dancing dwarves and grain patterns.

Speaking the command word ("Illefarn") while grasping the handle fills the tankard with three pints of rich dwarven ale. This power can be used up to three times per day.

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
