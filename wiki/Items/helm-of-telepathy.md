---
title: Helm of Telepathy
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Uncommon (Requires Attunement).*

While wearing this helm, you have telepathy with a range of 30 feet, and you can cast *Detect Thoughts* or *Suggestion* (save DC 13) from the helm. Once either spell is cast from the helm, that spell can't be cast from it again until the next dawn.

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
