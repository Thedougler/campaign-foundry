---
title: Periapt of Health
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon (Requires Attunement), 1 lb.*

While wearing this pendant, you can take a Magic action to regain 2d4 + 2 Hit Points. Once used, this property can't be used again until the next dawn.

In addition, you have Advantage on saving throws to avoid or end the Poisoned condition while you wear this pendant.

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
