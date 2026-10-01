# Filing and operations

## Creature page

The template is the sole schema. Copy `wiki/templates/Creature.md` and file the page at `<World>/Creatures/<Name>.md`. Keep its required frontmatter, headings, single `[!narration]` callout, Base block and one `statblock` fence with `layout: Basic 5e Layout`. Do not create a second schema or a separate statblock page.

Fill the template in its existing order:

- **At a glance:** role, threat against this Party, visible tell, actionable weakness, and every NPC or other page that uses the Creature.
- **First sight:** theatre-of-the-mind Narration containing body and size, striking feature, surface, one sound or smell, behaviour at rest, and the visible appearance behind each signature. Keep rules, secrets and unearned names out of the Players' description.
- **Statblock:** complete 2024 rules text and every derived field the template requests.
- **Play:** Tactics and Outside a fight. Tactics names the opening, tell, threat, at least two answers, payoff, countered behaviour, shutdown, morale and escalation where relevant.
- **Depth:** Ecology and Hidden truths. Include habitat, diet, social life, ecological traces, local use or fear, origin and learnable truths.
- **Links:** retain the template's generated Base view.

Every signature ability has both an ecological sign before contact and a visible tell in First sight. Use concrete role language. Ordinary reused stats stay concise: do not add bespoke tuning or elaborate fiction when the request only needs an ordinary Creature, but still file complete sourced rules text and the required template sections.

A Creature is rules, never an NPC identity. An NPC page owns history, personality and relationships and points to the shared Creature with `creature: "[[Name]]"`. Do not make a person-specific Creature when a shared block is requested. An NPC may reuse one Creature; a Creature page may be used by many NPCs and Encounters.

## Retunes and played records

For a retune, read the existing Creature, every NPC `creature` backlink, and every planned or unplayed Encounter/Scene/Prep consumer. Enumerate all affected NPCs and consumers in the response. Preserve their identity, history, personality, existing Creature link and useful counterplay. Preserve appearance, ecology, origin, non-speaking behaviour, named relationships, and already-heard Narration unless the DM explicitly asks to change them. Add a new tell rather than rewriting a played record.

Never edit a played Session Prep, Scene, Recap, Previously On, Transcript-derived record, or `hot.md` to make a retune fit. A retune changes the shared Creature and future planning; it does not rewrite what happened. Do not duplicate a shared statblock in an NPC page or Encounter page.

## Scope and verification

Resolve the caller's explicit root, vault and World first. All reads, qmd searches, scratch writes and checks use that target; never fall through to an ambient Obsidian vault. In an eval or scratch vault, do not write the live Wiki. Before editing a World, read its active Campaign `hot.md`, that World's `index.md`, the last ten entries of its `log.md`, and the target pages needed by the request.

Add at least one incoming wikilink from a real relevant page besides the generated index; an NPC's `creature` property counts. Verify every link target exists. Create or change the World index only through the CLI.

Discover exact CLI syntax from the installed program before using it: `pnpm cf index --help`, `pnpm cf check --help`, and `pnpm cf log --help`. The supported forms are scoped by `--root <dir>` and `--vault <dir>`:

```text
pnpm cf index --root "$ROOT" --vault "$VAULT"
pnpm cf check --root "$ROOT" --vault "$VAULT" --fix
pnpm cf check --root "$ROOT" --vault "$VAULT"
pnpm cf log --root "$ROOT" --vault "$VAULT" --world "$WORLD" --op create --title "Create <Name>" --page "<Name>"
```

Use `--fix` only for mechanical repairs, then rerun. The final check runs all layers with no `--layer`; a scoped path may narrow displayed findings but never replaces the global check for stale links, orphans, index, hot, log, spelling, grammar, style, markdown, template, placement and statblock layers. Run the standalone check before logging. The caller owns the enclosing operation log; append a `create` entry only when this invocation is explicitly standalone and responsible for its own log, after green verification.
