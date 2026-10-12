---
title: +1 Shield (*)
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Uncommon.*

** This generic variant has the same name and source as the item *+1 Shield**.

While holding this Shield, you have a +1 bonus to Armour Class, in addition to the Shield's normal bonus to AC.

***Base items.*** This item variant can be applied to the following base items:

- *Shield* (*+1 Shield*)

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
