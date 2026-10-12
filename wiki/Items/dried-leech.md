---
title: Dried Leech
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ammunition, Generic Variant, Uncommon.*

This leech has been dried and imbued with a mote of animating magic. If you hit a creature with a ranged attack roll using this ammunition, the leech springs to life and sinks its teeth into the target, dealing 1d4 piercing damage at the start of each of the target's turns. If the leech deals at least 10 damage or the target dies, the leech falls off. A creature, including the target, can use its action to detach the leech. Once a leech is no longer attached to its target, the leech dies and is no longer magical.

***Base items.*** This item variant can be applied to the following base items:

- *Arrow* (*Dried Leech Arrow*)
- *Bolt* (*Dried Leech Bolt*)
- *Firearm Bullet* (*Dried Leech Firearm Bullet*)
- *Needle* (*Dried Leech Needle*)
- *Sling Bullet* (*Dried Leech Sling Bullet*)

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
