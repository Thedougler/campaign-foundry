# Campaigns run on hero's journeys

Amends [ADR 0027](0027-story-so-far-page.md).

The `story-arc` skill retold the Campaign and pitched what comes next, but no page followed a PC's own story across the Campaign, and nothing decided which PC a Session turned towards. The DM wants the Campaign's story across dozens of Sessions built on hero's journeys, one for the Party and one per PC. Each interlocks with the main plot, and the spotlight passes from Session to Session. Prescribing a stage would turn the structure into a railroad, so the stages have to be read from play rather than planned for it.

Decision:

- **Vogler's twelve stages.** Each hero's journey (`CONTEXT.md` **Hero's journey**) runs on Christopher Vogler's twelve stages, the list the DM's Second Brain page "Hero's Journey (Monomyth narrative structure)" holds.
- **Party and PCs.** The Party's hero's journey is recorded in `story-so-far.md` § Arc position. Each PC's is recorded on one journey Thread, `Threads/journey-of-<pc-slug>.md`, linked from the PC page's `## Plans`. Guest characters don't have one. Each spans the whole Campaign.
- **Observed, never prescribed.** `story-arc` alone records a stage, after a Session, from what its Recap and Session Ledger show the PC did, citing the Sessions. Stages may come out of order, repeat, be skipped or reverse. Forward lines are possibilities for the next Session, and none says what a Player will do.
- **One Lead PC per Session.** Each Session builds its strongest possibilities around one Lead PC (`CONTEXT.md` **Lead PC**), chosen by readiness from observed play, and no PC leads again until every PC has led.
- **Generic rules.** The shared rules contain no Campaign's own flavour. What a Campaign's situations test comes from its own `campaign-config.md` Themes.
- **Story-so-far gains two lines.** ADR 0027's page adds a **Hero's journey.** bullet under Arc position and the Lead PC of each Session, with the next one, in Pacing.

Consequences: `.agents/skills/story-arc/references/heros-journeys.md` holds the stages, the possibilities rule and the Lead PC rotation, and `story-arc` step 3 writes each PC's journey Thread. The Thread template gains an optional `## Hero's journey` section. The Prep template gains the `### Spotlights` section `prep-session` already filled, opening on the Lead PC. The PC template's `## Plans` gains a link to the PC's journey Thread, which gives that Thread the inbound link the orphans layer requires. `plan-session` builds the Session's strongest situations around the Lead PC, `prep-session` places that PC's possibilities in Scenes with several exits, and `new-campaign` starts every PC at Ordinary World. Pacing now says upswings and downswings, since **Beat** (`docs/creative-process.md` § Terms) belongs to a Story's outline.
