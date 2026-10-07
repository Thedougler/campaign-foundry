---
type: NPC
summary: "Keeper of the Velo Quarter cabinet of lost objects, and a fixture at every Calveno festival whose appearance at the winning stage the crowd reads as an omen."
sources:
 - "archive/ssw-il-palio-delle-voci.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Keeper of [[The Cabinet of Morsani]] in the Velo Quarter.
- **Wants.** Objects with histories that hold, and the right hands to pass them to.
- **Found at.** The lantern-marked door of [[The Cabinet of Morsani]], and at every Palio for as long as anyone can remember, usually at the winning stage just before midnight.

> [!narration] First look
> Thirty-one rings ride the fingers of a man standing before the stage as midnight comes on, and the crowd around you is already calling his presence an omen. The banner comes down, and before it leaves his sight he says, "Mind the story that comes with it."

## Play

- **Opens them up.** A story that holds up. He deals in objects together with the histories of those who lost them.
- **Shuts them down.** A history that fails his questions. The cost is lost access, not a scene.
- **Will share.** An object's true history, once he has it.
- **Will not share.** Where a piece actually came from.
- **If pressed.** He stops selling. Access is the whole price.

## Depth

### History

He has attended every Palio for as long as anyone can remember, and the crowd has started to read his arrival at the winning stage as an omen. Each of his thirty-one rings holds a prior owner's story. In Session 8 he sold the Party [[The Snap]] from the cabinet for 150 gold.

### Hidden truths

How his objects come to him. He claimed an inventor source for [[The Snap]], and Catarina read that he found it by means not exactly legal.

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
