export function isPascalCase(str: string) {
	return /^[A-Z][A-Za-z0-9]*$/.test(str);
}

export function toPascalCase(str: string) {
	return splitIntoWords(str)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
		.join("");
}

export function toKebabCase(str: string) {
	return splitIntoWords(str)
		.map((part) => part.toLowerCase())
		.join("-");
}

export function toCamelCase(str: string) {
	return splitIntoWords(str)
		.map((part, i) =>
			i === 0
				? part.toLowerCase()
				: part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
		)
		.join("");
}

export function toTitleCase(str: string) {
	return splitIntoWords(str)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
		.join(" ");
}

function splitIntoWords(str: string) {
	return str
		.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
		.split(/[\s-_]+/)
		.filter(Boolean);
}
