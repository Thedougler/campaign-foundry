import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { runCheck, UsageError } from "../check/run.ts";
import type { CheckResult } from "../check/run.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { fetchCharacter, PullError } from "./ddb.ts";
import type { FetchLike } from "./ddb.ts";
import { fileOperationLog } from "./log.ts";
import type { OperationLog } from "./log.ts";
import { rewritePcPage } from "./page.ts";
import type { PulledSection } from "./page.ts";
import { computeSheet } from "./sheet.ts";

export interface PullOptions {
	/** Absolute vault directory. */
	vault: string;
	/** Absolute templates directory, for the gate. */
	templates: string;
	/** Absolute repository root, for the gate. */
	root: string;
	/** Working directory the gate's finding paths are relative to. */
	cwd: string;
	/** Only PCs of this Campaign. */
	campaign?: string;
	/** Only these PCs, by page name (case-insensitive). */
	pcs?: string[];
	dryRun: boolean;
	fetch: FetchLike;
	log?: OperationLog;
	now?: () => Date;
}

export type PullStatus = "updated" | "unchanged" | "would-update" | "skipped" | "failed";

export interface PcOutcome {
	pc: string;
	/** Vault-relative page path. */
	path: string;
	status: PullStatus;
	sections: PulledSection[];
	summarySet: boolean;
	added: number;
	removed: number;
	/** Why a PC was skipped or failed. */
	message?: string;
}

export interface PullResult {
	outcomes: PcOutcome[];
	/** Vault-relative paths of the `log.md` files written; empty when no page changed. */
	logged: string[];
	/** The gate over the pulled pages; absent under `--dry-run` or when nothing was fetched. */
	gate?: CheckResult;
}

const PC_PATH = /^([^/]+)\/Campaigns\/([^/]+)\/PCs\/[^/]+\.md$/;

export async function runPull(options: PullOptions): Promise<PullResult> {
	const files = await readVaultFiles(options.vault);
	const vault = buildVault(options.vault, files);
	const all = vault.pages.flatMap((page) => {
		const match = PC_PATH.exec(page.path);
		return match && page.frontmatter?.type === "PC" ? [{ page, world: match[1]!, campaign: match[2]! }] : [];
	});

	const campaigns = [...new Set(all.map((p) => p.campaign))];
	if (options.campaign !== undefined && !campaigns.includes(options.campaign)) {
		throw new UsageError(
			`No Campaign named "${options.campaign}" with PCs.`,
			campaigns.length > 0 ? `Campaigns with PCs: ${campaigns.join(", ")}. Example: cf pull --campaign "${campaigns[0]}"` : "Add a PC page under <World>/Campaigns/<Campaign>/PCs/ first.",
		);
	}
	const inCampaign = all.filter((p) => options.campaign === undefined || p.campaign === options.campaign);
	const wanted = (options.pcs ?? []).map((n) => n.toLowerCase());
	for (const name of options.pcs ?? []) {
		if (!inCampaign.some((p) => p.page.name.toLowerCase() === name.toLowerCase())) {
			throw new UsageError(
				`No PC named "${name}".`,
				inCampaign.length > 0 ? `PCs: ${inCampaign.map((p) => p.page.name).join(", ")}. Example: cf pull --pc "${inCampaign[0]!.page.name}"` : "Add a PC page under <World>/Campaigns/<Campaign>/PCs/ first.",
			);
		}
	}
	const targets = inCampaign.filter((p) => wanted.length === 0 || wanted.includes(p.page.name.toLowerCase()));

	const outcomes: PcOutcome[] = [];
	const changed: { world: string; name: string }[] = [];
	const pulledPaths: string[] = [];
	for (const { page, world } of targets) {
		const base = { pc: page.name, path: page.path, sections: [] as PulledSection[], summarySet: false, added: 0, removed: 0 };
		const url = typeof page.frontmatter?.dndbeyond_url === "string" ? page.frontmatter.dndbeyond_url.trim() : "";
		if (url === "") {
			// Skipped when swept up with the Party; a failure when the DM named this PC.
			const named = wanted.includes(page.name.toLowerCase());
			outcomes.push({
				...base,
				status: named ? "failed" : "skipped",
				message: `${page.name}: no dndbeyond_url in the frontmatter. Add the character's link, e.g. dndbeyond_url: "https://www.dndbeyond.com/characters/<id>".`,
			});
			continue;
		}
		try {
			const character = await fetchCharacter(page.name, url, options.fetch);
			const rewrite = rewritePcPage(page.source, page.path, computeSheet(character));
			pulledPaths.push(join(options.vault, page.path));
			const touched = rewrite.source !== page.source;
			const detail = { ...base, sections: rewrite.sections, summarySet: rewrite.summarySet, added: rewrite.added, removed: rewrite.removed };
			if (!touched) {
				outcomes.push({ ...detail, status: "unchanged" });
			} else if (options.dryRun) {
				outcomes.push({ ...detail, status: "would-update" });
			} else {
				await writeFile(join(options.vault, page.path), rewrite.source);
				changed.push({ world, name: page.name });
				outcomes.push({ ...detail, status: "updated" });
			}
		} catch (error) {
			if (!(error instanceof PullError)) throw error;
			outcomes.push({ ...base, status: "failed", message: error.message });
		}
	}

	const result: PullResult = { outcomes, logged: [] };
	if (options.dryRun) return result;

	if (changed.length > 0) {
		const log = options.log ?? fileOperationLog(options.vault);
		const date = (options.now ?? (() => new Date()))();
		for (const world of [...new Set(changed.map((c) => c.world))]) {
			result.logged.push(await log.append(world, {
				date,
				operation: "pull",
				title: "Pulled PCs from D&D Beyond",
				pages: changed.filter((c) => c.world === world).map((c) => c.name),
			}));
		}
	}
	if (pulledPaths.length > 0) {
		result.gate = await runCheck({ vault: options.vault, templates: options.templates, root: options.root, cwd: options.cwd, paths: [...pulledPaths, ...result.logged.map((l) => join(options.vault, l))] });
	}
	return result;
}
