---
type: Creature
summary: "A Vine Lash creature (CR 3) used as a controller in The Shattered Sea."
sources:
 - "archive/vine-lash.md"
---

![[Vine Lash - Portrait.png]]

## At a glance

- **Role at the table.** Controller.
- **Threat.** CR 3. Use its attack range, movement, or control to pressure the Party.
- **Tell.** Its body advertises its next attack before it commits.
- **Weak to.** Cover, terrain, and breaking its preferred range or formation.
- **Used by.** [[Wolfrabbit]] patrols the same territory.

> [!narration] First sight
> The vine lash reveals itself through a distinctive silhouette and the tell of its signature attack, making its danger clear before it strikes.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Vine Lash"
size: Medium
type: plant
alignment: unaligned
ac: "12 (natural armor)"
hp: 52
hit_dice: "8d8 + 16"
speed: "10 ft., climb 10 ft."
stats: [14, 8, 14, 1, 10, 1]
damage_vulnerabilities: "Fire"
condition_immunities: "Blinded, Deafened, Frightened"
senses: "Blindsight 30 ft. (blind beyond this radius), passive Perception 10"
languages: "none"
cr: "3"
traits:
  - name: "False Appearance"
    desc: "While the vine lash is motionless, it is indistinguishable from ordinary jungle vines."
  - name: "Spider climb"
    desc: "The vine lash can climb difficult surfaces, including upside down on ceilings, without an ability check."
  - name: "Grasping Bundle"
    desc: "Each creature the vine lash grapples is held by its own bundle of stems (AC 12, 8 Hit Points). A creature can attack a bundle; damage to it doesn't harm the vine lash, and reducing it to 0 Hit Points ends that grapple."
  - name: "Island's Hand"
    desc: "When a creature makes a claim under Aruhe's law within 60 feet, the nearest vine lash wakes at the end of that creature's next turn. It attacks the marked creature first, then the nearest other creature within reach. It never attacks a creature that has eaten fallen fruit on Aruhe and made no claim since. It withdraws into the canopy when reduced to 26 Hit Points or fewer, or after 1 minute."
actions:
  - name: "Multiattack"
    desc: "The vine lash makes two Tendril attacks, or one Tendril attack and one use of Constrict."
  - name: "Tendril"
    desc: "Melee Attack Roll: +4, reach 15 ft. Hit: 7 (2d4 + 2) Bludgeoning damage, and the target has the Grappled condition (escape DC 12). While Grappled, the target's Speed is 0. The vine lash can grapple up to two creatures at a time."
  - name: "Constrict"
    desc: "One creature Grappled by the vine lash takes 9 (2d6 + 2) Bludgeoning damage. The grapple remains until the target escapes or its bundle is destroyed."
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
