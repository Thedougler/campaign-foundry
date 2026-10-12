---
title: Oathbow
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Generic Variant, Very Rare (Requires Attunement).*

When you nock an arrow on this bow, it whispers in Elvish, "Swift defeat to my enemies." When you use this weapon to make a ranged attack, you can utter or sign the following command words: "Swift death to you who have wronged me." The target of your attack becomes your sworn enemy until it dies or until dawn 7 days later. You can have only one such sworn enemy at a time. When your sworn enemy dies, you can choose a new one after the next dawn.

When you make a ranged attack roll with this weapon against your sworn enemy, you have Advantage on the roll. In addition, your target gains no benefit from Half Cover or Three-Quarters Cover, and you suffer no Disadvantage due to long range. If the attack hits, your sworn enemy takes an extra 3d6 Piercing damage.

While your sworn enemy lives, you have Disadvantage on attack rolls with all other weapons.

***Base items.*** This item variant can be applied to the following base items:

- *Longbow* (*Oath Longbow*)
- *Shortbow* (*Oath Shortbow*)

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
