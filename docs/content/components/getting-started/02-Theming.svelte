<script>
import CodeBlock from "$components/CodeBlock.svelte";
import { Alert, Badge } from "@sveltique/components";

const introductionCode = `@custom-variant dark (&:where(.dark, .dark *));

@theme {
	--color-\*: initial;
	--radius-\*: initial;

	/* Fonts */
	--font-codeblock: var(--font-codeblock); /* Ensure you have imported the font before */

	/* Generic colors */
	--color-black: #000;
	--color-white: #fff;
	--color-transparent: transparent;

	/* Background color */
	--color-background: var(--background);
	--color-foreground: var(--foreground);

	/* Primary color */
	--color-primary: var(--primary);
	--color-primary-foreground: var(--primary-foreground);

	/* Accent colors */
	--color-info: var(--info);
	--color-success: var(--success);
	--color-warning: var(--warning);
	--color-danger: var(--danger);

	/* DERIVED COLORS */
	--color-muted: color-mix(in oklch, var(--background), var(--foreground) 10%);
	--color-muted-foreground: color-mix(in oklch, var(--background), var(--foreground) 50%);

	--color-primary-muted: color-mix(in oklch, var(--primary), var(--background) 10%);
	--color-primary-disabled: color-mix(in oklch, var(--primary), var(--background) 50%);

	--color-info-light: color-mix(in oklch, var(--info), var(--background) 90%);
	--color-success-light: color-mix(in oklch, var(--success), var(--background) 90%);
	--color-warning-light: color-mix(in oklch, var(--warning), var(--background) 90%);
	--color-danger-light: color-mix(in oklch, var(--danger), var(--background) 90%);
	--color-danger-muted: color-mix(in oklch, var(--danger), var(--background) 10%);

	/* Radius and DERIVED RADIUS */
	--radius: var(--base-radius);
	--radius-small: calc(var(--base-radius) / 2);
	--radius-large: calc(var(--base-radius) * 2);
	--radius-full: 9999px;
}

:root {
	/* Ensure you have imported the font before */
	--font-codeblock: "Cascadia Code", sans-serif;

	--base-radius: 0.5rem;

	/* Background color */
	--background: white;
	--foreground: oklch(20.5% 0 0);

	/* Primary color */
	--primary: oklch(48.8% 0.243 264.376);
	--primary-foreground: white;

	/* Accent colors */
	--info: oklch(62.3% 0.214 259.815);
	--success: oklch(72.3% 0.219 149.579);
	--warning: oklch(79.5% 0.184 86.047);
	--danger: oklch(63.7% 0.237 25.331);

	@variant dark {
		/* Background color */
		--background: oklch(20.5% 0 0);
		--foreground: white;

		/* Primary color */
		--primary: oklch(82.8% 0.111 230.318);
		--primary-foreground: oklch(20.5% 0 0);

		/* Accent colors */
		--info: oklch(62.3% 0.214 259.815);
		--success: oklch(72.3% 0.219 149.579);
		--warning: oklch(79.5% 0.184 86.047);
		--danger: oklch(63.7% 0.237 25.331);
	}
}`;
</script>

<svelte:head>
    <title>Usage - sveltique/components</title>
    <meta name="description" content="Learn how to make your own theme for Sveltique." />
</svelte:head>

<h1 id="theming">Theming</h1>
<p>Learn how to make your own theme for Sveltique.</p>

<h2 id="introduction">Introduction</h2>
<p>
	Theming in Sveltique is done via CSS variables. By changing them, you can change your whole site's
	design.
</p>
<p>Below, you can find the theme used for this website, which you can put in <Badge>theme.css</Badge>.</p>
<Alert class="mb-4">
    You can tweak any values to your liking, as long the names are left intact.
</Alert>
<CodeBlock code={introductionCode} filename="theme.css" lang="css" showLineNumbers />

<p>Then, you can import both Sveltique's source files and your theme in your main css file.</p>
<CodeBlock
	code={`/* Importing Cascadia Code to use it for our codeblocks */
@import url('https://fonts.cdnfonts.com/css/cascadia-code');

@import 'tailwindcss';
@plugin '@tailwindcss/forms';

@source "../node_modules/@sveltique/components";
@import './theme.css';`}
	filename="app.css"
	lang="css"
	showLineNumbers
/>

<!--
TODO : Find an example of a popular UI that can be decently replicated (improvements might be needed in core lib)

<h2 id="customizing">Customizing</h2>
<p>
	You can simply edit and/or tweak any values to your liking. Here's an example replicating [FIND AN
	EXAMPLE] :
</p> -->
