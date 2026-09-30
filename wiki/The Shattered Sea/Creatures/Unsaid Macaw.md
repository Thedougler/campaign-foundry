---
type: Creature
summary: "A macaw that echoes surface thoughts and can briefly compel a truthful sentence."
sources:
 - "archive/unsaid-macaw.md"
---

![[Unsaid Macaw - Portrait.jpg]]

## At a glance

- **Role at the table.** Social hazard.
- **Threat.** CR 0. Use its attack range, movement, or control to pressure the Party.
- **Tell.** Its body advertises its next attack before it commits.
- **Weak to.** Cover, terrain, and breaking its preferred range or formation.
- **Used by.** [[Vine Lash]] patrols the same territory.

> [!narration] First sight
> The unsaid macaw reveals itself through a distinctive silhouette and the tell of its signature attack, making its danger clear before it strikes.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Unsaid Macaw"
size: Small
type: beast
alignment: unaligned
ac: 12
hp: 3
hit_dice: "1d6"
speed: "10 ft., fly 50 ft."
stats: [2, 14, 10, 3, 12, 8]
senses: "passive Perception 11"
languages: "none"
cr: 0
traits:
  - name: "Surface Echo"
    desc: "The macaw repeats a nearby creature's foremost current thought in that creature's voice."
actions: []
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
