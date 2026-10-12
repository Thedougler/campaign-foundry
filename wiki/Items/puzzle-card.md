---
title: Puzzle Card
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Legendary.*

As an action, you can hold this card aloft and magically disable each trap within 60 feet of you that isn't behind total cover. A trap, for the purpose of this property, includes any object or mechanism that would inflict a sudden effect that was intended by its maker to cause harm or inconvenience. If the trap is the effect of a spell, such as *Alarm*, that trap is suppressed for 10 minutes instead of being disabled. Once this property is used, it can't be used again until the next dawn.

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
