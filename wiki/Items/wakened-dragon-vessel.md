---
title: Wakened Dragon Vessel
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Very Rare (Requires Attunement).*

This vessel can be a potion bottle, drinking horn, or other container meant to hold a liquid.

As a bonus action, if the vessel is empty, you can speak the command word to fill the vessel with one of the following (your choice): ale, olive oil, mead, wine, a *potion of healing*, a *potion of greater healing*, a *potion of superior healing*, a *potion of climbing*, a *potion of fire breath*, or a *potion of flying*. Once this property is used, it can't be used until the next dawn. A potion you create in this way loses its magical properties if it isn't imbibed within 24 hours.

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
