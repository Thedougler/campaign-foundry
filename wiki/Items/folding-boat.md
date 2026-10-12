---
title: Folding Boat
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Rare, 4 lb.*

This object appears as a wooden box that measures 12 inches long, 6 inches wide, and 6 inches deep. It weighs 4 pounds and floats. It can be opened to store items inside. This item also has three command words, each requiring a Magic action to use:

- **First Command Word.** The box unfolds into a Rowing boat.
- **Second Command Word.** The box unfolds into a Keelboat.
- **Third Command Word.** The Folding Boat folds back into a box if no creatures are aboard. Any objects in the vessel that can't fit inside the box remain outside the box as it folds. Any objects in the vessel that can fit inside the box do so.

When the box becomes a vessel, its weight becomes that of a normal vessel its size, and anything that was stored in the box remains in the boat.

Statistics for the *Rowing boat* and *Keelboat* appear in the *Player's Handbook*. If either vessel is reduced to 0 Hit Points, the Folding Boat is destroyed.

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
