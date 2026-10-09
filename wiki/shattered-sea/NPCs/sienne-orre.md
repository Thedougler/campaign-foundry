---
type: NPC
summary: "Minotaur captain of the Fernen in Fisk's Fleet, who ran the fleet's
  perimeter survey operations."
sources:
  - "archive/ssw-minotaur.md"
  - "archive/ssw-umberlee-shrine.md"
creature: ""
revealed: ""
title: "Sienne Orre"
---

## At a glance

- **Role.** Minotaur captain of the [[fernen|Fernen]] in [[fisks-fleet|Fisk's Fleet]].
- **Wants.**
- **Voice.**
- **Found at.** Aboard the [[fernen|Fernen]], lost with the fleet over the [[drowned-maw|Drowned Maw]].

> [!narration] First look
> Horns sweep back over a broad skull, hooves ring on the deck plates, and she steers by channel marks she walked once, years ago.

## Play

- **Opens them up.**
- **Shuts them down.**
- **Will share.**
- **Will not share.**
- **If pressed.**

## Depth

### History

Sienne Orre ran the fleet's perimeter survey operations. Her passage-sense made her the natural choice. The fleet stole the Pearl of Souls from Umberlee's [[umberlees-shrine|shrine]] on [[vel-orn|Vel-Orn]] and sank over the Drowned Maw when Umberlee struck it. What became of Sienne is not recorded.

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
