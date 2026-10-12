---
title: Rope of Mending
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Common.*

This 50-foot coil of rope can repair itself when cut into any number of smaller pieces. As a Magic action, you can cause all pieces of the rope that are in contact with each other and not otherwise in use to knit back together. A Rope of Mending is forever shortened if a section of it is lost or destroyed.

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
