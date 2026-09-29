---
name: prep-session
description: Builds a Session's Prep from the settled intent: the Prep page with its Scene Chart, Threads, opposition and Clues, a filled page per Scene, missing images, the rewritten `hot.md`, and a Push. Use when the DM wants the next Session prepped, or right after `plan-session` settles the intent.
---

# Prep a Session

Prep turns the DM's settled intent into everything needed to run the Session from the Wiki alone. The Scene Chart paces the Session and never fixes outcomes: the World is decided on the page, and only the Party's choices and the dice stay open.

## Steps

1. **Intent.** Take the Session intent `plan-session` settled with the DM. Without one, run `plan-session` first.
2. **Ground.** Read `hot.md`, the last Session's Recap and final Scene, the active Threads and open Quests, and each PC's Sheet and Goals and bonds. The Session length is the Campaign's `session_length_hours`, else `DM Settings`. Done when you can state, as facts, where the Party stands and what each PC wants now.
3. **Size.** One Scene is about 30 minutes. The Hook, Climax and Resolution take about 90 together; the rest of the Session's minutes, divided by 30, is the ceiling on middle Scenes (a four-hour Session gives five). The count is a ceiling, not a quota.
4. **Opposition.** Name the opposition (its page), its goal this Session, how chasing that goal brings it into the Party's path, and what it does, step by step, if nobody interferes, with the sign the Party can see at each step.
5. **Chart** the Scenes in play order, one row each: number, kind, title, the situation (which reaches the Party on its own trigger: a clock, an arrival, the opposition's next step, the last Scene's result), card, Threads, Spotlight, and what it hands to. The three rules hold everywhere:
   - The Session starts with a **Hook**.
   - It ends on a **Climax**, then a **Resolution**.
   - In between, **Developments** and **Cliffhangers** alternate, never two of a kind in a row. An action Hook hands to a Development, a quiet one to a Cliffhanger.

   Fights rise across the night: the first contest is one the Party wins unless they blunder, and the opposition's best waits for the Climax.
6. **Threads and Clues.** Three to five Threads, each with the Scene where it's planted, where it's tested, and where it resolves or moves. About ten Clues, each a true, concrete fact the Players can find in more than one Scene; each conclusion the Session can't progress without gets three.
7. **Spotlights.** Each PC gets at least one Scene driven by their goal, bond or fear, and a Thread the Climax touches.
8. **Cast.** List every person, place, Creature and Item the chart needs, including the Session's treasure. Reuse from the Wiki first; make only what nothing fits, with its design skill. Done when every name on the chart has a page.
9. **File the Prep** to `wiki/templates/Prep.md` as `Sessions/Session <N>/Session <N> - Prep.md`, with its in-world `date`: the chart, Threads, Opposition and Clues, linking every Scene page to come.
10. **Fill the Scenes** in chart order, each with its kind's skill (`hook-scene`, `development-scene`, `cliffhanger-scene`, `climax-scene`, `resolution-scene`), each opening from the previous Scene's outcomes. When a Scene's outcomes change what a later row needs, update the row before filling it.
11. **Previously On.** Make sure the last Session's Previously On exists (Ingest writes it from the Transcript); without a Transcript, `theatre-of-the-mind` writes it from the Recap.
12. **Images.** `generate-image` makes each missing image the Session needs: a Battle Map for each Encounter, a portrait for each new NPC or Creature, art for each Handout.
13. **Audit the chart.** The three rules hold; every Thread is planted, tested and moved; every PC has a Spotlight; everything the Climax leans on was planted earlier; every Scene's outcomes hand to a Scene on the chart. Fix every miss.
14. **Close.** Rewrite `hot.md` to its template for the Session ahead. Run `pnpm check` over every page touched until it passes, then `pnpm cf log --world <World> --op prep --title "Session <N> Prep"` with a `--page` per page, then `pnpm cf index`. End with a Push (`push-session`).
15. **Report** to the DM: the chart in a few lines, the new pages, and anything the DM left open that Prep decided.
