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
- **Mood.** An available urban hub rather than an active crisis.
- **Unsettled by.** No current pressure is established.
- **Known for.** Solange Barret's ritual, Otar the Foul and the closed Mercatura bombs.

> [!narration] Arrival
> Mercatura is a functioning city of Calveno. Its approach, skyline and recurring landmarks remain for play to establish. The old crisis remains out of sight in the present streets.

## Play

### Districts

No named districts are established. Add one only when play requires a repeatable urban area.

### Services

Ordinary urban movement and connected investigations are available. Specific inns, markets and transport are not established.

### Factions here

No current civic faction is established. [[Solange Barret]] and [[Otar the Foul]] belong to closed history.

### Local rules

Law, commerce, curfew and local custom remain unknown.

### Rumors

The bombs and Otar's defeat are closed Season 1 history, not a current crisis.

## Depth

### History

Solange Barret's ritual ran beneath the city. Otar emerged in the Mercatura crater and died there. Five Minor Slaads spawned and were killed by [[Master Kyzil]]. Hundreds of residents disappeared in the disaster.

### Hidden truths

The city is deliberately open as an urban hub. Do not reopen the old crisis without play establishing a new situation.

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
