---
title: Zephyr Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Rare (Requires Attunement).*

This fine set of white-and-silver armour bears the wind rune upon its chest.

While wearing this armour, you have advantage on Dexterity (Acrobatics) checks and Dexterity saving throws as your movements are bolstered by gentle currents of wind.

***Invoking the Rune.*** As an action, you can invoke the armour's rune to cast the *wind wall* spell (save DC 15) with it. Once the rune has been invoked, it can't be invoked again until the next dawn.

***Base items.*** This item variant can be applied to the following base items:

- *Leather Armour* (*Zephyr Leather Armour*)
- *Padded Armour* (*Zephyr Padded Armour*)
- *Studded Leather Armour* (*Zephyr Studded Leather Armor*)

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
