---
type: World
summary: "A remote archipelago where storm belts, unfinished charts, and competing powers make every crossing a negotiation."
sources:
 - "archive/shattered-sea.md"
---

![[The Shattered Sea - Handout Art.jpg]]

## At a glance

- **Tone.** Remote, exposed, and politically unfinished. Harbours levy a price.
- **Magic and technology.** Working sails, firearms, magical navigation, ancient Antheri machinery, and supernatural currents share the sea.
- **Era.** 1495 DR, after the Second Sundering and while the Drowned Maw's pressure rises.
- **Powers.** The Dravosi Crown, Tessarine Concordat, local councils, Waveservants, Passage, Grung clans, and Sentinels of the Eyrie all contest the routes.
- **Table promise.** Navigate, bargain, investigate, and choose which system or allegiance to trust while discovering what the charts omit.

> [!narration] The World
> You sail a bent chain of islands weeks beyond the last charted coast. Mountain harbours, reef water, storm belts, and a trench treated as a boundary divide the routes. Every crossing leaves a record, a debt, or a secret. Crown patrols demand papers, councils demand compromise, and the sea itself changes its mind. Decide which harbour deserves trust. Then live with the route and price you choose when the charts end.

## Calendar

Years use Dale Reckoning (DR), with the current campaign in 1495 DR, but the source does not establish month names, month lengths, or weekday names.

| Month | Days | Season or note |
| ----- | ---- | -------------- |
| Not established | Not established | The source material does not give month names or lengths. |

Weekdays are not established in the source material. Dates may be recorded by DR year and relative campaign day until the Calendar is defined.

## Depth

### Cosmology

The Drowned Maw is a planar fissure linked to the Elemental Plane of Water. The ancient Antheri built into its far sidewall, and their vanished works remain part of the sea's machinery. Auralis, the deep machine or guardian beneath the Maw, is tied to the breach and to the power that answers from below.

### History in brief

The Antheri expanded towards the Elemental Plane of Water around 2000 years before the current era and vanished in 495 DR. The Sentinels began watching the Maw in 1295 DR. The Dravosi Crown, Tessarine Concordat, Passage, and Scatter formed the modern political routes. In 1495 DR Admiral Fisk's fleet stole the Pearl of Souls. Umberlee destroyed the fleet over the Maw, waking older dangers.

### Hidden truths

The tribute system may help hold the Maw fissure, while the Grung fleet has taken more than 314 people. An unknown faction probes the Sentinel seal. The exact distances, uncharted islands, and political borders of the sea remain undefined.

## Links

```base
filters:
 and:
  - file.inFolder(this.file.folder)
views:
 - type: table
  name: Regions
  filters:
   and:
    - 'note.type == "Location"'
    - 'note.kind == "Region"'
  order:
   - file.name
   - note.summary
 - type: table
  name: Campaigns
  filters:
   and:
    - 'note.type == "Campaign"'
  order:
   - file.name
   - note.summary
 - type: table
  name: House Rules
  filters:
   and:
    - 'note.type == "House Rule"'
  order:
   - file.name
   - note.summary
```
