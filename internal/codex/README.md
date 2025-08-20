# Codex

A barebones framework for managing documentation content and navigation from custom configuration files.

## Usage

1. Install codex.

   ```bash
   npm install codex
   ```

2. Define a `sidebar.config.ts` file (root is default).

3. Load the config on the server once ([config documentation](#config)).

   ```ts
   import { SidebarConfig } from 'codex';

   export const sidebarConfig = await SidebarConfig.load();
   ```

4. Define a catch-all path in your docs routes.

   ```bash
   |-- docs
   |   |-- [...slugPath]
   |       |-- +page.server.ts
   |       |-- +page.svelte
   |
   |-- # your other pages
   ```

5. Define the logic in your `+page.server.ts` file

   ```ts
   import path from 'node:path';
   import { error } from '@sveltejs/kit';
   import { sidebarConfig } from '$lib/configs/sidebar.server';

   export async function load({ params, parent }) {
   	const item = sidebarConfig.findBySlugPath(params.slugPath);
   	if (!item) error(404, 'Not found');

   	return {
   		name: item.name,
   		// '../../../../..' makes the path start from the root,
   		// but it all depends on where your docs are located
   		path: path.join('../../../../..', item.path).replaceAll('\\', '/')
   	};
   }
   ```

6. Load the component using its path ([writing docs](#writing-docs)).

   ```svelte
   <script>
   	const { default: Component, metadata } = $derived(await import(/* @vite-ignore */ data.path));
   </script>

   <Component />
   ```

## Documentation

### Config

[TODO]

### Writing docs

[TODO]
