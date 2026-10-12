---
title: Prismatic Rune
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Rare (Requires Attunement By a Spellcaster).*

A magical rune is etched on this small stone made of multicoloured quartz. When you finish a Long Rest, choose one of the following damage types: Acid, Cold, Fire, Lightning, or Thunder. The rune is imbued with the chosen damage type until you finish another Long Rest.

***Charges.*** The rune has 6 charges and regains 1d6 expended charges daily at dawn. When you cast a spell that deals damage, you can expend 1 charge to change the spell's damage type to the damage type chosen for the rune.

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
