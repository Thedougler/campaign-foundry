# Output structure

Map answers onto `_system/schemas/pc/template.md`. Headings stay in
template order. The 20 become synthesized prose, not a Q&A dump —
the verbatim record is `## Interview`.

**`## Overview`** — third person, present tense.

- Name, aliases (Q1). Sensory first impression (Q2).
- Class if they stated why/what (Q3) — also `class_levels` in
  frontmatter when they gave a level.
- Bound flaw/gift, *visible* half only (Q4). Whether they know is
  Arc Notes if the player wants it hidden; Overview if not. Ask.
- What they carry (Q12) — wikilink `[[item.slug]]` if that page
  exists, else plain prose.

**`## Gravity`** — the retrieval surface.

- **Want:** Q5, Q6, Q18 (the want they might compromise for).
- **Fear:** Q7.
- **Obligation:** Q14, Q16.
- **Line:** Q8, Q9, Q17.

**`## Relationships`**

- Q14, Q15, Q16, and any named person, faction, or other PC.
- Wikilink existing pages. Do not author those pages here.

**`## Interview`**

- Dated round. Question text as spoken. Answers verbatim.
- Resume and Convert *append* a new round.

**`## Backstory`** (optional) — Q10, Q11, and table-visible Q13.

**`## Arc Notes`** (optional) — hidden-from-table halves of Q4, Q13,
Q15, Q18, Q19. Open threads. No invented resolutions.

**`## Voice`** (optional) — tells from Q2 and how they treat people
(Q17) if that's performable.

**`## Continuity`** — leave empty on a fresh interview. Play writes
this later, pointing at session-reports and events.

`player` in frontmatter is required. `class_levels` only if stated.
Leave the `pc-state` fence empty. Mechanical build state is
`player-character-mechanics`, not this interview.
