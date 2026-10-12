---
title: Manifold Tool
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Common (Requires Attunement).*

This tool takes the form of a wrench, a screwdriver, or another basic tool. As a Magic action, you can touch the item and transform it into a type of *Artisan's Tools* of your choice. Whatever form the tool takes, you have proficiency with it when you use it.

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
