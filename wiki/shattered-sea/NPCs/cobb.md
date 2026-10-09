---
type: NPC
summary: "A young rattkin dockworker and Nona Black-Jaw's runner who keeps La
  Vasca's refit on schedule."
sources:
  - "archive/Cobb.md"
  - "archive/ssw-nona-black-jaw.md"
  - "archive/ssw-session-03.md"
  - "archive/ssw-cobb.md"
creature: ""
revealed: "Session 3"
title: "Cobb"
---

## At a glance

- **Role.** Dockworker and runner for Nona Black-Jaw.
- **Wants.** To finish the Uncertainty's work properly, with the paint hardened beforehand.
- **Voice.** A light, slightly scratchy tenor with a warm Italian accent. He is quick and proud when showing work, sparse otherwise.
- **Found at.** La Vasca in Le Paludi, Calven and Calveno. He carries messages to Perrin.

> [!narration] First look
> You find a stocky young rattkin halfway down the cradle ladder, grey-brown fur blackened at the wrists by pitch and paint. Caulking calluses map his palms, a dockworker's coat hangs loose at the shoulders, and a rag rests over one shoulder. Turpentine and hot pitch fill the air. “You wanted to see what a week bought?”

## Play

- **Opens them up.** A direct question about the work, or a chance to show a sound repair.
- **Shuts them down.** Pressure to rush the paint or hide a message from Nona.
- **Will share.** The state of the refit, the Basin's practical needs, and messages Nona has told him to carry.
- **Will not share.** Perrin's whereabouts beyond what he was directly instructed to say.
- **If pressed.** He checks the exits and tightens the rag on his shoulder. Then he insists that the ship will be ready when the work is ready.

## Depth

### History

Cobb runs the Basin dock operations for Nona's Warren account. He has known Perrin since childhood and is the bridge between the crew and the Black-Jaw family, whose Run anchors the [[passage|Passage]]. His pride is in doing dock work correctly, not in gaining status. He reported a ship of the [[tarahs|Tarahs]] in port to Nona, and his report made her call off the attacks her people were running.

He was at the open gate when the *Uncertainty* arrived, and Perrin shook his hand, said it was all sorted, and bolted.

### Hidden truths

- The live sending stone is deliberate. Nona would not have sent it as decoration. The Party can learn this when Cobb delivers her message.
- Cobb's loyalty is divided only when Nona's instructions appear to threaten Perrin's safety. The Party sees the strain in his careful answers.

### Threads

- [[perrin-and-nona|Perrin and Nona]], where Cobb carries Nona's messages and invites Perrin back to the Warren.

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
