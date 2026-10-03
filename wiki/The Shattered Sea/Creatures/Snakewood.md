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
- **Tell.** Its body advertises its next attack before it commits.
- **Weak to.** Cover, terrain, and breaking its preferred range or formation.
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

Open from its preferred terrain, announce the tell of its strongest option, and let the Party answer with positioning, cover, or focused fire. It retreats when its preferred advantage is gone or it is badly wounded.

### Outside a fight

Its tracks, feeding signs, and territorial behaviour warn the Party before an encounter. It acts according to its habitat and does not pursue beyond the terrain that gives it an advantage.

## Depth

### Ecology

The World is its habitat. Its diet follows its form. Observant travellers can identify its signs with Wisdom (Survival).

### Hidden truths

A careful examination of its remains or territory reveals its habits and weaknesses. A successful relevant Intelligence check confirms them.

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
