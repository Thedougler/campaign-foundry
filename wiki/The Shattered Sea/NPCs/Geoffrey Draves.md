---
type: NPC
summary: "Former Crown seaman turned Saltwright carpenter, working to earn Verity Hollowell's hand."
sources:
  - "archive/geoffrey-draves.md"
creature: "[[Geoffrey Draves]]"
---

## At a glance

- **Role.** Saltwright carpenter and former HCS Surety seaman.
- **Wants.** The means to marry Verity Hollowell and build a life beyond Crown service.
- **Voice.** Controlled and quietly watchful. His honest repair advice is his trust.
- **Found at.** The Saltwright, working above deck on hulls and repairs.

> [!narration] First look
> A lean nineteen-year-old sailor fidgets with rope work he does not need to do. His neutral face reveals little, until he reads a damaged plank and says exactly what will fail.

## Play

- **Opens them up.** Honest questions about hulls, repairs, or the dancing he tries to hide.
- **Shuts them down.** Crown threats, public shame, or treating him as a turncoat.
- **Will share.** Ship condition, practical repairs, and the unfair wages Rook paid him.
- **Will not share.** How much he still risks for Verity, or the strange Draves family record.
- **If pressed.** He works harder and says less. A dangerous repair still gets done.

## Depth

### History

His father pushed him toward the water and Crown connections secured a carpenter's post aboard the HCS Surety. When Barnaby Rook threatened him for dropping his sword, Delmar Fisk offered protection. Geoffrey became the crew's first recruit. He now works under Sem Holst on the Saltwright.

### Hidden truths

- Geoffrey danced with Verity Hollowell on shore leave and has spent a year trying to earn the means to win her back. Her father Cedric demanded a man able to support a family.
- His father Aldous Draves has Crown archive access, and an anomalously deep Draves record interests the Crown genealogist Aldric Drave. Geoffrey knows nothing of it.

### Threads

He is tied to **The Crown Inspection** through his bloodline and to the crew's continuing life aboard the Saltwright.

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
