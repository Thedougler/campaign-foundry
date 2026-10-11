# Expert-DM actual-play craft

This analysis covers two Critical Role actual-play episodes, read in full from their ASR transcripts on 2026-10-11 for [issue #51](https://github.com/Thedougler/campaign-foundry/issues/51). The first is Brennan Lee Mulligan's "To the Hounds!" (Campaign 4, Episode 9; [Notion Raw Source](https://www.notion.so/3f40216635ec819fb0f3ec0ecf146d41); 9000 lines; SHA-256 `7a1bb219b8f436bb78fddc0b9363fa24c2d32f05108be461aff0740a24b803df`). The second is Matt Mercer's "The Stowaway" (Campaign 2, Episode 45; [Notion Raw Source](https://www.notion.so/3f40216635ec81ecabb6c3d06abff757); 11140 lines; SHA-256 `a8635a19fd890638ad75a5636a4f6ff527680245d3d782ed2a88d63c71a8d924`). The read covered both transcripts line by line in 14 overlapping chunks, Player turns as well as GM turns, and left out sponsor reads, announcements and credits. [ADR 0029](../../adr/0029-exemplar-dms-set-the-narration-bar.md) studied the same episodes for sentence-level Narration. This file studies the whole table. Timestamps are `H` for Hounds and `S` for Stowaway. Quotes are verbatim ASR, at most 20 words, and every analysis line is our own.

## Limits

- **ASR errors.** Names drift throughout: Taconis appears as Tarkonas, Tachonis and Chikunas; Tybris Lea has a dozen spellings; Sid and Cid are one brother; Fjord becomes Ford. A real-world pizza delivery is merged into play at S 04:09. Quotes keep the ASR wording, and no finding rests on a single misheard word.
- **Diarisation.** `Brennan`, `Matt Mercer`, `Sam Regal`, `Liam Obrian`, `Marisha` and `Travis` are reliable labels. In Hounds, `Speaker 4` and `Speaker 6` resolve by content to the Players of Kattigan and Thimble, and `Azunay` to Wick's. In Stowaway the `Matt Mercer` label also carries many Player lines (Fjord, Jester, Caduceus) and nearly all of the guest Player's Twiggy, who is a guest PC, not an NPC. `Speaker 1` in both episodes merges several voices. Every attribution in the findings was settled by content (a ruling, a call for a roll, an NPC answering a named PC). Lines that content could not settle were left out.
- **Sample.** Two episodes by two DMs, both on a broadcast with a cast of professional performers. They show what these DMs did on these nights, not the range of either DM or of home play.
- **Observation, not proof.** These are techniques observed at the table. Their effect on the Players is inferred from the table's reactions, never measured.

## Episode shapes

**To the Hounds!** (H), about 3 h 45 min of play. Tension peaks at H 01:31 (fey ambush), H 03:44 (the patrol forces the egg) and H 04:12 (petrification).

| Play | Stretch |
| --- | --- |
| 00:00–13:51 | Cold open cross-cutting a guard purge at the Brethren Hall with Hal's theatre rehearsal; fake "another episode" button |
| 20:12–53:18 | Recap lands in the Slocke tavern; Hounds of the King; vengeance aftermath; eavesdropped cairn Clue; alliance |
| 52:32–01:09:20 | Bargain closes: horses, "edge of our duty", route choice, ceremonial farewell at sunset |
| 01:09:20–01:31:17 | Night ride on the hidden Miller's Road; road talk carries faction lore; shrine rest |
| 01:31:17–01:51:48 | Black Rabbit ambush turned by Persuasion into a head-swap oath; rumour that Thimble's house has fallen |
| 01:51:48–02:27:12 | Joke cuts to the Tybris Lea vista; acolyte, children and a dog-knight spy each give intel |
| 02:27:13–02:32:39 | Hounds' farewell lore; break on the title toast |
| 02:43:13–03:10:49 | Return: split party, souvenir-shop comedy against hospital recon; "the lady" contradiction |
| 03:10:17–03:45:00 | Regroup, theories, the Earl's conversion pageant, castle scout, patrol |
| 03:45:00–04:12:53 | Invisible infiltration, cellar, rat, secret door, bluff, basilisk; hard cut mid-save |

**The Stowaway** (S), about 4 h of play. Tension peaks at S 01:45 (green flash), S 02:29 (Fjord vanishes), S 04:22 (the Traveller's shield) and S 04:29 (the kill).

| Play | Stretch |
| --- | --- |
| 10:56–15:00 | Recap; the storm shrinks behind the ship; downtime offered |
| 15:00–23:10 | Nott's powder fumble shows a silhouette in the galley; cover lie; a squad goes below |
| 23:14–45:13 | Hold hunt; Twiggy revealed; clockwork sphere and dodecahedron vision; deck introductions |
| 44:33–01:14:43 | Interrogation: blocked Identify, laddered reveals, ship renamed, Suggestion |
| 01:14:18–01:45:21 | Downtime puzzle: staged sphere unlocks, a hole to elsewhere, Halas loot; green flash into the break |
| 01:46:42–02:32:25 | Banner trap, Speak with Dead, Tiny Hut experiments, corkscrew hall, Halas study; Fjord swallowed; mimic |
| 02:31:48–03:08:14 | Mimic fight, library, fingerprint, portal cascade; young blue dragon wakes |
| 03:07:46–04:31:25 | Fjord alone with the dragon, then the full fight: elemental, Polymorph, lit crystals, sphere exits, guest kill |
| 04:32:29–04:43:12 | Return to the ship: seven days lost, repair bill, Twiggy's farewell, comedown, tea on watch |

## Findings

### Campaign/Session narrative and pacing

- **Observed** H 00:00–13:51, 20:12–22:53. The episode opens on two fronts the Party is absent from (a purge, a rehearsal), then the recap ends in present tense inside an occupied tavern.
  **Interpretation** The opening states the wider stakes before any choice, and play starts mid-situation rather than at a door.
  **Prep vs live** Yes. Both locations, the purge speech and the recap are writable. The cut points are live.
- **Observed** H 02:32:34, S 01:43:26–01:45:21. Breaks fall on a change of state: the Hounds' bow and the title toast, and the puzzle's last stage firing ("Green light's never good.").
  **Interpretation** An act break sits on warmth or an irreversible turn, never mid-procedure.
  **Prep vs live** Partly. The hinge (the last stage teleports the room) is Prep. The break's timing is live.
- **Observed** H 03:42:41–03:44:56. After long plan-talk, a patrol's lantern rounds the corner; a Player answers "Make a choice, make a choice. Egg."
  **Interpretation** One timed outside stimulus ends workshopping and starts the attempt.
  **Prep vs live** Partly. A patrol schedule is Prep. Dropping it at peak indecision is live.
- **Observed** S 01:52:52–03:08:14. One location runs for over an hour through rising peaks (gas, fire ward, gravity, a vacuum, a mimic, a dragon).
  **Interpretation** Each solve opens a harder question, so the middle escalates without cutting away.
  **Prep vs live** Yes. The room order is Prep. Dwell time per room is live.
- **Observed** H 04:12:24–04:12:53 against S 04:38:23–04:43:12. Hounds cuts mid-save on petrification; Stowaway lets the win settle into a quiet watch.
  **Interpretation** The ending fits what the next Session needs: a pulled thread or a breath.
  **Prep vs live** Partly. Prep can name both endings. Which one fits is read on the night.

### Scene construction and transitions

- **Observed** H 03:18–09:50. Cuts between the Hall and the theatre hinge on matching props and themes (wagons, "long knives", a blade).
  **Interpretation** A shared image makes the cut feel motivated rather than administrative.
  **Prep vs live** Partly. The paired locations are Prep. Cut triggers ride the moment.
- **Observed** S 01:46:42–01:48:29. After the break: "You're no longer on the ship." Everyone but Yasha, a triangular room, banners, pillars, two corpses, no exits.
  **Interpretation** Re-entry restates the cliff as an inventory the Players can act on.
  **Prep vs live** Yes. The room, its contents and who is left behind are Prep.
- **Observed** H 02:43:13–02:44:55. Return paints the alley, "beeswax and fresh baked cookies", candles set for sundown and the stealth blessing wearing thin.
  **Interpretation** The establishing shot hands over the clock and the tool before planning starts.
  **Prep vs live** Yes.
- **Observed** H 02:54:11–02:59:07, S 04:08:13–04:10:03. A split party is braided: a comic gift-shop failure cuts to the serious hospital watch; late arrivals at the dragon get their own full battlefield read.
  **Interpretation** Each group gets its own scene and its own establishing shot, and tones alternate across the split.
  **Prep vs live** Partly. Each location's read is Prep. The cut order is live.

### Revelation and tension

- **Observed** S 46:10–46:53, 58:26–59:00, 01:05:32–01:06:16. The sphere blocks Identify ("This blocks you."), then Detect Magic rates it "comparable to the Dodecahedron", then History gives its pre-Calamity origin.
  **Interpretation** A Clue ladder whose rungs open to different actions, and a refused divination is itself a reveal.
  **Prep vs live** Yes. The rungs are Prep. Which action reaches which rung is live.
- **Observed** H 03:05:35–03:07:08. Overheard: a runner says he is bringing the lady; the priestess answers "No, she's at rest in the grove."
  **Interpretation** A contradiction between two NPCs is the Clue, and the Players build the conclusion.
  **Prep vs live** Yes.
- **Observed** H 36:55–39:52, 48:41–50:26. Eavesdropping on dwarves and Hounds yields an emptied cairn and two Houses' rival views of death.
  **Interpretation** Clues arrive as overheard work-talk with its own motive, not as a briefing.
  **Prep vs live** Yes.
- **Observed** S 03:42:35–03:43:24. A missed cold attack strikes a crystal and "this very faint trickle of energy is now hitting this far pillar".
  **Interpretation** A miss reveals the escape mechanism and adds a second win condition.
  **Prep vs live** Partly. Crystals keyed to damage are Prep. Which miss lights them is live.
- **Observed** H 04:09:32–04:12:08. The reveal climbs in three beats: a cage with blood and black fur, worked stone giving way to raw cavern, then the knight and basilisk.
  **Interpretation** Evidence, then a change of place, then the threat itself.
  **Prep vs live** Yes.

### Consequences of Player action and intent

- **Observed** S 15:25–18:54. Nott's third explosive arrowhead fails; the blast singes her and "you see like a shape move through the center of the galley".
  **Interpretation** A failed check delivers the Session's hook instead of only damage.
  **Prep vs live** Partly. The stowaway is Prep. Tying it to this fumble is live.
- **Observed** S 03:49:50–03:50:28. Beau escapes through the sphere, so her fire elemental breaks free: "For the next hour, the elemental is considered an enemy."
  **Interpretation** An exit costs the people still in the room.
  **Prep vs live** Partly. The rule is Prep. Its timing follows her choice.
- **Observed** S 04:32:29–04:35:17. Back aboard: seven days gone, repairs done unpaid, an angry dockmaster, 130 gold owed.
  **Interpretation** The delve's cost lands the moment they return, in time and in someone's mood.
  **Prep vs live** Yes.
- **Observed** H 22:35–26:19. The recap fixes the vengeance as done; a Player says "I don't feel much better, honestly."
  **Interpretation** Intent succeeded and relief did not, and the DM holds that space instead of fixing it.
  **Prep vs live** Partly.
- **Observed** H 01:41:29–01:45:29. Kindness makes the grigs swap thorn heads for blossom heads in front of the Party.
  **Interpretation** A moral choice becomes a visible change on bodies.
  **Prep vs live** Partly. The two heads are Prep. Who earns the swap is live.

### Agency and choice handovers

- **Observed** S 14:47–15:24, 01:14:23–01:15:49. "Anything you'd like to accomplish in this time?" Each PC's stated errand then gets its turn.
  **Interpretation** Downtime is a menu the Players fill, spotlit one intent at a time.
  **Prep vs live** Partly. Prep lists stations and hooks. Order is live.
- **Observed** H 01:02:55–01:04:45, S 03:16:18–03:16:55. Two-route choices with tags: the fast King's Highway or the Hounds' hidden ways; mid-fight, "focus on the dragon or explore your surroundings".
  **Interpretation** A named fork with clear trade-offs, offered without pressure.
  **Prep vs live** Yes.
- **Observed** H 02:44:56–02:53:20, 03:08:06–03:08:45. Eight minutes of Party planning with the DM silent until "Who has the egg?"; later a Player says "Let's find Teor and let him decide."
  **Interpretation** The DM enters to lock who goes where, never to pick the plan.
  **Prep vs live** Live-only. Prep supplies the destinations.
- **Observed** S 04:16:22–04:17:59. Before the roll: "it's an explosive arrow, and you're adjacent to the creature." The blast then hits ally and dragon alike.
  **Interpretation** Name the cost before the dice, then honour the choice in full.
  **Prep vs live** Live-only.

### NPC motives, dialogue and differentiated voices

- **Observed** H 01:01:23–01:02:50, 01:52:22–01:53:38. Hawkins answers in literal, faintly offended dog logic and exits on "Yes."; on the road he and Morgaine argue stolen turnips against an outlaw king.
  **Interpretation** A companion pair who disagree keep the theme alive between set pieces.
  **Prep vs live** Partly. Their stances are Prep. The riff is live.
- **Observed** H 10:17–12:56. Einfasen praises the Marshal's records, doubles her workload and needles her age: "Is it such an easy thing to double your efforts?"
  **Interpretation** Menace as polite administration: praise, reassignment, a personal probe.
  **Prep vs live** Yes.
- **Observed** H 02:57:18–02:58:41. A souvenir seller pitches honey and holy-water traps: "Keep the fair folk out of your lawn."
  **Interpretation** A culture's prejudice shown in an ordinary vendor's patter.
  **Prep vs live** Yes.
- **Observed** S 03:07:46–03:12:20. The young dragon is hungry, proprietary and archaic: "One day I'll be big enough to eat him." A high Persuasion buys lore but not safety.
  **Interpretation** A motive ladder in the NPC's own voice, and a good roll changes what they say, not what they want.
  **Prep vs live** Partly.
- **Observed** H 04:02:13–04:04:03, S 01:55:27–01:57:37. A cellar rat: "They vanish, but they don't rot." A questioned corpse: "The wailing creature."
  **Interpretation** Minor voices are short, concrete and information-dense by design.
  **Prep vs live** Yes. These are bench lines.

### Locations and sensory specificity

- **Observed** H 03:20:16–03:22:38, 03:33:13–03:33:54. White plaster, black banners, a 15-foot roof gap, six annoyed guards at the gate, "a door with a hound's head knocker on it".
  **Interpretation** The description is the option list: gatehouse, side door or roof.
  **Prep vs live** Yes.
- **Observed** H 04:00:13–04:01:45. The secret door shows as one stone "a little bit more polished" by years of fingertips.
  **Interpretation** A tell that belongs to the place's history, not a glowing rune.
  **Prep vs live** Yes.
- **Observed** S 23:14–25:36. The hold is hunted by ear: "creaking of wood and the very, very faint muffled sound of waves".
  **Interpretation** Sound and darkness make a familiar ship a hunting ground.
  **Prep vs live** Partly.
- **Observed** H 01:28:09–01:29:12, S 02:11:36–02:17:33. The fey road's sign is that "the stars have changed slightly"; the corkscrew hall keeps gravity steady while the floor turns.
  **Interpretation** One small wrongness sells an uncanny place better than a lecture.
  **Prep vs live** Yes.

### Action clarity

- **Observed** S 04:15:27–04:29:28. Turns end by name, a failed recharge is announced, blindsight is restated and hit points are spoken.
  **Interpretation** Shared state spoken aloud is the combat interface, so sacrifices are informed.
  **Prep vs live** Live-only. Prep supplies the statblock and the senses.
- **Observed** S 03:41:00–03:42:23. Breath weapon: both saves called by name, "You take 51 points of lightning damage.", then halved and evaded results in order.
  **Interpretation** Raw total first, then each mitigation, keeps a multi-target effect readable.
  **Prep vs live** Partly.
- **Observed** S 01:26:32–01:28:40. The Players test the hole: bearings fall silent, a rope comes back, a finger feels cool, it closes after a minute.
  **Interpretation** Small experiments get crisp, cumulative answers before anyone risks a body.
  **Prep vs live** Partly. The hole's rules are Prep.
- **Observed** H 03:22:40–03:23:09, 03:45:07–03:51:42. "Roll it straight and add 10." on a blessing's last check; the mystery egg resolves to "All of you have gained the invisible condition." with a 2d4 timer that runs out on the cellar stairs.
  **Interpretation** Expiring resources and mystery items resolve to a stated rule and a visible clock.
  **Prep vs live** Yes.

### Humour, emotional contrast and recurring details

- **Observed** H 01:55:47–01:59:02. A Player's cutaway sex gag; the DM hard-cuts to dawn over Tybris Lea, "breathtaking in its majesty".
  **Interpretation** A laugh clears the palate, so the next serious image lands clean.
  **Prep vs live** Partly. The vista is Prep. Cutting on the laugh is live.
- **Observed** S 04:22:02–04:23:50. The table screams as claws miss; a voice says "don't worry"; an unseen hand raises Jester's shield and the dragon's teeth shatter.
  **Interpretation** A pivot from panic-laughter to awe within one attack.
  **Prep vs live** Partly. The god's hidden favour is Prep.
- **Observed** H 02:11:06–02:20:22. Comic children deliver the best Clue ("Why is the carriage so heavy?"); a joke that a fifth of the town is dogs explains how the Hounds spy.
  **Interpretation** The joke carries information, so nobody pays for the laugh in lost time.
  **Prep vs live** Partly. The Clue and the dogs are Prep. The children's voices are live.
- **Observed** S 01:00:25–01:01:33, 02:08:02–02:10:39. Beau distrusts the cute stowaway ("Anything that cute? That saccharine?"); Nott whispers "Are we being replaced?"
  **Interpretation** Comedy carries status anxiety and keeps a sceptic at the table.
  **Prep vs live** Live-only. Prep can give the newcomer skills that overlap a PC's.
- **Observed** S 01:34:09–01:36:47, 02:23:30–02:25:20, 04:30:23–04:31:06. Halas's symbol on a cloak, then his red robe in a portrait, then Twiggy disguised as a four-and-a-half-foot Halas for the killing shot.
  **Interpretation** A detail planted early and seen three times pays off at the climax as both joke and pathos.
  **Prep vs live** Partly. The plant is Prep. The payoff is the Players'.

### Improvisation and responsiveness

- **Observed** S 47:04–47:23. A Player names the sphere "Do not solve happy fun ball." The table keeps the name all night.
  **Interpretation** A Player's name for a thing beats the DM's.
  **Prep vs live** Live-only. Prep can leave room for it.
- **Observed** S 02:42:15–02:43:35, 03:46:47–03:48:33. Sneak Attack from inside the mimic, allowed "Because it's fun."; a cold-armoured headbutt lights the crystal.
  **Interpretation** Once the fiction supports a strange plan, the ruling says yes and prices it.
  **Prep vs live** Live-only.
- **Observed** S 01:17:55–01:19:14. A Player remembers the dead captain's firearms; a search yields "22 shots".
  **Interpretation** A Player's recall of an earlier detail is paid at once.
  **Prep vs live** Partly.
- **Observed** H 03:28:22–03:31:14, 02:25:14–02:26:20. Each disguise idea gets one question ("Which guard? The guards of the Earl or the guards of House Taconis?"); a logistics worry is answered by a planted bridge accident.
  **Interpretation** Responsiveness draws on Prep already laid, one clarifying question at a time.
  **Prep vs live** Partly.

### Resolution and continuity

- **Observed** H 01:07:33–01:09:20. A formal leave-taking from Slocke: "you will always have a warm fire… here in Sloc".
  **Interpretation** A ceremony closes the arc and turns the place into a safe haven.
  **Prep vs live** Yes.
- **Observed** S 04:36:32–04:43:12. Twiggy leaves with a warning about her captor ("I've spent my whole life in a box."); each PC comes down differently; Beau and Fjord share tea on watch, "a fraction away from going terribly wrong."
  **Interpretation** The resolution shows who changed and how each person carries the win.
  **Prep vs live** Partly. The exit and the watch are Prep. The dialogue is the Players'.
- **Observed** H 04:12:55–04:14:41. After the cut the DM names the unfinished business and holds back a weapon roll: "when we come back, we'll roll initiative."
  **Interpretation** The close states what next Session opens on.
  **Prep vs live** Partly.
- **Observed** S 55:01–55:32. The Players weigh Twiggy against Kiri, an earlier companion they took on.
  **Interpretation** Continuity works as an argument the Players make, from people they remember.
  **Prep vs live** Partly. The earlier companion is Canon. Invoking her is the Players'.

## What Prep cannot carry

Some of what makes these tables work happens only in the room: reading the mood after a win (H 01:09:20), timing a cut on a laugh (H 01:55:47), steering a Player off a joke disguise that would sink the mission ("I don't think you want that.", H 03:11:18), yes-anding a strange plan (S 02:42:15), praising a Player's spell description (S 03:50:54), staying silent through a long plan (H 02:44:56), and picking the moment to call a break.

Written Prep gives the DM the material those moments draw on, and never schedules them:

- **Handles**: a patrol schedule, two routes with tags, a companion pair with opposed stances, an object left nameless for the Players to name, a newcomer whose skills overlap a PC's.
- **Bench lines**: the rat's report, the vendor's patter, the farewell promise, the antagonist's polite probe.
- **Cues** on triggers: what a blocked divination shows, what a timer's end looks like, what a high roll on the polished stone finds.
- **Plants**: a recurring detail placed early with more than one possible payoff, and a Clue ladder whose rungs answer different actions.

## Owner map

Each dimension's rule lives once in the owner file named first; the files after it point there or carry a narrower part. Every file reviewed for this analysis appears in the second table.

| Dimension | Owner file(s) | Edited or agrees | Reason |
| --- | --- | --- | --- |
| Session/arc pacing | `prep-session/SKILL.md` step 4; `story-arc/SKILL.md` Pacing; `scene-pages.md` § Scripting the Game | Edited; agrees; agrees | Step 4 gains a break hinge on a change of state, a planning handle (one outside stimulus), rising peaks in one place and an ending chosen by what the next Session needs. The arc-level swing and the alternation already held |
| Scene construction and transitions | `scene-pages.md` § Narration; `theatre-of-the-mind/references/recipes.md` § Transition | Edited; edited | A split Party gets one first-look callout per place; a cut hinges on a shared image and each group gets its own destination Cue |
| Revelation and tension | `narrative-devices.md` § Clue ladders; `development-scene/SKILL.md`; `recipes.md` § Revelation | Edited; edited; agrees | Ladder rungs keyed to different actions, and a refused divination is a rung. Contradicting or overheard witnesses carry motive. Evidence, place, threat already held |
| Consequences | `scene-pages.md` § Outcomes and Page format; `resolution-scene/SKILL.md` | Edited; agrees | A failed check can expose what the Scene hides; World changes show on something visible; a departure states its cost to those who stay. Payoffs already keep the cost |
| Agency handovers | `theatre-of-the-mind/SKILL.md` Hard line 3; `plan-session/SKILL.md` Riffing; `prep-session/references/journey.md` | Edited; edited (pointer); edited | The either/or shows each side's cost; plan-session offers forks with trade-offs and points at Hard line 3; an unchosen journey departs on a named, tagged route fork |
| NPC motive, dialogue, voice | `npc-design/references/craft.md` § Voice; `simulate-npcs/SKILL.md` | Edited; agrees | Culture in ordinary voices, short information-dense minor voices, menace as polite procedure, a good roll changes words not wants, companion pairs with opposed stances. simulate-npcs already points at craft.md |
| Locations and sensory specificity | `location-design/references/authoring.md`; `flesh-out/references/registers.md` | Edited; agrees | The visible ways in are the option list; one consistent small wrongness for an uncanny place via registers, which already held it |
| Action clarity | `cliffhanger-scene/SKILL.md` Rulings; `recipes.md` § Cues | Edited; edited | Timed effects state their clock and end Cue; cheap tests get stated answers; keyed features turn strays into routes; multi-target effects show one image with totals on the DM line |
| Humour, emotional contrast, recurring details | `narrative-devices.md` § Contrast and § Callbacks; `scene-pages.md` Cold read; `theatre-of-the-mind/SKILL.md` Delivery | Edited; edited (pointer); edited (pointer) | New Contrast section: humour with information, the tonal pivot both ways, banter as status-testing, one beat per Scene as DM-side material. Callbacks: one planted detail per Scene, recorded in the Prep row's note |
| Improvisation and responsiveness | `prep-session/SKILL.md` lede; `scene-pages.md` Handles and Cold read | Edited; agrees | Prep supplies handles, bench lines, Cues and plants for moments only the room can time, and never schedules them. Handles already held |
| Resolution and continuity | `resolution-scene/SKILL.md`; `theatre-of-the-mind/references/previously-on.md` | Agrees; agrees | Visible cost, ceremony as action and the stopped-moment close already held |

| File | Edited or agrees | Reason |
| --- | --- | --- |
| `docs/agents/narrative-devices.md` | Edited | Contrast section, one-planted-detail Callbacks, keyed Clue-ladder rungs |
| `docs/agents/scene-pages.md` | Edited | Split-party callouts, visible Outcomes, departure cost, Cold read pointer |
| `hook-scene/SKILL.md` | Agrees | Already opens mid-situation with priced Handles |
| `development-scene/SKILL.md` | Edited | Route restatement became a pointer; contradicting and overheard witnesses |
| `cliffhanger-scene/SKILL.md` | Edited | Timed effects, keyed features, cheap tests |
| `climax-scene/SKILL.md` | Agrees | Usable features and evidence-led exposure already held |
| `resolution-scene/SKILL.md` | Agrees | Visible cost and departure as action already held |
| `wiki/templates/prep.md`, `scene-hook.md`, `scene-development.md`, `scene-cliffhanger.md`, `scene-climax.md`, `scene-resolution.md` | Agree | New material fits existing sections; no `%%` change needed |
| `theatre-of-the-mind/SKILL.md` | Edited | Hard line 3 cost in view; Contrast pointer. Exemplar and Slots unchanged |
| `theatre-of-the-mind/references/recipes.md` | Edited | Transition hinge, cost-before-roll gambit, test and timer Cue, multi-target combat Cue |
| `theatre-of-the-mind/references/critique.md` | Edited | Two restated items now point at their owners |
| `theatre-of-the-mind/references/previously-on.md` | Agrees | Stopped-moment close and every PC's moment already held |
| `npc-design/references/craft.md` | Edited | Voice additions above |
| `location-design/references/authoring.md` | Edited | Option-list ways in; wrongness pointer |
| `flesh-out/references/registers.md` | Agrees | Precise wrongness and consistent local logic already held |
| `wiki/templates/npc.md`, `location-site.md`, `location-settlement.md`, `location-region.md` | Agree | Voice and arrival guidance already present; rules live in the references |
| `story-arc/SKILL.md` | Agrees | Arc swing already held; findings are Session-level |
| `plan-session/SKILL.md` | Edited | Forks with trade-offs; pacing riff points at Scripting the Game |
| `prep-session/SKILL.md` | Edited | Lede on live moments; step 4 planning notes |
| `prep-session/references/journey.md` | Edited | Named, tagged route fork at departure |
| `simulate-npcs/SKILL.md` | Agrees | Already points at craft.md § Voice |
| `docs/creative-process.md` | Edited | Fiction craft line cites ADR 0033 and this file |
