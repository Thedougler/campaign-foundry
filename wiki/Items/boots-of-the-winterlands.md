---
title: Boots of the Winterlands
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon (Requires Attunement).*

These furred boots are snug and feel warm. While wearing them, you gain the following benefits.

***Cold Resistance.*** You have Resistance to Cold damage and can tolerate temperatures of 0 degrees Fahrenheit or lower without any additional protection.

***Winter Strider.*** You ignore Difficult Terrain created by ice or snow.

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
