export async function load() {
	return {
		componentNames: await getComponentNames()
	};
}

async function getComponentNames() {
	const modules = import.meta.glob('../../../docs/*/*.docs.svelte');
	const keys = Object.keys(modules);

	return keys.map((path) => path.split('/').at(-2)!);
}
