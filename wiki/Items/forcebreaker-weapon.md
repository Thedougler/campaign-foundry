---
title: Forcebreaker Weapon
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Very Rare.*

You gain a +2 bonus to attack and damage rolls made with this magic weapon.

This weapon was crafted to destroy structures made of force, such as those created by *Forcecage* or *Wall of Force*. Striking a Large or smaller structure of magical force with this weapon automatically shatters that structure. If the target is a Huge or larger structure of force, this weapon shatters a 20-foot-cube portion of it.

***Base items.*** This item variant can be applied to the following base items:

- *Club* (*Forcebreaker Club*)
- *Flail* (*Forcebreaker Flail*)
- *Greatclub* (*Forcebreaker Greatclub*)
- *Light Hammer* (*Forcebreaker Light Hammer*)
- *Mace* (*Forcebreaker Mace*)
- *Maul* (*Forcebreaker Maul*)
- *Quarterstaff* (*Forcebreaker Quarterstaff*)
- *Sling* (*Forcebreaker Sling*)
- *Staff* (*Forcebreaker Staff*)
- *Warhammer* (*Forcebreaker Warhammer*)
- *Wooden Staff* (*Forcebreaker Wooden Staff*)

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
