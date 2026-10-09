---
type: Lore
summary: "A routing record that keeps Session 11 recap, transcript, and
  recording assets distinct until their owning ingest workflow promotes them."
sources:
  - "archive/assets.md"
revealed: ""
title: ""
---

## At a glance

- **The truth.** This operational drop map records routing rather than a Campaign canon change.
- **Who knows it.** The DM and the ingest workflow use the routes. Players receive only reconciled Session material.
- **Limits.** It records destinations and decisions, not a recap or transcript.
- **Reaches play through.** It prevents evidence types from being mixed or promoted before reconciliation.

> [!narration] As it is told
> “Keep the recap, transcript, and recording distinct until the evidence is reconciled.”

## Play

- **Players notice.** Nothing directly. Player-facing facts belong in the reconciled Recap or Transcript.
- **Clues.** A supplied recap routes to `Session-11-Recap.md`. Transcript text routes to `Session-11-Transcript.md` or Raw staging, while a recording routes to `wiki/attachments/session-11-recording.{ext}`.
- **Accounts.** If no post-play asset is supplied, the Session plan remains unchanged. Never reconstruct an asset from memory.

## Depth

### The full truth

The drop map classifies supplied material. A recap belongs to the Session Recap owner. Transcript text goes through transcript ingest and reconciliation. A recording becomes an attachment when the file exists. Raw staging and Archive are separate from canonical Campaign pages. The map records routes. Canonical clues and Campaign changes come from the records those assets belong to.

### Chronology

The record was made for Session 11 post-play assets. Its route remains valid until the workflow responsible for each supplied asset promotes it. The actual ending, unresolved pressure, and next opening belong in the reconciled Session record.

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
