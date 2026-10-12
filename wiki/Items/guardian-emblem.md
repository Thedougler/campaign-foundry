---
title: Guardian Emblem
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon (Requires Attunement By a Cleric or Paladin).*

This emblem is the symbol of a deity or a spiritual tradition. As an action, you can attach the emblem to a suit of armour or a shield or remove it.

The emblem has 3 charges. When you or a creature you can see within 30 feet of you suffers a critical hit while you're wearing the armour or wielding the shield that bears the emblem, you can use your reaction to expend 1 charge to turn the critical hit into a normal hit instead.

The emblem regains all expended charges daily at dawn.

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
