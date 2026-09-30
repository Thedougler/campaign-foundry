---
type: Location
kind: Settlement
summary: "A functioning Calveno city whose closed Season 1 crisis leaves its durable urban identity only partly recorded."
sources:
 - "archive/mercatura.md"
parent: "[[Calven and Calveno]]"
---

## At a glance

- **Size.** Functioning city. Population and districts are not established.
- **Ruled by.** City authority is unknown.
- **Mood.** Partly disrupted by the crater and missing-persons work, with ordinary city life continuing.
- **Unsettled by.** The Mercatura crater, missing people and the aftermath of the raid.
- **Known for.** Solange Barret's ritual, Otar the Foul and the closed Mercatura bombs.

> [!narration] Arrival
> Mercatura is a functioning city of Calveno built around a crater left by the old crisis. Families still search there while ordinary streets work around the damage.

## Play

### Districts

No named districts are established. Add one only when play requires a repeatable urban area.

### Services

Ordinary urban movement and connected investigations are available. Specific inns, markets and transport are not established.

### Factions here

No permanent civic faction is established. Nona Black-Jaw's missing-persons desk and the Defenders' writ remain recent aftermath structures.

### Local rules

Law, commerce, curfew and local custom remain unknown.

### Rumors

The bombs and Otar's defeat remain history, but the crater and missing-person search still shape the city.

## Depth

### History

Solange Barret's ritual ran beneath the city. Otar emerged in the Mercatura crater and died there. Five Minor Slaads spawned and were killed by [[Master Kyzil]]. Hundreds of residents disappeared in the disaster.

### Hidden truths

The city is an urban hub under the aftermath of the crater and missing-person search. Future play can establish how those pressures change it.

### Threads

[[Perrin and Nona]].

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
