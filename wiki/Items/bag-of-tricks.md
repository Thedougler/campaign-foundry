---
title: Bag of Tricks
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon.*

Multiple variations of this item exist, as listed below:

- *Bag of Tricks, Gray*
- *Bag of Tricks, Rust*
- *Bag of Tricks, Tan*

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
