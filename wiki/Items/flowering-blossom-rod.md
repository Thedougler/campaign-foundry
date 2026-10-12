---
title: Flowering Blossom Rod
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Rod, Rare (Requires Attunement By a Spellcaster).*

Evolving Item

***Budding.*** Multicoloured leaves decorate the rod's stems, and a few buds cluster near each end.

While you hold the rod, you can cast *Druidcraft* or *Plant Growth* (Overgrowth only) from it. Once the rod has been used to cast *Plant Growth*, it can't be used to cast this spell again until the next dawn.

While you hold the rod, as a Magic action, you can rejuvenate nonmagical plants in a 5-foot Cube you can see within 15 feet of yourself. The rejuvenated plants remain verdant for 1d4 days, after which they grow or wither as normal plants would.

***Flowering.*** Both ends of the rod bear colourful, fragrant flowers.

While you hold the rod, you can cast *Insect Plague* from it, using your spell save DC. When you do so, the insects appear as bumblebees. Once the rod has been used to cast this spell, it can't be used to cast this spell again until the next dawn.

***Evolving Item.*** *This item is an Evolving Item, see *Evolving Magic Items* for more information.*

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
