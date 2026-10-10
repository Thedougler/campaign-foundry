import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const FETCH_TIMEOUT_MS = 15_000;
const GIT_TIMEOUT_MS = 10_000;

// At main-session start, fetch the current branch's upstream and fast-forward when the
// checkout is only behind it. A branch with local commits, or a fast-forward git refuses
// (uncommitted edits to incoming files, a merge or rebase in progress), is reported, never forced.
export default function gitSync(pi) {
	pi.on("session_start", async (_event, ctx) => {
		if (ctx?.agent?.kind === "sub") return;
		const git = (args, timeout = GIT_TIMEOUT_MS) => pi.exec("git", args, { cwd: repoRoot, timeout });
		const note = (message, level = "info") => ctx.ui.notify(`git sync: ${message}`, level);

		const upstream = await git(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"]);
		if (upstream.code !== 0) return;
		const ref = upstream.stdout.trim();

		const fetched = await git(["fetch", "--quiet", "--no-tags", ref.split("/")[0]], FETCH_TIMEOUT_MS);
		if (fetched.code !== 0) {
			note(`could not fetch ${ref} (${fetched.killed ? "timed out" : fetched.stderr.trim().split("\n")[0]})`, "warning");
			return;
		}

		const counts = await git(["rev-list", "--left-right", "--count", "HEAD...@{u}"]);
		if (counts.code !== 0) return;
		const [ahead, behind] = counts.stdout.trim().split(/\s+/).map(Number);
		if (!behind) return;
		if (ahead) {
			note(`${ref} has ${behind} new commit(s) and this branch has ${ahead} unpushed; not pulled`, "warning");
			return;
		}

		const merged = await git(["merge", "--ff-only", "--quiet", "@{u}"]);
		if (merged.code !== 0) {
			note(`${behind} commit(s) behind ${ref}; fast-forward refused: ${merged.stderr.trim().split("\n")[0]}`, "warning");
			return;
		}
		note(`fast-forwarded ${behind} commit(s) from ${ref}`);
	});
}
