import { mkdir, mkdtemp, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { cf, repoRoot, vaultFlags } from "./helpers.ts";

const A = "ashes-of-the-crown";
const ATTACHMENTS = join("wiki", A, "attachments");

/** Every file under `root`, keyed by relative posix path, holding its bytes: the change checks. */
async function snapshot(root: string): Promise<Map<string, Buffer>> {
	const out = new Map<string, Buffer>();
	for (const rel of await readdir(root, { recursive: true })) {
		const file = join(root, rel as string);
		if (
			!(await stat(file).then(
				(s) => s.isFile(),
				() => false,
			))
		)
			continue;
		out.set((rel as string).split("\\").join("/"), await readFile(file));
	}
	return out;
}

/** The scratch vault: the old naming's every case, plus the pages that embed them. */
async function workspace(): Promise<{ root: string; vault: string; path(relative: string): string }> {
	const root = await mkdtemp(join(tmpdir(), "cf-convert-"));
	const vault = join(root, "wiki");
	await mkdir(join(vault, A, "attachments"), { recursive: true });
	await mkdir(join(vault, A, "NPCs"), { recursive: true });
	const image = async (name: string, format: "png" | "jpeg" | "webp" | "gif"): Promise<void> => {
		// 8 by 6, a plain colour: the dimension-preservation check reads these back.
		const made = sharp({ create: { width: 8, height: 6, channels: 3, background: { r: 96, g: 64, b: 32 } } });
		const target = join(vault, A, "attachments", name);
		if (format === "png") await made.png().toFile(target);
		else if (format === "jpeg") await made.jpeg().toFile(target);
		else if (format === "gif") await made.gif().toFile(target);
		else await made.webp().toFile(target);
	};
	await image("Nona Black-Jaw - Portrait.png", "png");
	await image("Aruhe - Handout Art.jpg", "jpeg");
	await image("Session 9 - The Toll - Battle Map.png", "png");
	await image("Sable - Reference Sheet.png", "png");
	await image("geoffrey-draves-portrait.webp", "webp");
	await image("Hobb's Warning - Handout.webp", "webp");
	await image("Wolf - Sigil.gif", "gif");
	await image("Mysterious - Aquamarine.png", "png");
	await writeFile(
		join(vault, A, "attachments", "Session 9 - The Toll - Battle Map.uvtt"),
		'{"format":0.2,"resolution":{"map_size":{"x":1,"y":1},"pixels_per_grid":64}}\n',
	);
	await writeFile(join(vault, A, "attachments", "Rules.pdf"), "a pdf, not an image\n");
	await writeFile(
		join(vault, A, "NPCs", "nona-black-jaw.md"),
		`---
type: NPC
title: "Nona Black-Jaw"
---

![[Nona Black-Jaw - Portrait.png]]

- art: ![[Aruhe - Handout Art.jpg]] and sized ![[Aruhe - Handout Art.jpg|300]]
- by path: ![[ashes-of-the-crown/attachments/Aruhe - Handout Art.jpg]]
- battle map, sized: ![[Session 9 - The Toll - Battle Map.png|300]]
- stays: ![[geoffrey-draves-portrait.webp]] and ![[Mysterious - Aquamarine.png]]
- code stays put: \`![[Aruhe - Handout Art.jpg]]\`

%% ![[Aruhe - Handout Art.jpg]] comment stays put %%
`,
	);
	return { root, vault, path: (relative: string): string => join(root, relative) };
}

const convert = (root: string, args: string[] = []) => cf(["convert", ...vaultFlags(root), ...args], root);

describe("cfcli convert", () => {
	it("--dry-run prints the whole plan and writes nothing", async () => {
		const { root } = await workspace();
		const before = await snapshot(root);
		const { code, stdout } = await convert(root, ["--dry-run"]);
		expect(code).toBe(0);
		expect(stdout).toContain(
			`would convert  ${ATTACHMENTS}/Nona Black-Jaw - Portrait.png -> ${ATTACHMENTS}/nona-black-jaw-portrait.webp`,
		);
		expect(stdout).toContain(
			`would convert  ${ATTACHMENTS}/Aruhe - Handout Art.jpg -> ${ATTACHMENTS}/aruhe-handout-art.webp`,
		);
		expect(stdout).toContain(
			`would rename  ${ATTACHMENTS}/Session 9 - The Toll - Battle Map.png -> ${ATTACHMENTS}/session-9-the-toll-battle-map.png`,
		);
		expect(stdout).toContain(
			`would rename  ${ATTACHMENTS}/Session 9 - The Toll - Battle Map.uvtt -> ${ATTACHMENTS}/session-9-the-toll-battle-map.uvtt`,
		);
		expect(stdout).toContain(
			`would rename  ${ATTACHMENTS}/Hobb's Warning - Handout.webp -> ${ATTACHMENTS}/hobbs-warning-handout-art.webp`,
		);
		expect(stdout).toContain(`would rename  ${ATTACHMENTS}/Wolf - Sigil.gif -> ${ATTACHMENTS}/wolf-sigil.gif`);
		expect(stdout).toContain(`would rewrite  wiki/${A}/NPCs/nona-black-jaw.md`);
		expect(stdout).toContain(`![[Aruhe - Handout Art.jpg|300]] -> ![[aruhe-handout-art.webp|300]]`);
		expect(stdout).toContain(
			`![[ashes-of-the-crown/attachments/Aruhe - Handout Art.jpg]] -> ![[ashes-of-the-crown/attachments/aruhe-handout-art.webp]]`,
		);
		expect(stdout).toContain(`skip  ${ATTACHMENTS}/geoffrey-draves-portrait.webp  already follows the naming`);
		expect(stdout).toContain(`skip  ${ATTACHMENTS}/Mysterious - Aquamarine.png  no known kind in "Aquamarine"`);
		expect(stdout).toContain(`skip  ${ATTACHMENTS}/Rules.pdf  not an image`);
		expect(stdout).toContain("2 images converted, 5 files renamed, 5 embeds rewritten in 1 page");
		expect(stdout).toContain("(dry run: nothing written)");
		expect(await snapshot(root)).toEqual(before);
	});

	it("converts art, renames lossless kinds and companions, and rewrites the embeds", async () => {
		const { root, path } = await workspace();
		const battleMap = await readFile(path(`${ATTACHMENTS}/Session 9 - The Toll - Battle Map.png`));
		const { stdout } = await convert(root);
		expect(stdout).toContain("2 images converted, 5 files renamed, 5 embeds rewritten in 1 page");

		// Art re-encoded: webp bytes, same dimensions.
		const portrait = await sharp(path(`${ATTACHMENTS}/nona-black-jaw-portrait.webp`)).metadata();
		expect(portrait.format).toBe("webp");
		expect([portrait.width, portrait.height]).toEqual([8, 6]);
		// Lossless kinds keep their bytes and their extension; the companion rides along.
		expect(await readFile(path(`${ATTACHMENTS}/session-9-the-toll-battle-map.png`))).toEqual(battleMap);
		expect(await sharp(path(`${ATTACHMENTS}/sable-reference-sheet.png`)).metadata()).toMatchObject({ format: "png" });
		for (const gone of [
			"Nona Black-Jaw - Portrait.png",
			"Aruhe - Handout Art.jpg",
			"Session 9 - The Toll - Battle Map.png",
			"Session 9 - The Toll - Battle Map.uvtt",
			"Sable - Reference Sheet.png",
			"Hobb's Warning - Handout.webp",
			"Wolf - Sigil.gif",
		]) {
			expect(
				await readFile(path(`${ATTACHMENTS}/${gone}`)).then(
					() => true,
					() => false,
				),
			).toBe(false);
		}

		const page = await readFile(path(`wiki/${A}/NPCs/nona-black-jaw.md`), "utf8");
		expect(page).toBe(`---
type: NPC
title: "Nona Black-Jaw"
---

![[nona-black-jaw-portrait.webp]]

- art: ![[aruhe-handout-art.webp]] and sized ![[aruhe-handout-art.webp|300]]
- by path: ![[ashes-of-the-crown/attachments/aruhe-handout-art.webp]]
- battle map, sized: ![[session-9-the-toll-battle-map.png|300]]
- stays: ![[geoffrey-draves-portrait.webp]] and ![[Mysterious - Aquamarine.png]]
- code stays put: \`![[Aruhe - Handout Art.jpg]]\`

%% ![[Aruhe - Handout Art.jpg]] comment stays put %%
`);
	});

	it("is idempotent: a second run finds nothing to do", async () => {
		const { root } = await workspace();
		await convert(root);
		const before = await snapshot(root);
		const { code, stdout } = await convert(root);
		expect(code).toBe(0);
		expect(stdout).toContain("nothing to do");
		expect(stdout).toContain(`skip  ${ATTACHMENTS}/geoffrey-draves-portrait.webp  already follows the naming`);
		expect(await snapshot(root)).toEqual(before);
	});

	it("refuses, touching nothing, when two files would take one name", async () => {
		const { root, path } = await workspace();
		await writeFile(
			path(`${ATTACHMENTS}/Aruhe - Handout Art.png`),
			await readFile(path(`${ATTACHMENTS}/Aruhe - Handout Art.jpg`)),
		);
		const before = await snapshot(root);
		const { code, stderr } = await convert(root);
		expect(code).toBe(2);
		expect(stderr).toContain("aruhe-handout-art.webp");
		expect(await snapshot(root)).toEqual(before);
	});

	it("refuses a vault inside test/ fixtures", async () => {
		const { code, stderr } = await cf(["convert", "--vault", join(repoRoot, "test/check/fixtures/links/wiki")]);
		expect(code).toBe(2);
		expect(stderr).toContain("never touches");
	});
});
