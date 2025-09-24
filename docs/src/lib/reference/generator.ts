/** biome-ignore-all lint/suspicious/noExplicitAny: Not going to define all types */

type SimplifiedProperty = {
	name: string;
	optional: boolean;
	type: string;
	comment: string;
	deprecated?: string;
	defaultValue?: string;
};

type SimplifiedType = {
	name: string;
	extends?: string;
	properties: SimplifiedProperty[];
	deprecated?: string;
};

export type SimplifiedGroup = {
	name: string;
	types: SimplifiedType[];
};

function extractComment(node: any): string {
	if (node.comment?.summary) {
		return node.comment.summary
			.map((p: any) => p.text ?? "")
			.join("")
			.trim();
	}
	return "";
}

function extractDeprecated(node: any): string | undefined {
	if (!node.comment?.blockTags) return undefined;
	const dep = node.comment.blockTags.find((t: any) => t.tag === "@deprecated");
	if (!dep) return undefined;
	return dep.content
		.map((c: any) => c.text ?? "")
		.join("")
		.trim();
}

function extractType(t: any): string {
	if (!t) return "";
	switch (t.type) {
		case "intrinsic":
			return t.name;
		case "reference":
			if (t.typeArguments?.length) {
				return `${t.name}<${t.typeArguments.map(extractType).join(", ")}>`;
			}
			return t.name;
		case "union":
			return t.types.map(extractType).join(" | ");
		case "literal":
			return JSON.stringify(t.value);
		case "tuple":
			return "[]";
		case "templateLiteral":
			return `${t.head}{string}${t.tail?.map(([x]: [x: any]) => x.name ?? "").join("")}`;
		case "reflection":
			return "function";
		default:
			return t.type ?? "";
	}
}

function extractExtends(item: any): string | undefined {
	if (!item.extendedTypes?.length) return undefined;
	return item.extendedTypes.map(extractType).join(" & ");
}

function extractDefault(node: any): string | undefined {
	if (!node.comment?.blockTags) return undefined;
	const def = node.comment.blockTags.find((t: any) => t.tag === "@default");
	if (!def) return undefined;

	const text = def.content
		.map((c: any) => c.text ?? "")
		.join("")
		.trim();

	const match = text.match(/^```ts\s*([\s\S]*?)```$/);
	if (match) {
		return match[1].trim();
	}

	return text;
}

function sortTypes(types: SimplifiedType[]): SimplifiedType[] {
	if (!types || types.length === 0) return [];

	const all = types.slice();

	const propsOnly = all.filter((t) => t.name.endsWith("Props"));
	if (propsOnly.length === 0) {
		return all.sort((a, b) => a.name.localeCompare(b.name));
	}

	const sortedPropsByPrefix = propsOnly.slice().sort((a, b) => {
		const pa = a.name.slice(0, -5);
		const pb = b.name.slice(0, -5);
		if (pa.length !== pb.length) return pa.length - pb.length;
		return pa.localeCompare(pb);
	});
	const base = sortedPropsByPrefix[0];
	const basePrefix = base.name.slice(0, -5);

	const prefixed = all
		.filter((t) => t !== base && t.name.endsWith("Props") && t.name.startsWith(basePrefix))
		.slice()
		.sort((a, b) => a.name.localeCompare(b.name));

	const otherProps = all
		.filter((t) => t !== base && t.name.endsWith("Props") && !t.name.startsWith(basePrefix))
		.slice()
		.sort((a, b) => a.name.localeCompare(b.name));

	const nonProps = all
		.filter((t) => !t.name.endsWith("Props"))
		.slice()
		.sort((a, b) => a.name.localeCompare(b.name));

	return [base, ...prefixed, ...otherProps, ...nonProps];
}

export function simplifyDocs(docs: any): SimplifiedGroup[] {
	const groups: Record<string, SimplifiedGroup> = {};

	for (const child of docs.children ?? []) {
		if (child.kind === 2) {
			for (const item of child.children ?? []) {
				if (item.kind === 256) {
					const firstSource = item.sources?.[0]?.fileName ?? "";
					const folderMatch = firstSource.match(/components\/([^/]+)/);
					const folder = folderMatch ? folderMatch[1] : "root";

					const props: SimplifiedProperty[] = [];
					for (const prop of item.children ?? []) {
						if (prop.kind === 1024) {
							props.push({
								name: prop.name,
								optional: !!prop.flags?.isOptional,
								type: extractType(prop.type),
								comment: extractComment(prop),
								deprecated: extractDeprecated(prop),
								defaultValue: extractDefault(prop)
							});
						}
					}

					if (!groups[folder]) {
						groups[folder] = { name: folder, types: [] };
					}

					groups[folder].types.push({
						name: item.name,
						extends: extractExtends(item),
						properties: props,
						deprecated: extractDeprecated(item)
					});
				}
			}
		}
	}

	for (const group of Object.values(groups)) {
		group.types = sortTypes(group.types);
	}

	return Object.values(groups);
}
