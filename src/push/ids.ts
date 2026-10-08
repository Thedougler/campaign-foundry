import { createHash } from "node:crypto";

const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * A deterministic Foundry document ID (`/^[A-Za-z0-9]{16}$/`) for a Wiki identity: the Campaign folder, the page's
 * vault path and, for a document derived from a page (an NPC's Actor, a Scene's Foundry scene), a role suffix. Pushing
 * again therefore updates a document in the Foundry world instead of duplicating it.
 */
export function foundryId(campaignFolder: string, path: string, role = ""): string {
	const digest = createHash("sha256").update(`${campaignFolder}\n${path}\n${role}`).digest();
	// 96 bits of the digest exceed 62^16, so every one of the 16 characters is well spread.
	let n = (digest.readBigUInt64BE(0) << 32n) + BigInt(digest.readUInt32BE(8));
	let id = "";
	for (let i = 0; i < 16; i++) {
		id += ALPHABET[Number(n % 62n)];
		n /= 62n;
	}
	return id;
}
