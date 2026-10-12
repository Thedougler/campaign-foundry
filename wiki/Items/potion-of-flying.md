---
title: Potion of Flying
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Very Rare, ½ lb.*

When you drink this potion, you gain a Fly Speed equal to your Speed for 1 hour and can hover. If you're in the air when the potion wears off, you fall unless you have some other means of staying aloft.

This potion's clear liquid floats at the top of its container and has cloudy white impurities drifting in it.

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
