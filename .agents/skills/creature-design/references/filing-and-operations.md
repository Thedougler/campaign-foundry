# Filing and operations

## Creature page

The template is the page schema. Copy `wiki/templates/Creature.md` and file the page at `<campaign-folder>/Creatures/<slug>.md`, the slug of its `title` (`docs/wiki-layout.md` **Page names**). A page already filed keeps its folder. Keep its required frontmatter, headings, single `[!narration]` callout, Base block and one `statblock` fence with `layout: Basic 5e Layout`. Do not create a second schema or a separate statblock page.

Fill the template in its existing order:

- **At a glance:** role, threat against this Party, visible tell, a weakness the Party can exploit, and every NPC or other page that uses the Creature.
- **First sight:** theatre-of-the-mind Narration containing body and size, striking feature, surface, one sound or smell, behaviour at rest, and the visible appearance behind each signature. Keep rules, secrets and unearned names out of the Players' description.
- **Statblock:** complete 2024 rules text and every derived field the template requests.
- **Play:** the Tactics and Outside a fight subsections. Tactics names the opening, tell, threat, at least two answers, payoff, countered behaviour, shutdown, morale and escalation where relevant.
- **Depth:** the Ecology and Hidden truths subsections. Include habitat, diet, social life, ecological traces, local use or fear, origin and learnable truths.
- **Links:** retain the template's generated Base view.

Every signature ability has both an ecological sign before contact and a visible tell in First sight. Use concrete role language. Ordinary reused stats stay concise: do not add bespoke tuning or elaborate fiction when the request only needs an ordinary Creature, but still file complete sourced rules text and the required template sections.

A Creature is rules, never an NPC identity. An NPC page owns history, personality and relationships and points to the shared Creature with `creature: "[[<slug>|<Title>]]"`. Do not make a person-specific Creature when a shared block is requested. Each NPC links one Creature, and many NPCs and Encounters may share one Creature page.

## Retunes and played records

For a retune, read the existing Creature, every NPC `creature` backlink, and every planned or unplayed Encounter/Scene/Prep consumer. Enumerate all affected NPCs and consumers in the response. Preserve their identity, history, personality, existing Creature link and useful counterplay. Preserve appearance, ecology, origin, non-speaking behaviour, named relationships, and already-heard Narration unless the DM explicitly asks to change them. Add a new tell rather than rewriting a played record.

Never edit a played Session Prep, Scene, Recap, Previously On, Transcript-derived record, or `hot.md` to make a retune fit. A retune changes the shared Creature and future planning and leaves what happened as it was. Do not duplicate a shared statblock in an NPC page or Encounter page.

## Scope and verification

Resolve the caller's explicit root, vault and Campaign first. All reads, searches, writes and checks use that target. Before editing, read the Campaign's `hot.md`, its Campaign folder's `index.md`, the last ten entries of its `log.md`, and the target pages needed by the request.

Add at least one incoming wikilink from a real relevant page besides the generated index. An NPC's `creature` property counts as one. Verify every link target exists. Create or change an index only through the CLI.

Close per `skill://lint` § Commands over the Creature page and every page this run touched. Give every command `--root "$ROOT" --vault "$VAULT"` and each check `--templates "$VAULT/templates"` (**Another root** there), and read `bun run cf -- check --help` first for the installed syntax. Run the page gate before logging. When another skill invoked this one, that caller writes the operation log. Append a `create` entry only when this invocation is explicitly standalone and responsible for its own log, after the page gate passes.
