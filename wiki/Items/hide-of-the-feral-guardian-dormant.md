---
title: Hide of the Feral Guardian (Dormant)
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Light Armour (*Studded Leather Armour*), Legendary (Requires Attunement), 13 lb.*

AC 12 + Dex

Vestige

It is believed that this polished and beautifully detailed leather armour was a gift from Melora, bestowed on a long-forgotten archdruid and champion of the natural world before the terrors of the Calamity.

***Dormant.*** While wearing the armour in its dormant state, you gain the following benefits:

- The armour grants you a +1 bonus to AC.
- While you are transformed by an effect that replaces any of your game statistics with those of another creature, you have a +1 bonus to melee attack and damage rolls, and you retain the benefits of this armour.
- As an action, you can use the armour to cast *polymorph* on yourself, transforming into a **giant owl** while retaining your Intelligence, Wisdom, and Charisma scores. This property can't be used again until the next dawn.

***Vestige of Divergence.*** *This item is a Vestige of Divergence, see *Vestiges of Divergence* for more information.*

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
