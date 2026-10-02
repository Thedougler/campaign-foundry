---
type: Quest
summary: "Choose whether to protect Shepherd Grigori, hand him to Malone or let the Crown hunt continue."
sources:
 - "archive/grigori-and-the-crown-hunt.md"
status: active
---

## At a glance

- **Offered by.** No quest giver is established.
- **Reward.** Protection, leverage or information from choosing Grigori's fate.
- **Deadline.** Before [[Aleksander Malone]] reaches [[Shepherd Grigori]].
- **Done when.** The Party chooses and acts to protect Grigori, hand him over or withdraw.
- **Failed when.** Malone reaches Grigori before the Party chooses.
- **Advances.** Khlysty / the Flock and [[The Hound of God]].

> [!narration] The offer
> Shepherd Grigori helped you, but Aleksander Malone is hunting him for the Dravosi Crown. The Party can protect the healer or hand him over. Otherwise, the pursuit continues without them.

## Play

- **Leads.** Malone's public trail, Crown pronouncements, repeated miraculous recoveries and the Party's direct knowledge of Grigori.
- **Opposition.** [[Aleksander Malone]], the [[Dravosi Crown]] and Grigori's hidden network.
- **Complications.** Protecting a helpful healer leaves blood-anchor infiltration active. Interference makes Malone trace the Party.
- **Payoff.** The Party gains Grigori's cooperation, Crown leverage, evidence or time to protect a targeted house.

## Depth

### Hidden truths

Grigori leads the Flock and leaves dormant blood-threads in powerful bodies while healing them, building an army for ascension. Malone acts on his own authority after confirmed heresy and has the port and ship class, but not yet the crew. The Party transported Grigori to Calveno, a fact Malone does not know.

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
