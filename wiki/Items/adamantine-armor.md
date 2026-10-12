---
title: Adamantine Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Generic Variant, Uncommon.*

This suit of armour is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any Critical Hit against you becomes a normal hit.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*Adamantine Breastplate*)
- *Chain Mail* (*Adamantine Chain Mail*)
- *Chain Shirt* (*Adamantine Chain Shirt*)
- *Half Plate Armour* (*Adamantine Half Plate Armour*)
- *Plate Armour* (*Adamantine Plate Armour*)
- *Ring Mail* (*Adamantine Ring Mail*)
- *Scale Mail* (*Adamantine Scale Mail*)
- *Splint Armour* (*Adamantine Splint Armor*)

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
