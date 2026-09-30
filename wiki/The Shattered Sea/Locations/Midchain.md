---
type: Location
kind: Region
summary: "The remote island chain whose reefs, harbours and rival powers shape every crossing."
sources:
 - "archive/aruhe.md"
 - "archive/Sparhold.md"
parent: ""
---

## At a glance

- **Character.** A remote chain of islands, reefs and exposed routes.
- **Held by.** Local harbours, the Dravosi Crown, the Tessarine Concordat, Grung clans and other competing powers.
- **Changing.** The Drowned Maw and the raiding-fleet trail are altering safe routes.
- **Crossing.** Sail between reef gaps and harbours. Every crossing costs time, trust or information.
- **Danger.** Storms, reefs, raiders and currents that do not keep to charts.

> [!narration] Arrival
> You sail a bent chain of islands weeks beyond the last charted coast. Reef water, storm belts and mountain harbours divide the route, and every crossing leaves a record, a debt or a secret.

## Play

### Travel

Open water links the Crown Islands, Aruhe, Karath, Murrat, Kalowe and Sparhold. Reef gaps are fast but watched. Longer sea lanes are exposed.

### Places worth reaching

- [[Aruhe]]
- [[Karath]]
- [[Drowned Maw]]
- [[Murrat]]
- [[Kalowe]]
- [[Sparhold]]

### Encounters

1. A harbour pilot asks what route the Party intends.
2. A Grung raiding scout watches a berth.
3. A storm belt closes a familiar lane.
4. A Waveservant collects a crossing price.
5. A Crown vessel checks papers.
6. A ship follows a wake that should have vanished.

### Rumors

- The raiders move people onward through relay harbours.
- The Maw's current changes the safest route.

## Depth

### History

The modern powers formed around the routes and the Maw. The raiding fleet has taken more than 314 people.

### Hidden truths

The charts omit islands and borders. Passage demands time, tribute and trust, and the tribute system may help hold the Maw fissure.

### Threads

[[Drowned Maw Awakening]], [[Bring the Pearl of Souls to Umberlee]], [[The Crown Inspection]], and [[Simone's Hunters]].

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
