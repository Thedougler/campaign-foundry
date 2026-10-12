---
title: Elocutionist's Lexicon
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Common.*

While holding this magic dictionary, you can take a Magic action and try to recall a specific word. The book automatically opens to the page containing the exact word you're searching for.

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
