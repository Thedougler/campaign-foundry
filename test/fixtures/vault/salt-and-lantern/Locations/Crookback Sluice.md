---
type: Location
kind: Site
summary: "The great tide gate of the Compact, which no longer closes fully."
sources: []
parent: "[[The Brack]]"
revealed: ""
title: ""
---

## At a glance

- **Draws the Party because.** It holds back the sea, and it is failing.
- **Entrance.** A causeway from the north shore, guarded by a gatehouse that has no one in it.
- **Occupants.** A few gate-hands who watch the water level and say little.
- **Danger.** Slick footing above open water, and a crushing winch chain.
- **Prize.** The gate-master's book, which records every time the sluice has been opened since the Compact.

> [!narration] Entering
> The gate is a wall of black timber and iron as high as a house, with green weed hanging from the top. Water pours through a gap the width of a wagon with a sound like a crowd holding its breath. A walkway crosses above the gap, and its rail is polished by hands. The winch house at the far end has one window lit.

## Play

### Areas

- **Causeway.** A stone road across the marsh. Cue: "The stone is dry, and the marsh on both sides is not."
- **Gate walkway.** A plank way above the gap. Cue: "The planks flex, and the water below is loud."
- **Winch house.** Chains, drums and the gate-master's desk. Cue: "The chain moves by itself a hand's width and stops."
- **Sluice pier.** The base of the gate. Cue: "The silt line stands high above your head."

### Hazards

- **Open gap.** A creature that falls in is swept 30 feet per round and must succeed on a DC 13 Strength (Athletics) check to reach the pier.
- **Winch chain.** When the gate shifts the chain whips across the walkway. A creature on it makes a DC 12 Dexterity saving throw, taking 7 (2d6) Bludgeoning damage on a failure.

### Occupants

- Gate-hands who work in shifts and know the gate is failing.
- No one else, unless [[The Reedrunners]] are checking the gate for weaknesses.

### Likely actions

- Read the gate-master's book, which shows the last opening in 271 CY.
- Ask the gate-hands what changed this year.
- Inspect the pier for damage.

## Depth

### History

The Compact built the sluice in 4 CY. In 271 CY its gates were opened for three days, and the water went upriver and drowned the city of Vessen. See [[The Drowning of Vessen]]. The Compact has kept a gate-master here ever since.

### Hidden truths

- The gate has not closed fully since 271 CY. Each year it leaks a little more, and the gate-hands know. The Party can see this from the silt line on the pier.
- The book records the sluice being opened on 6 Blackwater 271 CY with no reason given. The Party can read this in the winch house.

### Threads

- [[The Failing Sluice]] is centred here.
- [[The Silent Bell]] is tied to the same night.

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
