---
title: Returning Weapon
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Generic Variant, Uncommon.*

This magic weapon grants a +1 bonus to attack and damage rolls made with it, and it returns to your hand immediately after you use it to make a ranged attack roll.

***Base items.*** This item variant can be applied to the following base items:

- *Dagger* (*Returning Dagger*)
- *Dart* (*Returning Dart*)
- *Handaxe* (*Returning Handaxe*)
- *Javelin* (*Returning Javelin*)
- *Light Hammer* (*Returning Light Hammer*)
- *Spear* (*Returning Spear*)
- *Trident* (*Returning Trident*)

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
