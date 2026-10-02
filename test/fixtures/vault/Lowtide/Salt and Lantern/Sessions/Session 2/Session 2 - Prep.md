---
type: Prep
summary: "Plan for Session 2: the bell rings early, the tide drops and the Party goes down to the Drowned Chapel."
sources: []
date: "22 Eelrun 412 CY"
---

## At a glance

- **Session question.** Will the Party answer the bell, and what will they take from the Drowned Chapel?
- **Party at.** [[Reedholt]], at dawn on 22 Eelrun 412 CY, a week after the fight at Gullhook. Open with [[Session 1 - Previously On]].
- **Length.** 3 hours, set by the Campaign. Five Scenes.
- **Threads in play.** [[The Silent Bell]], [[Reedrunner Tithe]] and, glimpsed at the end, [[The Failing Sluice]].

## Scene Chart

| #   | Scene                                   | Kind        | Minutes | Threads                                   |
| --- | --------------------------------------- | ----------- | ------- | ----------------------------------------- |
| 1   | [[Session 2 - The Bell Rings Early]]    | Hook        | 25      | [[The Silent Bell]]                       |
| 2   | [[Session 2 - Nib's Tally]]             | Development | 35      | [[The Silent Bell]], [[Reedrunner Tithe]] |
| 3   | [[Session 2 - Mud Under the Boards]]    | Cliffhanger | 40      | [[The Silent Bell]]                       |
| 4   | [[Session 2 - Low Water at the Chapel]] | Climax      | 50      | [[The Silent Bell]], [[Reedrunner Tithe]] |
| 5   | [[Session 2 - What the Ledger Says]]    | Resolution  | 20      | [[The Failing Sluice]]                    |

## Threads

- [[The Silent Bell]] is active. The bell rang before dawn and the tide dropped a foot. The lever is [[Nib Ashwater]], who knows where the ledger lies.
- [[Reedrunner Tithe]] is active. [[Ilse Corran]] is recovering, but her crew is after the same ledger. The lever is the pressure of the falling tide, which gives the Party a head start.
- [[The Failing Sluice]] is dormant. It surfaces only in the last Scene as a sound from the east.

## Opposition

- Two [[Mire Drowner]] creatures lie under the boards of [[Reedholt]].
- [[Sable]] waits in the bell loft of [[The Drowned Chapel]] and uses the [[Mire Drowner]] stat block.
- Three [[Goblin Warrior]] hands of [[The Reedrunners]] reach the chapel during the Climax.
- [[Nib Ashwater]] and [[Pell Rushlight]] are allies in [[Reedholt]].

## Clues

| Clue                                                                       | Can surface in                                                                |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| The water under Reedholt dropped a foot overnight.                         | [[Session 2 - The Bell Rings Early]]                                          |
| The bell rings in threes with a pause.                                     | [[Session 2 - The Bell Rings Early]], [[Session 2 - Low Water at the Chapel]] |
| Nib keeps tally-sticks with 3,912 names of the drowned.                    | [[Session 2 - Nib's Tally]], [[Session 2 - What the Ledger Says]]             |
| The ledger lies in a niche in the bell loft.                               | [[Session 2 - Nib's Tally]], [[Session 2 - Low Water at the Chapel]]          |
| The drowners lie under Reedholt because the Vessen dead drifted.           | [[Session 2 - Mud Under the Boards]], [[Session 2 - Low Water at the Chapel]] |
| A man found on the plank walk last month wore Vessen-made boots.           | [[Session 2 - The Bell Rings Early]], [[Session 2 - Mud Under the Boards]]    |
| The lowest stones of the tower carry tidemarks older than the chapel.      | [[Session 2 - Low Water at the Chapel]], [[Session 2 - What the Ledger Says]] |
| Ilse's boats left Saltwick at dusk.                                        | [[Session 2 - Nib's Tally]], [[Session 2 - Low Water at the Chapel]]          |
| The order in the ledger is signed Corvin Tarrow.                           | [[Session 2 - Low Water at the Chapel]], [[Session 2 - What the Ledger Says]] |
| Crookback Sluice no longer closes, and the silt line is above head height. | [[Session 2 - Low Water at the Chapel]], [[Session 2 - What the Ledger Says]] |

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
