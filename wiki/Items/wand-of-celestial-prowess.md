---
title: Wand of Celestial Prowess
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wand (Requires Attunement By a Spellcaster).*

Evolving Item

In this example, a Cleric dedicated to a deity of the sky receives a *+1 Wand of the War Mage*, an Uncommon magic item, from his mentor. The ebony wand is simple but feels extraordinarily powerful when the Cleric touches it. Each time the wand evolves, carvings of celestial bodies appear along its length.

***Evolving Item.*** *This item is an Evolving Item, see *Evolving Magic Items* for more information.*

Multiple variations of this item exist, as listed below:

- *Crusading Wand of Celestial Prowess*
- *Lunar Wand of Celestial Prowess*
- *Heliacal Wand of Celestial Prowess*

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
