---
type: Prep
summary: "Plan for Session 1: the lamp goes dark, the Party takes the Warden's job, and the Reedrunners come for the oil."
sources: []
date: "14 Eelrun 412 CY"
revealed: ""
title: ""
---

## At a glance

- **Session question.** Will the Party take Hobb Tarrow's job and get the Gullhook lamp lit before the Reedrunners douse it again?
- **Party at.** The Marl Ferry in the harbor channel off [[Saltwick]], at dusk on 14 Eelrun 412 CY.
- **Length.** 3 hours, set by the Campaign. Five Scenes.
- **Threads in play.** [[Reedrunner Tithe]] and, at the edges, [[The Silent Bell]].

## Scene Chart

| #   | Scene                              | Kind        | Minutes | Threads                                   |
| --- | ---------------------------------- | ----------- | ------- | ----------------------------------------- |
| 1   | [[Session 1 - The Lamp Goes Dark]] | Hook        | 25      | [[Reedrunner Tithe]]                      |
| 2   | [[Session 1 - A Warden's Offer]]   | Development | 35      | [[Reedrunner Tithe]]                      |
| 3   | [[Session 1 - Fire on the Pier]]   | Cliffhanger | 40      | [[Reedrunner Tithe]]                      |
| 4   | [[Session 1 - The Lamp Room]]      | Climax      | 50      | [[Reedrunner Tithe]], [[The Silent Bell]] |
| 5   | [[Session 1 - Light on the Water]] | Resolution  | 20      | [[The Silent Bell]]                       |

## Threads

- [[Reedrunner Tithe]] is active. [[Ilse Corran]] wants the lamp dark on moonless nights. The lever is the cut wick seal, which proves the outage is deliberate.
- [[The Silent Bell]] has not yet opened for the Party. The lever is one bell stroke heard from the lighthouse at the end of the night.

## Opposition

- [[Ilse Corran]], using the [[Bandit Captain]] stat block, meets the Party in the lamp room.
- Five [[Goblin Warrior]] hired hands of [[The Reedrunners]] burn the oil warehouse on Pier Row.
- [[Hobb Tarrow]] and [[Pell Rushlight]] are allies the Party can meet and question.

## Clues

| Clue                                                                        | Found in                                                             |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| The lamp's wick seal was cut, not burned out.                               | [[Session 1 - The Lamp Goes Dark]], [[Session 1 - The Lamp Room]]    |
| Every wreck this season happened on a moonless night.                       | [[Session 1 - A Warden's Offer]], [[Session 1 - The Lamp Room]]      |
| The oil barrels were drained through a tap, not spilled.                    | [[Session 1 - A Warden's Offer]], [[Session 1 - Fire on the Pier]]   |
| Reedrunner hired hands wear a green thread on the wrist.                    | [[Session 1 - Fire on the Pier]], [[Session 1 - The Lamp Room]]      |
| The Reedrunners salvage each wreck the night after it happens.              | [[Session 1 - The Lamp Goes Dark]], [[Session 1 - A Warden's Offer]] |
| The old keeper's log records a bell heard before every Long Ebb.            | [[Session 1 - A Warden's Offer]], [[Session 1 - Light on the Water]] |
| Ilse Corran has a clerk's ink stains and a clerk's precision.               | [[Session 1 - The Lamp Room]]                                        |
| Hobb Tarrow burned a letter in the keeper's stove.                          | [[Session 1 - A Warden's Offer]], [[Session 1 - Light on the Water]] |
| An unlit boat ties up in the Undertow on every dark night.                  | [[Session 1 - The Lamp Goes Dark]], [[Session 1 - Fire on the Pier]] |
| The [[Ebb Lantern]] hangs in the keeper's room and is not on the oil count. | [[Session 1 - A Warden's Offer]], [[Session 1 - Light on the Water]] |

## Links

```base
filters:
  and:
    - file.inFolder(this.file.folder)
views:
  - type: table
    name: Scenes
    filters:
      and:
        - 'note.type == "Scene"'
    groupBy:
      property: note.kind
      direction: ASC
    order:
      - file.name
      - note.summary
  - type: table
    name: Handouts
    filters:
      and:
        - 'note.type == "Handout"'
    order:
      - file.name
      - note.summary
```
