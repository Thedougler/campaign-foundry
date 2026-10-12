// markdownlint-cli2's own entry (ADR 0038): Benchmark prompts are the DM's verbatim text, and a
// skill's eval fixtures keep researched source notes as fetched, so no markdownlint pass covers
// them, however it selects files. The rules stay in .markdownlint.yaml — cfcli check's
// markdownlint layer and editors read that file — and this wrapper only adds the path ignores on
// top of them, so the two never drift.
const { readFileSync } = require("node:fs");
const { parse } = require("yaml");

module.exports = {
	ignores: ["evals/bench/prompts/**", "**/evals/fixtures/**"],
	config: parse(readFileSync(`${__dirname}/.markdownlint.yaml`, "utf8")),
};
