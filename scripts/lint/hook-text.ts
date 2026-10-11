/** Static, hook-authored text injected through additionalContext; dynamic values never become prose. */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import * as ts from "typescript/unstable/ast";
import { API } from "typescript/unstable/sync";
import { REPO_ROOT } from "./core.ts";

export interface HookText {
	path: string;
	text: string;
	/** Source line for each decoded text line, including escaped newlines in quoted strings. */
	lines: number[];
	col: number;
}

/** Extract literal initialisers reached from additionalContext, respecting lexical identifier bindings. */
export function hookText(path: string): HookText[] {
	const absolute = resolve(REPO_ROOT, path);
	const source = readFileSync(absolute, "utf8");
	const api = new API();
	try {
		using snapshot = api.updateSnapshot({ openFiles: [absolute] });
		const file = snapshot.getDefaultProjectForFile(absolute)?.program.getSourceFile(absolute);
		if (file === undefined) throw new Error(`TypeScript could not parse hook ${path}`);
		return extractText(path, source, file);
	} finally {
		api.close();
	}
}

function extractText(path: string, source: string, file: ts.SourceFile): HookText[] {
	const bindings = new Map<ts.Node, Map<string, ts.Expression | undefined>>();
	const scopeOf = (node: ts.Node): ts.Node => {
		let scope = node.parent;
		while (
			scope &&
			!ts.isSourceFile(scope) &&
			!ts.isBlock(scope) &&
			!ts.isFunctionDeclaration(scope) &&
			!ts.isFunctionExpression(scope) &&
			!ts.isArrowFunction(scope)
		)
			scope = scope.parent;
		return scope ?? file;
	};
	const collect = (node: ts.Node): void => {
		if ((ts.isVariableDeclaration(node) || ts.isParameterDeclaration(node)) && ts.isIdentifier(node.name)) {
			const scope = scopeOf(node);
			const names = bindings.get(scope) ?? new Map<string, ts.Expression | undefined>();
			names.set(node.name.text, ts.isParameterDeclaration(node) ? undefined : node.initializer);
			bindings.set(scope, names);
		}
		node.forEachChild(collect);
	};
	collect(file);
	const pieces: HookText[] = [];
	const seen = new Set<ts.Node>();
	const visitExpression = (expression: ts.Expression, active: Set<ts.Node>): void => {
		if (active.has(expression)) return;
		active.add(expression);
		if (ts.isIdentifier(expression)) {
			for (let node: ts.Node | undefined = expression.parent; node; node = node.parent) {
				const names = bindings.get(node);
				if (!names?.has(expression.text)) continue;
				const value = names.get(expression.text);
				if (value) visitExpression(value, active);
				break;
			}
		} else if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) {
			addLiteral(expression);
		} else if (ts.isTemplateExpression(expression)) {
			addLiteral(expression.head);
			for (const span of expression.templateSpans) addLiteral(span.literal);
		} else if (
			ts.isParenthesizedExpression(expression) ||
			ts.isAsExpression(expression) ||
			ts.isTypeAssertion(expression) ||
			ts.isSatisfiesExpression(expression)
		) {
			visitExpression(expression.expression, active);
		} else if (ts.isConditionalExpression(expression)) {
			visitExpression(expression.whenTrue, active);
			visitExpression(expression.whenFalse, active);
		} else if (ts.isBinaryExpression(expression) && expression.operatorToken.kind === ts.SyntaxKind.PlusToken) {
			visitExpression(expression.left, active);
			visitExpression(expression.right, active);
		}
		active.delete(expression);
	};
	const addLiteral = (
		literal: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral | ts.TemplateLiteralLikeNode,
	): void => {
		if (seen.has(literal) || literal.text.trim() === "") return;
		seen.add(literal);
		const start = literal.getStart(file) + 1;
		const at = file.getLineAndCharacterOfPosition(start);
		const raw = source.slice(start, literal.end - 1);
		const lines = [at.line + 1];
		let sourceLine = at.line + 1;
		for (let i = 0; i < raw.length; i++) {
			const char = raw[i];
			if (char === "\n") {
				lines.push(++sourceLine);
			} else if (char === "\\") {
				const next = raw[++i];
				if (
					next === "n" ||
					(next === "x" && /^0a/i.test(raw.slice(i + 1, i + 3))) ||
					(next === "u" && /^(?:000a|\{a\})/i.test(raw.slice(i + 1)))
				) {
					lines.push(sourceLine);
				} else if (next === "\n") {
					sourceLine++;
				} else if (next === "\r") {
					sourceLine++;
					if (raw[i + 1] === "\n") i++;
				}
			}
		}
		const decodedLines = literal.text.split("\n").length;
		lines.length = Math.min(lines.length, decodedLines);
		while (lines.length < decodedLines) lines.push(sourceLine);
		pieces.push({ path, text: literal.text, lines, col: at.character + 1 });
	};
	const namedContext = (name: ts.PropertyName): boolean =>
		(ts.isIdentifier(name) || ts.isStringLiteral(name)) && name.text === "additionalContext";
	const visit = (node: ts.Node): void => {
		if (ts.isPropertyAssignment(node) && namedContext(node.name)) {
			visitExpression(node.initializer, new Set());
		} else if (
			ts.isShorthandPropertyAssignment(node) &&
			ts.isIdentifier(node.name) &&
			node.name.text === "additionalContext"
		) {
			visitExpression(node.name, new Set());
		} else if (
			ts.isBinaryExpression(node) &&
			node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
			((ts.isPropertyAccessExpression(node.left) && node.left.name.text === "additionalContext") ||
				(ts.isElementAccessExpression(node.left) &&
					ts.isStringLiteral(node.left.argumentExpression) &&
					node.left.argumentExpression.text === "additionalContext"))
		) {
			visitExpression(node.right, new Set());
		}
		node.forEachChild(visit);
	};
	visit(file);
	return pieces.sort((a, b) => a.lines[0]! - b.lines[0]! || a.col - b.col);
}
