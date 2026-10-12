---
title: Coin of Delving
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Common.*

This scintillating copper coin sheds dim light in a 5-foot radius. If dropped a distance greater than 5 feet, the coin issues a melodious ringing sound when it hits a surface. Any creature that can hear the chime can determine the distance the coin dropped based on the tone.

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
