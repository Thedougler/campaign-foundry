---
title: Manual of Gainful Exercise
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Very Rare, 5 lb.*

This book describes fitness exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practising its guidelines, your Strength increases by 2, to a maximum of 30. The manual then loses its magic, but regains it in a century.

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
