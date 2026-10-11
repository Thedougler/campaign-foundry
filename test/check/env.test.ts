import { mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { UsageError } from "../../src/check/run.ts";
import { CF, requireTemplates, resolveEnv } from "../../src/commands/kit.ts";

const dir = mkdtempSync(join(tmpdir(), "cf-env-"));
afterAll(() => rmSync(dir, { recursive: true, force: true }));
const folder = (name: string): string => {
	const path = join(dir, name);
	mkdirSync(path, { recursive: true });
	return path;
};

describe("CLI environment resolution", () => {
	it("explicit flags take precedence over root defaults", () => {
		const root = folder("explicit-root/wiki/templates").replace(/\/wiki\/templates$/, "");
		const vault = folder("explicit-vault");
		const templates = folder("explicit-templates");
		expect(resolveEnv({ root, vault, templates }, "check")).toEqual({
			cwd: process.cwd(),
			root: realpathSync(root),
			vault: realpathSync(vault),
			templates: realpathSync(templates),
		});
	});

	it("defaults to wiki/ and its templates beneath the root", () => {
		const root = folder("default-root/wiki/templates").replace(/\/wiki\/templates$/, "");
		const env = resolveEnv({ root }, "check");
		expect(env.vault).toBe(realpathSync(join(root, "wiki")));
		expect(env.templates).toBe(realpathSync(join(root, "wiki/templates")));
	});

	it("a missing folder is a usage error carrying an example", () => {
		const root = folder("missing-root");
		try {
			resolveEnv({ root }, "check");
			throw new Error("Expected a usage error");
		} catch (error) {
			expect(error).toBeInstanceOf(UsageError);
			expect((error as UsageError).hint).toBe(`${CF} check --vault <folder>`);
		}
		const vault = folder("missing-root/wiki");
		const env = resolveEnv({ root, vault, templates: join(root, "missing-templates") }, "check");
		expect(() => requireTemplates(env, "check")).toThrow(UsageError);
	});

	it("resolves symlinks and macOS temporary-folder realpaths", () => {
		const root = folder("real-root/wiki/templates").replace(/\/wiki\/templates$/, "");
		const link = join(dir, "root-link");
		symlinkSync(root, link);
		const env = resolveEnv({ root: link, vault: join(link, "wiki"), templates: join(link, "wiki/templates") }, "check");
		expect(env.root).toBe(realpathSync(root));
		expect(env.vault).toBe(realpathSync(join(root, "wiki")));
		expect(env.templates).toBe(realpathSync(join(root, "wiki/templates")));
	});
});
