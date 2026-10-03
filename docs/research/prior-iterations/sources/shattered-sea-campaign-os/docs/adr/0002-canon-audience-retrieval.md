# ADR-0002: Canon, Audience, and Retrieval

**Status:** Accepted
**Date:** 2026-08-16
**Amended by:** [ADR-0018](0018-adaptive-vault-locality.md) for locality and collection boundaries; [ADR-0019](0019-external-references.md) for external evidence
**Absorbs:** former ADR-0002, ADR-0004, ADR-0010

How truth is ranked, who may see a page, and how agents find it.

---

## 1. Canon Authority Model

*(former ADR-0002; fifth state added 2026-08-17 by [ADR-0013](0013-content-classification.md); collection name remains `sources` per [ADR-0014](0014-provenance-backed-source-corpus.md))*

### Context

LLMs treat all text as equally authoritative. "An agent wrote this" becomes indistinguishable from "the DM established this." Over time, provisional agent-generated content silently hardens into assumed truth, and "NPC believes X" mutates into "X is true."

### Decision

Every page carries a `canon` property with five states:

- **locked** — explicit human intent; agents preserve unless asked to revise
- **established** — accepted campaign/world truth; agents may elaborate but not contradict
- **provisional** — working truth, not yet important enough to protect strongly
- **noncanon** — ideas, alternatives, discarded possibilities, inspiration
- **reference** — externally grounded evidence, never campaign or setting truth. Fidelity requirements are defined by the evidence kind; agents do not elaborate external evidence into world truth. Required on `source`, `source-entry`, and lightweight `reference` pages, with `scope: reference`.

New content defaults to `provisional`. Promotion to `established` or `locked` is a human decision.

In-world epistemic state is tracked separately in prose. A canonical page can truthfully state that a rumor is widespread but false. The existence of the rumor is canonical; the rumor's content is not objectively true.

### Consequences

- Agents must check `canon` before modifying any page
- `locked` pages are effectively read-only for agents
- The creative authority ladder (preserve → develop → invent → propose → human decision) maps onto canon levels
- External source lore never silently outranks campaign truth — ingestion proposes applicability, the DM decides canon

---

## 2. QMD Retrieval with Progressive Disclosure

*(former ADR-0004)*

### Context

At scale, agents cannot read a vault index and hope for the best. Full-vault scans are expensive and noisy. But jumping to semantic reranking for every query wastes compute when exact name lookup would suffice.

### Decision

QMD provides the retrieval layer with four collections: `wiki`, `sources`, `system-references`, and `archive`. Mechanical lookup searches `wiki` and `sources` with frontmatter filters. World and lore queries must not treat `source-entry` pages as setting truth. Legacy layer names are migration aliases, not normal collections.

Agent retrieval follows a cost ladder:
1. Known entity → direct path / wikilink / exact lexical search
2. Named concept → BM25 search
3. Conceptual/fuzzy → hybrid QMD query (BM25 + vector + rerank)
4. Broader understanding → retrieve top docs → follow wikilinks → stop when sufficient

`_system/state/atlas.md` provides agent orientation (campaign state, knowledge domain sizes, important hubs). It tells agents where they are; QMD tells them what to read.

### Consequences

- Cheap queries stay cheap; expensive semantic search only fires when semantics are actually needed
- Collections create retrieval boundaries — an agent searching rules doesn't wade through session reports
- `_system/evals/` validates retrieval quality after structural changes
- QMD collections must be re-indexed after bulk writes

---

## 3. Secrecy Is Audience, Phase, and Reveals

*(former ADR-0010)*

### Context

Future intentions and offscreen history must not leak into player-facing generation. A second `access` field plus `qmd://dm-secrets` and a stored `qmd://party-knowledge` collection would duplicate canonical notes and still fail the harbormaster case. Collection boundaries are `wiki`, `sources`, `system-references`, and `archive`; party knowledge remains a projection.

### Decision

No `access` field. No new source collections. Retrieval profiles are query filters over `audience`, event `phase`, and Campaign Now. Player-safe retrieval cannot see pages whose `audience` lacks `player`, and cannot see `phase: pending` narrative events. Partial knowledge is additional `kind: event` pages with `reveals: []` pointing at **other events**, not entity pages. World-truth splits when knowledge can: death and perpetrator are different events so a reveal cannot over-disclose. Party knowledge is a compiled event-ID projection, not a page collection; canonical pages stay put ([ADR-0015](0015-deterministic-compilation-boundary.md)).

Recorded time is not a page field. Reconciliation writes temporal evidence into system state; the event keeps `sources:` as the human-visible pointer.

### Consequences

- A pending ambush is an ordinary `kind: event` with `audience: [dm]` and `phase: pending`
- "They know the harbormaster is dead but not who" is two (or three) events, not a redacted copy of one page
- Adding a secrets collection later would require superseding both this section and §2
- Storing a page allow-list as party knowledge would require superseding this section and [ADR-0015](0015-deterministic-compilation-boundary.md)
