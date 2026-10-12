---
title: Potion of Tirelessness
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Potion, Uncommon.*

After you drink this potion, you don't need to sleep, and magic can't put you to sleep. This effect lasts 24 hours. For the duration, you can finish a Long Rest in 4 hours if you spend those hours in a state of quiet focus, during which you retain consciousness.

This pale red potion is as thick as molasses, yet it slides out of the bottle as readily as oil.

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
