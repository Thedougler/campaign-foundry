---
type: Location
kind: Region
summary: "A limestone reef in the Northern Midchain where Moucheron kin-villages hide above the tide and blood is currency."
sources:
 - "archive/murrat.md"
 - "archive/ssw-midchain.md"
parent: "[[Midchain]]"
---

## At a glance

- **Character.** A mile-and-a-half limestone reef between [[Kalowe]] and the [[Verdant Teeth]], whose villages hide in cliff hollows.
- **Held by.** Dozens of Moucheron kin-villages and their scouts.
- **Changing.** A dark cloud resolves into wings as an approach closes.
- **Crossing.** Chart the eastern reef and its wrecks before seeking a rope bridge.
- **Danger.** The reef ring, tide and an unaccepted reason for approach.

> [!narration] Arrival
> Murrat looks empty until the canopy closes a short distance inland. Then cliff hollows and rope bridges appear above the tide, with wet limestone and leaf mould marking the reef beyond.

## Play

### Travel

Open water surrounds the reef ring. The tide pulls east toward two wrecks. No marked safe passage crosses the ring.

### Places

The cliff hollows, rope bridges and eastern reef.

### Encounters

Moucheron scouts watch arrivals. Kin-villages demand a reason. A cloud of millions circles without moving with the weather. Wrecks catch boats pulled east.

### Rumors

The island is watched before the first rope bridge. Blood custom determines whether an approach passes scrutiny.

## Depth

### History

The kin-villages built their connected life above the tide. The reef settlement remains concealed from open water.

### Hidden truths

The cloud consists of the Moucheron. The reef extends beyond the first approach visible from shore.

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
