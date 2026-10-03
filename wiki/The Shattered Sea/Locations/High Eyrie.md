---
type: Location
kind: Site
summary: "A basalt sea-stack beyond the Crown chain held by the Sentinels for two centuries above the Drowned Maw."
sources:
 - "archive/high-eyrie.md"
parent: "[[Crown Islands]]"
---

## At a glance

- **Draws the Party because.** The Sentinels keep the only continuous Maw observation ledgers.
- **Entrance.** Exposed sea terraces reached by climb, invitation, harness or magic.
- **Occupants.** [[Aarakocra]] monks, apprentices, record-keepers and Master Kyzil.
- **Danger.** Wind, spray and open-water approaches.
- **Prize.** Ledgers, founding documents and the Sentinel seal.

> [!narration] Entering
> A basalt stack rises above discoloured water. Wind shears the rock face and narrow terraces cling to the summit. The climb exposes each step to sea and sky.

## Play

### Areas

Exposed terraces, training spaces and record-keeping rooms. The DM can establish the summit layout in play.

### Hazards

Careful movement is required above open water. Access is controlled by invitation and watched climbs.

### Occupants

[[Sentinels of the Eyrie]], including [[Master Kyzil]].

### Likely actions

Request ledger access, climb, ask about Crown offers, or investigate the founding documents and seal.

## Depth

### History

The Sentinels have watched the Maw continuously since 1295 DR and refused three Crown offers.

### Hidden truths

The order observes without interpreting or intervening. The faction called the faction remains connected through existing faction history.

### Threads

[[Drowned Maw Awakening]] and [[Bring the Pearl of Souls to Umberlee]].

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
