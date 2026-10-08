import { cp, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildVault, readVaultFiles } from "../../src/vault/vault.ts";
import type { Vault } from "../../src/vault/types.ts";

export const fixtureVault = join(import.meta.dirname, "../fixtures/vault");
const pushFixtures = join(import.meta.dirname, "fixtures");

export const CAMPAIGN = "Salt and Lantern";
export const FOLDER = "salt-and-lantern";
export const SESSIONS = `${FOLDER}/Sessions`;
export const MUD = `${SESSIONS}/Session 2/Session 2 - Mud Under the Boards.md`;
export const HANDOUT = `${SESSIONS}/Session 2/Hobb's Warning.md`;
export const MAP = "Session 2 - Mud Under the Boards - Battle Map";

export interface Workspace {
	/** Repository-like root: `<root>/wiki` is the vault. */
	root: string;
	vaultDir: string;
	read(path: string): Promise<string>;
	write(path: string, content: string): Promise<void>;
	load(): Promise<Vault>;
}

/**
 * A scratch copy of the fixture World with what the fixture vault lacks: a Battle Map (image and Universal VTT file) embedded
 * in Session 2's Cliffhanger, and an image under the Handout's narration. The fixture vault itself is never edited.
 */
export async function workspace(options: { maps?: boolean } = {}): Promise<Workspace> {
	const root = await mkdtemp(join(tmpdir(), "cf-push-"));
	const vaultDir = join(root, "wiki");
	await cp(fixtureVault, vaultDir, { recursive: true });
	const ws: Workspace = {
		root,
		vaultDir,
		read: (path) => readFile(join(vaultDir, path), "utf8"),
		write: async (path, content) => {
			await mkdir(join(vaultDir, path, ".."), { recursive: true });
			await writeFile(join(vaultDir, path), content);
		},
		load: async () => buildVault(vaultDir, await readVaultFiles(vaultDir)),
	};
	if (options.maps !== false) {
		const attachments = join(vaultDir, `${FOLDER}/attachments`);
		await mkdir(attachments, { recursive: true });
		for (const file of [`${MAP}.webp`, `${MAP}.uvtt`, "Hobb's Warning - Handout.webp"]) await cp(join(pushFixtures, file), join(attachments, file));
		const mud = await ws.read(MUD);
		await ws.write(MUD, mud.replace("### Battlefield\n", `### Battlefield\n\n![[${MAP}.webp]]\n`));
		const note = await ws.read(HANDOUT);
		await ws.write(HANDOUT, note.replace("> H. T.\n", "> H. T.\n\n![[Hobb's Warning - Handout.webp]]\n"));
	}
	return ws;
}
