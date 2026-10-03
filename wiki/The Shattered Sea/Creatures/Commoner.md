---
type: Creature
summary: "An ordinary untrained person represented by the standard commoner statblock."
sources:
 - "archive/commoner.md"
---

## At a glance

- **Role at the table.** Noncombatant.
- **Threat.** CR 0. Use its attack range, movement, or control to pressure the Party.
- **Tell.** Its body advertises its next attack before it commits.
- **Weak to.** Cover, terrain, and breaking its preferred range or formation.
- **Used by.** [[Grung]] patrols the same territory.

> [!narration] First sight
> An ordinary person faces you with a club gripped in both hands, feet set wide and weight rocking heel to heel. The club rises in a slow, wide arc, and it hangs at the top long enough for anyone to step clear. Untrained hands give every swing away.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Commoner"
size: Medium
type: humanoid
alignment: neutral
ac: 10
hp: 4
hit_dice: "1d8"
speed: "30 ft."
stats: [10, 10, 10, 10, 10, 10]
senses: "passive Perception 10"
languages: "Common"
cr: "0"
actions:
  - name: "Club"
    desc: "Melee Attack Roll: +2, reach 5 ft. Hit: 2 (1d4) Bludgeoning damage."
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
