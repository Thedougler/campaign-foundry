---
title: Rogue's Mantle
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Rare (Requires Attunement).*

This dark, hooded mantle of thick cloth is infused with secretive and deceptive magic. While wearing it, you gain the following benefits:

- **Darkvision.** You gain darkvision within a range of 60 feet. If you already have darkvision, the mantle increases your darkvision's range by 60 feet instead.
- **Move in Shadows.** While you are in dim light or darkness, you can use a bonus action to teleport, along with anything you are wearing or carrying, up to 30 feet to an unoccupied space you can see that is also in dim light or darkness. You then have advantage on the first melee attack you make before the end of the turn.
- **Wilful Enmity.** You can cast the *Antagonize* spell (save DC 15) from the mantle. Once the mantle has cast the spell, it can't cast the spell again until the next dawn.

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
