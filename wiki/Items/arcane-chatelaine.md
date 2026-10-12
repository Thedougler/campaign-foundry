---
title: Arcane Chatelaine
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Rare.*

This ornate clasp has six spectral keys attached to it. As a Magic action, you can touch one of the keys to a closed door, window, gate, container, or hatch to cast the *Arcane Lock* spell on it. Once a key is used, it disappears. When all six keys have disappeared, the chatelaine disappears.

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
