import type { Component } from "svelte";

export const ssr = false;

const modules = import.meta.glob<
	boolean,
	string,
	{ default: Component; metadata?: Record<string, string> }
>("../../../../../content/**/*.svelte");

export async function load({ data }) {
	return {
		name: data.name,
		...(await loadComponent(data.path))
	};
}

async function loadComponent(path: string) {
	const loader = modules[path];
	if (!loader) throw new Error(`Module not found for ${path}`);

	const { default: Component, metadata } = await loader();
	return { Component, metadata };
}
