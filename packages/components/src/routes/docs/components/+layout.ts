type Tree = Record<string, string[]>;

export async function load() {
	return {
		tree: await getTree()
	};
}

async function getTree() {
	const modules = import.meta.glob('../../../lib/components/*/*/*.docs.svelte');

	return Object.keys(modules).reduce((acc, curr) => {
		const [category, name] = curr.split('/').slice(-3, -1);

		acc[category] = [...(acc[category] ?? []), name];

		return acc;
	}, {} as Tree);
}
