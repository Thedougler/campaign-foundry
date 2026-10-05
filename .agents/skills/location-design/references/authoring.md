# Common Location authoring

Location-design uses sections 1 and 2 before kind-specific design and sections 3 and 4 afterwards. A standalone dungeon-design request uses the same sections around stocking, and a composed stocking request returns to its caller instead. Reuse supplied evidence only when it covers the current pages and request.

## 1. Orient and establish Canon

1. Read `AGENTS.md`, `CONTEXT.md` and `docs/wiki-layout.md` before authoring. Read ADRs 0003, 0005 and 0010 when resolving Canon, rules ownership or gate requirements. Establish the World, active Campaign, requested purpose and containing Location from the DM's brief and repo. Keep a caller's objective and operation. A standalone worldbuilding request is `create`.
2. Use the installed `qmd` skill to discover the orientation pages. Read the Campaign's `hot.md`, then the World's `index.md`, then the last ten entries of `log.md`, before task pages. If fewer entries exist, read them all and take the remainder from the latest rotated log. Without an active Campaign, begin with the World index. Hot is orientation, not evidence for new facts.
3. Search qmd for the target, aliases, containing Location, neighbours and relevant people, Factions, Creatures, Items, Lore, House Rules, Threads, Quests and Recaps. Retrieve the full source behind each relied-on fact and follow its relevant links, children and backlinks. Keep a private inventory of facts, owner paths and why each matters here. Account for every relevant hit by using it or recording why it does not apply.
4. Read the current `wiki/templates/Location - <Kind>.md` before designing the page. The Kind is exactly Region, Settlement or Site. Choose `parent` by physical containment alone: any Location may contain another, including a Site inside a Site. Preserve an established containing Location unless the DM changes it. A top-level Region has an empty parent.

Canon precedence is DM statements, then the Wiki, then material being ingested. Preserve established geography, inhabitants, mechanics and events while moving them into the current template's headings and properties. Distinguish a superseded state from a contradiction: a recorded event advances the World, while closed events remain history. Decide missing design facts consistently with the retrieved Canon and list those decisions in the reply, which is their only record. Keep inventory and source-comparison notes out of the page.

Use live `vault://` reads/edits in omp.

**Complete when** the requested Kind and parent are resolved, orientation is read in order, every relied-on source is retrieved, and the inventory identifies the facts the edit must keep.

## 2. Source applicable content

For each needed element, use the first fitting source in this order:

1. **Wiki:** the Wiki's Canon, House Rules and reusable pages.
2. **2024 SRD:** use `dnd5e-srd-api` when travel, hazards, prices, Creatures, Items or other rules content needs a rules source.
3. **Official/web/homebrew:** use the harness's web search and fetch tools for official material beyond the SRD, then existing homebrew or published designs suited to the DM's purpose.
4. **Novel:** only after the search turns up nothing that fits. Build from the closest useful material and the World's Canon.

Stop when a source fits the need. Skip a source only when nothing in it applies, and when its relevant material does not fit, record why before moving on. Foundry is never a source. Record the selected source and any adaptation in working evidence or a body attribution. The `sources` property lists only repo-relative paths to archived Raw. Preserve valid existing provenance.

Reuse linked owner pages before creating new ones. Use `npc-design` when a new recurring person or someone the Party will directly deal with needs an NPC page, `faction-design` for a new organised actor, and `creature-design`, `item-design` or `spell-design` when their rules are needed. Send each skill only its missing element, Canon, local purpose and caller operation. Receive the real owner pages and their paths. Full owned rules belong on those pages per ADR 0005, while a Location links them and keeps only the local circumstances needed to run it. Creature stat blocks stay off Location pages.

**Complete when** each reused, adapted or invented element has sourcing evidence, and every required owner page exists or has an identified authoring handoff.

## 3. Write and link pages

Use the current template as the only authority for properties, required `##` headings in order and callout types. Fill its properties, use `type: Location` and the chosen Kind, and give the page a useful one-line summary. Retain optional structure only where it has content and remove all `%%` guidance. Keep the template's Links view rather than rebuilding its Base.

File in the flat `<World>/Locations/` directory, named for the Location. A nonempty `parent` holds a quoted wikilink that resolves. A top-level Region keeps the empty value. Only `parent` records containment, so folder placement never implies it. Resolve name collisions across the vault before choosing the page name.

Link recurring Sites, people, Factions and rules owners. Create only the dependent pages this request needs, with their own templates and complete content. Ensure every new page has a real link from another page: parent properties count, generated index/log entries do not. Give a new top-level Region a link from the World overview or another relevant page. Update a containing page when visitors need the new route or service there.

Once the DM-facing facts are on the page, use `theatre-of-the-mind` for a new or rewritten `[!narration]` callout. Supply the template's slot, viewpoint, spatial layout, observable activity, useful features and sourced tells. Hidden answers and mechanics stay beside the corresponding DM entry, outside spoken prose. The `theatre-of-the-mind` skill defines its recipe and completion checks. Invoke the CLI through the current Bun package command. Preserve Narration already heard at the table unless the DM requests a rewrite.

Write British English. Add an in-world word without its own page to `.cspell-words.txt` at the vault root (`wiki/`, or the assigned `--vault`) only when appropriate. Rules terms belong in `.cspell/dnd-terms.txt` at the repo root. Preserve `hot.md` and played Sessions, because Location work changes current owner pages and leaves those records as they are.

**Complete when** the Location and its dependencies are authored, the old facts are retained or explicitly advanced by recorded events, every link resolves, and the selected branch's table-use criterion holds on the page: each fact it names is filed in the section a DM will read at the table, with owned rules on their linked owner pages. A fact that lives only in the reply or working notes is unfiled, so file it or cut the claim.

## 4. Gate and record the operation

Read `package.json` and these help commands before running the gate or logging, so paths and flags match the installed CLI:

```bash
bun run cf -- check --help
bun run cf -- log --help
```

From the repo root, regenerate indexes, apply mechanical fixes and resolve the remaining findings without changing Canon, then run the page gate with no layer filter, given every page this run touched:

```bash
bun run cf -- index
bun run cf -- check --fix "<page path>" "<page path>"
bun run cf -- check "<page path>" "<page path>"
```

The paths narrow the report, not the check: the whole Wiki is still checked behind them. Never edit generated indexes by hand. When the caller assigns an explicit filesystem target, add its `--vault`, `--root` and `--templates` paths to the check commands, and `--vault`/`--root` to indexing and logging.

After a successful standalone operation, append exactly one entry listing each touched content page, using its vault-relative path. Replace the placeholders and repeat `--page` as needed:

```bash
bun run cf -- log --world "<World>" --op create --title "Design <Location>" --page "<World>/Locations/<Location>.md"
```

`create` includes deepening a Location outside Ingest or Prep. A composed request returns touched paths, Canon decisions and unresolved findings to its caller. The caller runs the final gate and writes one entry under its existing operation. A child handoff leaves logging to the caller.

**Complete when** the page gate has printed `ok: 0 findings` and the standalone operation has one log entry, or the composed return supplies every artifact and touched path needed for its caller's gate and log. Findings are repair work. Report only missing tooling as an observed blocker, never claiming an unrun or failing gate passed.
