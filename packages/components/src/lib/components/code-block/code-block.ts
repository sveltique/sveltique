import type { ThemedToken } from "shiki";

export function assembleLines(tokens: ThemedToken[][], parsedLines: number[]) {
	return tokens
		.map((t, idx) => {
			const isHighlighted = parsedLines.includes(idx + 1);

			return `<span data-code-line data-highlighted="${isHighlighted}">${assembleTokens(t)}</span>`;
		})
		.join("");
}

export function assembleTokens(tokens: ThemedToken[]) {
	let lineHtml = tokens
		.map((token) => {
			const color = token.color ? `color:${token.color}` : "";
			const bgColor = token.bgColor ? `background-color:${token.bgColor}` : "";

			let content = escapeHTML(token.content);
			if (content.length === 0) {
				content = "    ";
			}

			return `<span style="${color};${bgColor}">${content}</span>`;
		})
		.join("");

	if (lineHtml.length === 0) {
		lineHtml = "    ";
	}

	return lineHtml;
}

export function transformHTMLEntities(str: string) {
	return str
		.replaceAll("&amp;", "&")
		.replaceAll("&lt;", "<")
		.replaceAll("&gt;", ">")
		.replaceAll("&quot;", '"')
		.replaceAll("&#39;", "'");
}

export function escapeHTML(str: string) {
	return str
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

/**
 * @note You can use spaces.
 * @example
 * parseNumberRanges("1") // [1]
 * parseNumberRanges("1,5,9") // [1, 5, 9]
 * parseNumberRanges("1-3") // [1, 2, 3]
 * parseNumberRanges("1,3-6,14") // [1, 3, 4, 5, 6, 14]
 */
export function parseNumberRanges(ranges: string): number[] {
	const reducer = (acc: Set<number>, curr: string) => {
		if (/^\d+$/.test(curr)) {
			acc.add(Number(curr));
		} else if (/^\d+-\d+$/.test(curr)) {
			let [start, end] = curr.split("-").map(Number);

			if (start > end) {
				[start, end] = [end, start];
			}

			for (let i = start; i <= end; i++) {
				acc.add(Number(i));
			}
		}

		return acc;
	};

	return [
		...ranges
			.split(",")
			.map((range) => range.trim())
			.reduce(reducer, new Set<number>())
	].sort((a, b) => a - b);
}
