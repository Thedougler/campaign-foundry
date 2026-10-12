---
title: Reveler's Concertina
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Instrument, Rare (Requires Attunement By a Bard).*

While holding this concertina, you gain a +2 bonus to the saving throw DC of your bard spells.

As an action, you can use the concertina to cast *Otto's irresistible dance* from the item. This property of the concertina can't be used again until the next dawn.

***Instrument.*** If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency.

---
*See the Tool Proficiencies entry for more information.*

Proficiency with a musical instrument indicates you are familiar with the techniques used to play it. You also have knowledge of some songs commonly performed with that instrument.

***History.*** Your expertise aids you in recalling lore related to your instrument.

***Performance.*** Your ability to put on a good show is improved when you incorporate an instrument into your act.

***Compose a Tune.*** As part of a long rest, you can compose a new tune and lyrics for your instrument. You might use this ability to impress a noble or spread scandalous rumours with a catchy tune.

### Musical Instrument

| | Activity         | |  DC | |
| ------------------ | :-----: |
| | Identify a tune  | |  10 | |
| | Improvise a tune | |  20 | |

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
