---
title: Dragon's Wrath Weapon
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant (Requires Attunement).*

This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon's hoard, it absorbs the energy of the dragon's breath weapon and deals damage of that type with its special properties.

Multiple variations of this item exist, as listed below:

- *Slumbering Dragon's Wrath Weapon*
- *Stirring Dragon's Wrath Weapon*
- *Wakened Dragon's Wrath Weapon*
- *Ascendant Dragon's Wrath Weapon*

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
