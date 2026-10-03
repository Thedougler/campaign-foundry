---
type: NPC
summary: "Nona Black-Jaw's tortle enforcer and trusted fixer, sent hunting for Perrin and recalled when the attacks stopped."
sources:
 - "archive/ssw-nona-black-jaw.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Enforcer and trusted fixer for [[Nona Black-Jaw]].
- **Wants.** To be standing where Nona's next problem arrives, before it arrives.
- **Voice.** No meeting on record.
- **Found at.** Nona's errands across [[Calven and Calveno|Calveno]], lately recalled from the search for her grandson.

> [!narration] First look
> A tortle stands where Nona's business is about to happen. Before his shell registers, your side of the story has reached him already. Enforcers come in two kinds, and Anzolo is the kind Nona sends when the job needs thinking. "She wants to see you. Walk."

## Play

- **Opens them up.** No meeting has happened. The Party has not yet put a question to him.
- **Shuts them down.** Also unrecorded.
- **Will share.** Whatever carries Nona's authority with it.
- **Will not share.** Unknown.
- **If pressed.** Unknown.

## Depth

### History

[[Nona Black-Jaw]] sent [[Anzolo]] to find [[Perrin Black-Jaw]] while her attacks on the Crown ran. Perrin reached her kitchen first, the attacks were called off, and Anzolo was recalled. He is the fixer she trusts with the jobs nobody else hears about.

### Threads

Anzolo sits at the edge of [[Perrin and Nona]] as the fixer recalled the day her grandson came home.

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
