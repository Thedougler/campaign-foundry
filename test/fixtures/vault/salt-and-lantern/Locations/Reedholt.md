---
type: Location
kind: Settlement
summary: "A stilt village in the deep Brack where the ferries tie up and the drowned chapel is closest."
sources: []
parent: "[[The Brack]]"
revealed: ""
title: ""
---

## At a glance

- **Size.** About 300 people in 60 stilt houses joined by plank walks.
- **Ruled by.** A village moot. The oldest ferry family, the Rushlights, speaks for it.
- **Mood.** Cheerful and closed. They will feed a stranger and tell him nothing.
- **Unsettled by.** The bell under the water, and a body found last month with mud in its lungs on dry boards.
- **Known for.** The Marl Ferry and the tally-sticks kept in the tally house.

> [!narration] Arrival
> Reedholt stands on a thousand posts, and every house has a boat tied under the door. Plank walks creak between the roofs, and children run along them without looking down. A goblin sits on the tally house steps, cutting notches in a stick and counting boats aloud. Somewhere under the village, water knocks against wood in a slow rhythm.

## Play

### Districts

- **The Landing.** Ferry berths and the ferry pole racks.
- **The Tally House.** A long shed where [[Nib Ashwater]] records every boat that passes.
- **Moot Walk.** The widest plank walk, where the village meets.
- **The Under-Boards.** The mud beneath the village, which people do not enter.

### Services

- **The Marl Ferry.** [[Pell Rushlight]] poles passengers to [[Saltwick]] for 5 silver pieces.
- **Tally House.** [[Nib Ashwater]] sells boat records and channel charts.
- **Widow Hesk's kitchen.** Hot eel stew and a floor to sleep on for 3 silver pieces.

### Factions here

- The moot, which keeps the peace among the ferry families.
- [[The Reedrunners]], who take a tithe from the ferries and are hated for it.

### Local rules

- No one goes under the boards after dark.
- A found object belongs to the person who returns it to the water first. See [[Mother Ebb]].
- Hired boats are paid before they leave.

### Rumors

- A drowned man was found on the plank walk with mud in his mouth and no water in the boards.
- Old Sable rings the bell for anyone who will listen.
- The chapel door opens from the inside at low water.

## Depth

### History

Reedholt was a fishing camp on the edge of Vessen's fields. When the city drowned, the survivors moved the camp onto stilts and stayed. The moot still keeps a list of the names of the dead, and reads it at every Long Ebb.

### Hidden truths

- The village knows where the ledger of Vessen is. Its elders decided long ago to leave it where it lies. The Party can learn this from [[Nib Ashwater]] once he trusts them.

### Threads

- [[The Silent Bell]] centers on the nearby [[The Drowned Chapel]].
- [[Reedrunner Tithe]] falls hardest on the ferries.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Contains
    filters:
      and:
        - parent == this
    groupBy:
      property: note.kind
      direction: ASC
    order:
      - file.name
      - note.summary
  - type: table
    name: Linked from
    filters:
      and:
        - parent != this
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
