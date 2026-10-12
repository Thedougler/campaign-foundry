---
title: Sword of Sharpness
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Very Rare (Requires Attunement).*

When you attack an object with this magic weapon and hit, maximize your weapon damage dice against the target.

When you attack a creature with this weapon and roll a 20 on the d20 for the attack roll, that target takes an extra 14 Slashing damage and gains 1 Exhaustion level.

***Base items.*** This item variant can be applied to the following base items:

- *Glaive* (*Glaive of Sharpness*)
- *Greatsword* (*Greatsword of Sharpness*)
- *Longsword* (*Longsword of Sharpness*)
- *Scimitar* (*Scimitar of Sharpness*)

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
