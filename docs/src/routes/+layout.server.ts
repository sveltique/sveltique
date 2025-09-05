import packageJson from "../../../packages/components/package.json" with { type: "json" };

export const prerender = true;

export async function load() {
	return {
		version: packageJson.version
	};
}
