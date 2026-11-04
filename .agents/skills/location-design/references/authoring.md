# Common Location authoring

Location-design uses sections 1 and 2 before kind-specific design and sections 3 and 4 afterwards. A standalone dungeon-design request uses the same sections around stocking, and a composed stocking request returns to its caller instead. Reuse supplied evidence only when it covers the current pages and request.

## 1. Establish Canon

1. Read `docs/wiki-layout.md` before authoring, and ADRs 0003, 0005 and 0010 when resolving Canon, rules ownership or gate requirements. Establish the World, active Campaign, requested purpose and containing Location from the DM's brief and repo. Keep a caller's objective and operation.
2. Search the Wiki for the target, aliases, containing Location, neighbours and relevant people, Factions, Creatures, Items, Lore, House Rules, Threads, Quests and Recaps. Retrieve the full source behind each relied-on fact and follow its relevant links, children and backlinks. Keep a private inventory of the facts the edit must keep, with their owner paths.
3. Read the current `wiki/templates/Location - <Kind>.md` before designing the page. The Kind is exactly Region, Settlement or Site. Choose `parent` by physical containment alone: any Location may contain another, including a Site inside a Site. Preserve an established containing Location unless the DM changes it. A top-level Region has an empty parent.

Canon precedence is DM statements, then the Wiki, then material being ingested. Preserve established geography, inhabitants, mechanics and events while moving them into the current template's headings and properties, and change each page only as its `revealed` property allows (`CONTEXT.md` **Revealed**). Distinguish a superseded state from a contradiction: a recorded event advances the World, while closed events remain history. Decide missing design facts consistently with the retrieved Canon and list those decisions in the reply, which is their only record. Keep inventory and source-comparison notes out of the page.

Edit through live `vault://` paths in omp.

## 2. Source applicable content

Source each needed element by the Sourcing order. First use the Wiki's Canon, House Rules and reusable pages in the Campaign folder or the vault-root kind folders. Next use official material beyond the SRD and existing homebrew or published designs suited to the DM's purpose. Next use `dnd5e-srd-api`, which also remains the quick source of exact rules text when travel, hazards, prices, Creatures, Items or other rules content needs one. Last build a novel design from the closest useful material and the World's Canon. Put attribution for adapted material in the page body. The `sources` property lists only repo-relative paths to archived Raw. Preserve valid existing provenance.

Reuse linked owner pages before creating new ones. Use `npc-design` when a new recurring person or someone the Party will directly deal with needs an NPC page, `faction-design` for a new organised actor, `creature-design` for a new kind of being, `statblock-design` when a Creature or NPC needs its combat statistics, and `item-design` or `spell-design` when their rules are needed. Send each skill only its missing element, Canon, local purpose and caller operation. Receive the real owner pages and their paths. Full owned rules belong on those pages per ADR 0005, while a Location links them and keeps only the local circumstances needed to run it. Statblocks stay off Location pages.

## 3. Write and link pages

Use the current template as the only authority for properties, required `##` headings in order, callout types and the condition on each optional part. Fill its properties, use `type: Location` and the chosen Kind, and give the page a useful one-line summary. Add each optional section and callout whose guidance condition the Location meets, add a `###` heading only for a place the DM runs on its own, and remove all `%%` guidance. When the page has `## Links`, copy the template's Base rather than rebuilding it.

File each fact the Kind's **Table use** names in the section a DM reads at the table, with owned rules on their linked owner pages. A route, cost, DC, keeper or key that lives only in the reply or working notes is undelivered: file it or cut the claim.

File in the flat `<campaign-folder>/Locations/` directory, its `title` the Location's name and its filename that title's slug (`docs/wiki-layout.md` **Page names**). A page already filed keeps its folder, and a World-free Location and its Campaign versions file per `docs/wiki-layout.md` **One vault, many Campaigns**. A nonempty `parent` holds a quoted wikilink that resolves. A top-level Region keeps the empty value. Only `parent` records containment, so folder placement never implies it. Resolve name collisions across the vault before choosing the title.

Link recurring Sites, people, Factions and rules owners. Create only the dependent pages this request needs, with their own templates and complete content. Give every new page a real link from another page: parent properties count, generated index and log entries do not. Give a new top-level Region a link from the World overview or another relevant page. Update a containing page when visitors need the new route or service there.

Once the DM-facing facts are on the page, use `theatre-of-the-mind` for a new or rewritten `[!narration]` callout. Supply the template's slot, viewpoint, spatial layout, observable activity, useful features and sourced tells. The useful features are the Party's options. A guarded place offers each visible way in with its guard, such as a gate and its watch, a side door or a gap in the roof. For an uncanny place, supply one small wrongness that behaves the same way every time (`flesh-out` [registers.md](../../flesh-out/references/registers.md), Horror and Wonder). Hidden answers and mechanics stay beside the corresponding DM entry, outside spoken prose. Preserve Narration already heard at the table unless the DM requests a rewrite.

Preserve `hot.md` and played Sessions, because Location work changes current owner pages and leaves those records as they are.

## 4. Close

Close per `skill://lint` § Commands over every page this run touched. When the caller assigns an explicit filesystem target, use that section's **Another root** flags. A composed request returns touched paths, Canon decisions and unresolved findings to its caller, which runs the final gate and writes one log entry under its own operation.
