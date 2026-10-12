---
title: Keycharm
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Common (Requires Attunement By a Creature with the Mark of Warding).*

This small stylized key plays a vital role in the work of House Kundarak. If you cast the *alarm*, *arcane lock*, or *glyph of warding* spell, you can tie the effect to the keycharm so that whoever holds it receives the notification from the *alarm* spell, bypasses the lock of the *arcane lock* spell, or avoids triggering the glyph placed by the *glyph of warding* spell. In addition, the holder (who needn't be attuned to the item) can take an action to end any one spell tied to it, provided the holder knows the command word you set for ending the tied spells. The keycharm can have up to three tied spells at one time.

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
