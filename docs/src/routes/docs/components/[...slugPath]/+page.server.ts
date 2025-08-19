import { error } from '@sveltejs/kit';
import path from 'node:path';

export async function load({ params, parent }) {
	const data = await parent();

	const root = data.sidebar.find((root) => {
		return root.children.find((item) => item.slugPath === params.slugPath);
	});
	if (!root) error(404, 'Not found');

	const item = root.children.find((item) => item.slugPath === params.slugPath);
	if (!item) error(404, 'Not found');

	return {
		name: item.name,
		path: path.join('../../../../..', item.path).replaceAll('\\', '/')
	};
}
