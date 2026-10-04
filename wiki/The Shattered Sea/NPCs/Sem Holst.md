---
type: NPC
summary: "Lean shipwright aboard Uncertainty who catalogues hull damage unasked and judges people by what they ask about the ship."
sources:
 - "archive/ssw-sem-holst.md"
 - "archive/ssw-session-02.md"
 - "archive/ssw-session-03.md"
creature: "[[Commoner]]"
---

![[Sem Holst - Portrait.webp]]

## At a glance

- **Role.** Ship's carpenter aboard [[Uncertainty]], four gold a week. The Surety's carpenter's mate under [[Barnaby Rook]] before the capture; since the Calveno refit, [[Geoffrey Draves]] works under him.
- **Wants.** The hull kept in proper timber, and a crew that cares what holds her together.
- **Voice.** Assessments, not small talk. What is wrong, how long to fix it, and neither number softened.
- **Found at.** Aboard [[Uncertainty]], wherever the hull is, fingers tracing timber.

> [!narration] First look
> Sawdust darkens the hair of the man working along the hull below, and his fingers never leave the timber as he goes. He chalks the joint where two planks meet and writes a figure beside it in a small book before moving on without looking up. The chalk stops, and he taps the planking twice. "Do you know why this joint holds?"

## Play

- **Opens them up.** A question about the hull that is not about speed or cargo, or proof the asker can tell caulked work from packed oakum. Carpenter's tools or a sailor's background count as evidence, which matters more to him than expertise.
- **Shuts them down.** Talk of the ship as speed and cargo. *"Few privateers bother learning that."*
- **Will share.** The ship's condition in structural terms with time estimates, and every repair he has made that nobody asked for. *"The hull doesn't lie about what matters."*
- **Will not share.** His notes, unasked. He documents what he finds and waits for someone to ask about the ship.
- **If pressed.** He repeats the assessment, and the numbers do not soften.

## Depth

### History

He was the HCS Surety's carpenter's mate under Barnaby Rook and was named to the prize crew when the crew took the cutter. On the five-day crossing to Calveno he worked the hull alongside [[Jean-Claude Tabarnack]], quietly fixing what the Mending spell missed. After the Calveno refit he held the carpenter's post and the reporting line flipped, with Geoffrey working under him.

On the first morning of the Calveno refit he was at the dry dock before anyone sent him. He found a fatigued timber in the forward keel joint, hidden under fresh caulk the repaint had covered without addressing, and wrote it up in his own notes. Fixable before departure, but it wants hardwood stock and a day in the cradle. He has not mentioned it to the Party.

### Hidden truths

- The forward keel joint carries a fatigued timber under fresh caulk. Tell: his fingers return to the forward keel, and his book gains careful entries nobody requested. Three routes: ask him about the ship and he answers exactly; read his notes; or put eyes on the joint, where the caulk sits over timber that has done its work.
- He judges every conversation as a survey of the crew. Tell: he answers questions about the ship with questions back. A miss costs standing with him, and his best work goes to hulls whose crews ask.

### Threads

He sits in the keeping of [[Uncertainty]]: the keel fault is his to report and the Party's to order repaired.

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
