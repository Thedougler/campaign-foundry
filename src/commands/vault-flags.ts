import { existsSync, realpathSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { UsageError } from "../check/run.ts";
import { findRepoRoot } from "./check.ts";

export interface VaultFlags {
	vault?: string;
	root?: string;
}

/** Resolves `--vault` and `--root` the way `cf check` does; a missing vault folder is a usage error naming `command`. */
export function resolveVault(flags: VaultFlags, command: string): { root: string; vault: string } {
	const cwd = process.cwd();
	// realpath so paths compare equal to process.cwd(), which the OS reports resolved (macOS /var -> /private/var).
	const real = (p: string): string => (existsSync(p) ? realpathSync(p) : p);
	const root = real(flags.root ? resolve(cwd, flags.root) : findRepoRoot(cwd));
	const vault = real(flags.vault ? resolve(cwd, flags.vault) : join(root, "wiki"));
	if (!existsSync(vault) || !statSync(vault).isDirectory()) {
		throw new UsageError(`The vault folder ${vault} does not exist.`, `cf ${command} --vault <folder>`);
	}
	return { root, vault };
}
