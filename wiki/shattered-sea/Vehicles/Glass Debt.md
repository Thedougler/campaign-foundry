---
type: Vehicle
summary: "The name for what piracy becomes when it grows until convoys, patrols and councils all have to react; a report of her consolidates the strait's shipping by evening."
sources:
 - "archive/ssw-central-strait.md"
 - "archive/ssw-verdant-scatter.md"
---

## At a glance

- **Kind.** Unknown. The name describes the scale of threat as much as it describes the hull.
- **Size.** Unknown.
- **Speed.** Unknown.
- **Crew.** Unknown.
- **Captain.** Unknown.
- **Berth.** Unknown.

> [!narration] First sight
> Nobody at a harbour rail claims to have seen her. They talk about the morning after instead. The convoys have closed up and the patrol rosters have come off their hooks, while captains who could delay a departure delay one.

## Play

### Underway

A report of the Glass Debt anywhere near the [[Central Strait]] closes up the convoys and changes the Crown patrol schedule, and the changed schedule tells you who believed the report. She sits at the top of the Scatter's piracy scale, above the [[Bad Receipt]]'s paperwork and the [[Knife's Wake]]'s channel tolls, with the [[Velvet Noose]] working the same water.

## Depth

### Hidden truths

The fear does half her work, and the other half is whoever profits from the schedule changes a false report can buy.

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
