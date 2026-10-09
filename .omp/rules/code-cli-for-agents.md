---
description: Load cli-for-agents before writing or changing a code or config file.
condition: '\S'
scope: "tool:write(**/*.{ts,mts,js,mjs,py,json,yaml,yml,toml,sh,ini,css,html}), tool:edit(**/*.{ts,mts,js,mjs,py,json,yaml,yml,toml,sh,ini,css,html})"
---

Before writing or changing a code or config file, read `skill://cli-for-agents` (at `~/.agents/skills/cli-for-agents/SKILL.md` when `skill://` does not resolve) and follow it, then make the edit.
If you already loaded that skill this session, continue with the edit.
