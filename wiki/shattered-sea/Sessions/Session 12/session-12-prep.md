---
type: Prep
summary: "Four-hour inland rescue through Hinewai's garden, ending with Skarn's
  last attempt at the Fate Spinner and Perrin's choice to consume."
sources:
  - "archive/session-12-index.md"
  - "archive/session-12-00-the-garden-keeps-its-own.md"
  - "archive/session-12-01-dawn-strike.md"
  - "archive/session-12-02-the-smoking-skylight.md"
  - "archive/session-12-03-terror-birds.md"
  - "archive/session-12-04-orders-in-the-ash.md"
  - "archive/session-12-05-consume.md"
  - "archive/session-12-06-the-way-out.md"
date: "1495 DR, date not established"
revealed: "Session 12"
title: "Session 12 - Prep"
---

## At a glance

- **Session question.** Can the Party bring the Calveno out of Hinewai's garden and keep the Fate Spinner through Skarn's last attempt?
- **Party at.** River Slack Basin camp on Aruhe, at first light after the previous day's rescue.
- **Length.** 4 hours.
- **Threads in play.** The Calveno survivors, [[fate-spinner|Fate Spinner]] and [[talon-skarn|Talon Skarn]], [[two-grave-orders|Two-Grave Orders]], [[hinewai|Hinewai]] and the Grung, and Perrin and [[auralis|Auralis]].

The next Session begins with [[session-12-previously-on|Session 12 - Previously On]].

## Scene Chart

| # | Scene | Kind | Minutes | Threads |
| --- | ----- | ---- | ------- | ------- |
| 1 | [[session-12-dawn-strike\|Session 12 - Dawn Strike]] | Hook | 45 | [[fate-spinner\|Fate Spinner]] and [[talon-skarn\|Talon Skarn]] |
| 2 | [[session-12-the-smoking-skylight\|Session 12 - The Smoking Skylight]] | Development | 30 | The Calveno survivors, [[hinewai\|Hinewai]] and the Grung |
| 3 | [[session-12-terror-birds\|Session 12 - Terror-Birds]] | Cliffhanger | 40 | The Calveno survivors |
| 4 | [[session-12-orders-in-the-ash\|Session 12 - Orders in the Ash]] | Development | 30 | [[two-grave-orders\|Two-Grave Orders]], [[hinewai\|Hinewai]] and the Grung |
| 5 | [[session-12-consume\|Session 12 - Consume]] | Climax | 60 | [[fate-spinner\|Fate Spinner]] and [[talon-skarn\|Talon Skarn]], Perrin and [[auralis\|Auralis]] |
| 6 | [[session-12-the-way-out\|Session 12 - The Way Out]] | Resolution | 15 | The Calveno survivors, Perrin and [[auralis\|Auralis]] |

## Threads

- The Calveno survivors: rescue the remaining people from the Pantry and return them to [[uncertainty|Uncertainty]].
- [[fate-spinner|Fate Spinner]] and [[talon-skarn|Talon Skarn]]: keep the Spinner through Skarn's dawn and dusk attempts.
- [[two-grave-orders|Two-Grave Orders]]: learn why the Gold caste sent compelled Grung to destroy Hinewai's graves.
- [[hinewai|Hinewai]] and the Grung: face the island's keeper, who counts the Calveno as hers.
- Perrin and [[auralis|Auralis]]: decide what “CONSUME” means when the patron speaks through the living fruit.

## Opposition

- [[talon-skarn|Talon Skarn]]
- [[terror-bird|Terror-Bird]]
- [[vine-lash|Vine Lash]]
- [[young-bloodhawk|Young Bloodhawk]]
- [[hinewai|Hinewai]]
- [[commoner|Commoner]]

## Clues

| Clue | Found in |
| ---- | -------------- |
| The Calveno survivors followed a woman's voice north-east and are at the Pantry. | [[session-12-the-smoking-skylight\|Session 12 - The Smoking Skylight]] |
| Terror-birds stop at tall grass and deep water. Razer-Grass also ends a charge. | [[session-12-terror-birds\|Session 12 - Terror-Birds]] |
| The Gold caste ordered compelled Grung to burn a way to Hinewai's graves. | [[session-12-orders-in-the-ash\|Session 12 - Orders in the Ash]] |
| Each compelled Grung believed the order was their own wish. | [[session-12-orders-in-the-ash\|Session 12 - Orders in the Ash]] |
| Hinewai counts Calveno who ate fallen fruit as hers, and the island's responders spare them. | [[session-12-consume\|Session 12 - Consume]] |
| Ghost-plum pollen reveals an invisible creature as a pale shimmer. | [[session-12-consume\|Session 12 - Consume]] |
| At first light nine of the Calveno leave, and three stay beneath the vine. | [[session-12-the-way-out\|Session 12 - The Way Out]] |

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
