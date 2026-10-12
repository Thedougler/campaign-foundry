---
title: Scholar's Anchoring Bangle
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Rare (Requires Attunement).*

This heavy magical bracelet inures your mind against potential distractions. While wearing this bracelet, you gain the following benefits.

***Deep Knowledge.*** When you take the Study action and make an Intelligence check using a skill in which you have proficiency, you can treat a d20 roll of 9 or lower as a 10.

***Single-Minded Focus.*** When you fail a Constitution saving throw to maintain Concentration, you can take a Reaction to succeed instead. Once you use this property, it can't be used again until the next dawn.

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
