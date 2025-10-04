import { readFile } from "node:fs/promises";
import { loadSidebar } from "$lib/content/index.server";
import { simplifyDocs } from "$lib/reference/generator";

export async function load({ params }) {
	return {
		sidebar: await loadSidebar(params.sidebar),
		apiReference: await getAPIReference()
	};
}

async function getAPIReference() {
	const contents = await readFile("../packages/components/docs.json", "utf8");
	return simplifyDocs(JSON.parse(contents));
}
