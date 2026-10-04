---
type: Location
kind: Region
summary: "A chart-edge trench where currents reverse, the Pearl lies below the waterline and a planar fissure strains containment."
sources:
 - "archive/drowned-maw.md"
 - "archive/ssw-giant-squid.md"
 - "archive/ssw-umberlee.md"
parent: "[[Midchain]]"
---

## At a glance

- **Character.** A deep trench and boundary at the chart edge.
- **Held by.** Umberlee's claim, Antheri works, Sentinels and competing salvage interests.
- **Changing.** The fissure loses ground. Heat pulses shrink working depth and the current reverses.
- **Crossing.** Approach from the [[Central Strait]], descend through storm and Shelfworks, then retreat by a marked line.
- **Danger.** Elemental exposure, lying instruments, storms and displacement.

> [!narration] Arrival
> Dark water drags ropes sideways beneath a broken horizon. Storm walls hide the trench, and cold spray strikes before the next swell clears. The current turns beneath your hull.

## Play

### Travel

The [[Central Strait]] runs to the Maw approach. East of the chart edge the [[Outer Reach]] opens, about five days' sail to [[Keth-Naar]] on bought bearings. The Shelfworks, Mid-Works and Deep Works descend along the Antheri wall. A tribute lane or Sentinel instruction can bypass some danger at a cost.

### Places

[[High Eyrie]], the [[Shelfworks]], Mid-Works, Deep Works and the fissure seal.

### Encounters

1. A reversed current displaces a vessel.
2. A salvage crew anchors where nobody should.
3. Reef sharks work the upper halls.
4. A Sentinel records a change without intervening.
5. Auralis strains against the fissure.
6. The Pearl signals from the eastern Shelfworks.
7. A dive line goes taut with no diver at its end, or a shadow slips away at the edge of the light.

### Rumors

The Maw is a trench-floor puncture through the Border Ethereal into the Elemental Plane of Water. It forms a boundary around the ocean. The bottom lies past every sounding line, and what moves in that dark water is competing testimony. The practical answer is the [[Giant Squid]].

## Depth

### History

The Antheri built into the far sidewall roughly two thousand years before the current era. Sentinels have watched the Maw since 1295 DR.

### Hidden truths

[[Umberlee]]'s claim stops at the living blue-green line. Beyond it depth and instruments disagree. The Pearl wreck lies below that boundary.

### Threads

[[Drowned Maw Awakening]], [[Bring the Pearl of Souls to Umberlee]], and [[The Crown Inspection]].

## Links

```base
filters:
 and:
  - file.hasLink(this.file)
views:
 - type: table
  name: Contains
  filters:
   and:
    - parent == this
  groupBy:
   property: note.kind
   direction: ASC
  order:
   - file.name
   - note.summary
 - type: table
  name: Linked from
  filters:
   and:
    - parent != this
  groupBy:
   property: note.type
   direction: ASC
  order:
   - file.name
   - note.summary
```
