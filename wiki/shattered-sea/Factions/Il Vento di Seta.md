---
type: Faction
summary: "A halfling trio with a Tessarine booking agent. The same perfect set
  every Palio, for a devoted crowd of exactly the same size."
sources:
  - "archive/ssw-il-palio-delle-voci.md"
aliases:
  - "The Silk Wind"
revealed: ""
title: ""
---

## At a glance

- **Goal.** To place first without changing a note.
- **Next move.** Play the same set, perfectly, and let the devoted crowd keep the stage at the [[Il Palio delle Voci Contese|Palio]].
- **Led by.** The halfling trio. A [[Tessarine Concordat|Tessarine]] booking agent handles the business.
- **Strength.** A crowd that already knows all the words and returns at exactly the same size every year.

> [!narration] Public face
> The first chord lands and the front of the crowd is already singing, because this is the set it sang last year and the year before. The trio plays it note for note, the crowd gets exactly what it came back for, and by the last chorus the name on every mouth around you is Il Vento di Seta.

## Play

- **When met.** On a Palio stage mid-set, the audience singing the words back.
- **When opposed.** The trio plays the set the same way whatever happens, and the crowd that loves it stays.

## Depth

### History

Three second places at the Palio.

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
