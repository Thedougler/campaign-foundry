---
title: Scroll of Protection (Fey)
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Scroll, Rare.*

Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Fey can't enter or affect anything in the area. However, if you move in such a way that an Fey would be inside the area, the effect ends.

As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.

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
