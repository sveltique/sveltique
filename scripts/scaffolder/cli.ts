import { program } from "commander";
import { scaffoldComponent } from "./scaffold-component";

program
	.name("scaffold")
	.description("Scaffold boilerplate for creating new components.")
	.version("0.1.0");

program
	.command("component <name>")
	.description("Scaffolds a new component. Name must be in PascalCase.")
	.action(scaffoldComponent);

await program.parseAsync();
