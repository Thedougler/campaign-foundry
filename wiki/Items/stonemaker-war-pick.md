---
title: Stonemaker War Pick
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Weapon (*War Pick*), Very Rare (Requires Attunement), Martial Weapon, Melee Weapon, 2 lb.*

1d8 Piercing

You gain a +1 bonus to attack and damage rolls made with this magic war pick. It has the following special properties:

- **Meld into Stone.** You can cast the *Meld into Stone* spell from this war pick. Once this property is used, it can't be used again until the next dawn.
- **Petrification.** The war pick has 1d6 + 1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, you can expend 1 charge from the war pick to have that creature make a DC 15 Constitution saving throw. On a failed save, the creature has the petrified condition for 8 hours. When the war pick has no charges remaining, it loses this property.

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
