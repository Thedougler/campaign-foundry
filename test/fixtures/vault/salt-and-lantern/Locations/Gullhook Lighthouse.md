---
type: Location
kind: Site
summary: "The white lighthouse at the tip of Saltwick's mole, whose lamp has been failing on moonless nights."
sources: []
parent: "[[Saltwick]]"
revealed: ""
title: "Gullhook Lighthouse"
---

## At a glance

- **Draws the Party because.** [[Hobb Tarrow]] will pay them to keep the lamp lit, and boats are wrecking without it.
- **Entrance.** A stone door at the foot of the tower, reached by the mole. It is barred from inside at night.
- **Occupants.** No keeper since spring. [[The Reedrunners]] visit on dark nights to steal oil.
- **Danger.** A rotten stair, a lamp room full of eel oil, and the Reedrunner crew.
- **Prize.** The [[Ebb Lantern]], kept in the keeper's room.

> [!narration] Entering
> The door swings inward onto a cold stone room that smells of fish oil and old smoke. A spiral stair climbs into the dark, and its lowest steps are wet and green. Beside it a chain runs up the wall, and an oil flask stands on the bottom step with its cork lying next to it. Above you something scrapes across stone.

## Play

### Areas

- **Base room.** Stores of oil and a locked chest. Cue: "The barrels are half empty and the floor is slick."
- **Stair.** Ninety steps, with the fortieth to the fiftieth rotten. Cue: "The wood gives under your boot."
- **Keeper's room.** A cot, a stove and the [[Ebb Lantern]] on a hook. Cue: "The dead keeper's tea is still on the shelf."
- **Lamp room.** A ring of glass around the great lamp and its mirror. Cue: "Wind hums in the frames and the wick is cold."

### Hazards

- **Rotten stair.** Crossing the steps quickly requires a DC 12 Dexterity saving throw. On a failure the creature drops 10 feet onto the oil-slick floor for 3 (1d6) Bludgeoning damage.
- **Eel oil.** The lamp room floor is soaked. Any fire started in the room burns for 3 rounds. A creature that starts its turn in the flames takes 5 (1d10) Fire damage.

### Occupants

- Empty most days.
- On dark nights [[The Reedrunners]] send a crew to draw off the oil. [[Ilse Corran]] leads when the take is large.

### Likely actions

- Relight the lamp, which takes 10 minutes and one flask.
- Search the keeper's room, which turns up the keeper's log and the [[Ebb Lantern]].
- Hold the tower against the crew, using the narrow stair.

## Depth

### History

The Compact raised the tower in 60 CY. The last keeper, Old Jory, died in the spring, and Hobb has kept his room as it was.

### Hidden truths

- The lamp does not fail by accident. Someone breaks the wick seal each dark moon. The Party can find the cut marks on the seal in the lamp room.
- The Reedrunners want the light dark so that boats run onto the mud banks and can be salvaged.

### Threads

- [[Reedrunner Tithe]] is the reason the lamp keeps failing.
- [[The Silent Bell]] is heard clearly from the lamp room on still nights.

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
