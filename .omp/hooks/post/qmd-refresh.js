import { lstatSync, realpathSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const script = fileURLToPath(new URL("../../../scripts/qmd-refresh.sh", import.meta.url));
const liveRoots = ["wiki", "raw", "archive"].map((name) => {
  try {
    return realpathSync(join(repoRoot, name));
  } catch {
    return null;
  }
}).filter(Boolean);
const mutations = new Set(["write", "edit", "apply_patch"]);

function isInside(parent, candidate) {
  const path = relative(parent, candidate);
  return path === "" || (path !== ".." && !path.startsWith(`..${sep}`) && !isAbsolute(path));
}

function protectedRunner(ctx) {
  return ctx?.agent?.kind === "sub" && ["test-subject", "prose-grader"].includes(String(ctx.agent.name).toLowerCase());
}

function fileInputPath(value, cwd) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) return null;
  if (value.startsWith("vault://_/")) {
    const relativePath = value.slice("vault://_/".length);
    if (relativePath.split(/[\\/]/u).some((part) => part === ".." || part === ".")) return null;
    return join(repoRoot, "wiki", ...relativePath.split(/[\\/]/u));
  }
  if (/^[a-z][a-z\d+.-]*:\/\//iu.test(value)) return null;
  return resolve(isAbsolute(value) ? value : join(cwd, value));
}

function nearestCanonicalPath(candidate) {
  let probe = candidate;
  const suffix = [];
  while (true) {
    try {
      const info = lstatSync(probe);
      if (info.isSymbolicLink()) return null;
      return resolve(realpathSync(probe), ...suffix);
    } catch (error) {
      if (error?.code !== "ENOENT") return null;
      const parent = dirname(probe);
      if (parent === probe) return null;
      suffix.unshift(probe.slice(parent.length + 1));
      probe = parent;
    }
  }
}

function canonicalLiveWrite(value, cwd) {
  const candidate = fileInputPath(value, cwd);
  if (!candidate) return null;
  const canonical = nearestCanonicalPath(candidate);
  if (!canonical) return null;
  return liveRoots.some((root) => root && isInside(root, canonical)) ? canonical : null;
}

function writePaths(toolName, input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return [];
  const value = input;
  const paths = [];
  for (const key of ["path", "file_path", "filePath", "target", "destination"]) {
    if (typeof value[key] === "string") paths.push(value[key]);
  }
  if (toolName === "apply_patch" && typeof value.patch === "string") {
    for (const match of value.patch.matchAll(/^\*\*\* (?:Update|Add|Delete) File: (.+)$/gmu)) paths.push(match[1].trim());
  }
  return paths;
}

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

  pi.on("session_start", (_event, ctx) => {
    if (protectedRunner(ctx)) return;
    refresh({ hook_event_name: "SessionStart" });
  });
  pi.on("tool_result", (event, ctx) => {
    if (event.isError || !mutations.has(event.toolName) || protectedRunner(ctx)) return;
    const livePath = writePaths(event.toolName, event.input ?? {})
      .map((path) => canonicalLiveWrite(path, ctx.cwd))
      .find((path) => path !== null);
    if (!livePath) return;
    refresh({
      hook_event_name: "PostToolUse",
      tool_name: event.toolName,
      file_path: livePath,
    });
  });
}
