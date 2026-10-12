---
title: Potions of Healing
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Rarity Varies, ½ lb.*

You can drink or administer the potion as a Bonus Action. Administering it to another creature requires that creature to be within 5 feet of you. The creature that drinks this potion regains Hit Points according to its rarity, as shown below.

Whatever its potency, the potion's red liquid glimmers when agitated.

| Potion                         | Hit Points Regained | Rarity    |
| ------------------------------ | ------------------- | --------- |
| [[Potion of Healing]]          | 2d4 + 2             | Common    |
| [[Potion of Greater Healing]]  | 4d4 + 4             | Uncommon  |
| [[Potion of Superior Healing]] | 8d4 + 8             | Rare      |
| [[Potion of Supreme Healing]]  | 10d4 + 20           | Very Rare |

Rules reference: [SRD 5.2.1](https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf), “Potion of Healing”, “Potions” and “Potions of Healing”.

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
