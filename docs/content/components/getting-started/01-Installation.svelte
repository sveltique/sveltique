<script>
import { Alert, Badge, Link } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
</script>

<svelte:head>
    <title>Installation - sveltique/components</title>
    <meta name="description" content="Install Sveltique components library." />
</svelte:head>

<h1 id="installation" class="text-3xl font-bold">Installation</h1>
<p>Install Sveltique components library.</p>
<Alert type="warning" class="mb-4">
    Until 1.0, this library is not suited for production-level code, as there may be breaking changes
    between minor versions (especially in the early versions).
</Alert>
<Alert>
    Since the library is not finished yet, docs may be incomplete. <Link href="https://github.com/sveltique/sveltique" external>
        Help us improve them !
    </Link> Any suggestions are welcome.
</Alert>

<h2 id="default-installation">Default installation</h2>
<p>You can easily import the library via npm.</p>
<CodeBlock code="npm install @sveltique/components" lang="bash" />

<h3 id="peer-dependencies">Peer dependencies</h3>
<p>Note that you should at least have Svelte at version 5.25.0 to use the library.</p>
<CodeBlock
    code={`"peerDependencies": {
    "svelte": "^5.25.0"
}`}
    lang="json"
/>

<h3 id="optional-dependencies">Optional dependencies</h3>
<p>These libraries are optional if you don't use the components that rely on them.</p>

<h4 id="code-block">Code Block</h4>
<p>
    The <code>{"<CodeBlock />"}</code> component uses <Link href="https://shiki.style" external
        >shiki</Link
    > under the hood to provide syntax highlighting.
</p>
<CodeBlock code="npm install shiki" lang="bash" />
