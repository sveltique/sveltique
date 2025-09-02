import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		exclude: ["tailwind-variants", "tailwind-merge", "shiki", "@tabler/icons-svelte"]
	},
	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()), "./content"]
		}
	},
	ssr: {
		noExternal: ["@sveltique/components"]
	}
});
