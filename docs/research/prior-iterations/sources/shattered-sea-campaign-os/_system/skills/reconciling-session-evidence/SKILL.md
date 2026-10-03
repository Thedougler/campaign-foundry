---
name: reconciling-session-evidence
description: Use when ingesting campaign-play transcripts, session notes, audio or ASR text, or generated session summaries after a game; when deciding what became true, correcting transcript interpretation, updating a session-report, reconciling Campaign Now or PC state, or surfacing play/canon conflicts.
---

# Reconcile Campaign Play Evidence

Reconstruct what became true from noisy evidence, then route each supported change to its owner. **Evidence fidelity beats prep fidelity:** the transcript may contain errors, but clear play may also revise the prepared world.

**Raw evidence stays immutable.** Normalize interpretation in a sparse, auditable overlay; never rewrite the source transcript to make reconciliation easier.

## Scope and routing

Use this skill for evidence from a D&D session: transcript, audio/ASR text, DM notes, player notes, or a generated session summary. It owns interpretation, provenance, claim extraction, and the reconciliation delta.

Agent conversation history (`~/.claude`, `~/.codex`, `~/.pi`, Copilot session stores, and similar) is not campaign-play evidence. Route it to `wiki-history-ingest` and its source-specific skill. `wiki-ingest` loads this skill when a document is identified as campaign-play evidence; it still owns manifest, index, log, hot-cache, and raw-file bookkeeping.

If one evidence set affects several page kinds, event state, PC state, or Runtime, load `decomposing-campaign-content` before writing the delta. That skill owns the dependency graph; this skill owns the evidence reading.

## Branch references

Load only the branch reached:

- canon conflict, authority, promotion, or retrieval → `docs/adr/0002-canon-audience-retrieval.md`
- Campaign Now, elapsed time, events, or temporal language → `docs/adr/0004-time-and-events.md`
- session lifecycle or Resolution COMPILE → `docs/adr/0005-session-lifecycle.md`
- PC build state or table state → `docs/adr/0007-player-character-mechanics.md`
- unfamiliar content identity → `docs/adr/0013-content-classification.md`
- applying mutations or rebuilding derived state → `docs/adr/0015-deterministic-compilation-boundary.md`

## Working records

Build these records before consequential page edits:

1. **Evidence set** — sources, session identity, start state, and relevant canon.
2. **Correction ledger** — only interpretation changes that are traceable to a raw span.
3. **Discourse map** — segment role and temporal discourse label.
4. **Summary check** — each used summary claim mapped to transcript support or marked `summary-only`.
5. **Claim ledger** — each durable change, source span, confidence, and disposition.
6. **Reconciliation delta** — the narrow patches, gates, diagnostics, and deterministic follow-up.

These records may live in the session-report or the repository's reconciliation patch format. Keep one source of truth; do not create a second canonical transcript.

## 1. Establish the evidence set

Identify the session and load, in this order:

1. raw transcript or notes;
2. generated session summary, if present;
3. session plan and running guide for expected context — Work, not proof of occurrence;
4. existing session-report, if reconciliation already began;
5. Campaign Now at session start;
6. canonical pages directly implicated by the evidence.

Use the retrieval ladder: exact path, alias, or wikilink first; lexical search next; fuzzy retrieval only when exact context fails. Follow links only until the evidence is interpretable.

Treat a generated summary as a candidate-claim index. When a transcript exists, the corrected transcript outranks the summary. When only a summary exists, consequential claims are review items rather than silent canon mutations.

**Complete when:** session boundaries, available evidence, starting state, and directly relevant canon are identified.

## 2. Normalize interpretation and classify discourse

Build the vocabulary before interpreting questionable text:

- registered aliases for PCs, NPCs, places, factions, creatures, items, spells, and other named entities;
- terms from the session plan or running guide;
- established relationships and current circumstances;
- relevant rule or source-entry names.

Use this vocabulary to test ASR substitutions. A wiki match supports a reading; it never overrides clear play.

### Correction rule

Normalize only an **obvious** reading. Safe examples: a unique phonetic alias, an unmistakable rules term, punctuation, duplicate fragments, false starts, an unambiguous speaker continuation, or clearly spoken dice notation.

Keep a reading unresolved when candidates remain plausible, missing words must be invented, speaker identity changes the claim, the wiki conflict could be improvisation, or the correction changes an action, ruling, outcome, relationship, revelation, or other durable fact.

For each material correction, record:

| Field | Required value |
|---|---|
| locator | raw timestamp, line, turn, or span |
| raw | source reading, unchanged |
| normalized | corrected reading or speaker, or unresolved |
| class | ASR, punctuation, duplicate, false-start, speaker, notation |
| support | transcript context and relevant alias/wikilink |
| confidence | `obvious`, `probable`, or `ambiguous` |

Only `obvious` corrections may feed an automatic normalized claim. Carry `probable` and `ambiguous` readings as diagnostics.

Persist the ledger as an evidence overlay or under `## Evidence Corrections` in the session-report. Preserve the raw bytes.

### Discourse map

Classify every segment that could affect durable state before extracting claims:

- DM narration or adjudication;
- player declaration and resulting action;
- resolved mechanic;
- in-character NPC or PC speech;
- planning, speculation, or unconfirmed intention;
- rules discussion;
- joke, tangent, or unrelated OOC conversation.

For temporal language, assign exactly one label: `present`, `historical`, `intention`, `hypothetical`, or `parallel`. Only `present` discourse can advance Campaign Now. Flashbacks are `historical`; flashforwards are `intention` or `hypothetical`; meanwhile scenes are `parallel`.

Speaker identity is not truth authority. NPC speech records an NPC belief or assertion. Player speculation is not an occurrence. An intention is not a completed action. A joke becomes evidence only when the DM adopts it into narration or subsequent fiction treats it as true.

**Complete when:** every state-changing segment has a discourse role and temporal label, every material correction is traceable, and table noise is excluded from extraction.

## 3. Verify the generated summary

For every summary statement that may affect reconciliation:

1. find the supporting transcript span;
2. confirm actor, action, object, outcome, and temporal relationship;
3. repair the summary claim when the transcript clearly differs;
4. drop unsupported generated detail;
5. preserve unresolved ambiguity;
6. mark claims without transcript support `summary-only`.

Record the result in a compact summary check. Corrected transcript evidence wins; a summary never upgrades an unsupported claim into canon.

**Complete when:** every summary-derived claim used downstream has transcript support or an explicit `summary-only` marker.

## 4. Extract durable claims

Extract **what became true**, not everything said. For each claim, record the source span, any correction, confidence, and the likely owner.

Look for:

- events that occurred, began, ended, were prevented, or were cancelled;
- committed future actions that meet the event threshold;
- elapsed world time;
- discoveries and revelations;
- completed player actions and resolved mechanics;
- NPC decisions and durable relationship changes;
- quest, mystery, clue, front, clock, or situation changes;
- items gained, lost, spent, destroyed, attuned, or transferred;
- durable PC mechanical changes;
- explicit DM rulings;
- durable improvised NPCs, places, objects, names, facts, or relationships;
- meaningful status or lifecycle changes.

### Play outranks prep

Clear play establishes improvised information even when prep omitted it. Clear play replaces provisional prep. A conflict with established or locked canon remains evidence plus a human-gated contradiction; preserve the coherent play reading and surface the conflict.

Resolve existing identity before minting a page. Route each claim through the classification chain: kind, subtype, trait, component, evidence, renderer, or asset. Session evidence remains evidence, not `kind: transcript` or `kind: source`.

**Complete when:** every durable claim has provenance and no claim exists solely because it appeared in prep or in the generated summary.

## 5. Reconcile specialized state

Load the relevant ADR before changing that state.

### Time and events

- Only `present` discourse advances Campaign Now.
- Use the weakest precision supported; omit invented timestamps.
- Apply event threshold, scheduled-versus-actual, pending, due, prevented, and cancelled semantics.
- Passing a scheduled time makes a pending narrative event due, not occurred.
- NPC promises and player intentions do not move Now unless the evidence also establishes the required commitment and event state.

### PC state

Keep two outputs separate:

- **table state** — current Runtime at session end;
- **next-session-true build state** — lasting changes that survive into the next session.

A rest restores resources only when the rest occurred. Discard transient expenditures that no longer matter at the session boundary. Player-owned build choices remain human decisions.

### Resolution

If a prepared Resolution beat reached resolution, invoke its COMPILE branch inside reconciliation. It fills the prepared consequence envelope; it does not become a second historian and does not move Campaign Now independently.

**Complete when:** time, events, PC state, Resolution output, and session-report bounds agree at supported precision or expose an explicit diagnostic.

## 6. Build the reconciliation delta and route authority

Map every claim to exactly one disposition:

| Disposition | Owner |
|---|---|
| patch existing canonical page | narrow page edit |
| create justified node | new kind-template page |
| patch current table state | reconciliation-owned Runtime |
| promote lasting PC fact | PC `pc-state` through reconcile |
| fill session report | reconciled account and world bounds |
| fill Resolution envelope | Resolution COMPILE |
| record a ruling | ruling page or agreed ruling owner |
| propose protected change | human gate with evidence |
| retain without mutation | evidence/diagnostic with reason |

Patch existing owners narrowly. Preserve human prose. Use session evidence as provenance; do not copy transcript wording through the vault merely to demonstrate support.

GATE, rather than guess, on locked-canon changes, established contradictions or promotions, event phase, Campaign Now, protected Runtime, player-owned choices, and any reconciliation bundle. Do all safe analysis and proposed patches before presenting the smallest decision.

**Complete when:** every durable claim has one disposition, every mutation has evidence provenance, and every gate is isolated to a concrete human decision.

## 7. Apply and derive

Apply accepted mutations through the repository's validated reconciliation path. Then:

1. compile affected geography, time, PC, or party-knowledge projections;
2. run link repair and doctor/validation;
3. resolve safe structural failures;
4. report genuine ambiguity or gated decisions;
5. refresh retrieval indexes after bulk canonical changes.

Derived JSON is compiler output. Never hand-author a projection to make the reconciliation look clean.

**Complete when:** accepted changes use their correct owner, deterministic consequences are rebuilt, and validation shows no unexplained error introduced by this session.

## Completion bar

Finish only when:

- raw evidence is intact;
- every material correction used is traceable;
- uncertain readings remain uncertain;
- every summary claim used as truth is corroborated or marked `summary-only`;
- OOC noise, jokes, speculation, and unconfirmed intentions stay out of canon;
- clear improvisation is not overwritten to match prep;
- every durable state change has been accounted for;
- every canonical or Runtime mutation points to evidence;
- authority-sensitive changes are surfaced rather than guessed;
- Campaign Now, events, PC state, and session-report bounds agree at supported precision;
- affected projections and validation are clean.

The deliverable is a faithful, auditable reconstruction of play — not a cosmetically clean transcript.

## Example

The plan says the gate remains shut. A transcript has an ASR phrase “the gray opens,” followed by clear DM narration that the gate opens; the generated summary says the party broke it.

Record the unique ASR normalization if context makes it obvious. Map the DM narration as play evidence. Treat the summary's “broke it” as unsupported unless the transcript establishes that action. Extract the gate-opening consequence, cite the raw span, and patch the owning event or place narrowly. Prep does not override play; the summary does not add an unsupported cause.