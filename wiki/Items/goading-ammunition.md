---
title: Goading Ammunition
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ammunition, Generic Variant, Uncommon.*

If this piece of magic ammunition hits a creature and deals damage, the target makes a DC 13 Charisma saving throw. On a failed save, the target can't take Reactions until the start of its next turn, as it sputters and rages impotently. Once it hits a target, the ammunition is no longer magical.

***Base items.*** This item variant can be applied to the following base items:

- *Arrow* (*Goading Arrow*)
- *Bolt* (*Goading Bolt*)
- *Energy Cell* (*Goading Energy Cell*)
- *Firearm Bullet* (*Goading Firearm Bullet*)
- *Needle* (*Goading Needle*)
- *Sling Bullet* (*Goading Sling Bullet*)

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
