<script lang="ts">
import { Badge } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
import { script } from "$utils/playground";

const refCode = `${script(`import { Button } from "@sveltique/components";

    let buttonRef = $state<HTMLButtonElement>();`)}
    
<Button bind:ref={buttonRef}>
    I'm a button !
</Button>`;

const tailwindIntellisenseCode = `"tailwindCSS.classAttributes": [
    "class",
    "className",
    "containerClass"
]`;
</script>

<svelte:head>
    <title>Conventions - sveltique/components</title>
    <meta name="description" content="Learn about some conventions used in Sveltique." />
</svelte:head>

<h1 id="conventions">Conventions</h1>
<p>Learn about some conventions used in Sveltique.</p>

<h2 id="ref-attribute">Ref attribute</h2>
<p>
    Every Sveltique component exposes a <Badge>ref</Badge> attribute, giving you direct access to the
    component's root element.
</p>
<CodeBlock code={refCode} />

<h2 id="classes">Classes</h2>
<p>
    Every component accepts a <Badge>class</Badge> attribute. For most of components, rendering a single
    element, this applies directly to it.
</p>
<p>
    For more complex components, the attribute is applied to the most relevant element. If you need
    to style the root element instead, the <Badge>containerClass</Badge> attribute is available.
</p>

<h3 id="tailwind-intellisense">Tailwind Intellisense</h3>
<p>
    We recommend adding <Badge>containerClass</Badge> to the list of attributes recognized by the TailwindCSS
    VSCode extension, enabling autocompletions, hover previews, and other editor features.
</p>
<CodeBlock code={tailwindIntellisenseCode} filename="settings.json" lang="json" />
