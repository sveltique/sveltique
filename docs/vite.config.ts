import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		exclude: [
			'tailwind-variants',
			'tailwind-merge',
			'shiki',
			'@tabler/icons-svelte',
			'@sveltique/components'
		]
	}
});
