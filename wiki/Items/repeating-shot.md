---
title: Repeating Shot
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Uncommon (Requires Attunement).*

This magic weapon grants a +1 bonus to attack and damage rolls made with it when it's used to make a ranged attack, and it ignores the Loading property if it has that property.

If the weapon lacks ammunition, it produces its own, automatically creating one piece of magic ammunition when the wielder makes a ranged attack roll with it. The ammunition created by the weapon vanishes the instant after it hits or misses a target.

***Base items.*** This item variant can be applied to the following base items:

- *Blowgun* (*Repeating Blowgun*)
- *Hand Crossbow* (*Repeating Hand Crossbow*)
- *Heavy Crossbow* (*Repeating Heavy Crossbow*)
- *Light Crossbow* (*Repeating Light Crossbow*)
- *Longbow* (*Repeating Longbow*)
- *Musket* (*Repeating Musket*)
- *Pistol* (*Repeating Pistol*)
- *Shortbow* (*Repeating Shortbow*)
- *Sling* (*Repeating Sling*)

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
