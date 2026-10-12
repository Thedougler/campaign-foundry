---
title: Orb of Sorcery
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon (Requires Attunement By a Sorcerer).*

Ribbons of varicoloured light swirl inside this magical glass orb.

***Sorcerous Reservoir.*** While holding this orb, you can take a Magic action to regain up to 2 expended Sorcery Points. Once this property is used, it can't be used again until the next dawn.

***Spellcasting Focus.*** You can use the orb as a Spellcasting Focus for your Sorcerer spells.

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
