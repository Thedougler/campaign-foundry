---
title: Voting Kit
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Common.*

At rank 4, your voting kit becomes a common magic item that conceals an extradimensional space. As a bonus action, you can place one tool kit that you are proficient with into the voting kit, or can remove it. No other type of object can be placed into the extradimensional space. A creature searching the voting kit finds and extracts the tool kit with a successful DC 20 Intelligence (Investigation) or Wisdom (Perception) check.

Additionally, you can use the voting kit to cast *charm person* (save DC 15). This property of the kit can't be used again until the next dawn.

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
