# Campaign Foundry

A DM's D&D campaign Wiki, kept by coding agents working in this repo. Start with `AGENTS.md`.

## Setup

1. `pnpm install`
2. `pnpm run setup` (runs `vale sync` for the pinned style packages; `pnpm setup` is a pnpm built-in, so keep the `run`). Vale 3.23 or newer must be on your PATH.
3. `pnpm check` gates the Wiki; `pnpm cf --help` lists the other commands.
