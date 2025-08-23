import { defineConfig, fromFileSystem } from 'codex/config';

export default defineConfig(() => {
	const docsRoot = 'content/components';

	return {
		docsRoot,
		sidebar: [
			{
				name: 'Getting Started',
				children: fromFileSystem('getting-started', docsRoot)
			},
			{
				name: 'Components',
				children: fromFileSystem('browse', docsRoot)
			}
		]
	};
});
