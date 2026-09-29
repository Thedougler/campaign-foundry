import { basename, join } from "node:path";
import { UsageError } from "../check/run.ts";
import { appendLogEntry, today } from "../vault/log.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { buildPlan } from "./adventure.ts";
import type { DocType, Plan, PlanDoc } from "./adventure.ts";
import { diff, docKey, manifestPath, readManifest, writeManifest } from "./manifest.ts";
import type { Change, Manifest } from "./manifest.ts";
import { installModule, writeModule } from "./pack.ts";

export interface PushOptions {
	/** Absolute vault directory. */
	vault: string;
	/** Absolute repository root: the manifest lives under `<root>/.push/` and the default output under `<root>/build/push/`. */
	root: string;
	campaign: string;
	session: number;
	/** Absolute module folder to build (default `<root>/build/push/<module id>`). */
	out?: string;
	/** Absolute Foundry `Data/modules` folder to copy the built module into. Never defaulted. */
	install?: string;
	/** Include every document, changed or not. */
	all?: boolean;
	/** Plan and report; write nothing. */
	dryRun?: boolean;
	now?: () => Date;
}

export type Counts = Record<DocType, Record<Change, number>>;

export interface PushResult {
	plan: Plan;
	counts: Counts;
	/** Documents in the pack: the added and updated ones. */
	changed: { type: DocType; id: string; name: string; change: Change }[];
	/** True when nothing changed since the last Push and nothing was packed. */
	upToDate: boolean;
	dryRun: boolean;
	/** Absolute module folder, when a module was built. */
	modulePath?: string;
	installedTo?: string;
	manifest: string;
	/** Vault-relative `log.md` written, when a push entry was appended. */
	logged?: string;
	/** Names of the pages whose documents were packed. */
	pages: string[];
	version?: string;
}

const emptyCounts = (): Counts =>
	Object.fromEntries((["JournalEntry", "Actor", "Item", "Scene", "Folder"] as const).map((t) => [t, { added: 0, updated: 0, unchanged: 0 }])) as Counts;

export async function runPush(options: PushOptions): Promise<PushResult> {
	const vault = buildVault(options.vault, await readVaultFiles(options.vault));
	const plan = await buildPlan(vault, { campaign: options.campaign, session: options.session });
	const path = manifestPath(options.root, plan.world, plan.campaign);
	const previous = await readManifest(path);
	const compared = diff(plan.docs, previous, options.all ?? false);

	const counts = emptyCounts();
	for (const { doc, change } of compared) counts[doc.type][change]++;
	const changedDocs: PlanDoc[] = compared.filter((c) => c.change !== "unchanged").map((c) => c.doc);
	const changed = compared.filter((c) => c.change !== "unchanged").map(({ doc, change }) => ({ type: doc.type, id: doc.id, name: doc.name, change }));
	// A folder or an unchanged-only Push carries no page; the log lists pages, not folders.
	const pages = [...new Set(changedDocs.filter((d) => d.path !== "").map((d) => basename(d.path).replace(/\.md$/, "")))].sort();
	const result: PushResult = { plan, counts, changed, upToDate: changedDocs.length === 0, dryRun: options.dryRun ?? false, manifest: path, pages };
	if (result.upToDate || options.dryRun) return result;

	const version = `0.${(previous?.pushes ?? 0) + 1}.0`;
	const out = options.out ?? join(options.root, "build", "push", plan.moduleId);
	await writeModule({ out, plan, changed: changedDocs, version });
	result.modulePath = out;
	result.version = version;
	if (options.install) result.installedTo = await installModule(out, options.install, plan.moduleId);

	if (pages.length > 0) {
		const entry = { date: today((options.now ?? (() => new Date()))()), op: "push", title: `Pushed Session ${plan.session} of ${plan.campaign} to Foundry`, pages };
		const appended = await appendLogEntry(options.vault, plan.world, entry, { example: `cf log --world ${plan.world} --op push --title "${entry.title}"` });
		if (appended.status === "error") throw new UsageError(appended.message, appended.hint);
		result.logged = appended.path;
	}
	const manifest: Manifest = {
		version: 1,
		adventureId: plan.adventureId,
		moduleId: plan.moduleId,
		pushes: (previous?.pushes ?? 0) + 1,
		docs: { ...(previous?.docs ?? {}), ...Object.fromEntries(plan.docs.map((d) => [docKey(d), { hash: d.hash, name: d.name, path: d.path }])) },
	};
	await writeManifest(path, manifest);
	return result;
}

