---
type: Campaign
summary: "Three newcomers keep a marsh lighthouse burning and find the bell of a drowned city ringing early."
sources: []
session_length_hours: 3
revealed: ""
title: ""
---

## At a glance

- **Players.** Dev, Maya and Lena.
- **Premise.** The Party is hired at [[Saltwick]] to keep [[Gullhook Lighthouse]] lit through the coming Long Ebb, and finds that the lamp is the smallest of the town's secrets.
- **Party.** [[Brannoch Vell]], [[Tamsin Wick]] and [[Odalys Ferro]], all level 3.
- **Cadence.** Every second Sunday evening, 3 hours a Session.
- **Now.** In [[Reedholt]] with the [[Harbormaster's Ledger of Vessen]], 50 days before the Long Ebb. See [[hot]].

> [!narration] The Campaign
> You arrive in Saltwick on the last ferry of the day, with your packs still wet from the channel and a job waiting at the Harbor Warden's office. The town is quiet and lit poorly. The great lamp at the end of the mole has gone out three times in a season, and boats have been lost on the mud each time. Someone wants you to stop that. Someone else wants you to fail. You are the only people in town who do not yet know which is which.

## Play

- **Session length.** 3 hours, overriding the DM Settings default of 4. Prep plans about five Scenes.
- **Table agreements.** Play is in person. The table agreed that horror stays at mood without gore, and that any scene a Player asks to skip is skipped. Players text the DM between Sessions with downtime plans.
- **House Rules.** [[Bog Ground]] is in force across [[The Brack]].

## Depth

### Premise

Vessen drowned 141 years ago and the Compact called it an accident. It was not. The people who know the truth are dead, silent or afraid. The Party is not chosen for a destiny. They arrive at the right moment and can leave whenever they like, and the story moves without them.

### Themes

- What a community agrees not to say, and the price of that silence.
- Debts, favours and the things that cannot be returned.
- Tide, weather and slow change against the plans of people.

### Direction

The Long Ebb begins on 1 Hollowdark 412 CY. By then the Party will have chosen whom to give the ledger to, or whether to give it to anyone. The three active Threads converge on the Drowned Chapel on the first day of the Ebb.

## Links

```base
filters:
  and:
    - file.inFolder(this.file.folder)
views:
  - type: table
    name: PCs
    filters:
      and:
        - 'note.type == "PC"'
    order:
      - file.name
      - note.summary
  - type: table
    name: Threads
    filters:
      and:
        - 'note.type == "Thread"'
    order:
      - file.name
      - note.summary
      - note.status
  - type: table
    name: Quests
    filters:
      and:
        - 'note.type == "Quest"'
    order:
      - file.name
      - note.summary
      - note.status
  - type: table
    name: Prep
    filters:
      and:
        - 'note.type == "Prep"'
    order:
      - file.name
      - note.summary
      - note.date
  - type: table
    name: Recaps
    filters:
      and:
        - 'note.type == "Recap"'
    order:
      - file.name
      - note.summary
      - note.date
```
