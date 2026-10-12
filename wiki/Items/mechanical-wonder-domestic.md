---
title: Mechanical Wonder (Domestic)
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Uncommon, 400 GP.*

A Mechanical Wonder is a semi-autonomous object imbued with magical power. Mechanical Wonders vary greatly in size and form depending on their function.

A Mechanical Wonder is a dormant object until activated. To activate a Mechanical Wonder, you must wind the wonder with a handheld key unique to that wonder. It takes 1 minute to wind a Mechanical Wonder. While you wind it, you must take the Utilize action each turn.

Once wound, a Mechanical Wonder remains activated for the duration specified in the wonder's description.

This bipedal wonder is designed to assist with household duties. It vaguely resembles whatever species its creator used as inspiration. An activated domestic wonder uses the **Domestic Wonder** stat block. The wonder is an ally to you and your allies. In combat, the wonder shares your Initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its movement to avoid danger. The domestic wonder is destroyed if it drops to 0 Hit Points.

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
