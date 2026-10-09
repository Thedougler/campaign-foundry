---
type: NPC
summary: "Crown-licensed import factor at Port Tidefall who placed his son
  Geoffrey aboard the HCS Surety through connections he has never written down."
sources:
  - "archive/dravosi-crown.md"
creature: ""
revealed: ""
title: "Aldous Draves"
---

## At a glance

- **Role.** Import factor licensed by the [[dravosi-crown|Dravosi Crown]], thirty years at the [[calders-tooth-and-port-tidefall|Port Tidefall]] docks, and father to [[geoffrey-draves|Geoffrey Draves]].
- **Wants.** Real Crown status by proxy, proven if Geoffrey's name reaches the right people.
- **Voice.** Flat, correct sentences, the same for a clerk as for a son, and Geoffrey is always his full name.
- **Found at.** The Tidefall docks, among the pier clerks he has spent thirty years knowing.

> [!narration] First look
> A spare man in a Crown factor's coat straightens his cuffs before he answers you, and the coat's collar hangs a decade behind the fashion, brass buttons in place of the silver buttons a newer coat would have. A ledger case rides his shoulder, worn pale at one corner under his thumb. "Geoffrey is capable. His future depends on his choices."

## Play

- **Opens them up.** Dock business done properly, and any question that lets him give the full context before his real one.
- **Shuts them down.** A suggestion that he arranged his son's posting, or careless handling of the family name.
- **Will share.** Accurate harbour, paperwork and pay detail, down to a rated marine's weekly wage.
- **Will not share.** The connections behind Geoffrey's berth, or the worry under the correct sentences.
- **If pressed.** He lets the printed contract answer for him.

## Depth

### History

Thirty years as a licensed import factor have taught him the name of every clerk on the Tidefall docks. The officers above him remain names on a roster. His Crown connections bought [[geoffrey-draves|Geoffrey Draves]] the carpenter's posting aboard the [[uncertainty|HCS Surety]] with marine duties for a supplement. The arrangement is written down nowhere but his own memory, and the contract's printed language leaves out what the posting actually pays. He promised his son bigger things would follow. Geoffrey's letters stopped once the cutter ran the eastern patrols, and one formal inquiry at the Harbourmaster's Office came back empty. Since the boarding that took the cutter, the Draves branch is in the [[dravosi-crown|Dravosi Crown]]'s records as placed and defected. The record lists Geoffrey as gone and Aldous as the placer.

### Hidden truths

- No paper carries the arrangement behind Geoffrey's berth. Surfaced, it reads as a factor buying his son a rated posting outside the proper channels.
- He knows a rated marine's pay to the shilling, more than the supplement his son signed for. Whether he ever told Geoffrey that is his own business.
- His routine Crown archive access sits beside genealogist Aldric Drave's interest in the unusually deep Draves genealogical record (see [[dravosi-crown|Dravosi Crown]]).

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
