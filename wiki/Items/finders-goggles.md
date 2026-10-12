---
title: Finder's Goggles
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon (Requires Attunement By a Creature with the Mark of Finding).*

The lenses of these garish goggles are carved from Siberys dragonshards. While wearing these lenses, you gain the following benefits:

- When you make a Wisdom (Insight) check, you can roll a d4 and add the number rolled to the check.
- As an action, you can use the goggles to examine an object to identify the aura of the last creature that touched it. Make a Wisdom (Insight) check against a DC of 13 + the number of days since the last contact occurred. On a success, you learn the creature's type and can immediately use the goggles to cast *locate creature* to find that creature. This property can't be used again until the next dawn.

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
