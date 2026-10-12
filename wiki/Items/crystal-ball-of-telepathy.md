---
title: Crystal Ball of Telepathy
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Legendary (Requires Attunement), 3 lb.*

While touching this crystal orb, you can cast *Scrying* (save DC 17) with it. In addition, you can communicate telepathically with creatures you can see within 30 feet of the spell's sensor. You can also cast *Suggestion* (save DC 17) through the sensor on one of those creatures. You don't need to concentrate on this *Suggestion* to maintain it during its duration, but it ends if *Scrying* ends. You can't cast *Suggestion* in this way again until the next dawn.

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
