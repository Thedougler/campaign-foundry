---
name: audit
description: Fixes the rot between pages that the per-page gate cannot see — each fix decided by Canon precedence, logged, never put to the DM. Use after every Ingest over the pages it touched and their linked neighbours, when the DM asks to audit or tidy — named pages, a named claim, or the whole Wiki only on that ask — and whenever one page is found saying what another contradicts.
---

# Audit

The gate checks each page alone. Audit checks that the pages agree with each other and with what has happened since, and fixes what it finds by Canon precedence, never by asking the DM (ADR 0003). Three findings carry the run: **contradiction**, **stale**, **duplicate**; an answer that earns none of them is **current** and stays.

## Steps

1. **Scope.** One of four runs:
   - **An Ingest's pages** — the handoff after an Ingest, or the DM naming one ("audit the pages the last Ingest touched"): the World's `log.md` lists them as the `- [[Page]]` bullets under that Ingest's `## [date] ingest | <file>` entry.
   - **The DM's pages** — the pages the DM names.
   - **A named claim** — the DM names one claim or question ("the claim about who holds this office"): the run compares that question's answers only, never every claim on the pages it reads.
   - **The whole Wiki** — every page under the World's folder, only when the DM asks for the whole Wiki.

   A page run grows by its neighbours: every page a listed page links, and every page linking to a listed page (a `[[<name>]]` search across the World finds the inbound ones). A named claim grows no list: its reach is the question, answered wherever the Wiki states it (Compare). Write the page list down and name the slice — the Ingest entry's title, "the pages the DM named, plus neighbours", or the claim — the report carries that name. The slice bounds which subjects get audited, never which pages a fix may touch (Fix). Done when the list is written and the slice is named.
2. **Claims.** Read every page in scope, records included, and list each claim that can go stale or conflict, keeping its page and line. A named-claim run lists one claim. What counts: `summary` first, then the At a glance lines (**Held by.**, **Ruled by.**, **Found at.**, **Occupants.**, **Prize.**, status), Play facts, rumours told as current truth, Depth — history and hidden truths — and sentences inside a `[!narration]` callout: every line that says something is true now about a subject, whether it names the subject by link or in plain words.

   Records are evidence and stay outside every edit: a Recap, a Previously On, and the Prep and Scene pages of a played Session (played once its Recap exists) record what was planned and what the table said, so a Prep line that says where a thing is says what the Scene was for, not what is true now. `hot.md`, `index.md` and `log.md` belong to their tools — Ingest and Prep rewrite `hot.md` after the audit, `bun run cf -- index` and `bun run cf -- log` write the others. Done when every page in scope has yielded its claims.
3. **Compare.** One subject at a time (an NPC, Location, Item, Faction, Creature, Thread, Quest), one question at a time: the unit of comparison is the **question** a claim answers — who holds or rules this, who has this thing, who leads or serves whom, where someone or something is, whether someone is alive, what an allegiance or a status is, when, how many. Two present-tense answers to the same question are one comparison. Gather every answer past the slice by search — qmd by meaning, a `[[<name>]]` search by link, and a plain-text search for the subject's name, its variants and the question's own phrases, because a page can state an answer without linking its subject, or without naming it at all — never by reading the Wiki page by page: the subject's own page is one answer, and so is every mention; a `summary` line, a rumour and a hidden truth are answers. Set the answers against each other and against the latest record that touches the question — the newest Recap, Previously On or archived Transcript, or the DM's own words. A question no record touches is compared all the same: the answers stand against each other, and what can surface there is a contradiction. Mark every answer:
   - **Current** — no finding against it.
   - **Stale** — a present-tense answer a later event overtook. An event is not a dispute: a Recap in which an NPC dies makes "is alive" stale. Decide staleness per proposition, never per sentence: set the fact's meaning and time against the event, and mark stale only where the evidence entails the claim is no longer true. Every fact the event does not entail false is independent — it keeps its meaning and its tense. Current state and explicit history are told apart by meaning alone, never by tense, keyword or the record a line cites: a historical claim is never stale, and a present claim is not history because it cites one.
   - **Contradiction** — two answers that cannot both be true now, with no event to settle them.
   - **Duplicate** — two pages for one thing under different names. The give-away is a page whose subject fits inside another's: same kind, same role or place, same Creature, a variant or nickname of the name.

   Done when every present-tense answer to every question the run raised carries a mark. The search is how answers are found, not the test of done.
4. **Decide** each finding by Canon precedence:
   - What the DM says — to the Agent, or at the table as a Transcript records it — beats the Wiki; the Wiki beats Raw.
   - The latest event is the current truth; the past stays as history.
   - Between Wiki answers with no event to settle them, rank by how the answer is stated, not by which page the run started from. For the question's fact, name its subject — the page whose subject the fact is about — and that page states it **directly**: an NPC's own **Role** for an office, an Item's own **Held by** for custody. Any other page stating it carries a **mention**. One line can be both: a Settlement's **Ruled by** is direct about who rules the Settlement, and a mention of the office the office-holder's own **Role** states directly. Direct beats mention, whichever page the DM named. Between answers of the same rank, a `sources` trail or a later log entry wins. When nothing settles it — two equally direct answers included — neither answer is asserted as current truth and none is invented: each is restated as an attributed, conflicting claim, so the pages record that the question is open and who claims what, and one log entry names the question and both answers.

   Done when every finding has its outcome — a winner with its reason and the pages that will change, or a tie restated as conflicting claims with its log entry.
5. **Fix.** Rewrite a stale or losing answer on every page that states it, including pages outside the slice; the winner's own page stays as it is unless it is itself stale. Change only what the finding reaches: the losing proposition restated to the evidence, with the overtaken fact kept as history in the past tense — surrounding words may shift where grammar requires, and every independent fact keeps its meaning. The rewrite is made of facts the deciding evidence already states, and nothing past them. A claim stated in `summary` is fixed there too. A fact told on two pages stays on the subject's own page; the other page links to it. A page that states nothing needing change stays byte-for-byte.
   - **Duplicate:** merge into the page more links point to (count them). Keep every fact from both: the loser's history, hidden truths and Creature link land in the winner's template sections, and the winner keeps its own Narration. Retarget every link to the loser, delete the loser, and leave no redirect stub.
   - **Narration:** a stale answer inside a `[!narration]` callout is still an answer. Hand `theatre-of-the-mind` the one callout whose words state the now-false claim, and only those words; a first look that does not state it stays as written.

   Done when every decided change is on its pages and each overtaken fact survives as history.
6. **Close.** A final sweep before any entry: for every decided question, search again as Compare gathered and reread every page an answer was found on — an answer the decision retired or left unresolved that still stands asserted as current truth returns to Fix. Then one log entry per finding, titled with what changed and why — never one entry for the whole audit:

   ```bash
   bun run cf -- log --world <World> --op audit --title "<what changed> (<why>)" --page <Page>
   ```

   For example `--title "Tie restated as conflicting claims (nothing settles it)"`. A merge's `--page` flags name the surviving page and retargeted pages, never the deleted page. Run `bun run cf -- index` once, then the full `bun run cf -- check --fix` / `bun run cf -- check`. Resolve form findings without changing facts and report any remaining findings. Done when the final claim sweep, each finding's log entry, index rebuild and full-gate results are complete; a page filter is not completion evidence.
7. **Report.** One short line per subject fixed. A slice run names its slice — the Ingest entry, the DM's pages, the named claim — never "the whole Wiki". The report asks nothing: no question, no approval, no choice offered.

## Done

- Every question the run raised — a named claim, that question alone — had each of its present-tense answers marked — current, stale, contradicted or duplicate — and every finding was decided by precedence: a winner fixed, or a tie restated as conflicting claims and logged. Records and untouched pages are byte-for-byte.
- Each finding has its own `audit` log entry saying what changed and why; the past stayed as history, every fact the evidence leaves true survived, and nothing was invented past the evidence.
- The full unified gate passes or remaining findings are reported, `bun run cf -- index` has run, and the report asked the DM nothing.
