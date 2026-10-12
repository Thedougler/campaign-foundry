---
title: Tarnished Idol of Good Fortunes
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Rare (Requires Attunement).*

Evolving Item

***Blemished.*** The idol is made of tarnished bronze, with minor dings and dents scattered over its surface.

You can cast the *Augury* spell from the idol. The idol speaks the omen aloud in response. Once the idol has been used to cast this spell, it can't be used to cast this spell again until the next dawn.

***Tarnished.*** The idol is made of gold, with a patina of dust settled into its crevices.

While attuned to the idol, you gain a +1 bonus to your Armour Class. Additionally, while holding the idol, you can take a Magic action to touch a nonmagical trade bar or gemstone. The item is then transformed into coinage equivalent to its value. For example, if you take a Magic action to touch a 5-pound silver bar while holding the idol, the bar is transformed into 25 GP worth of coins.

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
