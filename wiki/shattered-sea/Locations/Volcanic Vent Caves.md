---
type: Location
kind: Site
summary: "Steam-warmed fissures in the Ashwall spires, warm enough to shelter in
  and warm enough to be occupied."
sources:
  - "archive/ssw-ashwall-islands.md"
parent: "[[Ashwall Islands]]"
revealed: ""
title: ""
---

## At a glance

- **Draws the Party because.** Shelter from the cold sea air that no tent on the black stone provides, on an island with no other warmth.
- **Occupants.** Bats above, scorpions in the cracks. The warmth is theirs first.
- **Danger.** Occupied dark: the same crack systems that look like good handholds run back several feet into where things live.

> [!narration] Entering
> A draught of warm air comes off the stone where the cave opens to the day, thick with the sulphur bite of the high rock. Inside, the dark runs back further than the light reaches, and the warmth holds like a wall. Somewhere above the lantern's reach, something shifts its weight.

## Play

### Areas

The open chambers near the mouths, where the vent warmth gathers. The climb cracks on the outer face above, where the same warmth seeps through the handholds.

### Hazards

A warm fissure is occupied until someone watches it. The colonies roost in the dark above ([[Giant Bat]]), and the handhold cracks run back into occupied dark ([[Giant Scorpion]]).

### Occupants

The bats and the scorpions live in the warm stone year-round. Ashwall crews come and go by daylight, two hands to a climb.

### Likely actions

Warm up, dry out, and climb for the view or the shortcut, with one hand on the rock and one watcher on the stone.

## Depth

### History

A claw opened Duvane's forearm and a sting went through his boot in one of these fissures, and the poison put him two days down. Repair crews have sent a watcher up with every climb since.

### Hidden truths

The vents are [[Arclight Phoenix]] hatcheries: the volcanic discharge opens the dead bird's egg, and lateral fire through the ash column above a fissure is the hatching sign.

### Threads

None established.

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
