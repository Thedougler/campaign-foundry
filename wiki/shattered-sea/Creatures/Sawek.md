---
type: Creature
summary: "The strait's rumoured apex, a blue-hole predator associated with the
  darkest sections of the southern Midchain approaches, whose range in the open
  strait no pilot will state."
sources:
  - "archive/ssw-central-strait.md"
  - "archive/ssw-midchain.md"
revealed: ""
title: ""
---

## At a glance

- **Role at the table.** A rumoured presence that keeps deep, still water honest. No confirmed fight.
- **Threat.** CR 5 if the rumours are the whole truth, which no pilot claims.
- **Tell.** A deep patch of water that goes too still and stops carrying sound.
- **Weak to.** Unknown.
- **Used by.** Nobody. It is associated with the blue holes of the southern [[Midchain]] approaches.

> [!narration] First sight
> The lead comes up wet and the pilot calls for the reel with no bottom to show for it. Where the strait ran deep and chattering, the water ahead sits flat and silent, a patch of stillness the wind cannot explain. The pilot puts the island between the ship and that patch and steers a course along the shallows, and the talk on deck drops to a murmur until the stillness falls astern.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Sawek"
size: Huge
type: beast
subtype: ""
alignment: unaligned
ac: 13
ac_class: "natural armor"
hp: 114
hit_dice: "12d12 + 36"
speed: "swim 50 ft."
# Str Dex Con Int Wis Cha
stats: [21, 14, 17, 3, 12, 4]
saves: []
skillsaves:
  - perception: 4
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: "blindsight 60 ft. (blind beyond this radius), passive Perception 14"
languages: ""
cr: 5
traits:
  - name: "Water Breathing"
    desc: "The Sawek can breathe only underwater."
  - name: "Still-Water Wake"
    desc: "While the Sawek keeps below the surface, the water above it goes still and stops carrying sound."
actions:
  - name: "Bite"
    desc: "*Melee Attack Roll:* +8, reach 10 ft., one target. *Hit:* 21 (3d10 + 5) Piercing damage."
```

## Play

### Outside a fight

Deep still water is never empty water, by the pilots' counting. Iron goes inboard, the watch drops its voice, and the ship keeps to the shallows until the stillness ends.

Midchain pilots avoid a blue hole unless they know it by name. They say a Sawek lair can look like useful shelter until something moves below the keel.

## Depth

### Hidden truths

The range is the whole question. The rumours put it in the darkest southern blue holes, and what it does in the open [[Central Strait]] is exactly what no pilot will say. Learn it from a pilot who has paid for the answer.

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
