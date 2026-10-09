---
type: World
summary: "A tidal marsh country where the sea leaves twice a year and a drowned city waits on the mud."
sources: []
revealed: ""
title: ""
---

## At a glance

- **Tone.** Damp, watchful mystery with warm people and cold water. Danger is patient.
- **Magic and technology.** Low magic. Flintlock pistols exist, but powder rots in the damp, so they are rare and prized. Clerics and a few lantern-wrights do most of the magic.
- **Era.** 412 CY, four centuries after the Sluice Compact and 141 years after the city of Vessen drowned.
- **Powers.** The Saltwick Harbor Council, the smugglers called [[The Reedrunners]], and the church of [[Mother Ebb]].
- **Table promise.** Each Session has one real choice, one fight that uses the terrain, and one thing the tide gives up.

> [!narration] The World
> You come to Lowtide by boat, because the land here is mostly water that has not decided yet. The marsh is flat, silver and full of birds. Villages stand on stilts and every door faces the channel. Twice a year the sea draws back for six days and leaves the mud open to the sky. On the third day, the towers of a drowned city stand up out of the flats, and everyone who lives here looks away. People here are kind to strangers and careful with the truth. They have had a long time to practice both.

## Calendar

The Calendar has ten months of 36 days, so a year is 360 days. The week has six days, named Tideday, Reedday, Saltday, Lampday, Marketday and Restday. Six weeks fill a month exactly, and every month begins on Tideday.

Years are counted in Compact Years (CY) from the signing of the Sluice Compact, when the river towns agreed to keep the sluice gates together. The present year is 412 CY. Dates are written as `14 Eelrun 412 CY`.

| Month      | Days | Season or note                                            |
| ---------- | ---- | --------------------------------------------------------- |
| Thawrun    | 36   | Snowmelt floods the upper channels.                       |
| Sowmoot    | 36   | Planting on the drying flats.                             |
| Greenwater | 36   | Algae turns the channels green.                           |
| Highsedge  | 36   | Reeds stand tallest and thatch is cut.                    |
| Longlight  | 36   | Longest days. The first Long Ebb begins on its first day. |
| Reapmoon   | 36   | Salt harvest.                                             |
| Mudfall    | 36   | First frosts come and the mud hardens.                    |
| Eelrun     | 36   | Eels migrate and the back channels are busiest.           |
| Blackwater | 36   | Storms come and most boats stay in port.                  |
| Hollowdark | 36   | Long nights. The second Long Ebb begins on its first day. |

The Long Ebb lasts six days. The sea draws out on the first day of Longlight and of Hollowdark, and returns on the sixth day. Lamp Night falls on 36 Eelrun, when every window shows a lit lamp for the boats lost.

## Depth

### Cosmology

The church teaches that the sea is [[Mother Ebb]], who breathes out twice a year and lends the land back to the living. Nobody has shown why the sea leaves on those days and no others. Wizards who have come to study the Long Ebb went home with tide tables and no theory.

### History in brief

The river towns signed the Sluice Compact in 0 CY to share the tide gates, which keep the sea out of their fields. The Compact made [[Saltwick]] rich. In 271 CY the river city of Vessen flooded in one night, and the Compact said the sluice at [[Crookback Sluice]] had failed in a storm. The story is in [[The Drowning of Vessen]]. All of this happens in [[The Brack]], the marsh country south of the river mouth.

### Hidden truths

- The Long Ebb is older than the Compact and older than Vessen. The sluice only decides where the water goes. The Party can learn this from the old tidemarks cut into the lowest stones of [[The Drowned Chapel]], which are older than the chapel itself.
- The Compact opened the sluice on purpose. See [[The Drowning of Vessen]] for the full truth and the ways it can reach the Party.

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
