import { defineConfig, fromFileSystem } from 'codex/config';

export default defineConfig(() => {
	const prefix = 'content/components';

	return {
		prefix,
		sidebar: [
			{
				name: 'Getting Started',
				children: fromFileSystem('getting-started', prefix)
			},
			{
				name: 'Components',
				children: fromFileSystem('browse', prefix)
			}
		]
	};
});
