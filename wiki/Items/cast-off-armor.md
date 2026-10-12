---
title: Cast-Off Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Common.*

You can doff this armour as a Magic action.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*Cast-Off Breastplate*)
- *Chain Mail* (*Cast-Off Chain Mail*)
- *Chain Shirt* (*Cast-Off Chain Shirt*)
- *Half Plate Armour* (*Cast-Off Half Plate Armour*)
- *Hide Armour* (*Cast-Off Hide Armour*)
- *Leather Armour* (*Cast-Off Leather Armor*)
- *Padded Armor* (*Cast-Off Padded Armor*)
- *Plate Armor* (*Cast-Off Plate Armor*)
- *Ring Mail* (*Cast-Off Ring Mail*)
- *Scale Mail* (*Cast-Off Scale Mail*)
- *Splint Armor* (*Cast-Off Splint Armor*)
- *Studded Leather Armor* (*Cast-Off Studded Leather Armor*)

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
