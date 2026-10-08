---
type: NPC
summary: "Lean shipwright aboard Uncertainty who catalogues hull damage unasked and judges people by what they ask about the ship."
sources:
 - "archive/ssw-sem-holst.md"
 - "archive/ssw-session-02.md"
 - "archive/ssw-session-03.md"
 - "archive/agentic-co-dm-sem-holst-narration.md"
 - "archive/session-10.md"
creature: "[[Commoner]]"
---

![[Sem Holst - Portrait.webp]]

## At a glance

- **Role.** Ship's carpenter aboard [[Uncertainty]], four gold a week, his craft shaped by years aboard. The Surety's carpenter's mate under [[Barnaby Rook]] before the capture; since the Calveno refit, [[Geoffrey Draves]] works under him.
- **Wants.** The hull kept in proper timber, and a crew that cares for her planking.
- **Voice.** Assessments, not small talk. What is wrong, how long to fix it, and neither number softened.
- **Found at.** Aboard [[Uncertainty]], wherever the hull is, fingers tracing timber.

> [!narration] First look
> A man works along the hull below you, sawdust in his dark hair, a lean frame in a canvas work vest, a patched shirt stained with pitch and salt. Deep lines cross his weathered face, and ink marks the fingers that hold his small book. One hand tests each joint as he goes, the other gliding along the timber. He chalks the joint where two planks meet and writes a figure beside it in the book, moving on without looking up. The chalk stops, and he taps the planking twice. "Can you say why this joint holds?"

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

In the night ambush on the crossing to [[Aruhe]] he served one of the broadside's seven guns, and the pursuer left burning and unable to chase.

### Hidden truths

- The forward keel joint has a fatigued timber under fresh caulk. Tell: his fingers return to the forward keel, and his book gains careful entries nobody requested. Ask him about the ship and he answers exactly; read his notes; or put eyes on the joint, where fresh caulk lies over timber that has done its work.
- He judges every conversation as a survey of the crew. Tell: he meets a question about the ship with one of his own. A miss costs standing with him, and his best work goes to hulls whose crews ask.

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
