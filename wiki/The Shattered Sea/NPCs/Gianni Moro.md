---
type: NPC
summary: "Calveno cooper who nearly followed Hinewai's voice from the lava tube."
sources:
  - "archive/gianni-moro.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Wreck survivor and cooper.
- **Wants.** To go home and not be alone at night.
- **Voice.** Few words, low and slow.
- **Found at.** The lava-tube ledge, then the party's march out.

> [!narration] First look
> A broad man sits apart with a cooper's thick forearms and an iron bracelet bent from barrel hoop. His thumb turns it round and round. “Gianni,” he says. “The cooper.”

## Play

- **Opens them up.** Gentle treatment and no laughter at what he wanted.
- **Shuts them down.** Mockery. He looks at the floor and stops speaking.
- **Will share.** Hinewai's words exactly and how Luca and Piero held him back.
- **Will not share.** That he still feels the pull at dusk.
- **If pressed.** He walks in the middle of the column where someone can grab him.

## Depth

### History

Gianni was one of four survivors at Spoke Ring. When Hinewai called, he rose to go. Luca and Piero held him down. He remains ashamed that the voice sounded warm and kind.

### Hidden truths

- Gianni still feels Hinewai's claim at dusk, though he tells nobody.

### Threads

He is a witness to **Taking on Aruhe** and Hinewai's claim over the fruit-eaters.

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
