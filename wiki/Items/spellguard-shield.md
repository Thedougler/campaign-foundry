---
title: Spellguard Shield
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Shield (*Shield*), Very Rare (Requires Attunement), 6 lb.*

AC +2

While holding this Shield, you have Advantage on saving throws against spells and other magical effects, and spell attack rolls have Disadvantage against you.

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
