---
title: Bow of Melodies
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Very Rare (Requires Attunement).*

This bow has multiple strings and resembles a lyre or small harp. By strumming the strings while setting an arrow to the bow, you imbue the arrow with magic.

You can play one of the following melodies when you use the bow to make a ranged weapon attack. You must choose to do so before you make the attack roll, and you can play only one melody per attack.

***Melody of Precision.*** If you're proficient in Performance, you gain a +1 bonus to the attack roll. If you have expertise in Performance, you gain a +2 bonus instead.

***Melody of Reverberation.*** The melody you strum echoes loudly. On a hit, the target takes extra thunder damage equal to your Charisma modifier.

***Base items.*** This item variant can be applied to the following base items:

- *Longbow* (*Longbow of Melodies*)
- *Shortbow* (*Shortbow of Melodies*)

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
