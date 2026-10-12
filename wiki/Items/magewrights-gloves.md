---
title: Magewright's Gloves
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Uncommon (Requires Attunement).*

While you wear these gloves, you work as efficiently as two characters when determining how much time it takes to craft nonmagical items using any of the following tools: *Alchemist's Supplies*, *Brewer's Supplies*, *Calligrapher's Supplies*, *Cartographer's Tools*, *Glassblower's Tools*, or *Jeweller's Tools*.

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
