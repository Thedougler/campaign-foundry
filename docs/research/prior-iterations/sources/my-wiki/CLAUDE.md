# my-wiki — Personal Life OS

An Obsidian vault combining an LLM-wiki knowledge base with an ADHD-friendly life management system.
Two agents share this vault: a human (via Obsidian mobile + Sync) and an AI (via git + MCP).

## Quick Start

1. Run `/wiki-load` at session start to load wiki state into context
2. If load fails, run `/wiki-setup` first

## API Keys

Read `.env` for connection details:
- `LOCAL_REST_API_KEY` — Bearer token for Obsidian Local REST API
- `LOCAL_REST_API_URL` — REST endpoint (default `https://127.0.0.1:27124/`)

## Vault Structure

All content lives inside `wiki/`. Project-level config (CLAUDE.md, .env, .git) stays at root.

```
wiki/
├── index.md          Master catalog (AI-maintained)
├── hot.md            Session context cache (AI-maintained)
├── log.md            Operation log (AI-maintained)
├── concepts/         Concept pages (AI-owned, lazy-created)
├── entities/         Entity pages (AI-owned, lazy-created)
├── sources/          Source pages (AI-owned, lazy-created)
├── inbox/            Quick capture landing zone
├── daily/            Daily notes (YYYY/MM/YYYY-MM-DD.md)
├── periodic/         Weekly, monthly, quarterly, yearly reviews
├── projects/         Time-bound active work
├── areas/            Ongoing life domains (health, finance, career, etc.)
├── people/           People notes / CRM
├── resources/        Reference material
├── archive/          Completed/inactive items
├── dashboards/       Dataview-powered human command center
├── templates/        Templater templates
└── attachments/      Images and files
.raw/                 Raw ingest material (AI-owned, outside wiki/)
```

## Ownership Rules

| Directory | AI writes? | Human writes? |
|-----------|:---:|:---:|
| `wiki/index.md`, `wiki/hot.md`, `wiki/log.md`, `wiki/concepts/`, `wiki/entities/`, `wiki/sources/`, `.raw/` | Yes | No |
| `wiki/inbox/`, `wiki/daily/`, `wiki/periodic/`, `wiki/projects/`, `wiki/areas/`, `wiki/people/`, `wiki/resources/`, `wiki/archive/` | Read only | Yes |
| `wiki/dashboards/`, `wiki/templates/` | Read only | Yes (with AI assistance) |

The AI may suggest changes to human-owned files but must not write them directly without
explicit instruction. This prevents sync conflicts between Obsidian Sync and git.

## Wiki Knowledge Base

When you need context not in this session:
1. Run `/wiki-load` if wiki state is not already in context
2. Read `wiki/hot.md` first (~500 words, recent context)
3. If not enough, read `wiki/index.md`
4. For domain specifics, read `wiki/<domain>/_index.md` if present
5. Only then drill into individual wiki pages

Do not read the wiki for general tasks unrelated to the vault's domain.

## Frontmatter Schema

Every note has `type` and `created` at minimum. The `type` field is the discriminator:

- `daily`, `weekly`, `monthly`, `quarterly`, `yearly` — periodic notes
- `project` — time-bound goal (fields: status, priority, due, area)
- `area` — ongoing life domain
- `task-note` — standalone task with context
- `person` — people notes
- `inbox` — unprocessed capture (field: processed)
- `concept`, `entity`, `source` — wiki pages (AI-owned)
- `dashboard` — Dataview command center page

Status values for projects: `active`, `paused`, `blocked`, `complete`, `abandoned`.
Priority values: `high`, `medium`, `low`.

## AI Capabilities

When working in this vault, the AI can:
- Summarize recent daily notes and surface patterns
- Flag overdue tasks or stalled projects
- Maintain `wiki/hot.md` as a session context cache
- Ingest external knowledge into `wiki/`
- Read `wiki/areas/` and `wiki/projects/` to understand life context
- Suggest next actions based on project state

## Git

After any wiki write or other change, commit and push to the remote as the final step of every operation. Commit directly to main — this is a solo content repo. Use the `gh` CLI for any GitHub operations (viewing PRs, checking runs, etc.).

## Conventions

- Wikilink liberally: `[[Page Name]]`
- Tags use flat namespace: `#project`, `#area`, `#person`, `#someday`
- Dates in frontmatter use ISO 8601: `YYYY-MM-DD`
- File names use title case for content, kebab-case for system files
- No nested frontmatter — all fields are flat YAML
