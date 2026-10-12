---
title: Brooch of the Elements
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Rare (Requires Attunement).*

The central jewel of this butterfly-shaped brooch swirls with multicoloured iridescence.

The brooch has 3 charges and regains all expended charges daily at dawn. As a Reaction when a creature you can see within 60 feet of you hits a target with an attack roll and deals damage, you can expend 1 charge and change one damage type the attack deals to one of the following damage types: Acid, Cold, Fire, Lightning, Poison, or Thunder.

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
