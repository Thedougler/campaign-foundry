---
type: Location
kind: Site
summary: "A concealed Black-Jaw dry dock in Le Paludi, disguised as a defunct tannery and maintained by Cobb."
sources:
 - "archive/la-vasca.md"
 - "archive/ssw-session-03.md"
 - "archive/ssw-cobb.md"
 - "archive/ssw-session-04-ingest-recap.md"
parent: "[[Le Paludi]]"
---

## At a glance

- **Draws the Party because.** Vouched vessels receive repairs and registry changes.
- **Entrance.** An unmarked low stone arch at canal waterline.
- **Occupants.** [[Cobb]], Black-Jaw Run members and vouched Passage contacts.
- **Danger.** The site is hidden but every use is reported to Nona.
- **Prize.** A cradle for one vessel up to ninety feet and a route toward Warren.

> [!narration] Entering
> A shabby wall hides a covered basin cut from old stone. Old hide-scent clings to the air. Inside, Black-Jaw colours mark a working cradle where water slaps the dark walls.

## Play

### Areas

Canal arch, covered basin, iron-and-timber cradle, tool wall, stock and low-tide aft passage.

### Hazards

The aft passage is passable on foot only at low tide and for those already vouched. Official records call the site inactive.

### Occupants

[[Cobb]] runs the dock and reports to [[Nona Black-Jaw]].

### Likely actions

Approach with the password garden, repair a vessel, remove registry plates, or ask for the Warren route.

## Depth

### History

The Black-Jaw family has operated the cradle for three generations. The crew's vessel used it after arriving in Calveno.

### Hidden truths

Nona hears of every use within an hour. The defunct tannery is the working dock's cover.

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
