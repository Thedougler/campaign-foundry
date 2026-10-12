---
title: Potion of Vitality
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Very Rare, ½ lb.*

When you drink this potion, it removes any Exhaustion levels you have and ends the Poisoned condition on you. For the next 24 hours, you regain the maximum number of Hit Points for any Hit Point Die you spend.

This potion's crimson liquid regularly pulses with dull light, calling to mind a heartbeat.

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
