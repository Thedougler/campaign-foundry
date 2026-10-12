---
title: Bloodseeker Ammunition
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Ammunition, Generic Variant, Very Rare.*

Ranged attack rolls made with this ammunition have advantage against any creature that doesn't have all its hit points.

***Base items.*** This item variant can be applied to the following base items:

- *Arrow* (*Bloodseeker Arrow*)
- *Bolt* (*Bloodseeker Bolt*)
- *Energy Cell* (*Bloodseeker Energy Cell*)
- *Firearm Bullet* (*Bloodseeker Firearm Bullet*)
- *Needle* (*Bloodseeker Needle*)
- *Sling Bullet* (*Bloodseeker Sling Bullet*)

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
