---
title: Armor of Gleaming
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Generic Variant, Common.*

This armour never gets dirty.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*Breastplate of Gleaming*)
- *Chain Mail* (*Chain Mail of Gleaming*)
- *Chain Shirt* (*Chain Shirt of Gleaming*)
- *Half Plate Armour* (*Half Plate Armour of Gleaming*)
- *Hide Armour* (*Hide Armour of Gleaming*)
- *Leather Armour* (*Leather Armor of Gleaming*)
- *Padded Armor* (*Padded Armor of Gleaming*)
- *Plate Armor* (*Plate Armor of Gleaming*)
- *Ring Mail* (*Ring Mail of Gleaming*)
- *Scale Mail* (*Scale Mail of Gleaming*)
- *Splint Armor* (*Splint Armor of Gleaming*)
- *Studded Leather Armor* (*Studded Leather Armor of Gleaming*)

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
