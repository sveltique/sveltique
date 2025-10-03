import {
	access,
	appendFile,
	constants,
	copyFile,
	cp,
	readFile,
	rename,
	writeFile
} from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Source } from "./config";
import { logger } from "./logger";
import { replacePlaceholders } from "./placeholders";
import { isPascalCase, toKebabCase, toTitleCase } from "./string";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function scaffoldComponent(name: string) {
	try {
		logger.info("Running scaffolder...");

		if (!isPascalCase(name)) {
			return logger.error("Name must be in PascalCase format. Aborting...");
		}

		const exists = await alreadyExists(name);
		if (exists) {
			return logger.error(`Component named ${name} already exists. Aborting...`);
		}

		await copyToComponentPackage(name);
		logger.info(`Scaffolded in components package...`);

		await copyToDocs(name);
		logger.info(`Scaffolded in docs...`);

		logger.success(`Scaffolded ${name} successfully`);
	} catch (err) {
		const error = err instanceof Error ? err.message : err;
		const message = `An error occurred while scaffolding : ${error}`;

		logger.error(message);
		process.exit(1);
	}
}

async function copyToComponentPackage(name: string) {
	const source = resolve(__dirname, "./templates/component/component");
	const destination = resolve(Source.PackageComponent, toKebabCase(name));
	await cp(source, destination, { recursive: true });

	const componentPath = resolve(destination, "./Component.svelte");
	const newComponentPath = resolve(destination, `./${name}.svelte`);
	await rename(componentPath, newComponentPath);

	const componentContents = await readFile(newComponentPath, "utf8");
	await writeFile(newComponentPath, replacePlaceholders(componentContents, name));

	const indexComponentPath = resolve(destination, `./index.ts`);
	const indexContents = await readFile(indexComponentPath, "utf8");
	await writeFile(indexComponentPath, replacePlaceholders(indexContents, name));

	const variantComponentPath = resolve(destination, `./variants.ts`);
	const variantContents = await readFile(variantComponentPath, "utf8");
	await writeFile(variantComponentPath, replacePlaceholders(variantContents, name));

	const barrelExportPath = resolve(Source.PackageComponent, `./index.ts`);
	const barrelContents = await readFile(barrelExportPath, "utf8");

	const line = `export * from "./${toKebabCase(name)}/index.js";`;
	if (barrelContents.includes(line)) {
		logger.warn("Unexpectedly found existing barrel import. Skipping...");
	} else {
		await appendFile(barrelExportPath, `${line}\n`);
	}
}

async function copyToDocs(name: string) {
	const source = resolve(__dirname, `./templates/component/docs/Component.svelte`);
	const destination = resolve(Source.Docs, `${toTitleCase(name)}.svelte`);
	await copyFile(source, destination);

	const docsContents = await readFile(destination, "utf8");
	await writeFile(destination, replacePlaceholders(docsContents, name));
}

async function alreadyExists(name: string) {
	const componentPath = resolve(Source.PackageComponent, toKebabCase(name));
	const docsPath = resolve(Source.Docs, toTitleCase(name));

	const exists = (await fileExists(componentPath)) || (await fileExists(docsPath));

	return exists;
}

async function fileExists(path: string) {
	try {
		await access(path, constants.F_OK);

		return true;
	} catch {
		return false;
	}
}
