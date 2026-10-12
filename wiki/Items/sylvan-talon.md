---
title: Sylvan Talon
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Common (Requires Attunement).*

While this weapon is on your person, you understand the non-written communication of all Fey, and they understand yours.

***Secret Message.*** As a Magic action, you can use the weapon to cast *Message*. Once this property is used, it can't be used again until the next dawn.

***Base items.*** This item variant can be applied to the following base items:

- *Dagger* (*Sylvan Talon Dagger*)
- *Rapier* (*Sylvan Talon Rapier*)
- *Scimitar* (*Sylvan Talon Scimitar*)
- *Shortsword* (*Sylvan Talon Shortsword*)
- *Sickle* (*Sylvan Talon Sickle*)
- *Spear* (*Sylvan Talon Spear*)

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
