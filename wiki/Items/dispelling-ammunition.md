---
title: Dispelling Ammunition
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ammunition, Generic Variant, Uncommon.*

When a target takes damage from this magical piece of ammunition, any ongoing spell of level 3 or lower on the target ends. Once it deals damage to a target, the ammunition is no longer magical.

***Base items.*** This item variant can be applied to the following base items:

- *Arrow* (*Dispelling Arrow*)
- *Bolt* (*Dispelling Bolt*)
- *Energy Cell* (*Dispelling Energy Cell*)
- *Firearm Bullet* (*Dispelling Firearm Bullet*)
- *Needle* (*Dispelling Needle*)
- *Sling Bullet* (*Dispelling Sling Bullet*)

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
