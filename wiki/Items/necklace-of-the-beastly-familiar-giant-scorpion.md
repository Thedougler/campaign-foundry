---
title: Necklace of the Beastly Familiar (Giant Scorpion)
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Rare (Requires Attunement By a Spellcaster).*

This bejewelled necklace is set with chrysoprase and comes with a matching charm that can be worn by your familiar.

***Familiar.*** While wearing this necklace, you can cast the *Find Familiar* spell from it. Once the necklace has been used to cast this spell, it can't be used to cast it again until the next dawn.

***Beast Transformation.*** While your familiar is within 60 feet of you, you can take a Magic action to activate the necklace. Your familiar shape-shifts into a **Giant Scorpion** for 10 minutes.

While your familiar is transformed, its stat block is replaced by the stat block of the Beast form, but it retains its alignment, personality, creature type, Hit Points, and Hit Point Dice. Equipment the familiar is wearing or carrying doesn't change size or shape to match the Beast form, and any equipment that the Beast form can't wear or carry falls to the ground.

Your familiar gains a number of Temporary Hit Points equal to the Hit Points of the Beast form. These Temporary Hit Points vanish if any remain when the transformation ends. The transformation ends early on your familiar if it has no Temporary Hit Points left.

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
