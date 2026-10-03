---
name: decomposing-campaign-content
description: Use before acting on a campaign request that may span pages, kinds, semantic layers, evidence, Runtime, or specialist skills; when a source needs classification, an existing owner may be patched versus a new node, a novel kind needs research and schema admission, a batch needs accounting, or work may be AUTO, GRILL, or GATE.
---

# Decompose Campaign Content

Translate user intent into the smallest dependency-ordered set of correct Campaign OS operations. The user supplies the outcome; this skill chooses owners, representations, specialist procedures, deterministic follow-up, and human gates.

**Store truth once.** Patch the authoritative owner before minting a sibling. Separate Knowledge, Work, Runtime, evidence, renderers, and assets before planning writes.

## Scope and routing

Use this skill before writing when a request is broad, cross-kind, multi-page, bulk, ambiguous, or likely to need several specialist skills. Use the owning specialist directly for one known page with an unambiguous contract.

For campaign-play transcripts, session notes, audio/ASR text, or generated session summaries, load `reconciling-session-evidence` first. That skill interprets play and produces the claim ledger; this skill decomposes the resulting reconciliation delta when it has multiple owners or gated transitions.

For ingestion, `wiki-ingest` owns source discovery, raw preservation, wiki ledgers, and the obligation to **start immediately** and write the **complete graph** for each source it accepts. This skill owns the content graph, not duplicate bookkeeping. On an ingest graph, every recommended create/patch node is executed in-run: thin source → *stub* from the kind template (`Source is silent.` on empty required headings). Page budgets, backlog size, and "polish later" are not reasons to omit a node; later ingests expand stubs.

## Operating contract

Before any write, produce a compact internal work graph. Each node states:

| Field | Meaning |
|---|---|
| operation | create, patch, ingest, normalize, reconcile, render, compile, validate, index, move, or archive |
| owner | canonical page, evidence file, asset, renderer, or system operation |
| authority | `AUTO`, `GRILL`, or `GATE` |
| dependencies | facts or operations required first |
| procedure | narrowest specialist skill or deterministic tool |
| completion | observable condition proving this node is done |

The graph is complete only when the requested outcome, all dependencies, every input, and every human decision have a terminal state. Do not expose the graph unless the user asks for architecture; report the campaign result first.

## 1. Frame the outcome

Resolve:

- the outcome the user actually wants;
- supplied sources, evidence, or existing pages;
- scope: setting, campaign, session, personal, or reference;
- intended audience;
- time horizon;
- explicit constraints and human-authored intent.

Treat filenames, folder suggestions, and unfamiliar content-type labels as clues to intent. Own the translation into paths, kinds, schemas, naming, relationships, batching, downstream skills, and compilers.

Ask only about creative intent, preference, or authority. Resolve architecture from repository conventions and current state.

**Complete when:** the finished state is concrete and every unresolved point is either an architectural detail you can decide or a genuine human decision.

## 2. Retrieve before minting

Inspect existing state before proposing writes:

1. direct path, wikilink, or exact lookup for known things;
2. lexical search for named concepts;
3. hybrid retrieval for fuzzy concepts;
4. followed links only until the request is interpretable.

Load the schema/template and specialist procedure for each plausible target. For a batch, inventory the entire input set before processing individual files.

For every prospective concept, decide whether it:

- patches an authoritative owner;
- merits a new standalone node;
- belongs inside an existing page;
- is evidence rather than world truth;
- is derived presentation;
- is an asset;
- needs no durable write.

Prefer one owner and links over copied meaning.

**Complete when:** every prospective write has an owner or a justified new-node decision, and likely duplicates are resolved.

## 3. Classify each representation

Assign both a semantic layer and a representation:

### Semantic layer

- **Knowledge** — authored truth, belief, rules, established facts, reusable identities.
- **Work** — planning, possibilities, preparation, and unresolved creative material.
- **Runtime** — derived material for running or presentation.

### Representation chain

`kind → subtype → schema trait → component → evidence → renderer → asset`

Use a `kind` only when another page or query must cite the thing as an independent node and it has a distinct contract, relationships, lifecycle, compiler, or authoring method. A session transcript is evidence, not a kind. A running guide is a renderer, not a second canon. A PC `pc-state` is a component, not a page.

Read `CONTEXT.md` and `docs/adr/0013-content-classification.md` when identity is uncertain. Keep source/source-entry material in the publication evidence model.

**Complete when:** every graph node has one layer, one representation, and one authoritative owner.

### Novel-kind admission

When no registered representation is semantically honest, pause the instance at `classification` and run this ordered branch:

1. Retrieve every plausible existing kind, subtype, schema trait, component, evidence, renderer, and asset representation. Record why each candidate does or does not own the subject.
2. Research the campaign-facing use of the subject and comparable representations. Preserve the source as evidence; research does not become campaign canon by itself.
3. Admit a kind only when the subject is independently citable, has a materially distinct contract/relationship/lifecycle/compiler/authoring method, and cannot fit an existing representation (ADR-0013).
4. Scaffold `_system/schemas/<kind>/` with `schema.yaml`, `template.md`, `lint.yaml`, and `quality.yaml`. Put the compact `atomicity` owner contract in `schema.yaml` (`subject`, `owns`, `links_out`, and structured owner signals when needed).
5. Run `npm run doctor`; create the first instance only after the package is complete and registered. Record the subject's `created-owner` terminal in the source-hash decomposition receipt.

**Complete when:** the subject has one registered owner representation, the complete package validates, the first instance (if admitted) uses its template, and the receipt has no classification gap.

## 4. Assign autonomy

Label every operation exactly once.

| Label | Use for | Agent action |
|---|---|---|
| `AUTO` | established-structure work and permitted reversible changes | execute through validation |
| `GRILL` | creative intent required before planning | retrieve first, ask a coherent round, echo a charter, then continue |
| `GATE` | authority-sensitive state transition | do safe prerequisites, present the smallest decision, pause only at that decision |

### AUTO

Ingestion, normalization, classification, organization, link repair, metadata migration, provenance-preserving extraction, obvious transcription correction, validation, deterministic compilation, indexing, rendering, bulk processing, reconciliation analysis, and reversible connective tissue stay automatic. Continue through all non-gated work once invoked.

### GRILL

Grill before autonomous creative execution of a full session plan, campaign plan, new campaign, or major campaign architecture. Also grill when existing canon cannot supply consequential intent needed for success.

Retrieve first. Resolve player promise, desired experience, tone, gravity, anchors, boundaries, constraints, scope, horizon, preparation depth, and exclusions. Preserve variables the user already supplied. Start planning only after a concise charter distinguishes success from a merely plausible plan.

### GATE

Gate changes to locked canon, contradictions or promotions of established canon, retcons, consequential campaign commitments not already authorized, event lifecycle, Campaign Now, protected Runtime, player-owned build choices, and unset publication ingest policy.

Gates protect authority, not architecture. Complete safe analysis and proposed patches before asking. After approval, continue without reopening settled questions.

**Complete when:** each operation has one authority label and no human question is attached to an `AUTO` operation.

## 5. Build the minimum work graph

Order nodes by dependency. Apply these priorities:

1. patch before mint;
2. canonical owner before projection;
3. link before copy;
4. specialist craft before generic prose;
5. deterministic consequence before LLM derivation;
6. durable node only when future citation or retrieval justifies it.

Do not copy detailed craft rules from a downstream skill. Invoke that skill and preserve the canonical owner between handoffs.

Examples:

- one named item → one item page, if it merits a node;
- playable session → session-plan plus only the situations, beats, encounters, places, items, NPCs, or other nodes that need independent ownership;
- multi-year campaign → campaign-plan, seasons, high-value anchors, and low-resolution possibilities, not hundreds of premature pages;
- reconciled session → evidence interpretation first, then only the canonical, Runtime, report, and gated owners supported by the claim ledger.

**Complete when:** every part of the requested outcome is covered, dependencies are ordered, each node has an owner/procedure/completion test, and no duplicate or orphan artifact is planned.

## 6. Execute at the right scale

### Small work

For one or a few independent targets, execute the graph directly. Keep the procedure proportional; a trivial request does not need a bulk pipeline.

### Bulk work

For tens or hundreds of inputs:

1. inventory every input;
2. identify format families and shared transformations;
3. classify the corpus;
4. separate normal cases from semantic outliers;
5. process homogeneous cases in batches;
6. handle outliers individually;
7. validate each result and the corpus;
8. account for every original input.

Use deterministic transformation for deterministic structure, cheap inference for routing and extraction, and general reasoning for semantics or reconciliation. Sampling calibrates a transformation; it never replaces per-item acceptance.

Each input ends as exactly one of:

- successfully represented;
- intentionally merged into an existing owner;
- intentionally retained as evidence/raw material;
- skipped with a reason;
- blocked by a specific diagnostic or human gate.

Scale changes execution strategy, never schema, provenance, canon, or content-quality requirements.

**Complete when:** every input has one terminal result and each successful output meets the single-item acceptance bar.

## 7. Handoff to specialists

Use the narrowest procedure for authored meaning: campaign planning, session composition, narrative islands, beats, places, dungeons, items, vehicles, statblocks, player prose, PC mechanics, ingestion, or another available domain skill.

Pass each specialist:

- its canonical owner and accepted inputs;
- relevant scope, audience, canon, and constraints;
- dependencies already satisfied;
- the completion test and required provenance;
- any unresolved diagnostic or gate.

The specialist returns authored output, diagnostics, and newly discovered dependencies to this graph. It does not quietly mint a parallel architecture or claim ownership outside its contract.

**Complete when:** every authored node was handled by its quality-owning procedure, or the absence of a specialist is explicit and the work is ordinary campaign reasoning.

## 8. Derive consequences

After authored changes, run the deterministic operations those changes require. Agents establish meaning; compilers establish mechanically derivable consequences.

Use the current compiler for geography, time, PC projections, party knowledge, and other compiler-owned Runtime. Use assembly/rendering for presentation rather than copying canon into a second source. Refresh retrieval indexes after bulk canonical writes.

Read `docs/adr/0015-deterministic-compilation-boundary.md` when ownership is uncertain. Compiler JSON is read-only.

**Complete when:** every required derived artifact is current and no LLM-authored duplicate of compiler-owned state exists.

## 9. Validate the outcome

Run the appropriate schema, doctor, link, compilation, provenance, and domain-quality checks. For reconciliation or ingestion, preserve evidence and diagnostics instead of resolving ambiguity by invention.

For bulk work, validate each artifact and corpus integrity: collisions, duplicates, broken relationships, and unaccounted inputs. Repair safe failures autonomously and rerun checks. Escalate only missing authority, missing creative intent, or a diagnostic that cannot be resolved safely.

**Complete when:** the requested outcome exists, every artifact has one owner, applicable checks pass, derived state is current, every input is accounted for, and unresolved issues are explicit diagnostics or human decisions.

## 10. Report at the user's level

Report:

- what was created, changed, ingested, reconciled, or derived;
- architectural choices only when they affect use;
- remaining diagnostics;
- exact human decisions still required.

Describe the result in campaign terms first and implementation terms second. The user should be able to ask for a sword, a hundred imported files, next week's session, or a three-year campaign without learning the ontology first.

## Completion bar

The decomposition is finished only when the work graph has been executed through validation: every requested outcome is represented by its correct owner, every dependency and input has a terminal result, every specialist and compiler has been invoked where required, every gate is isolated, and no duplicate truth or hand-authored derived state remains.
