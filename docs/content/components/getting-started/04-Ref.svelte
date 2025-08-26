<script>
import { Badge } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
import { script } from "$utils/playground";
</script>

<h1>Ref</h1>
<p>Learn about the global ref attribute.</p>

<h2>Basic Usage</h2>
<p>Every Sveltique component exposes a <Badge>ref</Badge> attribute, returning a reference to the root element of a given component.</p>
<p>By binding to it, you can make direct manipulations on the element.</p>
<CodeBlock code={`${script(`import { Button } from '@sveltique/components';

    let buttonRef = $state<HTMLButtonElement>();`)}
    
<Button bind:ref={buttonRef}>
    I'm a button !
</Button>`} />
