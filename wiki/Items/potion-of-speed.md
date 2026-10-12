---
title: Potion of Speed
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Very Rare, ½ lb.*

When you drink this potion, you gain the effect of the *Haste* spell for 1 minute (no Concentration required) without suffering the wave of lethargy that typically occurs when the effect ends.

This potion's yellow fluid is streaked with black and swirls on its own.

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
