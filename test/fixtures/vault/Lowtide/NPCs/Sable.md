---
type: NPC
summary: "The drowned bell-ringer of Vessen, who rings the chapel bell and wants the gate opened again."
sources: []
creature: "[[Mire Drowner]]"
---

## At a glance

- **Role.** The last bell-ringer of Vessen, the source of the bell heard under the water, and keeper of the ledger until the Party took it.
- **Wants.** Someone to answer the bell and say the truth of the flood aloud to the living.
- **Voice.** Slow, cracked and patient. She speaks in short lines with long pauses, and never says the word "drown".
- **Found at.** [[The Drowned Chapel]], in the bell loft.

> [!narration] First look
> She stands by the bell rope in a rag of blue wool, with her head tilted as if listening. Her skin is the grey of wet slate and her hair moves slowly, as if underwater. She smells of cold iron and river silt. Her lips move before any sound comes. "You came up the stair," she says. "No one comes up the stair."

## Play

- **Opens them up.** Ringing the bell, speaking the names of Vessen's dead, and telling the truth.
- **Shuts them down.** Lies, weapons drawn, and anyone from the Reedrunners.
- **Will share.** What happened in the tower on the night of the flood and where the ledger lies.
- **Will not share.** Her own name, until the Party has rung the bell.
- **If pressed.** She lets go of the rope and attacks with Drowning Grasp. The Party must escape her grip or reach dry ground.

## Depth

### History

The harbormaster of Vessen hid his ledger in the bell loft on 3 Blackwater 271 CY and told Sable to keep it safe. On the night of 6 Blackwater she rang the bell to warn the city. The water rose past the door before anyone could open it, and she has kept the bell since.

### Hidden truths

- Sable is not hostile. Her attack is a reflex when someone threatens the bell. The Party can learn this by speaking to her first and by watching her release the rope when they say the names of the drowned.
- She can tell who among the living is descended from the Compact clerks. She has said nothing about [[Hobb Tarrow]] so far.

### Threads

- She is at the center of [[The Silent Bell]].
- She meets the Party in [[Session 2 - Low Water at the Chapel]].

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
