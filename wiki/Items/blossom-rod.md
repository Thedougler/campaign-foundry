---
title: Blossom Rod
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Rod (Requires Attunement By a Spellcaster).*

Evolving Item

This rod is made of intertwined, living plant stems.

***Evolving Item.*** *This item is an Evolving Item, see *Evolving Magic Items* for more information.*

Multiple variations of this item exist, as listed below:

- *Budding Blossom Rod*
- *Flowering Blossom Rod*
- *Somniferous Blossom Rod*

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
