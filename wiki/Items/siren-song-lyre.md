---
title: Siren Song Lyre
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Instrument (*Lyre*), Rare (Requires Attunement).*

You can use an action to play this lyre and cast one of the following spells from it: *animal friendship*, *charm person*, *enthral*, *suggestion*. If the spell requires a saving throw, the spell save DC is 13.

Once the instrument has been used to cast a spell, it can't be used to cast that spell again until the next dawn.

***Instrument.*** If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency.

---
*See the Tool Proficiencies entry for more information.*

Proficiency with a musical instrument indicates you are familiar with the techniques used to play it. You also have knowledge of some songs commonly performed with that instrument.

***History.*** Your expertise aids you in recalling lore related to your instrument.

***Performance.*** Your ability to put on a good show is improved when you incorporate an instrument into your act.

***Compose a Tune.*** As part of a long rest, you can compose a new tune and lyrics for your instrument. You might use this ability to impress a noble or spread scandalous rumours with a catchy tune.

#### Musical Instrument

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
