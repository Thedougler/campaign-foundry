---
title: Last Stand Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Very Rare.*

You have a +1 bonus to AC while wearing this armour, which shimmers softly.

If you die while wearing the armour, it is destroyed, and each celestial, fey, and fiend within 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*Last Stand Breastplate*)
- *Chain Mail* (*Last Stand Chain Mail*)
- *Chain Shirt* (*Last Stand Chain Shirt*)
- *Half Plate Armour* (*Last Stand Half Plate Armour*)
- *Hide Armour* (*Last Stand Hide Armour*)
- *Leather Armour* (*Last Stand Leather Armor*)
- *Padded Armor* (*Last Stand Padded Armor*)
- *Plate Armor* (*Last Stand Plate Armor*)
- *Ring Mail* (*Last Stand Ring Mail*)
- *Scale Mail* (*Last Stand Scale Mail*)
- *Spiked Armor* (*Last Stand Spiked Armor*)
- *Splint Armor* (*Last Stand Splint Armor*)
- *Studded Leather Armor* (*Last Stand Studded Leather Armor*)

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
