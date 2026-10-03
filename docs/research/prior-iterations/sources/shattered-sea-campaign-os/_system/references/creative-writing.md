# Creative Writing Reference

Shared creative doctrine for all content skills. Load alongside the target schema when writing or reviewing content.

## Content Quality Doctrine

**Useful specificity beats ornamental detail.**

Detail earns its place when it enables at least one of:

- **Perception** — something the DM can describe at the table
- **Choice** — players can act on it
- **Characterization** — distinguishes this from the generic version
- **Mechanics** — interacts with a rule, stat, or ability
- **Consequence** — something changes if players engage or ignore it
- **Improvisation** — the DM can riff on it when players go off-script
- **Interaction** — NPCs, factions, or environments can respond to it
- **Memory** — players will remember this detail between sessions

If a sentence doesn't serve at least one, cut it.

### Evaluation Questions

Ask these when reviewing any content page:

1. **Can the DM use this at the table right now?** If it requires further invention to be usable, it's incomplete.
2. **Can players interact with it?** Flavor that offers no handles is wallpaper.
3. **Can something change?** Static descriptions are set dressing. Good content has moving parts.
4. **Does it distinguish from the generic equivalent?** "A tavern with a gruff barkeep" is a template, not content.
5. **Does a mechanic reinforce the fiction?** When a rule exists for this situation, the content should acknowledge it. When fiction implies a mechanic, note it.

## Creative Authority Ladder

How much creative freedom agents have, by situation:

```
Human-authored idea         → preserve exactly
Established implication     → develop (elaborate, extend, connect)
Missing connective tissue   → invent freely
Reversible texture          → invent aggressively
Consequential new canon     → propose, flag for review
Campaign-defining change    → human decision only
```

Default creative mode: **additive**. Patch existing files; never regenerate human prose wholesale. Human prose is expensive — preserve it.

## Epistemic Distinction

**"NPC believes X" is canonical. X itself may be false.**

This is the most common source of LLM drift. An agent summarizing a page must preserve the frame:

| Write this | Not this |
|---|---|
| Captain Veyra believes the Tide Court controls the northern passages | The Tide Court controls the northern passages |
| Local legend holds that the lighthouse was built by giants | The lighthouse was built by giants |
| The faction claims jurisdiction over the docks | The faction has jurisdiction over the docks |

When an NPC's belief contradicts established canon, that's a feature — it reveals character, unreliable narration, or incomplete information. Never "fix" it by collapsing belief into fact.

## DM Visual Language

Use Obsidian callouts consistently in DM-facing prose. Every callout type has a specific purpose:

### Core Callouts

| Callout | Purpose | When to use |
|---|---|---|
| `> [!narration]` | Player-facing description | Text the DM reads or adapts aloud at the table |
| `> [!danger]` | Immediate consequences | What happens if violence starts, a trap triggers, or a situation escalates |
| `> [!secret]-` | Hidden truth | What is actually happening — collapsed by default, DM eyes only |
| `> [!tip]` | Running guidance | Voice notes, mannerisms, tells, tactical priorities, pacing advice |

### Extended Callouts

| Callout | Purpose | When to use |
|---|---|---|
| `> [!lore]` | In-world knowledge | History, mythology, cultural context players could learn through investigation |
| `> [!mechanic]` | Rules interaction | DC checks, skill interactions, mechanical consequences of narrative choices |
| `> [!hook]` | Adventure seed | A thread players can pull — points toward future content |
| `> [!warning]` | DM operational note | Pacing risk, player sensitivity, potential derailment, prep dependency |

### Rules

- `[!secret]` always uses the collapsible `-` suffix: `[!secret]-`
- Callouts in `player`-audience pages: only `[!narration]` and `[!lore]`. Never `[!secret]`, `[!tip]`, or `[!danger]`.
- A page without any callouts is fine — not everything needs boxed prose.
- Don't nest callouts. One level only.

## Audience Prose Requirements

### Agent-facing (`audience: [agent]`)

Operational metadata. Optimized for machine parsing.

- Terse, structured, factual
- Lists and key-value pairs over paragraphs
- No flavor text, no descriptive prose
- Frontmatter carries most of the information; body is supplementary

### DM-facing (`audience: [agent, dm]` or `audience: [dm]`)

The primary creative content layer. Written for a human running a game.

- Use callouts per the visual language above
- Lead with what's immediately useful: first impression, current situation, what they want
- Secrets and hidden mechanics in collapsed `[!secret]-` blocks
- Voice notes and running advice in `[!tip]` blocks
- Specific enough to run cold — a DM picking this up mid-session should have what they need
- Avoid telling the DM what to feel ("this is a tense moment"); describe what creates tension

### Player-facing (`audience: [player]` or `audience` includes `player`)

Safe for player consumption. No spoilers by any mechanism.

- No collapsed callouts hiding DM information
- No CSS-hidden content
- No "the DM knows…" references
- Only `[!narration]` and `[!lore]` callouts permitted
- Write as in-world knowledge the characters would plausibly have
- Verify `audience` field before generating any player-facing material
