import { toCamelCase, toKebabCase, toPascalCase } from "./string";

const transformers = {
	"pascal-case": toPascalCase,
	"kebab-case": toKebabCase,
	"camel-case": toCamelCase
} as const;

type TransformerType = keyof typeof transformers;

export function replacePlaceholders(str: string, name: string): string {
	return str.replace(/\$\$component:(pascal-case|kebab-case|camel-case)/g, (_, type) => {
		return transformers[type as TransformerType](name);
	});
}
