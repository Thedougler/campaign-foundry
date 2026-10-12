---
title: War Horn of Valor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Instrument (*Horn*), Rare.*

This brass war horn is engraved with the war rune, which glows purple when the horn is blown.

You can blow the horn as a bonus action. When you do, if you have the frightened condition, you immediately end that condition on yourself. You also have advantage on saving throws against being frightened until the start of your next turn.

***Invoking the Rune.*** When you blow the horn, you can also invoke the rune, imbuing the horn's deep call with protective magic that affects creatures of your choice within 30 feet of yourself. You and all affected creatures gain a +1 bonus to AC until the start of your next turn.

Once the rune has been invoked, it can't be invoked again until the next dawn.

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
