---
type: Quest
summary: "Choose whether to protect Shepherd Grigori, hand him to Malone or let the Crown hunt continue."
sources:
 - "archive/grigori-and-the-crown-hunt.md"
 - "archive/ssw-shepherd-grigori-island.md"
 - "archive/collab-2026-10-04-calveno-and-rattkin-bounty.md"
 - "archive/collab-2026-10-04-authority-themes.md"
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
> Shepherd Grigori helped you, and now Aleksander Malone pursues him for the Dravosi Crown. Shield the healer or give him up, because if you walk away, the hunt goes on without you.

## Play

- **Leads.** Malone's public trail, Crown pronouncements, the recovery Calveno's servants whisper about and the recoveries like it still to surface, and the Party's direct knowledge of Grigori.
- **Opposition.** [[Aleksander Malone]], the [[Dravosi Crown]] and Grigori's hidden network.
- **Complications.** Protecting a helpful healer leaves blood-anchor infiltration active. Interference makes Malone trace the Party.
- **Payoff.** The Party gains Grigori's cooperation, Crown leverage, evidence or time to protect a targeted house.

## Depth

### Hidden truths

Grigori leads the Flock and leaves dormant blood-threads in powerful bodies while healing them, building an army for ascension. Malone acts on his own authority after confirmed heresy and has the port and ship class, but not yet the crew. The Party transported Grigori to Calveno; Malone suspects the Party of it, though he still lacks confirmation.

The Party heard his request to wound [[Corbin Knighton]] without killing him and agreed to contact Grigori should the opportunity arise. They do not know his purpose is to bind House Knighton, and they know him only as an oddly powerful healer whom the Crown calls a demon in public.

The Calveno cure is done, and the Tessarine heir recovered as his newest anchor, bound without the household's knowledge. The grateful family could become a contact one day, and word of the Party's part in the voyage has yet to reach them. The trail resumes when a healed noble surfaces in front of the Party or when Grigori reaches for them again.

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
