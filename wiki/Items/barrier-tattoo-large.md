---
title: Barrier Tattoo (Large)
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item (Tattoo), Very Rare (Requires Attunement).*

Produced by a special needle, this magic tattoo depicts protective imagery and uses ink that resembles liquid metal.

***Tattoo Attunement.*** To attune to this item, you hold the needle to your skin where you want the tattoo to appear, pressing the needle there throughout the attunement process. When the attunement is complete, the needle turns into the ink that becomes the tattoo, which appears on the skin.

If your attunement to the tattoo ends, the tattoo vanishes, and the needle reappears in your space.

***Protection.*** While you aren't wearing armour, the tattoo grants you an Armour Class of 18. You can use a shield and still gain this benefit.

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
