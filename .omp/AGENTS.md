# Campaign Foundry in oh-my-pi

@../AGENTS.md

## Wiki access

Read `docs/agents/wiki-search.md` for query grammar and citation mapping. `user-config.md` defines the vault and repository roots.
- **Backup:** Notion page `campaign-foundry backup` (`3f20216635ec815c9ba6dacbda0f6f1b`) mirrors main; scope searches to it and cite pages by their repository-path headers.
- **Writes:** edit `wiki/`, reading each page immediately before changing it; Notion edits are overwritten by sync.
- **Local reads:** QMD and `wiki/` cover unpushed work, other Campaigns, Raw, Archive, aliases and sessions without Notion tools. Read Campaign configuration, hot, index and log files locally.

## Native delegation

`docs/agents/delegation.md` describes project agents and dispatch mechanics.

## Tools

The Notion MCP configuration lives in user `~/.omp/agent/mcp.json`. Library documentation uses the `ctx7` CLI. The mnemopi memory backend supplies background context; repository facts and current DM instructions take precedence.
