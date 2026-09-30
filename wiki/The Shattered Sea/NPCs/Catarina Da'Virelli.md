---
type: NPC
summary: "Calveno artificer and salvage engineer who keeps her workshop in the city."
sources:
 - "archive/catarina-davirelli.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Artificer and salvage engineer.
- **Wants.** To keep her workshop operating and continue private salvage research.
- **Voice.** Practical workshop terms, with no patience for romanticising mechanisms.
- **Found at.** Her workshop in Calveno.

> [!narration] First look
> A white-haired artificer in a worked breastplate looks up from oil, brass, and hot wire. Tool marks score her gloves, and she asks about the mechanism before the story.

## Play

- **Opens them up.** A mechanism worth studying or repairing.
- **Shuts them down.** Being asked to abandon Calveno or treat her shop as a standing resource.
- **Will share.** Practical answers on mechanisms and what repair or copying would require.
- **Will not share.** Her workshop or research without terms.
- **If pressed.** She returns to the work and says, “The work stays here.”

## Depth

### History

Catarina works on mechanisms and Antheri salvage from her permanent Calveno workshop. She completed work for Delmar, Crissdalynn, and Zort before the party left. She also tried and failed to stop Solange's final ritual.

### Hidden truths

- Her completed work is with its recipients, and the source doesn't record unfinished commission.
- Her workshop's permanence is a boundary. No faction claims her.

### Threads

She is a practical contact in the Calveno aftermath of **Simone's Hunters**.

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
