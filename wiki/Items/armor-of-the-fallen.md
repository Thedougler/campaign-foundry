---
title: Armor of the Fallen
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Generic Variant, Uncommon (Requires Attunement).*

While wearing this armour, you can use it to cast either *Speak with Dead* or *Animate Dead*. Once the armour has cast a spell in this way, it can't cast either spell until the next dawn.

Your soul keeps this armour together. If you die while you are attuned to the armour, the armour is destroyed.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*Breastplate of the Fallen*)
- *Chain Mail* (*Chain Mail of the Fallen*)
- *Chain Shirt* (*Chain Shirt of the Fallen*)
- *Half Plate Armour* (*Half Plate Armour of the Fallen*)
- *Hide Armour* (*Hide Armour of the Fallen*)
- *Plate Armour* (*Plate Armor of the Fallen*)
- *Ring Mail* (*Ring Mail of the Fallen*)
- *Scale Mail* (*Scale Mail of the Fallen*)
- *Spiked Armor* (*Spiked Armor of the Fallen*)
- *Splint Armor* (*Splint Armor of the Fallen*)

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
