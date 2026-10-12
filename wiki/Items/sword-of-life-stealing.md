---
title: Sword of Life Stealing
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Rare (Requires Attunement).*

When you attack a creature with this magic weapon and roll a 20 on the d20 for the attack roll, that target takes an extra 15 Necrotic damage if it isn't a Construct or an Undead, and you gain Temporary Hit Points equal to the amount of Necrotic damage taken.

***Base items.*** This item variant can be applied to the following base items:

- *Glaive* (*Glaive of Life Stealing*)
- *Greatsword* (*Greatsword of Life Stealing*)
- *Longsword* (*Longsword of Life Stealing*)
- *Rapier* (*Rapier of Life Stealing*)
- *Scimitar* (*Scimitar of Life Stealing*)
- *Shortsword* (*Shortsword of Life Stealing*)

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
