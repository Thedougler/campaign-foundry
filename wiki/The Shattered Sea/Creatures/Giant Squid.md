---
type: Creature
summary: "A huge deep-water beast of the Drowned Maw that takes divers from the Shelfworks drop-off after dark."
sources:
 - "archive/drowned-maw.md"
 - "archive/ssw-giant-squid.md"
---

## At a glance

- **Role at the table.** The unseen taker on the drop-off, met through its signs as often as its body.
- **Threat.** CR 6. A tentacle with a fifteen-foot reach that grapples Huge or smaller and hauls the catch ten feet toward the beak.
- **Tell.** A dive line drawn taut with no diver pulling it, a rope severed clean below the agreed depth, a shadow that moves off before it can be named.
- **Weak to.** Open air. It can breathe only underwater, and its ink answers damage just once a day.
- **Used by.** It takes its own prey, an unaligned beast of the deep channels.

> [!narration] First sight
> Your lamp gives out on black water past the depth the rule allows. Broad as the arch you work through, a body hangs where the light fails. Drifting from that body, one arm long as a boarding pike feels for your line. The line comes taut, then hangs loose again. Then the arm draws back in. The pulse of air through your hose goes on.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Giant Squid"
size: Huge
type: beast
alignment: Unaligned
ac: 12
hp: 120
hit_dice: "16d12 + 16"
speed: "5 ft., swim 80 ft."
stats: [23, 14, 12, 5, 11, 4]
saves:
  - strength: 9
  - dexterity: 5
skillsaves:
  - perception: 6
senses: "darkvision 120 ft., passive Perception 16"
languages: "—"
cr: "6"
traits:
  - name: "Water Breathing"
    desc: "The squid can breathe only underwater."
actions:
  - name: "Multiattack"
    desc: "The squid makes one Bite attack and one Tentacle attack."
  - name: "Bite"
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 28 (4d10 + 6) Piercing damage."
  - name: "Tentacle"
    desc: "*Melee Attack Roll:* +9, reach 15 ft. *Hit:* 19 (3d8 + 6) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Grappled condition (escape DC 16) from one of two tentacles, and the squid can pull the target up to 10 feet straight toward itself."
reactions:
  - name: "Ink Cloud (1/Day)"
    desc: "*Trigger:* The squid takes damage while underwater. *Response:* The squid releases ink that fills a 15-foot Cube centered on itself, and the squid moves up to its Swim Speed. The Cube is Heavily Obscured for 1 minute or until a strong current or similar effect disperses the ink."
```

## Play

### Tactics

It strikes from below the light. The tentacle takes one swimmer and hauls it toward the beak while the bite works at another, and a grappled target comes free on a made escape or a severed tentacle. Hurt underwater, it spends its ink, blinds the water around itself and moves off on its full swim.

### Outside a fight

By day it keeps to the deeper channels past the drop-off. After dark it rises along the wall and has come as shallow as the dive floor. Most meetings are only its signs, a taut line, a parted rope, a shadow giving way at the edge of a lamp.

## Depth

### Ecology

The Maw is the only water deep enough for them that the salvage camps know, and its floor waits below every line sent down. Reef sharks work the upper halls and hunter sharks the edge, and the giant squid keeps to the deeper channels below them, past where the claim of [[Umberlee]] runs out.

### Hidden truths

Every account of what moves in the Maw's dark is testimony. The squid is the practical answer, and the one that spares the camps the bigger vocabulary of krakens or [[Leviathan|leviathans]]. The nearest witness account is [[Orvalle]]'s, told once a season at the pumps, and a Party in search of truth past testimony crosses his telling with the signs on their own lines.

## Links

Works the deep water of the [[Drowned Maw]] and rises along the [[Shelfworks]] drop-off. The [[Leviathan]] works the open water above its channels.

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
