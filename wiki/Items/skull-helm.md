---
title: Skull Helm
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Very Rare (Requires Attunement).*

While wearing this skull-shaped helm, you have resistance to cold, poison, and necrotic damage.

Additionally, while wearing the helm, you can cast *Spirit of Death* from it without requiring material components. Once you use the helm to cast the spell, the helm can't cast this spell again until the next dawn.

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
