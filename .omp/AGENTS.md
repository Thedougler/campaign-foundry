# Campaign Foundry in oh-my-pi

@../AGENTS.md

## Wiki access

Read from the Backup and write to `wiki/`. `user-config.md` **Wiki access** defines the vault and repo roots. Before a run's first Backup or QMD search, read `docs/agents/wiki-search.md` for query grammar and citation mapping.

- **Read from the Backup**, the Notion page "campaign-foundry backup" (`3f20216635ec815c9ba6dacbda0f6f1b`), synced on each push to `main` (`docs/notion-backup.md`). Answer general questions, surveys and task context through `xd://mcp__notion_search` scoped to that root, citing each page by the repo path its header gives. Read `campaign-config.md`, `hot.md`, `index.md` and `log.md` by path from `wiki/`.
- **Write to `wiki/`.** Read each page from `wiki/` immediately before editing it, since the next sync overwrites any edit made in Notion. The Wiki takes precedence over the Second Brain.
- **QMD and `wiki/`** answer what the Backup can't: unpushed Wiki work (`git status --short wiki/`, `git diff --name-only @{u} -- wiki/`), pages outside the Shattered Sea Wiki, `raw/`, `archive/`, aliases, and every read in a session without `xd://mcp__notion_search` (Eval Runners, `omp -p`).

## Tools

- **Delegation:** `docs/agents/delegation.md` holds the agent roster, model mechanics and `linter` protocol.
- **Configuration:** the Notion MCP server is configured in user-level `~/.omp/agent/mcp.json`.
