import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const Source = {
	PackageComponent: resolve(__dirname, "../../packages/components/src/lib/components"),
	Docs: resolve(__dirname, "../../docs/content/components/browse")
};
