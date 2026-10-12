---
title: Ring of Free Action
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ring, Rare (Requires Attunement).*

While you wear this ring, Difficult Terrain doesn't cost you extra movement. In addition, magic can neither reduce any of your Speeds nor cause you to have the Paralysed or Restrained condition.

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
