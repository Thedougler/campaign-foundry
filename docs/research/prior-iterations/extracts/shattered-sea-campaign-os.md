# shattered-sea-campaign-os salvage extract

Copies live under `sources/shattered-sea-campaign-os/` (relative paths preserved). Findings: `../shattered-sea-campaign-os.md`.

## Presence pass before prose

- source: `_system/skills/fleshing-out-content/SKILL.md`, `_system/skills/fleshing-out-content/references/registers.md` (found)
- destination: reference/stage for `npc-design`, `location-design`, `creature-design`, `item-design`, or a stage `theatre-of-the-mind` invokes on thin pages
- load-bearing:
  - Positioning: "stock the parent with DM-facing facts so `writing-player-prose` can select what the table hears. This skill runs first. It writes facts and cues. It never writes [!narration]." Success = "the richer page is easier to run *and* a later depiction can be spoken without inventing world state."
  - Detail-earning preferences: evidence over labels, specificity over density, motion over portrait, causality over decoration, particularity over archetype, implication over explanation, interaction over spectacle.
  - Workflow: (1) bound the truth via the authority ladder; (2) **diagnose the flat — spend detail only on the 2–4 weakest of 7 dimensions**: Image (immediately pictureable), Identity (unmistakably *this* not its category), Life (doing/changing/wanting/suffering), Contact (what happens when PCs approach/touch/question/disturb), Depth (apparent only after closer attention), Connection (reveals wider world), Emotion (facts create feeling without naming it); (3) find one **signature** ("smallest image, behavior, relationship, contradiction, physical law, or recurring pattern that carries identity") + anchors with scale budgets — Minor: 1 signature + 1–2 anchors; Supporting: + 2–4 anchors, ≥1 interaction; Major: + 3–5 anchors, layers, discoverables, ongoing motion; "the identity would survive aggressive trimming"; (4) lived-in via **Traces** (wear, repairs, scars, graffiti, offerings, bureaucracy), **Routines** ("what happens when nobody important is watching?"), **Pressures** (hunger, debt, rivalry, secrecy — what makes the state unstable), **history made physical** ("Three sizes of handprint say a family remained"), connections (food→supply, scars→rivals); (5) layer contact as **Surface → Attention → Contact → Disturbance** (obvious now / sensible-question / manipulation response / world change from interference); ≥2 plausible engagements produce a concrete world response; (6) register: emotion is an effect of facts, build causes, "no sentence tells the players what to feel"; (7) compress to prose stock — one signature image, glance-perceivable Surface facts, ≥2 non-visual sensory facts, "one toy the table can touch", each fact classified perceivable/knowable/hidden; (8) **presence test, 11 items**: Distinct (generic-name swap loses much), Concrete, Active (something happens without PCs), Interactive, Layered, Causal (cut disconnected decoration), Emotional (cut mood instructions), Memorable, Runnable (a glance says what to emphasize), Authoritative, Speakable. "More detail after that is sediment."
  - Rule: write into the owner's existing sections; no `Fleshing Out` heading, no second source of truth.
- skip-from-this-file: owner-skill routing table to `writing-*` skills, Obsidian callout vocabulary, doctor runs, harness delegation section.

## Canon ladder + belief framing

- source: `docs/adr/0002-canon-audience-retrieval.md`, `_system/references/creative-writing.md` (found)
- destination: CONTEXT.md page states + lint checks; authority ladder into design skills / `campaign-config.md`
- load-bearing:
  - Rationale: "LLMs treat all text as equally authoritative … provisional agent-generated content silently hardens into assumed truth, and 'NPC believes X' mutates into 'X is true.'"
  - Five `canon` states: **locked** (explicit human intent; preserve unless asked to revise — effectively read-only), **established** (elaborate, never contradict), **provisional** (default for all new content), **noncanon** (ideas/discarded/inspiration), **reference** (externally grounded evidence, never setting truth). "Promotion to `established` or `locked` is a human decision." Agents must check `canon` before modifying any page.
  - **Creative Authority Ladder**: `Human-authored idea → preserve exactly / Established implication → develop / Missing connective tissue → invent freely / Reversible texture → invent aggressively / Consequential new canon → propose, flag for review / Campaign-defining change → human decision only`. Default mode additive; "Patch existing files; never regenerate human prose wholesale. Human prose is expensive."
  - **Epistemic rule**: "'NPC believes X' is canonical. X itself may be false." Write-this/not-this table: "Captain Veyra *believes* the Tide Court controls the northern passages" not "The Tide Court controls the northern passages"; "Local legend *holds that*" not bare fact; "The faction *claims* jurisdiction" not "has jurisdiction". A belief contradicting canon "reveals character, unreliable narration, or incomplete information. Never 'fix' it by collapsing belief into fact."
  - Content Quality Doctrine — detail earns place via: Perception, Choice, Characterization, Mechanics, Consequence, Improvisation, Interaction, Memory; "If a sentence doesn't serve at least one, cut it."
  - Audience split: agent-facing terse/structured/no flavor; DM-facing lead with immediately useful, secrets in collapsed blocks, "run cold"; player-facing no hidden mechanisms, in-world plausibility only.
- skip-from-this-file: ADR §2 QMD collections/retrieval ladder and §3 event/secrecy machinery (plumbing, per findings Skip).

## Transcript reconciliation rigor

- source: `_system/skills/reconciling-session-evidence/SKILL.md` (found)
- destination: Ingest transcript path (`ingest`)
- load-bearing:
  - Prime directive: "**Evidence fidelity beats prep fidelity** … Raw evidence stays immutable. Normalize interpretation in a sparse, auditable overlay; never rewrite the source transcript."
  - Six working records before consequential edits: evidence set, **correction ledger** (only interpretation changes traceable to a raw span), **discourse map**, **summary check**, claim ledger, reconciliation delta.
  - **Correction rule**: normalize only **obvious** readings (unique phonetic alias, unmistakable rules term, duplicate fragments, false starts, clear dice notation). Ledger fields: locator (raw span), raw (unchanged), normalized, class (ASR/punctuation/duplicate/false-start/speaker/notation), support, confidence (`obvious`/`probable`/`ambiguous`). "Only `obvious` corrections may feed an automatic normalized claim. Carry `probable` and `ambiguous` readings as diagnostics." Keep unresolved when speaker identity changes the claim or the correction changes an action/ruling/outcome/relationship/revelation.
  - **Discourse map**: role-classify every state-changing segment (DM adjudication, player declaration+action, resolved mechanic, in-character speech, planning/speculation, rules discussion, joke/OOC); assign exactly one temporal label: `present` / `historical` / `intention` / `hypothetical` / `parallel`. "Only `present` discourse can advance Campaign Now." "NPC speech records an NPC belief or assertion. Player speculation is not an occurrence. An intention is not a completed action. A joke becomes evidence only when the DM adopts it."
  - **Summary check**: per claim — find supporting span, confirm actor/action/object/outcome/temporal relationship, repair or drop unsupported detail, mark claims without support `summary-only`. "Corrected transcript evidence wins; a summary never upgrades an unsupported claim into canon."
  - **Play outranks prep**: "Clear play establishes improvised information even when prep omitted it … A conflict with established or locked canon remains evidence plus a human-gated contradiction." Extract *what became true*, not everything said.
  - Dispositions map every claim to exactly one owner (patch page / mint node / runtime patch / ruling / gated proposal / retain as diagnostic); "GATE, rather than guess, on locked-canon changes, established contradictions or promotions … present the smallest decision."
  - Worked example worth keeping: plan says gate shut, ASR garbles "the gate opens", summary claims "party broke it" → normalize obvious ASR, accept DM narration as play, reject summary's cause as unsupported.
  - Completion bar: raw evidence intact, corrections traceable, uncertainty preserved, OOC noise out, improvisation not overwritten, every mutation evidence-backed.
- skip-from-this-file: ADR branch table, Runtime/compiler mechanics, session-report file formats, agent-history routing.

## Hot cache with Flagged Contradictions

- source: `wiki/hot.md` (found; 29 lines)
- destination: CF hot-cache/orientation docs + a doctor/`cf`-enforced ledger cap
- load-bearing:
  - Shape: ~500–700-word snapshot "updated after every major write": dated `[YYYY-MM-DD] INGEST —` paragraphs naming the source file and the patch, then **Key Takeaways** bullets, then **Flagged Contradictions** queue.
  - Flagged Contradictions entries are one-line human-decision tickets: "Tail Staging Island vs Fathomrush: same Maw-west staging job, two names." / "Wolfrabbit drop frontmatter claimed CR 5 / 75 HP; fence is CR 2 / 45 HP. **Fence wins.**" / "two incompatible mechanics. Human pick required." Each names the conflict, the competing pages, and who decides or the precedence rule.
  - Pattern: conflicts found during ingest land in the queue instead of being silently resolved or dropped; the queue is cheap to scan and drains by human pick.
- skip-from-this-file: the Aruhe-specific canon content itself (lore, belongs retold elsewhere if at all).

## Named anti-patterns

- source: `_system/skills/writing-player-prose/references/anti-patterns.md` (found)
- destination: `theatre-of-the-mind` critique list + Vale rules
- load-bearing: 13 named failure modes, each with a one-line failure statement:
  - **The Novel Paragraph** — long prose before players can act; listeners forget and lose agency.
  - **The Five-Senses Checklist** — one detail per sense whether useful or not; artificial, low information density.
  - **The Purple Fantasy Generator** — ornament replaces observation.
  - **The Camera Pan** — narration traverses every object in spatial order; completeness mistaken for understanding.
  - **The Hidden Obvious Thing** — refusing to name what every character would recognize; fake mystery via communication friction.
  - **The Conclusion Theft** — narration interprets evidence for the player; removes deduction.
  - **The Emotion Theft** — dictates a voluntary PC emotional response; removes characterization.
  - **The Predetermined Reaction** — "Shocked, you draw your weapons."; narrates player decision.
  - **The Lore Ambush** — location intro becomes history lecture; prevents play beginning.
  - **The Spotlight Accident** — "one mundane clue gets disproportionate descriptive emphasis solely because the agent knows it matters"; metagame signaling.
  - **The Infinite Continuation** — narration keeps speaking after players can respond; DM occupies conversational space.
  - **The Mechanical Dead End** — "Miss. Next turn."; mechanics disconnect from fictional state.
  - **The Cinematic Cutscene** — prose decides outcomes because dramatic; incompatible with sandbox agency.
- skip-from-this-file: nothing — file is entirely the list.

## Exemplar grounding

- source: `_system/references/exemplar-grounding.md` (found; 16 lines)
- destination: `spell-design`, `creature-design`, `item-design`
- load-bearing: protocol before authoring/revising 5e mechanics:
  1. Resolve campaign rules and constraints first (primary sources → fallback → house rules).
  2. Identify target mechanical form and tier (CR/role, spell level, rarity, feature cadence).
  3. Query official sources for **2–4 exemplars, one near-peer + one contrasting**.
  4. Retrieve complete source pages — "Do not claim from snippets."
  5. Extract design patterns: action economy, numerical envelope, resource cadence, wording structure, counterplay, complexity budget.
  6. Create original mechanics using the patterns; "Do not copy surface text."
  7. Cite exemplar links that materially informed the design.
  8. Compile/validate normally.
  - Guard: world/lore queries must never treat source entries as setting truth.
- skip-from-this-file: repo-specific fork/npm commands.

## Season pages + anchors

- source: `docs/adr/0006-narrative-work-kinds.md` §3 (found)
- destination: `campaign-config.md` / `new-campaign` / `plan-session`
- load-bearing:
  - Split: campaign-plan (subtype full-campaign) holds the contract — "premise, player promise, tone, anchors, ending intent, runtime"; `kind: season` pages hold chapters — "narrative function, season question, transition conditions". `arc` for finer grain inside a season. No overview state file.
  - Definitions: "**anchor = a DM commitment that survives planning revision. A possibility = an attractive future that may never be reached.** Horizon and anchors live on the full-campaign plan; season pages obey them."
  - "The exemplar stored the contract on `campaign-overview.md` … Putting premise, tone, and ending intent in state would hide authored canon in a cursor folder." Keep the contract as authored canon, not system state.
- skip-from-this-file: §1 beat subtypes, §2 situations, §4–7 (cold opens, trials, gravity-on-beat, pc kind — sibling repos already mined or CF-superseded).

## Look canon for images

- source: `_system/skills/visual-aids/SKILL.md`, `docs/adr/0016-look-reference-images-illustrations.md` (found)
- destination: `generate-image` (promote/kill so portraits stay consistent)
- load-bearing:
  - "**Look** is appearance prose on the owner. It is the source of truth." Art-style file is campaign style, not a look. Image-first authoring rejected.
  - **Reference image** = identity Asset of the look (a turnaround, not a costume or moment); listed in `reference_images:`, embedded where the look is established; grounds future generations. **Illustration** = picture of a moment; runtime only, session-scoped, marked generated; "must not enter `reference_images:`, must not live in subject `assets/` folders, and must not ground later generations" ("a wet Veyra becomes her face").
  - **`look_canon` (`provisional`/`established`/`locked`) is independent of page `canon`**; default provisional; "A generated reference image stays provisional until the DM promotes or kills it." Promote = keep accepted files, delete/archive rejected candidates, "Do not leave competing faces listed."
  - **Grounding inputs are exactly three**: art-style file, look prose of every depicted named thing, that thing's own reference images. "Never illustrations, `[!secret]`, pending events, pages the output audience cannot see, or another entity's image to invent a face. No look → do not generate" ("Stop if there is no look. Ask. Do not invent a face.")
  - `player_images:` opt-in per file — the subset allowed across the table; showing a picture never changes page audience.
  - Minting discipline: no vault-wide backfill; generate a reference image only when a look exists, none is listed, and current work requires it. Faction identity is a banner/device, not a group photo. PC reference images player-supplied or approved.
- skip-from-this-file: Obsidian embed syntax, `![[…]]` paths, leaflet maps, doctor runs, ADR cross-reference plumbing.

## AUTO/GRILL/GATE work graph

- source: `_system/skills/decomposing-campaign-content/SKILL.md` (found)
- destination: ingest/prep decomposition; pairs with canon ladder
- load-bearing:
  - Per-node work graph fields: operation, owner, **authority (`AUTO`/`GRILL`/`GATE`)**, dependencies, procedure (narrowest specialist), completion (observable test).
  - **AUTO**: established-structure and reversible work — ingest, normalization, classification, link repair, obvious transcription correction, deterministic compilation, indexing, reconciliation analysis; "Continue through all non-gated work once invoked."
  - **GRILL**: "creative intent required before planning" — full session/campaign plans, major architecture, or "existing canon cannot supply consequential intent". "Retrieve first … Resolve player promise, desired experience, tone, gravity, anchors, boundaries, constraints, scope, horizon … Start planning only after a concise charter distinguishes success from a merely plausible plan."
  - **GATE**: "authority-sensitive state transition" — locked canon, contradictions/promotions, retcons, consequential campaign commitments, Campaign Now, player-owned choices. "Gates protect authority, not architecture. Complete safe analysis and proposed patches before asking. After approval, continue without reopening settled questions."
  - The question rule: "Ask only about creative intent, preference, or authority. Resolve architecture from repository conventions and current state." And per node: "no human question is attached to an `AUTO` operation."
  - Minimum-graph priorities: patch before mint; canonical owner before projection; link before copy; specialist craft before generic prose; deterministic consequence before LLM derivation; durable node only when future citation justifies it.
  - Bulk-work terminal rule: each input ends as exactly one of — represented / merged into an owner / retained as evidence / skipped with reason / blocked by named gate.
- skip-from-this-file: semantic layer/representation-chain ontology, novel-kind admission procedure, compiler handoffs (infra inversion per findings Skip).

## Session-zero 20-question PC interview

- source: `_system/skills/player-character-interview/SKILL.md`, `references/twenty-questions.md` (found)
- destination: user-invoked reference for `new-campaign` / PC template; complements `pull-pcs` for sheet-less PCs
- load-bearing:
  - Contract: human-started only (`disable-model-invocation: true`), one question at a time, prefixed "Question N of 20", acknowledge briefly, **no follow-ups**, "Skip" or "Next" is a valid answer noted unanswered. Output is the PC page itself plus an append-only dated `## Interview` record — no separate transcript page.
  - The 20 questions (abridged): name/aliases + "a name that only one specific person ever called them"; first sight; class and *why*; "a flaw and a gift bound up together" (the vault's **Mortis**: limitation = Mark, benefit = Gift); "What do they want right now, more than anything? Are they honest with themselves about it?"; "By the end of all this, who do they want to *be*?"; what keeps them up at night / afraid of losing; "What do they believe that most people would push back on?"; a line they won't cross; daily life before; hardest thing survived/done; a carried object with a story; worst thing done, meant or not; whose opinion matters most and where that person is now; who considers them an enemy; who they trust and what earned it; "How do they treat someone who can't do anything for them?"; "the one thing they want so badly they might compromise who they are to get it"; a secret that would change how people see them; gods belief/reciprocity.
  - Fidelity rules: "Fill … from stated answers only"; "no answer was invented"; leave class blank rather than guess; no combat math or pc-state; author no setting marks the vault doesn't name.
  - Resume mode asks only unanswered gaps; convert (NPC→PC) rare, needs hybrid interview; page originates at `canon: established`, gravity-first sections (Overview, Gravity, Relationships, Interview).
- skip-from-this-file: doctor runs, template path plumbing, npc-page conversion details (references copied for completeness).
