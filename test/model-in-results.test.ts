import { expect, it } from "vitest";
import { modelResultLines } from "../.omp/hooks/model-in-results-core.ts";

it("formats each resolved model with its agent identity and actual fallback status", () => {
	const first = { id: "Subject", resolvedModel: "zai/glm-5.3" };
	const second = { id: "Grader", resolvedModel: "openai-codex/gpt-6.1-sol", resolvedModelIsFallback: true };
	const expected = "Agent: Subject\nModel: zai/glm-5.3\nAgent: Grader\nModel: openai-codex/gpt-6.1-sol, fallback";
	expect(modelResultLines({ results: [first, second], progress: [first, second] })).toBe(expected);
	expect(modelResultLines({ progress: [first, second] })).toBe(expected);
	expect(modelResultLines({ jobs: [first, second] })).toBe(expected);
	expect(modelResultLines({ proc: { jobs: [first, second] } })).toBe(expected);
	expect(modelResultLines({ proc: { job: second } })).toBe("Agent: Grader\nModel: openai-codex/gpt-6.1-sol, fallback");
	expect(modelResultLines({ resolvedModel: "xai-oauth/grok-4.6", isFallback: true })).toBe(
		"Model: xai-oauth/grok-4.6, fallback",
	);
	const known = new Map([[second.id, second]]);
	expect(modelResultLines({ jobs: [{ id: second.id, resolvedModel: second.resolvedModel }] }, known)).toBe(
		"Agent: Grader\nModel: openai-codex/gpt-6.1-sol, fallback",
	);
	expect(modelResultLines({ jobs: [{ id: second.id, resolvedModel: "zai/glm-5.3" }] }, known)).toBe(
		"Agent: Grader\nModel: zai/glm-5.3",
	);
	expect(modelResultLines({ progress: [{ id: "Pending" }] })).toBe("");
	expect(modelResultLines(undefined)).toBe("");
});
