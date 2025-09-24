import { loadSidebar } from "$lib/content/index.server";
import { simplifyDocs } from "$lib/reference/generator";
import { readFile } from "node:fs/promises";

export async function load({ params }) {
	return {
		sidebar: await loadSidebar(`./content/${params.sidebar}`, ["getting-started", "browse"]),
		apiReference: await getAPIReference()
	};
}

async function getAPIReference() {
	const contents = await readFile("../packages/components/docs.json", "utf8");
	return simplifyDocs(JSON.parse(contents));
}
