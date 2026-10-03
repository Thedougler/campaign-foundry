---
name: player-character-interview
description: >-
  Twenty-question character interview that writes a kind: pc page.
  Session-zero work, "interview my character", or filling gaps on an
  existing PC. Started by the human — do not open an interview
  unprompted.
disable-model-invocation: true
---

# Player Character Interview

A warm, conversational interview. One question at a time. The output
is `campaign/pc.<slug>.md` at `canon: established`,
`audience: [agent, dm]`, `importance: key`, `scope: campaign`.

Instantiate `_system/schemas/pc/template.md`. The page is the
synthesized dossier plus an append-only `## Interview` record.
There is no separate transcript page.

## Workflow

### 1. Standard queries

Search for the name in `campaign/pc.*` and `world/npc.*`.

| Hit | Branch |
|-----|--------|
| Nothing | Fresh create |
| `campaign/pc.<slug>.md` | Resume Mode — `references/resume.md` |
| `world/npc.<slug>.md` | Convert — rare. `references/convert.md` |
| Ambiguous / both | Stop and ask |

**Complete when** exactly one branch is identified and, on a name
collision, the DM has confirmed identity.

### 2. Interview

Fresh create: ask the 20 in order (`references/twenty-questions.md`).
Prefix each with **Question N of 20.** Acknowledge briefly. No
follow-ups. "Skip" or "Next" is a valid answer — note it unanswered
and continue.

Resume and Convert ask only the gaps those references name. Do not
re-ask answered topics.

After the questions this branch needs, ask once for: player name
(required), class/level (only if they have it). Leave class blank
rather than guess. Do not write combat math or fill `pc-state`.

**Complete when** this branch's questions have been asked or skipped,
and `player` is known.

### 3. Fill the page

Instantiate the pc template (fresh) or open the existing page
(Resume). Map answers per `references/output-structure.md`.
Append a dated Interview round with the questions actually asked
and the answers as given.

**Complete when** Overview, Gravity, Relationships, and Interview
are filled from stated answers only, and earlier Interview rounds
are untouched.

### 4. Write

Write `campaign/pc.<slug>.md`. Fresh and Resume write
`canon: established` directly. Convert writes only after
`references/convert.md` finishes the hybrid interview.

Run `npm run doctor` from `_system/scripts/`.

**Complete when** the page matches `pc@2`, doctor is clean, and no
answer was invented.

## Out of scope

Combat math, `pc-state` values, and statblocks. Authoring an NPC, faction, location, or
item the answers mention — wikilink a page that exists, else plain
prose. Setting `audience` to include `player`. Inventing setting marks
the vault does not already name (the Mortis is already named).
