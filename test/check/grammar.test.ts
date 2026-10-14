import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { grammarLayer } from "../../src/check/layers/grammar.ts";
import type { CheckContext } from "../../src/check/types.ts";
import { buildVault } from "../../src/vault/vault.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function context(source: string): Promise<CheckContext> {
	const root = await mkdtemp(join(tmpdir(), "cf-grammar-"));
	roots.push(root);
	const vault = buildVault(join(root, "wiki"), {
		markdown: new Map([["Target.md", source]]),
		attachments: [],
	});
	return {
		root,
		vault,
		pages: vault.pages,
		templates: { byName: new Map(), types: new Map() },
		display: (path) => `wiki/${path}`,
	};
}

describe("grammar confirmed misfires", () => {
	it.each([
		["I trust you guys.", 0],
		["yah, you guys better get behind closed doors", 0],
		["I trust YOU GUYS.", 0],
		["I trust you\tguys.", 0],
		["she have a ship", 1],
		["I trust you guys. She have a ship.", 1],
		["she tore the magic loose", 0],
		["she dug a second grave", 0],
	])("checks agreement in %s (%i findings)", async (text, count) => {
		const findings = await grammarLayer.run(await context(`${text}\n`));
		expect(findings.filter(({ rule }) => rule === "PronounVerbAgreement")).toHaveLength(count);
	});
});
