---
description: Load cli-for-agents before writing or changing a script or program file for this project.
condition: '\S'
scope: "tool:write(**/*.{ts,mts,js,mjs,py,sh}), tool:edit(**/*.{ts,mts,js,mjs,py,sh})"
---

Before writing or changing a script or program file (source under `src/`, `scripts/`, `test/` or another code directory), read `skill://cli-for-agents` (at `~/.agents/skills/cli-for-agents/SKILL.md` when `skill://` does not resolve) and follow it, then make the edit.
If you already loaded that skill this session, continue with the edit.
