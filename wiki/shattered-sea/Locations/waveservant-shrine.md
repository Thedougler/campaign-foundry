---
type: Location
kind: Site
summary: "The Waveservants' harbour shrine in Calveno, where tribute is
  collected, appointments are kept, and Umberlee has spoken."
sources:
  - "archive/ssw-umberlees-message.md"
  - "archive/ssw-session-04-ingest-recap.md"
parent: "[[calven-and-calveno|Calven and Calveno]]"
revealed: "Session 4"
title: "Waveservant Shrine"
---

## At a glance

- **Draws the Party because.** It holds the open appointment behind [[bring-the-pearl-of-souls-to-umberlee|Bring the Pearl of Souls to Umberlee]], and it is where [[umberlee|Umberlee]] last spoke.
- **Danger.** What spoke here can speak again.

> [!narration] Entering
> Basins and booklets wait by the door, and candlelight sits low over a kneeling pool at the back. The water in the pool moves with no wind to move it.

## Play

### Features

A kneeling pool rests at the back of the shrine floor, deep enough for a devotee to kneel in. Tribute basins stand where sailors pass, and appointments are kept from a tide-table booklet. [[master-kyzil|Master Kyzil]] has taken his meals on the steps outside, watching the square.

## Depth

### History

[[umberlee-branca|Branca]] keeps the appointments here. At a night communion Delmar Fisk attended, Umberlee possessed her in the pool and snapped her neck. His tithe of gold went into the water before the goddess spoke, and her rage at his lie cracked the night with thunder while the pool ran like hurricane wash. The sea-mist brought her back before the stone dried, and the harbour clergy have watched for him since.

### Hidden truths

- The kneeling pool is where their goddess spoke. Ask what the pool is for and the answer gets shorter.

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
