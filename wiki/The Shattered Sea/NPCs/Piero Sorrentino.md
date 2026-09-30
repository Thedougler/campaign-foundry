---
type: NPC
summary: "Weathered Calveno net-mender trapped in a lava tube, waiting for salt water."
sources:
  - "archive/piero-sorrentino.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Wreck survivor and net-mender.
- **Wants.** Salt water, a working hull, and a way off Aruhe.
- **Voice.** Fisherman-blunt, describing the tube as a hold and the skylight as a hatch.
- **Found at.** The lava-tube ledge beneath the smoking skylight.

> [!narration] First look
> A wiry man with rope-scarred hands watches the strip of sky above him while twisting vine fibre into cord. “You, on the hatch,” he calls. “Have you got a line?”

## Play

- **Opens them up.** A ship or a way to one.
- **Shuts them down.** Talk of walking farther inland instead of reaching the coast.
- **Will share.** Why he refused Hinewai's night invitation and how to mend any net, sail, or rope.
- **Will not share.** Patience for the island's inland mysteries.
- **If pressed.** He comes along if water is at the end of the route.

## Depth

### History

Piero was one of the four survivors at Spoke Ring. He refused Hinewai's invitation to walk strange ground at night and remained with Ettore, Luca, and Gianni after a terror-bird drove them into the lava tube.

### Hidden truths

- Piero calls Matteo Scola a “foul eel” after Matteo's choices at the river hole, though both want the ship.

### Threads

He is a survivor and practical guide in **Taking on Aruhe**.

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
