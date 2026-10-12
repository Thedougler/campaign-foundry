---
title: Spell Duelist's Trophy
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Rare (Requires Attunement By a Spellcaster).*

This withered hand or talon is attached to a leather cord that can be worn like a necklace or bracelet. You gain the following benefits while wearing the trophy.

***Dispelling Touch.*** When you hit a creature with a melee spell attack, you can activate the trophy to cast the *Dispel Magic* spell as part of that attack, targeting the hit creature. Once this property has been used, it can't be used again until the next dawn.

***Helping Hand.*** When you cast a spell using a spell slot, you can cast it without any Somatic components.

***Mage Hand.*** You can cast the *Mage Hand* cantrip from the trophy.

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
