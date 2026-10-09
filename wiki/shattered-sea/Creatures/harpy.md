---
type: Creature
summary: "A storm-gap singer of the Ashwalls, filed under weather until someone
  follows the wrong sound inland."
sources:
  - "archive/ssw-ashwall-islands.md"
revealed: ""
title: "Harpy"
---

## At a glance

- **Role at the table.** Crews sheltering in the channels hear singing where no singer should be, and the ones who follow it inland are why pilots still tell the stories.
- **Tell.** Voices in the storm gaps that do not match the wind's direction.
- **Used by.** The [[ashwall-islands|Ashwall Islands]] storm gaps.

> [!narration] First sight
> Wind fills the channel with one long note, and beneath it another sound begins, a voice singing where no ship could lie. The spray drives one way, and the singing goes the other. It comes from inland, up the black stone, clear and unhurried under the wind.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Harpy"
size: Medium
type: monstrosity
alignment: chaotic evil
ac: 11
ac_class: unarmored
hp: 38
hit_dice: "7d8 + 7"
speed: "20 ft., fly 40 ft."
stats: [12, 13, 12, 7, 10, 13]
saves: []
skillsaves: []
senses: "passive Perception 10"
languages: "Common"
cr: 1
traits: []
actions:
  - name: Claw
    desc: "Melee Attack Roll: +3, reach 5 ft. Hit: 6 (2d4 + 1) Slashing damage."
  - name: Luring Song
    desc: "The harpy sings a magical melody, which lasts until the harpy's Concentration ends on it. Wisdom Saving Throw: DC 11, each Humanoid and Giant in a 300-foot Emanation originating from the harpy when the song starts. Failure: The target has the Charmed condition until the song ends and repeats the save at the end of each of its turns. While Charmed, the target has the Incapacitated condition and ignores the Luring Song of other harpies. If the target is more than 5 feet from the harpy, the target moves on its turn toward the harpy by the most direct route, trying to get within 5 feet of the harpy. It doesn't avoid Opportunity Attacks; however, before moving into damaging terrain (such as lava or a pit) and whenever it takes damage from a source other than the harpy, the target repeats the save. Success: The target is immune to this harpy's Luring Song for 24 hours."
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

### Outside a fight

Most pilots file the stories under weather. The stories keep coming back, because the voice comes from inland and goes on after the wind drops.

## Depth

### Ecology

They are told of in the storm gaps of the Ashwall channels, by crews who sheltered there in high wind. What waits inland at the top of the black stone is the part the stories do not agree on.

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
