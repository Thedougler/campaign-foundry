---
type: Creature
summary: "A River Otter creature (CR 4) used as a controller in The Shattered Sea."
sources:
 - "archive/river-otter.md"
---

![[River Otter - Token.png]]

![[River Otter - Reference Sheet.jpg]]

## At a glance

- **Role at the table.** Controller.
- **Threat.** CR 4. Use its attack range, movement, or control to pressure the Party.
- **Tell.** Its body advertises its next attack before it commits.
- **Weak to.** Cover, terrain, and breaking its preferred range or formation.
- **Used by.** [[Snakewood]] patrols the same territory.

> [!narration] First sight
> Otters as big as sheepdogs tumble in the shallows, rolling one another under and letting go. One clamps both paws on the end of a trailing line and hauls it under, then bobs up empty-pawed. Another surges from below and fastens on the first one, and the two of them go down in a swirl of foam. Then both surface in a slapping of tails, and the smallest one drags the line away through the weeds.

## Statblock

```statblock
layout: Basic 5e Layout
name: "River Otter"
size: Large
type: monstrosity
alignment: unaligned
ac: 15
hp: 76
hit_dice: "9d10 + 27"
speed: "20 ft., swim 40 ft."
stats: [18, 16, 16, 6, 14, 8]
skillsaves:
  - athletics: 6
  - perception: 4
  - stealth: 5
senses: "darkvision 60 ft., passive Perception 14"
languages: "none"
cr: 4
traits:
  - name: "Hold Breath"
    desc: "The otter can hold its breath for 30 minutes."
  - name: "Play and Hunt"
    desc: "The otter is in play mode until someone harms an adult, touches a pup, or stays in the family's water for 10 minutes. It then switches to hunt mode, and the whole family switches with it. In play mode it uses only Tug Toy and grabs that deal no damage."
  - name: "Watery Ambush"
    desc: "Hunt mode only. The otter has Advantage on attack rolls against a creature in the water if another otter is within 10 feet of that creature."
actions:
  - name: "Multiattack (Hunt Mode)"
    desc: "The otter makes one Bite attack and one Tail attack."
  - name: "Bite"
    desc: "Melee Attack Roll: +6, reach 5 ft. Hit: 13 (2d8 + 4) Piercing damage. If the target is Medium or smaller, it has the Grappled condition (escape DC 14)."
  - name: "Tail"
    desc: "Melee Attack Roll: +6, reach 10 ft. Hit: 11 (2d6 + 4) Bludgeoning damage."
  - name: "Dunk (Recharge 5–6)"
    desc: "One creature Grappled by the otter is pulled up to 20 feet and held underwater. It has the Restrained condition until the grapple ends."
bonus_actions:
  - name: "Tug Toy (Play Mode)"
    desc: "The otter targets one object within 5 feet that a creature holds or wears, or a trailing rope. The holder makes a Strength (Athletics) or Dexterity (Sleight of Hand) check contested by the otter's Strength (Athletics). If the otter wins, it takes the object and swims 10 feet away. This deals no damage."
```

## Play

### Tactics

Open from its preferred terrain, announce the tell of its strongest option, and let the Party answer with positioning, cover, or focused fire. It retreats when its preferred advantage is gone or it is badly wounded.

### Outside a fight

Its tracks, feeding signs, and territorial behaviour warn the Party before an encounter. It acts according to its habitat and does not pursue beyond the terrain that gives it an advantage.

## Depth

### Ecology

The World is its habitat. Its diet follows its form. Observant travellers can identify its signs with Wisdom (Survival).

### Hidden truths

A careful examination of its remains or territory reveals its habits and weaknesses. A successful relevant Intelligence check confirms them.

## Links

Related page, [[Snakewood]].

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
