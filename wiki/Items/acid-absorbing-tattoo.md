---
title: Acid Absorbing Tattoo
type: Item
summary: "Very rare magic tattoo that grants acid resistance and a once-per-dawn reaction to turn one dose of acid damage into immunity and healing."
sources:
  - "archive/acid-absorbing-tattoo.md"
---

## Properties

*Wondrous Item (Tattoo), Very Rare (Requires Attunement).*

Produced by a special needle, this magic tattoo features designs that emphasize one colour (green).

***Tattoo Attunement.*** To attune to this item, you hold the needle to your skin where you want the tattoo to appear, pressing the needle there throughout the attunement process. When the attunement is complete, the needle turns into the ink that becomes the tattoo, which appears on the skin.

If your attunement to the tattoo ends, the tattoo vanishes, and the needle reappears in your space.

***Damage Resistance.*** While the tattoo is on your skin, you have resistance to acid damage.

***Damage Absorption.*** When you take acid damage, you can use your reaction to gain immunity against that instance of the damage, and you regain a number of hit points equal to half the damage you would have taken. Once this reaction is used, it can't be used again until the next dawn.

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
