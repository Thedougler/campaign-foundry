---
type: Creature
summary: "A Terror-Bird creature (CR 13) used as a bruiser in The Shattered Sea."
sources:
  - "archive/terror-bird.md"
  - "archive/session-12-full.md"
revealed: "Session 11"
title: "Terror-Bird"
---

![[Terror-Bird - Portrait.jpg]]

## At a glance

- **Role at the table.** A bruiser that runs its dinner down and swallows it whole.
- **Threat.** CR 13. It charges sixty feet a round in a dead straight line and swallows Medium or smaller prey whole.
- **Tell.** Ground that thrums and pebbles that tick together thirty feet out.
- **Weak to.** A charge it cannot run straight, and the tall grass and deep water it refuses to enter.
- **Used by.** [[unsaid-macaw|Unsaid Macaw]] patrols the same territory.

> [!narration] First sight
> You feel the trail start to thrum under your boots, pebbles ticking together down its length. About thirty feet along the path, a hump you took for a stump shakes its green loose and rises. It unfolds on legs as thick as a fence post and keeps climbing over the fern tops, long as a ship's boat from beak to tail. Moss still hangs off its black shoulders in strings. Then a shaggy head swings up over the fronds, its pale, hooked beak parted a crack, lined with teeth. One gold eye opens under the ridge of its brow and sweeps the fern tops. It does not find you.

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

It opens from stillness among the ferns, a hump of moss, and when prey walks open ground, the tell arrives first: ==The ground begins to thrum beneath your feet, and pebbles start ticking together along the path.== It commits to the straight charge, takes its catch in the serrated beak and swallows whatever fits, the beak opening wide enough for a head and shoulders. Reach ground it refuses, grass taller than itself, deep water or a stand of razer-grass, and it stops at the edge, its turn spent there. ==It pulls up hard, neck dropping low, and paces the line it will not cross.== Inside that line it cannot follow, and the Party can shoot at it or stay out of the beak's ten-foot reach. A swallowed traveller stabs at it from inside, and enough hurt taken inside or outside the beak in one turn makes it gag its catch back up alive.

### Outside a fight

Still, it passes for a mossy stump among the ferns, and the tremor of its stride warns anyone standing on the ground a full thirty feet out. One worked the ground above a lava-tube hideout on Aruhe. Its steps shook debris from the roof, and clicking sounded at the skylight before a moss-covered head pushed through to peer about. The search came up empty. It walked off with the roots pulsing under it and was back inside the half hour for a second look that found the same nothing.

## Depth

### Ecology

Its ground is forest and jungle floor, where Wisdom (Survival) reads its passing in a beaten line that runs dead straight and bends for grass and deep water alone. On Aruhe it walks ground riddled with lava tubes, and nothing so big could climb down into them after prey.

### Hidden truths

An Intelligence check finds the gag, for a hard turn of damage taken from within its body or from beyond it brings the swallowed catch back into the open. The bird at the skylight was not the only one of its kind on this ground, and it was not the one that left the survivors catatonic. Crissdalynn named it as their tormentor, and a survivor said it was a different bird.

## Links

Related page, [[unsaid-macaw|Unsaid Macaw]].

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
