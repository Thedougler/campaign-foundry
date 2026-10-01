import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("../../../scripts/qmd-refresh.sh", import.meta.url));
const mutations = new Set(["write", "edit", "apply_patch", "bash", "eval"]);

export default function qmdRefresh(pi) {
  const refresh = (payload) => {
    const result = spawnSync("bash", [script], {
      input: JSON.stringify(payload),
      encoding: "utf8",
      timeout: 5000,
    });
    if (result.error || result.status !== 0) {
      console.error("qmd-refresh: could not start refresh", result.error ?? result.stderr ?? result.status);
    }
  };

  pi.on("session_start", () => refresh({ hook_event_name: "SessionStart" }));
  pi.on("tool_result", (event) => {
    if (event.isError || !mutations.has(event.toolName)) return;
    const input = JSON.stringify(event.input ?? {});
    refresh({
      hook_event_name: "PostToolUse",
      tool_name: event.toolName,
      tool_input: event.input ?? {},
      ...(input.includes("vault://") ? { file_path: "wiki/" } : {}),
    });
  });
}
