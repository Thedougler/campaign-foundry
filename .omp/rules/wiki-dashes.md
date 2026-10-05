---
description: Wiki prose carries no em or en dashes.
condition: "[—–]"
scope: "tool:write(wiki/**/*.md), tool:edit(wiki/**/*.md)"
---

The gate fails every em or en dash in Wiki prose (`ai-tells.EmDashUsage`, and `Narration.NoEmDash` inside narration callouts).
Rewrite the clause with a full stop, a comma or "and"; write ranges as `3 to 5`.
