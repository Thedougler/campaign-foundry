---
title: Chime of Opening
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Rare, 1 lb.*

This hollow metal tube measures about 1 foot long and weighs 1 pound. As a Magic action, you can strike the chime to cast *Knock*. The spell's customary knocking sound is replaced by the clear, ringing tone of the chime, which is audible out to 300 feet. The chime can be used 10 times. After the tenth time, it cracks and becomes useless.

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
