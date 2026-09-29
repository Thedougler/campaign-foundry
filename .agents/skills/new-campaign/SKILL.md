---
name: new-campaign
description: Starts a new Campaign in an existing World through a friendly conversation about the DM's plans and Players, then builds its overview, PCs pulled from D&D Beyond, initial Threads from the World's Factions, and hot.md. Use when the DM wants to start, create or set up a Campaign or a new group of Players in a World.
---

# New Campaign

A Campaign is one group of Players moving through a World. It gets only what the first Session needs; Prep builds the rest.

## Steps

1. **Talk.** Gather the DM's details first, in a warm conversation of a few turns, offering ideas from the World's pages as you go. Cover:
   - which World, and the Campaign's name;
   - what the Campaign is about, and how it should feel;
   - where and when in the World it starts (a place and an in-world date);
   - how the Party comes together;
   - the Players, each with their D&D Beyond character link (the character set to public) and anything the DM knows of their backstory;
   - the Session length, when it differs from `DM Settings`.

   Each turn ends with at most two questions, each with options. Done when every point has an answer or the DM has left it to you. A World may hold one active Campaign (`CONTEXT.md`): if one exists, confirm with the DM that it has ended before starting another.
2. **Overview.** Create `<World>/Campaigns/<Campaign>/<Campaign>.md` from `wiki/templates/Campaign.md`: the pitch, the starting situation, and `session_length_hours` when it overrides `DM Settings`.
3. **PCs.** A page per PC in the Campaign's `PCs/` from `wiki/templates/PC.md`, with its `dndbeyond_url` and the story side from what the DM told you. Then `pnpm cf pull --campaign <Campaign>` fills each sheet (`pull-pcs` handles a private character).
4. **Threads.** Three to five Threads in `Threads/`, drawn from the World's Factions (their agendas become Threads now that a Campaign exists) and from the PCs' goals, each `status: active` with its next development.
5. **hot.md** in the Campaign folder, from `wiki/templates/hot.md`: the starting date and place, the active Threads, and what's next.
6. **Close.** Run `pnpm cf index` and `pnpm check` until it passes, then `pnpm cf log --world <World> --op create --title "New Campaign: <Campaign>"` with a `--page` per page.
7. **Report** to the DM: the pitch, the Party, the Threads, and that `plan-session` is ready when they are.

## Done

- The overview, every PC (with a pulled sheet, or the DM told which characters to make public), the Threads and `hot.md` exist.
- `pnpm check` passes, the index lists the Campaign, and the log records its creation.
