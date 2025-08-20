import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const { sidebar } = await parent();
	const firstItem = sidebar.at(0)!.children.at(0)!;

	redirect(303, `/docs/components/${firstItem.slugPath}`);
}
