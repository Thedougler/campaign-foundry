---
type: NPC
summary: "Passage patron and Black-Jaw Run matriarch who turns trust into routes and obligations."
sources:
  - "archive/nona-black-jaw.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Passage patron and Black-Jaw Run family face.
- **Wants.** To keep the Passage alive and recover the people taken in the Calveno raid.
- **Voice.** Low kitchen register. Every favour sounds like a route with a cost.
- **Found at.** Her guarded kitchen safe house in the Warren, Calveno.

> [!narration] First look
> A broad, pale-furred Rattkin woman stands by the kitchen fire with a guarded door behind her. Her pen never stops moving, and clipped questions make every favour sound like a route with a cost.

## Play

- **Opens them up.** A workable route, recovered people, and evidence she can use.
- **Shuts them down.** Threats to the network or open-ended promises.
- **Will share.** Safe houses, couriers, ships, bodyguards, and a sending stone, at a price.
- **Will not share.** The whole Passage to save one request.
- **If pressed.** She turns family language into business terms and calls the network to protect it.

## Depth

### History

Nona has fed the Warren and kept Crown inspectors from mapping its kitchens for forty years. After the Mercatura raid she made the crater a missing-persons desk, dispatched two Passage ships, and gave Perrin a favour instead of cash. More than 314 fighting-age men remain missing.

### Hidden truths

- The Crown called her the Calveno Candle for arson. She has never told them why.
- She grieves Vestra's captain more than the ship and still does not know the whole truth of its sinking.

### Threads

She drives **Perrin and Nona** and the recovery work around **Taking on Aruhe**.

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
