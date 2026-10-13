# Filing and operations

## Creature page

The template is the page schema. Copy `wiki/templates/creature.md` and file a Campaign Creature at `<campaign-folder>/Creatures/<slug>.md` and a World-free one at `wiki/Creatures/<slug>.md` ([SKILL.md](../SKILL.md#world-free-creature)), the slug of its `title` (`docs/wiki-layout.md` **Page names**). A page already filed keeps its folder. On a Campaign Creature, keep every frontmatter key and delete each key's `# Campaign-bound.` comment. Add each optional section and the `[!narration]` callout when its guidance condition holds, which it does for a Creature the Party will see, fight or learn about (`docs/wiki-layout.md` **Templates define pages**). `## Statblock` comes from `statblock-design`, and a page has no second schema or separate statblock page.

Every signature has both an ecological sign before contact and a visible tell in First sight. Use concrete role language. An ordinary reused Creature stays concise, with no bespoke fiction beyond what the request needs, and still has each optional part whose guidance condition it meets.

A Creature is never a person the DM plays as a character, and a named person is an NPC, on an NPC page with its own optional `## Statblock` (`npc-design`).

## Played records

Preserve appearance, ecology, origin, behaviour, named relationships and already-heard Narration unless the DM explicitly asks to change them. Add a new tell rather than rewriting a played record. Never edit a played Session Prep, Scene, Recap, Previously On, Transcript-derived record, or `hot.md`.

## Scope and verification

Resolve the caller's explicit root, vault and Campaign first. All reads, searches, writes and checks use that target. Before editing, read the Campaign's `hot.md`, its Campaign folder's `index.md`, the last ten entries of its `log.md`, and the target pages needed by the request.

Add at least one incoming wikilink from a real relevant page besides the generated index, such as a Location's inhabitants or a Scene's Encounter. Verify every link target exists. Create or change an index only through the CLI.

Close per `skill://lint` § Commands over the Creature page and every page this run touched. Give every command `--root "$ROOT" --vault "$VAULT"` and each check `--templates "$VAULT/templates"` (**Another root** there), and read `bun run cfcli -- check --help` first for the installed syntax. Run the page gate before logging. When another skill invoked this one, that caller writes the operation log. Append a `create` entry only when this invocation is explicitly standalone and responsible for its own log, after the page gate passes.
