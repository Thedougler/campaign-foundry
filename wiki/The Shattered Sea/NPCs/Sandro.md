---
type: NPC
summary: "A Calveno captive wrecked on Aruhe, sheltering in the broken Vethka hull and watching the reef gap for rescue."
sources:
 - "archive/agentic-co-dm-Aruhe-Hungry-Isle.md"
creature: ""
---

## At a glance

- **Role.** Calveno captive and castaway, one of three who reached Aruhe's shore alive from the [[Vethka]] wreck.
- **Wants.** To get [[Nino]] off Aruhe alive.
- **Found at.** The broken [[Vethka]] hull on [[Western Landing]]'s beach, at the signal fire.

> [!narration] First look
> A man steps out of the proa's shade when your boat clears the reef gap, and a signal fire smokes down to embers behind him. He stays where the sand meets the dry shingle and calls across the surf. "You came through the gap. Take us off this beach."

## Play

- **Opens them up.** Asking after the wreck, the reef gap, or a sail home.
- **Shuts them down.** Questions about the interior, which he has never walked.
- **Will share.** The safe shoreline, the hull's shelter, the fruit taboo, and what the island did to [[Tomo]].

## Depth

### History

The Calveno raid carried him captive toward [[Karath]]. The storm put the Vethka proas on Aruhe's reef, and he came ashore on a broken outrigger strut with Nino and Tomo. Tomo broke the fruit taboo that first night and the island took him. Sandro and Nino have kept the hull's shade since, living on sea fish and fallen fruit while the signal fire watches the gap for them.

### Hidden truths

- He knows what the island did to Tomo, and his testimony carries the detail others lack, from the wreck and its fruit taboo to the difference between the shoreline and the jungle.

### Threads

He sits at the start of [[Take on Aruhe]] and at the rescue half of [[Perrin and Nona]].

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
