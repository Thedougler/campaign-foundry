---
title: Clockwork Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Very Rare (Requires Attunement).*

The outside surface and internal joints of this armour whir with interlocking gears, drawing on the orderly magic of the plane of Mechanus.

The armour has 4 charges. If you make a d20 roll while wearing this armour, you can expend 1 charge to change the number rolled to a 10. The armour regains 1d4 expended charges daily at dawn.

***Base items.*** This item variant can be applied to the following base items:

- *Chain Mail* (*Clockwork Chain Mail*)
- *Plate Armour* (*Clockwork Plate Armour*)
- *Ring Mail* (*Clockwork Ring Mail*)
- *Splint Armour* (*Clockwork Splint Armour*)

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
