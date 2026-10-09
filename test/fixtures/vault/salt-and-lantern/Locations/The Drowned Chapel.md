---
type: Location
kind: Site
summary: "A bell-tower chapel from drowned Vessen that stands clear of the mud only at low water."
sources: []
parent: "[[Reedholt]]"
revealed: ""
title: ""
---

## At a glance

- **Draws the Party because.** The bell that rings under the water rings here, and the ledger of Vessen lies in its loft.
- **Entrance.** The tower door at ground level, open at low water and flooded to the lintel otherwise.
- **Occupants.** [[Sable]], the last bell-ringer, and any crew [[The Reedrunners]] send for relics.
- **Danger.** Rising water, silt-slick floors and [[Mire Drowner]] creatures in the nave.
- **Prize.** The [[Harbormaster's Ledger of Vessen]] in the bell loft.

> [!narration] Entering
> The door has been open a long time, and the mud around its sill is smooth as glass. Inside, silt lies ankle deep across a stone floor, and a line of green weed marks the water level halfway up the walls. Above you a rope hangs from the dark, and the bell at its end is still swaying.

## Play

### Areas

- **Nave.** Pews sunk to their arms in silt. Cue: "The pews are full of small holes, as if something lives in them."
- **Tower stair.** Forty steps of wet stone. Cue: "The rope above you is new, and someone has knotted it recently."
- **Bell loft.** A low room with the great bell and a stone niche. Cue: "The bell is warm, though the room is cold."
- **Crypt door.** Sealed with an iron bar. Cue: "Water seeps from the crack, and it is cold."

### Hazards

- **Tide return.** At the Long Ebb the water returns on the sixth day. In a short ebb the water returns after about 2 hours, and each hour after the first the nave floods 1 foot deeper.
- **Silt.** The floor counts as [[Bog Ground]] until the Party uses the [[Ebb Lantern]] or the tower stair.

### Occupants

- [[Sable]] rings the bell and will speak to anyone who climbs the stair alone.
- Reedrunner looters, if they got here first, are working the nave for candlesticks and plate.

### Likely actions

- Climb the tower and take the ledger from the niche.
- Talk to Sable about what she wants.
- Fight or flee the Mire Drowner creatures in the nave.

## Depth

### History

The chapel of Saint Orrin stood in the middle of Vessen and was where the town met in bad news. When the sluice was opened the bell-ringer, Sable, was in the tower. The chapel has stood in the mud since.

### Hidden truths

- The niche in the loft holds the ledger of the Vessen harbormaster, who hid it three days before the flood. The Party can learn where it is from [[Nib Ashwater]] or from Sable.
- Old tidemarks are cut into the lowest stones of the tower, older than the chapel itself. They show that the sea has always drawn out at these times, so the Long Ebb is older than the city.

### Threads

- [[The Silent Bell]] is centred here.
- [[The Failing Sluice]] is visible in the new flood lines.

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
