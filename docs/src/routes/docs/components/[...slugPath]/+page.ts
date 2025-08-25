export const ssr = false;

export async function load({ data }) {
	const { default: Component, metadata } = await import(/* @vite-ignore */ data.path);

	return {
		name: data.name,
		metadata,
		Component
	};
}
