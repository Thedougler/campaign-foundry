---
type: Creature
summary: "A carnivorous canopy vine colony that grips travellers and feeds with acid."
sources:
 - "archive/snakewood.md"
---

![[Snakewood - Handout Art.jpg]]

## At a glance

- **Role at the table.** Hazard.
- **Threat.** CR 6. Use its attack range, movement, or control to pressure the Party.
- **Tell.** One coil that moves when every honest vine is still, and a hanging tip that twitches.
- **Weak to.** Staying past fifteen feet, beyond where its lash lands and its five-foot shuffle can follow.
- **Used by.** [[Spiguar]] patrols the same territory.

> [!narration] First sight
> Bones picked clean hang caught in the coils over the trail, and one vine loop sits smoother and darker than the growth around it. Wood creaks as the loop eases itself along the limb by a hand's width. A loose strand hangs down past shoulder height, and its tip gives a twitch.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Snakewood"
size: Large
type: plant
alignment: unaligned
ac: 13
hp: 84
hit_dice: "13d10 + 13"
speed: "5 ft., climb 20 ft."
stats: [16, 10, 13, 1, 10, 3]
senses: "blindsight 30 ft., passive Perception 10"
languages: "none"
cr: 6
traits:
  - name: "False Appearance"
    desc: "While motionless, the snakewood is indistinguishable from ordinary vines."
actions:
  - name: "Grasping Lash"
    desc: "Melee Attack Roll: +6, reach 15 ft., one target. Hit: 7 (1d6 + 4) Bludgeoning damage, and the target has the Grappled condition (escape DC 14)."
```

## Play

### Tactics

It hangs motionless over the trail until prey passes beneath, and then the lash drops, grips, and holds while the colony feeds. Outside its fifteen feet the catch is safe, for its whole pace on the ground is a shuffle.

### Outside a fight

Its larder hangs in plain sight, bones picked clean among the coils above the trail, one loop darker and smoother than its neighbours marking the living wood.

## Depth

### Ecology

The colony spreads its coils through the canopy wherever trails pass under, and Observant travellers pick its traces out with Wisdom (Survival).

### Hidden truths

What an Intelligence check counts in the canopy is one animal spread through many coils, gripping travellers and feeding on them where they hang.

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
