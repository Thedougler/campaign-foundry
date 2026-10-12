---
title: Potion of Water Breathing
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Potion, Uncommon, ½ lb.*

You can breathe underwater for 24 hours after drinking this potion.

This potion's cloudy green fluid smells of the sea and has a jellyfish-like bubble floating in it.

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
