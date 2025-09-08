import { redirect } from "@sveltejs/kit";
import { SIDEBAR_NAMES } from "$lib/content/constants";

export async function load({ parent }) {
	const { sidebar } = await parent();

	const [
		{
			slugCategory,
			items: [{ slugName }]
		}
	] = sidebar;

	redirect(303, `/docs/components/${slugCategory}/${slugName}`);
}

export function entries() {
	return SIDEBAR_NAMES.map((sidebar) => ({ sidebar }));
}
