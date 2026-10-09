---
type: Creature
summary: "A storm-light bird born in the Ashwall volcanoes and flown west into
  the [[Galewall]]. Its white-fire crossings leave burned rigging and no
  agreement."
sources:
  - "archive/ssw-galewall.md"
  - "archive/ssw-ashwall-islands.md"
revealed: ""
title: ""
---

## At a glance

- **Role at the table.** The thing behind the white-fire crossings: storm-light that gathers ahead of a ship instead of above it, then crosses the mast line in a bird-shape.
- **Tell.** Lateral vent-fire on the Ashwalls, and storm-light that moves with intent rather than striking from above.
- **Used by.** Hatched inside the [[Ashwall Islands]] volcanoes. Flown west into the [[Galewall]].

> [!narration] First sight
> The storm-light is not above the ship any more. It has gathered ahead of the bow, holding there against the wind, and it slides across the line of the mast with edges drawn, a bird made of white fire. Where it passes, the rigging burns at the touch points, and the iron in the fitting begins to sing.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Arclight Phoenix"
size: Large
type: elemental
alignment: unaligned
ac: 14
hp: 114
hit_dice: "12d10 + 48"
speed: "60 ft., fly 90 ft."
stats: [10, 18, 18, 4, 14, 8]
damage_resistances: "lightning, thunder"
damage_immunities: "fire"
senses: "darkvision 120 ft., passive Perception 12"
languages: "none"
cr: 5
traits:
  - name: Storm-Light Form
    desc: "The phoenix is storm-light in a bird-shape. A creature that touches it or hits it with a melee attack while within 5 feet of it takes 5 (1d10) fire damage."
  - name: Iron Hums
    desc: "Loose iron within 30 feet of the phoenix hums and pulls toward it."
actions:
  - name: Crossing
    desc: "The phoenix flies in a straight line up to 60 feet, and it can move through the space of creatures and objects. Every creature and flammable object in that line takes 14 (4d6) fire damage, or half damage with a successful DC 15 Dexterity saving throw, and flammable objects catch fire."
  - name: Burning Talons
    desc: "Melee Attack Roll: +7, reach 5 ft., one target. Hit: 11 (2d6 + 4) fire damage."
```

## Play

### Outside a fight

Experienced pilots treat moving storm-light as a different warning from ordinary lightning. The bird that came out of the account had crossed the mast line and gone, and the ship reached the lee with its mainmast gone and its shrouds burned black from top to deck.

## Depth

### Ecology

Arclight phoenixes are born inside the Ashwall volcanoes. The volcanic discharge is what hatches them. The egg a phoenix leaves at its death needs lightning to open, and the vent systems provide it continuously and at close range. The bird climbs out of the stone already oriented toward the storm edge. It flies west into the [[Galewall]] and does not come back east until it has died again somewhere inside the weather.

### Hidden truths

Pilot lore holds that the [[Galewall]] is sustained by arclight phoenix activity. The oldest Ashwall families write the sign into their logbooks as a bare navigational note. The note reads the same in every book, lateral vent-fire and a westward departure and an expected rise in Galewall activity.

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
