---
title: Mechanical Wonder
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, 500 lb.*

A Mechanical Wonder is a semi-autonomous object imbued with magical power. Mechanical Wonders vary greatly in size and form depending on their function.

A Mechanical Wonder is a dormant object until activated. To activate a Mechanical Wonder, you must wind the wonder with a handheld key unique to that wonder. It takes 1 minute to wind a Mechanical Wonder. While you wind it, you must take the Utilize action each turn.

Once wound, a Mechanical Wonder remains activated for the duration specified in the wonder's description.

Multiple variations of this item exist, as listed below:

- *Mechanical Wonder (Domestic)*
- *Mechanical Wonder (Flying)*
- *Mechanical Wonder (Gyrocopter)*
- *Mechanical Wonder (Mobility)*

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
