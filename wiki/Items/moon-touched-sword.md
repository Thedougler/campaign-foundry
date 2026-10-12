---
title: Moon-Touched Sword
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Common.*

In Darkness, the unsheathed blade of this weapon sheds moonlight, creating Bright Light in a 15-foot radius and Dim Light for an additional 15 feet.

***Base items.*** This item variant can be applied to the following base items:

- *Double-Bladed Scimitar* (*Moon-Touched Double-Bladed Scimitar*)
- *Greatsword* (*Moon-Touched Greatsword*)
- *Longsword* (*Moon-Touched Longsword*)
- *Rapier* (*Moon-Touched Rapier*)
- *Scimitar* (*Moon-Touched Scimitar*)
- *Shortsword* (*Moon-Touched Shortsword*)

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
