---
type: Creature
summary: "An ordinary untrained person represented by the standard commoner statblock."
sources:
 - "archive/commoner.md"
---

## At a glance

- **Role at the table.** Noncombatant.
- **Threat.** CR 0. A 5-foot reach and a two-handed club are the whole of it, enough to press only the careless.
- **Tell.** The swing is readable well before it lands, and the club hangs a moment at the top of its arc.
- **Weak to.** Cover, broken ground, and getting inside the swing leave it harmless. Scatter the group it stands with, and it has nothing to lean on.
- **Used by.** [[Grung (Creature)]] patrols the same territory.

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

Open on the home ground it knows, and let the raised club announce the one swing it has. The Party answers with positioning, cover, or focused fire. It runs once it is hurt or the weight of numbers turns against it.

### Outside a fight

Boot prints, a worn path, and wood cut for the evening fire warn the Party that someone lives here before an encounter. The commoner keeps to home ground and does not chase far past it.

## Depth

### Ecology

Commoners live wherever people do around the Shattered Sea, and they eat what their fields, nets, and stores yield. A traveller working Wisdom (Survival) reads their sign as plainly as any beast's.

### Hidden truths

The state of a commoner's home and the wear on its hands tell you its habits, and its unarmoured frame tells you its weaknesses. A successful relevant Intelligence check confirms both.

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
