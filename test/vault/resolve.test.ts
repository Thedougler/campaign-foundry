import { describe, expect, it } from "vitest";
import { resolvePage } from "../../src/vault/resolve.ts";
import { buildVault } from "../../src/vault/vault.ts";

const vault = buildVault("/v", {
	markdown: new Map([
		["A/NPCs/Mara Voss.md", '---\ntitle: "Mara Voss"\n---\n\nText.\n'],
		["B/NPCs/Mara Voss.md", '---\ntitle: "Mara Voss"\n---\n\nText.\n'],
		["A/Locations/Ravenhold.md", '---\ntitle: "Ravenhold"\naliases: ["The Hold"]\n---\n\nText.\n'],
	]),
	attachments: [],
});

const hint = (candidate: string): string => `cfcli example "${candidate}"`;

/** The refusal a call raises, so its `hint` can be checked alongside its message. */
const refusalOf = (input: string, options: { campaignFolder?: string } = {}) => {
	try {
		resolvePage(vault, input, { hint, ...options });
	} catch (error) {
		return error as { message: string; hint: string };
	}
	throw new Error(`expected resolving \`${input}\` to refuse`);
};

describe("resolvePage", () => {
	it.each([
		["a name", "Ravenhold"],
		["a link", "[[Ravenhold]]"],
		["an alias", "The Hold"],
		["the filename slug", "ravenhold"],
	])("resolves %s to the page", (_label, input) => {
		expect(resolvePage(vault, input, { hint }).path).toBe("A/Locations/Ravenhold.md");
	});

	it.each([
		["a vault path with .md", "A/Locations/Ravenhold.md"],
		["a vault path without .md", "A/Locations/Ravenhold"],
		["a leading-slash path", "/A/Locations/Ravenhold.md"],
	])("resolves %s", (_label, input) => {
		expect(resolvePage(vault, input, { hint }).path).toBe("A/Locations/Ravenhold.md");
	});

	it("resolves a name several pages answer to when one sits in the campaign folder", () => {
		expect(resolvePage(vault, "Mara Voss", { campaignFolder: "A", hint }).path).toBe("A/NPCs/Mara Voss.md");
		expect(resolvePage(vault, "Mara Voss", { campaignFolder: "B", hint }).path).toBe("B/NPCs/Mara Voss.md");
	});

	it("refuses a shared name without a campaign folder, listing every page and naming one in the hint", () => {
		const error = refusalOf("Mara Voss");
		expect(error.message).toBe("More than one page is named `Mara Voss`: A/NPCs/Mara Voss.md, B/NPCs/Mara Voss.md.");
		expect(error.hint).toBe('Pass the vault path of the one you mean. cfcli example "A/NPCs/Mara Voss.md"');
	});

	it("refuses a shared name even the campaign folder cannot settle", () => {
		expect(refusalOf("Mara Voss", { campaignFolder: "C" }).message).toContain("More than one page is named");
	});

	it("refuses an unknown name with the did-you-mean and the command's own hint", () => {
		const error = refusalOf("Ravenhod");
		expect(error.message).toBe("No page `Ravenhod` in the Wiki. Did you mean `Ravenhold`?");
		expect(error.hint).toBe('Name a page that exists, by name or vault path. cfcli example "Ravenhold"');
	});

	it("refuses a name nothing is close to, without a did-you-mean", () => {
		expect(refusalOf("Zzzzzzzzzzz").message).toBe("No page `Zzzzzzzzzzz` in the Wiki.");
	});

	it("suggests from the last path segment when given a path that misses", () => {
		expect(refusalOf("Nowhere/Ravenhod.md").message).toContain("Did you mean `Ravenhold`?");
	});
});
