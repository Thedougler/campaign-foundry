---
type: Creature
summary: "A Terror-Bird creature (CR 13) used as a bruiser in The Shattered Sea."
sources:
  - "archive/terror-bird.md"
---

## At a glance

- **Role at the table.** Bruiser.
- **Threat.** CR 13; use its attack range, movement, or control to pressure the Party.
- **Tell.** Its body advertises its next attack before it commits.
- **Weak to.** Cover, terrain, and breaking its preferred range or formation.
- **Used by.** [[Unsaid Macaw]] patrols the same territory.

> [!narration] First sight
> The terror-bird reveals itself through a distinctive silhouette and the tell of its signature attack, making its danger clear before it strikes.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Terror-Bird"
size: Huge
type: monstrosity
alignment: unaligned
ac: "16 (natural armor)"
hp: 200
hit_dice: "16d12 + 96"
speed: "60 ft."
stats: [24, 14, 22, 3, 16, 8]
saves:
  - constitution: 11
  - wisdom: 8
skillsaves:
  - perception: 8
  - stealth: 7
senses: "passive Perception 18"
languages: "none"
cr: 13
traits:
  - name: "Tremor Stride"
    desc: "Any creature within 30 feet of the terror-bird that is touching the ground feels it coming. The terror-bird can't surprise a creature that is touching the ground or has Tremorsense."
  - name: "Moss-Grown"
    desc: "The terror-bird has Advantage on Dexterity (Stealth) checks made in forest or jungle, where it passes for a mossy stump."
  - name: "Straight Charge"
    desc: "When the terror-bird moves at least 20 feet toward a target on its turn, it moves in a straight line and can't turn more than 45 degrees. It will not move into grass taller than itself, into deep water, or through a stand of razer-grass, and its turn ends at the edge of any of them."
  - name: "Gag"
    desc: "If the terror-bird takes 25 damage or more on a single turn from a creature inside it, or 40 damage or more on a single turn from outside it, it makes a DC 19 Constitution saving throw at the end of that turn. Failure: it regurgitates each swallowed creature, which lands in an unoccupied space within 10 feet with the Prone condition."
actions:
  - name: "Multiattack"
    desc: "The terror-bird makes one Serrated Beak attack and one Talon Rake attack."
  - name: "Serrated Beak"
    desc: "Melee Attack Roll: +12, reach 10 ft. Hit: 23 (3d10 + 7) Piercing damage, and the target has the Grappled condition (escape DC 19). Until the grapple ends, the target has the Restrained condition and the terror-bird can't use Serrated Beak on another target. The grapple ends if the terror-bird takes 20 damage or more on a single turn."
  - name: "Talon Rake"
    desc: "Melee Attack Roll: +12, reach 10 ft. Hit: 17 (3d6 + 7) Slashing damage."
  - name: "Swallow"
    desc: "The terror-bird makes one Serrated Beak attack against a Medium or smaller creature it is grappling. Hit: the target is swallowed and the grapple ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and effects from outside, and takes 14 (4d6) Acid damage at the start of each of the terror-bird's turns. If the terror-bird dies, a swallowed creature can escape the corpse using 5 feet of movement, exiting Prone."
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

Related page, [[Unsaid Macaw]].

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
