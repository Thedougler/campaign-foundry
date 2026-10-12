---
title: Ring of Obscuring
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Ring, Uncommon (Requires Attunement).*

This band of iron resembles a skull and is cold to the touch. It has 3 charges and regains 1d3 expended charges daily at dawn. As an action while wearing the ring, you can expend 1 of its charges to cast the *fog cloud* spell from it, with the following changes: the cloud is centred on you when it first appears, and the spell lasts for 1 minute (no concentration required).

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
