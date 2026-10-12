---
title: Robe of Eyes
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Rare (Requires Attunement).*

This robe is adorned with eye-like patterns. While you wear the robe, you gain the following benefits:

- **All-Around Vision.** The robe gives you Advantage on Wisdom (Perception) checks that rely on sight.
- **Special Senses.** You have Darkvision and Truesight, both with a range of 120 feet.

***Drawbacks.*** A *Light* spell cast on the robe or a *Daylight* spell cast within 5 feet of the robe gives you the Blinded condition for 1 minute. At the end of each of your turns, you make a Constitution saving throw (DC 11 for Light or DC 15 for Daylight), ending the condition on yourself on a success.

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
