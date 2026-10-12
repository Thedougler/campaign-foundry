# Templates are minimal by default

Amends [ADR 0039](0039-world-free-pages-live-at-the-vault-root.md).

ADR 0039 made a template's World-bound sections optional on the Creature, Item, Spell and Vehicle templates so a World-free page could pass the gate. Every other part of every template remained required, and the content design skills filled every section on a Campaign page to make up for the looser gate. The DM wants templates generic and minimal, with sections added when a page needs them. The required `revealed` and `parent` keys also meant nothing on a World-free page, and `revealed` meant nothing on `DM Settings`.

Decision:

- **Required means every time.** A template part is required only when every page of its kind needs it every time. Every other section, Narration callout and At a glance bullet is `Optional.`, and its guidance comment states the condition that brings it in. A skill writes an optional part when its condition holds and leaves it out otherwise, never to fill the template.
- **Reusable and strictly Campaign kinds.** The reusable kinds can be World-free, namely Creature, Item, Spell, Vehicle, NPC, Faction, Deity, Lore, Location and House Rule. The strictly Campaign kinds never can, namely Prep, Scene, Recap, Previously On, Handout, PC, Thread, Quest, `hot`, `campaign-config`, `story-so-far` and the Campaign overview. A strictly Campaign kind lives only in its Campaign folder and keeps `revealed` and its other Campaign keys required. Its sections are still minimal. The World overview is a World itself, never World-free, and keeps `revealed` required wherever ADR 0024 files it.
- **Campaign-bound keys.** In a reusable kind's template, a key whose line ends in a `# Campaign-bound.` YAML comment is required on a page in a Campaign folder and optional in a vault-root kind folder. Every reusable kind marks `revealed` this way, and the three Location templates mark `parent` too. The comment is template guidance. A page's frontmatter holds none.
- **Optional callouts and bullets.** A callout whose own guidance comment opens `Optional.` is optional even when its section is present. The Narration callouts that stay required are each Scene's Opening or Closing image, the Previously On and the Handout text. An At a glance bullet marked `%% Optional. Add it when … %%` is guidance only, and the gate doesn't check bullets.
- **`DM Settings` has no `revealed`.**

Consequences: `docs/wiki-layout.md` **Templates define pages** states the reading rules and **One vault, many Campaigns** the split of kinds. The gate reads the `# Campaign-bound.` mark and a callout's own `Optional.`. It rejects a strictly Campaign kind in a vault-root folder and reports a `#` comment left in a page's frontmatter as leftover guidance. The content skills write optional parts when their conditions hold. ADR 0039's last consequence, that the design skills fill every section on a Campaign page, no longer holds.
