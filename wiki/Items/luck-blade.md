---
title: Luck Blade
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Legendary (Requires Attunement).*

You gain a +1 bonus to attack rolls and damage rolls made with this magic weapon. While the weapon is on your person, you also gain a +1 bonus to saving throws.

***Luck.*** If the weapon is on your person, you can call on its luck (no action required) to reroll one failed D20 Test if you don't have the Incapacitated condition. You must use the second roll. Once used, this property can't be used again until the next dawn.

***Wish.*** The weapon has 1d3 charges. While holding it, you can expend 1 charge and cast *Wish* from it. Once used, this property can't be used again until the next dawn. The weapon loses this property if it has no charges.

***Base items.*** This item variant can be applied to the following base items:

- *Glaive* (*Luck Glaive*)
- *Greatsword* (*Luck Greatsword*)
- *Longsword* (*Luck Longsword*)
- *Rapier* (*Luck Rapier*)
- *Scimitar* (*Luck Scimitar*)
- *Shortsword* (*Luck Shortsword*)
- *Sickle* (*Luck Sickle*)

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
