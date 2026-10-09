---
type: Creature
summary: "A River Otter creature (CR 4) used as a controller in The Shattered Sea."
sources:
  - "archive/session-11-transcript-archived-version.md"
  - "archive/river-otter.md"
revealed: "Session 11"
title: "River Otter"
---

![[River Otter - Token.png]]

![[River Otter - Reference Sheet.jpg]]

## At a glance

- **Role at the table.** A controller that repositions swimmers and steals what they hold.
- **Threat.** CR 4, and never just one, for the family brings down its prey as one.
- **Tell.** Play that stops mid-tumble, every head in the water coming round at once.
- **Weak to.** Dry ground, and isolation from the second otter its ambush advantage needs.
- **Used by.** [[snakewood|Snakewood]] patrols the same territory.

> [!narration] First sight
> Otters as big as sheepdogs tumble in the shallows, rolling one another under and letting go. One clamps both paws on the end of a trailing line and hauls it under. It bobs up empty-pawed. Another surges from below and fastens on the first one, and the two of them go down in a swirl of foam. Then both surface in a slapping of tails, and the smallest one drags the line away through the weeds.

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

In play they steal whatever dangles from the camp, all of it sport. The whole family turns to the hunt when an adult is hurt or a pup is touched. Two of them flank any swimmer for their shared advantage while the biggest dunks its catch and holds it under.

### Outside a fight

A family at play gives itself away in stripped gear and stolen lines hauled off through the water, and the sport holds until the family itself is hurt. The Slack Basin family kept its game gentle for a full hour of acrobatics and illusions, and swam off downriver whistling once the play wore thin.

## Depth

### Ecology

Each family keeps to one stretch of river, and Observant travellers read its signs with Wisdom (Survival).

### Hidden truths

The switch is the secret an Intelligence check buys, for hurt to one adult or a hand on a pup arms every otter in the water at the same moment.

## Links

Related page, [[snakewood|Snakewood]].

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
