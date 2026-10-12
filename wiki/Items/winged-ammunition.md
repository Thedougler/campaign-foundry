---
title: Winged Ammunition
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Ammunition, Generic Variant, Uncommon.*

Ranged weapon attack rolls made with this ammunition ignore half and three-quarters cover. In addition, attacking at long range doesn't impose disadvantage on ranged weapon attack rolls made with this ammunition.

***Base items.*** This item variant can be applied to the following base items:

- *Arrow* (*Winged Arrow*)
- *Bolt* (*Winged Bolt*)
- *Firearm Bullet* (*Winged Firearm Bullet*)
- *Needle* (*Winged Needle*)
- *Sling Bullet* (*Winged Sling Bullet*)

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
