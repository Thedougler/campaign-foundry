# Filing and operations

## Creature page

The template is the page schema. Copy `wiki/templates/creature.md` and file the page at `<campaign-folder>/Creatures/<slug>.md`, the slug of its `title` (`docs/wiki-layout.md` **Page names**). A page already filed keeps its folder. On a Campaign Creature, keep every frontmatter key, delete each key's `# Campaign-bound.` comment, and write the required `##` sections and one `statblock` fence. Add each optional section and the `[!narration]` callout when its guidance condition holds, which it does for a Creature the Party will see, fight or learn about (`docs/wiki-layout.md` **Templates define pages**). Keep the Base block. Do not create a second schema or a separate statblock page.

Every signature ability has both an ecological sign before contact and a visible tell in First sight. Use concrete role language. Ordinary reused stats stay concise: do not add bespoke tuning or elaborate fiction when the request only needs an ordinary Creature. Still file complete sourced rules text, the template's required sections, and each optional part whose guidance condition the Creature meets.

A Creature is rules, never an NPC identity. An NPC page owns history, personality, voice, wants, spoken lines and relationships, and points to its Creature with `creature: "[[<creature-slug>|<Creature page title>]]"`, such as `"[[otar-the-foul-creature|Otar the Foul (Creature)]]"`. A Creature made for one NPC keeps that body's habits on the Creature page. Its Outside a fight gives its silent behaviour at rest. Its Ecology gives habitat, traces and origin. The person's voice, talk, bonds and history stay on the NPC page. Do not make a person-specific Creature when a shared block is requested. Each NPC links one Creature, and many NPCs and Encounters may share one Creature page.

## Retunes and played records

For a retune, read the existing Creature, every NPC `creature` backlink, and every planned or unplayed Encounter/Scene/Prep consumer. Enumerate all affected NPCs and consumers in the response. Preserve their identity, history, personality, existing Creature link and useful counterplay. Preserve appearance, ecology, origin, non-speaking behaviour, named relationships, and already-heard Narration unless the DM explicitly asks to change them. Add a new tell rather than rewriting a played record.

Never edit a played Session Prep, Scene, Recap, Previously On, Transcript-derived record, or `hot.md` to make a retune fit. A retune changes the shared Creature and future planning and leaves what happened as it was. Do not duplicate a shared statblock in an NPC page or Encounter page.

## Scope and verification

Resolve the caller's explicit root, vault and Campaign first. All reads, searches, writes and checks use that target. Before editing, read the Campaign's `hot.md`, its Campaign folder's `index.md`, the last ten entries of its `log.md`, and the target pages needed by the request.

Add at least one incoming wikilink from a real relevant page besides the generated index. An NPC's `creature` property counts as one. Verify every link target exists. Create or change an index only through the CLI.

Close per `skill://lint` § Commands over the Creature page and every page this run touched. Give every command `--root "$ROOT" --vault "$VAULT"` and each check `--templates "$VAULT/templates"` (**Another root** there), and read `bun run cfcli -- check --help` first for the installed syntax. Run the page gate before logging. When another skill invoked this one, that caller writes the operation log. Append a `create` entry only when this invocation is explicitly standalone and responsible for its own log, after the page gate passes.
