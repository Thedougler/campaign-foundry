---
type: NPC
summary: "Blue-caste Grung handler who became an ally while hiding the party in a sewer nap room."
sources:
  - "archive/ruma-delacroix.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Blue-caste handler for the sewer magazine network.
- **Wants.** To keep her cover and the hidden refugees alive.
- **Voice.** Flat, unhurried, dry, and visibly relieved to have someone to talk to.
- **Found at.** Room 6 of the Calveno Sewer Magazines.

> [!narration] First look
> A blue Grung sits at a desk in Room 6, surrounded by charts and tide marks. She speaks in a flat voice while chemical formulae curl across every spare scrap like star maps.

## Play

- **Opens them up.** Sincere interest in her doodles and treating her as someone worth hearing.
- **Shuts them down.** A failed pipe-click check or Jean-Claude speaking in handler-register.
- **Will share.** Secondary magazine sites, timing, sentry composition, and egress vents.
- **Will not share.** The primary site, the circle's purpose, or Simone's and Solange's identities.
- **If pressed.** She keeps the network check-ins sounding normal and helps only from Room 6.

## Depth

### History

The party captured Ruma in Session 05 without a fight. Her chemical doodles won their trust, and she hides them in her dry “nap room” while continuing to answer the network's check-ins. She is an ally who cannot fight.

### Hidden truths

- Ruma still nominally works for Simone's network. That cover is the danger protecting everyone in Room 6.
- She knows a fifth red-caste “circle site” exists but not that it summons Otar.

### Threads

She is a living informant in **Simone's Hunters**.

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
