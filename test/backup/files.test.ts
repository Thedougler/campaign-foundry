import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { ancestors, contentHash, excludedBy, kindOf, titleOf, walkBackup } from "../../src/backup/files.ts";
import { lfsPointer, OID, repo } from "./helpers.ts";

const W = "wiki/The Shattered Sea";

describe("backup tree walk", () => {
	const root = repo({
		[`${W}/hot.md`]: "# Hot\n",
		[`${W}/NPCs/Ilse Corran.md`]: "Ilse\n",
		[`${W}/attachments/Map.png`]: lfsPointer(),
		[`${W}/attachments/Sketch.svg`]: "<svg/>",
		[`${W}/attachments/Rules.pdf`]: lfsPointer("b".repeat(64)),
		[`${W}/.obsidian/plugins/x/main.js`]: "js",
		"wiki/index.md": "outside the World folder",
		".agents/skills/npc-design/SKILL.md": "---\nname: npc-design\n---\n",
		".agents/skills/npc-design/evals/cases.yaml": "cases: []\n",
		".agents/skills/npc-design/assets/portrait.webp": Buffer.from([0x52, 0x49, 0x46, 0x46, 0, 0, 1]),
		".agents/skills/npc-design/bun.lock": "lock",
		".agents/skills/npc-design/src/index.ts": "code",
		".agents/skills/npc-design/node_modules/pkg/index.js": "dep",
		".agents/skills/npc-design/tool.bin": Buffer.from([1, 0, 2, 0]),
		".agents/skills/alias": { link: "npc-design" },
		".agents/skills/run-evals": { link: "../../.omp/skills/run-evals" },
		".omp/skills/run-evals/SKILL.md": "run evals\n",
		".claude/skills/npc-design": { link: "../../.agents/skills/npc-design" },
	});
	const walk = walkBackup(root);
	const paths = walk.files.map((f) => f.path);

	it("backs up the World's Markdown and images, and nothing outside the roots", () => {
		expect(paths).toContain(`${W}/hot.md`);
		expect(paths).toContain(`${W}/NPCs/Ilse Corran.md`);
		expect(paths).toContain(`${W}/attachments/Map.png`);
		expect(paths).toContain(`${W}/attachments/Sketch.svg`);
		expect(paths).not.toContain("wiki/index.md");
		expect(paths.some((p) => p.startsWith(".claude/"))).toBe(false);
	});

	it("skips .obsidian, node_modules, src, lockfiles and non-image binaries, saying why", () => {
		expect(paths.some((p) => /\.obsidian|node_modules|\/src\/|bun\.lock|tool\.bin|Rules\.pdf/.test(p))).toBe(false);
		const reasons = Object.fromEntries(walk.skipped.map((s) => [s.path, s.reason]));
		expect(reasons[`${W}/.obsidian`]).toBe(".obsidian/ is excluded");
		expect(reasons[".agents/skills/npc-design/bun.lock"]).toBe("lockfile");
		expect(reasons[".agents/skills/npc-design/src"]).toBe("src/ is excluded");
		expect(reasons[".agents/skills/npc-design/tool.bin"]).toBe("binary file that is not an image");
		expect(reasons[`${W}/attachments/Rules.pdf`]).toBe("binary file that is not an image");
	});

	it("backs up each skill once: a symlink to a skill already walked is a duplicate, a link out of the roots is followed", () => {
		expect(paths.filter((p) => p.endsWith("npc-design/SKILL.md"))).toEqual([".agents/skills/npc-design/SKILL.md"]);
		expect(paths.some((p) => p.startsWith(".agents/skills/alias/"))).toBe(false);
		expect(walk.skipped.find((s) => s.path === ".agents/skills/alias")?.reason).toBe("already backed up through another path");
		expect(paths).toContain(".agents/skills/run-evals/SKILL.md");
	});

	it("classifies files and hashes an LFS pointer by the object it names", () => {
		const byPath = Object.fromEntries(walk.files.map((f) => [f.path, f]));
		expect(byPath[`${W}/hot.md`]?.kind).toBe("markdown");
		expect(byPath[".agents/skills/npc-design/evals/cases.yaml"]?.kind).toBe("text");
		expect(byPath[".agents/skills/npc-design/assets/portrait.webp"]?.kind).toBe("image");
		expect(byPath[`${W}/attachments/Map.png`]).toMatchObject({ kind: "image", hash: OID, lfsPointer: true, size: 1234 });
		const real = Buffer.from("real image bytes");
		expect(contentHash(real)).toEqual({ hash: createHash("sha256").update(real).digest("hex"), lfsPointer: false, size: real.length });
	});

	it("lists every directory parents first, roots and their ancestors included", () => {
		expect(walk.dirs.slice(0, 4)).toEqual([".agents", "wiki", ".agents/skills", "wiki/The Shattered Sea"]);
		expect(walk.dirs).toContain(`${W}/attachments`);
		expect(walk.dirs).not.toContain(`${W}/.obsidian`);
		for (const dir of walk.dirs) for (const parent of ancestors(`${dir}/x`).slice(0, -1)) expect(walk.dirs.indexOf(parent)).toBeLessThan(walk.dirs.indexOf(dir));
	});
});

describe("backup rules", () => {
	it("excludes by any path segment", () => {
		expect(excludedBy("a/.obsidian/x.css")).toBe(".obsidian/ is excluded");
		expect(excludedBy("a/b/pnpm-lock.yaml")).toBe("lockfile");
		expect(excludedBy("a/b/Cargo.lock")).toBe("lockfile");
		expect(excludedBy("a/source/x.md")).toBeUndefined();
	});

	it("titles a page by its Obsidian name, keeping other files' extensions", () => {
		expect(titleOf(`${W}/NPCs/Ilse Corran.md`, "markdown")).toBe("Ilse Corran");
		expect(titleOf("x/evals/cases.yaml", "text")).toBe("cases.yaml");
		expect(titleOf(`${W}/attachments/Map.png`, "image")).toBe("Map.png");
		expect(titleOf(W, "dir")).toBe("The Shattered Sea");
	});

	it("treats every image extension as an image and other text as text", () => {
		for (const ext of ["png", "JPG", "jpeg", "webp", "gif", "svg"]) expect(kindOf(`a.${ext}`, Buffer.from("x"))).toBe("image");
		expect(kindOf("LICENSE", Buffer.from("MIT"))).toBe("text");
	});
});
