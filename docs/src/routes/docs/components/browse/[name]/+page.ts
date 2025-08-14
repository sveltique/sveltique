import { capitalize } from '$utils/string.js';
import type { Component } from 'svelte';

export async function load({ params }) {
	return {
		name: capitalize(params.name),
		Component: await importComponent(params.name)
	};
}

async function importComponent(name: string) {
	const modules = import.meta.glob<boolean, string, Component>(
		'../../../../../docs/*/*.docs.svelte',
		{ import: 'default' }
	);
	const path = `../../../../../docs/${name}/${capitalize(name).replaceAll(' ', '')}.docs.svelte`;

	const loader = modules[path];

	if (!loader) {
		throw new Error(`Component not found`);
	}

	return loader();
}

export async function entries() {
	const modules = import.meta.glob<boolean, string, Component>(
		'../../../../../../docs/*/*.docs.svelte',
		{ import: 'default' }
	);

	return Object.keys(modules).map((path) => {
		const [category, name] = path.split('/').slice(-3, -1);

		return { category, name };
	});
}
