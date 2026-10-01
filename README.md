# Campaign Foundry

A DM's D&D campaign Wiki, kept by coding agents working in this repo. Start with `AGENTS.md`.

## Setup

1. Install Bun 1.3.14, then run `bun install --frozen-lockfile`. `bun.lock` is the committed dependency graph; keep `node_modules/` untracked.
2. `bun run setup` syncs the pinned Vale style packages. Vale 3.23 or newer must be on your PATH.
3. `bun run check` gates the Wiki; `bun run cf --help` lists the other commands.

Add or update dependencies with `bun add` or `bun update`; commit `package.json` and `bun.lock` together. Use frozen installs in automation so dependency drift fails rather than silently rewriting the lockfile.
