---
type: Creature
summary: "A Young Bloodhawk creature (CR 2) used as a skirmisher in The Shattered Sea."
sources:
 - "archive/young-bloodhawk.md"
---

![[Young Bloodhawk - Token.jpg]]

![[Young Bloodhawk - Handout Art.jpg]]

## At a glance

- **Role at the table.** A fast striker that dives out of the canopy, strikes, and is airborne again before blades touch it.
- **Threat.** CR 2, with a dive that hurls a flying target thirty feet straight down.
- **Tell.** A rattling beat of wings overhead comes moments before the dive.
- **Weak to.** A readied weapon waiting along its diving path, and trees thick enough to spoil that path.
- **Used by.** [[Commoner]] patrols the same territory.

> [!narration] First sight
> Wings clatter in the canopy, and a young bloodhawk bursts out of the leaves after a smaller bird. The chase drops low, and the young hunter tucks its wings to fall on its target from above. One beak strike in midair tumbles the quarry, and the hawk slams it down into the trail. Feathers heaving, the hunter comes down on its catch amid a rain of leaves.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Young Bloodhawk"
size: Medium
type: monstrosity
alignment: unaligned
ac: "14 (natural armor)"
hp: 39
hit_dice: "6d8 + 12"
speed: "20 ft., fly 80 ft."
stats: [14, 18, 14, 3, 16, 7]
saves:
  - dexterity: 6
  - wisdom: 5
skillsaves:
  - perception: 5
senses: "passive Perception 15"
languages: "none"
cr: 2
traits:
  - name: Blood-Red Vigil
    desc: "The young bloodhawk has Advantage on Wisdom (Perception) checks that rely on sight."
  - name: Flyby
    desc: "The young bloodhawk doesn't provoke Opportunity Attacks when it flies out of an enemy's reach."
actions:
  - name: Multiattack
    desc: "The young bloodhawk makes two attacks, using Beak or Talon in any combination."
  - name: Beak
    desc: "Melee Attack Roll: +6, reach 5 ft.. Hit: 8 (1d8 + 4) Piercing damage."
  - name: Talon
    desc: "Melee Attack Roll: +6, reach 5 ft.. Hit: 7 (1d6 + 4) Slashing damage."
  - name: Flush Dive (Recharge 5–6)
    desc: "The young bloodhawk flies up to its Fly Speed in a straight line at one flying creature it can see and makes one Beak attack against it. Hit: the target is driven 30 feet straight down. If that brings it to the ground or another solid surface, it takes 7 (2d6) Bludgeoning damage and has the Prone condition."
```

## Play

### Tactics

It takes flying quarry from the canopy, one flat dive through the leaves that slams the catch down onto the trail. Call the rattling wing beats as the telegraph, and set readied weapons along its line of fall. It wheels off once the leaves stop hiding it or its wounds ground it.

### Outside a fight

Small birds scatter ahead of it along a trail, the young hunter's calling card, and the hawk shows itself as a burst of leaves at each stoop. It works a stretch of canopy and does not follow prey out of the trees.

## Depth

### Ecology

A hunter of the World's canopy, it lives on the smaller birds its beak and talons were made for. Identifying its signs calls for Wisdom (Survival).

### Hidden truths

Its roost tells its habits, and the right Intelligence check confirms how the dive turns a flyer's own height against it.

## Links

Related page, [[Commoner]].

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
