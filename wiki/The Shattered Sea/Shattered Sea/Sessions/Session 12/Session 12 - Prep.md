---
type: Prep
summary: "Four-hour inland rescue through Hinewai's garden, ending with Skarn's last attempt at the Fate Spinner and Perrin's choice to consume."
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
---

## At a glance

- **Session question.** Can the Party bring the Calveno out of Hinewai's garden and keep the Fate Spinner through Skarn's last attempt?
- **Party at.** River Slack Basin camp on Aruhe, at first light after the previous day's rescue.
- **Length.** 4 hours.
- **Threads in play.** The Calveno survivors, [[Fate Spinner]] and [[Talon Skarn]], [[Two-Grave Orders]], [[Hinewai]] and the Grung, and Perrin and [[Auralis]].

The next Session begins with [[Session 12 - Previously On]].

## Scene Chart

| # | Scene | Kind | Minutes | Threads |
| --- | ----- | ---- | ------- | ------- |
| 1 | [[Session 12 - Dawn Strike]] | Hook | 45 | [[Fate Spinner]] and [[Talon Skarn]] |
| 2 | [[Session 12 - The Smoking Skylight]] | Development | 30 | The Calveno survivors, [[Hinewai]] and the Grung |
| 3 | [[Session 12 - Terror-Birds]] | Cliffhanger | 40 | The Calveno survivors |
| 4 | [[Session 12 - Orders in the Ash]] | Development | 30 | [[Two-Grave Orders]], [[Hinewai]] and the Grung |
| 5 | [[Session 12 - Consume]] | Climax | 60 | [[Fate Spinner]] and [[Talon Skarn]], Perrin and [[Auralis]] |
| 6 | [[Session 12 - The Way Out]] | Resolution | 15 | The Calveno survivors, Perrin and [[Auralis]] |

## Threads

- The Calveno survivors: rescue the remaining people from the Pantry and return them to [[Uncertainty]].
- [[Fate Spinner]] and [[Talon Skarn]]: keep the Spinner through Skarn's dawn and dusk attempts.
- [[Two-Grave Orders]]: learn why the Gold caste sent compelled Grung to destroy Hinewai's graves.
- [[Hinewai]] and the Grung: face the island's keeper, who counts the Calveno as hers.
- Perrin and [[Auralis]]: decide what “CONSUME” means when the patron speaks through the living fruit.

## Opposition

- [[Talon Skarn]]
- [[Terror-Bird]]
- [[Vine Lash]]
- [[Young Bloodhawk]]
- [[Hinewai]]
- [[Commoner]]

## Clues

| Clue | Can surface in |
| ---- | -------------- |
| The Calveno survivors followed a woman's voice north-east and are at the Pantry. | [[Session 12 - The Smoking Skylight]] |
| Terror-birds stop at tall grass and deep water. Razer-Grass also ends a charge. | [[Session 12 - Terror-Birds]] |
| The Gold caste ordered compelled Grung to burn a way to Hinewai's graves. | [[Session 12 - Orders in the Ash]] |
| Each compelled Grung believed the order was their own wish. | [[Session 12 - Orders in the Ash]] |
| Hinewai counts Calveno who ate fallen fruit as hers, and the island's responders spare them. | [[Session 12 - Consume]] |
| Ghost-plum pollen reveals an invisible creature as a pale shimmer. | [[Session 12 - Consume]] |
| Nine Calveno leave at first light and three stay beneath the vine. | [[Session 12 - The Way Out]] |

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
