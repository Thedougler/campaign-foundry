---
title: Walloping Ammunition
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Ammunition, Generic Variant, Common.*

A creature hit by this ammunition must succeed on a DC 10 Strength saving throw or have the Prone condition.

***Base items.*** This item variant can be applied to the following base items:

- *Arrow* (*Walloping Arrow*)
- *Bolt* (*Walloping Bolt*)
- *Energy Cell* (*Walloping Energy Cell*)
- *Firearm Bullet* (*Walloping Firearm Bullet*)
- *Needle* (*Walloping Needle*)
- *Sling Bullet* (*Walloping Sling Bullet*)

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
