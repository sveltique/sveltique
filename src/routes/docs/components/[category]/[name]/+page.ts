import { toTitleCase } from '$utils/string.js';
import type { Component } from 'svelte';

export async function load({ params }) {
	return {
		name: toTitleCase(params.name),
		Component: await importComponent(params.category, params.name)
	};
}

async function importComponent(category: string, name: string) {
	const modules = import.meta.glob<boolean, string, Component>(
		'../../../../../lib/components/*/*/*.docs.svelte',
		{ import: 'default' }
	);
	const path = `../../../../../lib/components/${category}/${name}/${toTitleCase(name)}.docs.svelte`;

	const loader = modules[path];

	if (!loader) {
		throw new Error(`Component not found`);
	}

	return loader();
}
