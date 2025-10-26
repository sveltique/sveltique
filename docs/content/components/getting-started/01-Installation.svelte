<script>
import { Alert, Badge, Link } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
</script>

<svelte:head>
    <title>Installation - sveltique/components</title>
    <meta name="description" content="Install Sveltique components library." />
</svelte:head>

<h1 id="installation" class="font-bold text-3xl">Installation</h1>
<p>Install Sveltique components library.</p>
<Alert type="danger" class="mb-4">
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

<h2 id="peer-dependencies">Peer dependencies</h2>

<h3 id="svelte"><Badge variant="secondary" class="text-base">svelte</Badge></h3>
<p>
    You should at least have <Badge variant="secondary">svelte</Badge> at version 5.25.0 to use the
    library.
</p>

<h3 id="@floating-ui/dom"><Badge variant="secondary" class="text-base">@floating-ui/dom</Badge></h3>
<p>
    If you use one of these components, you should at least have <Badge variant="secondary">@floating-ui/dom</Badge>
    at version 1.7.4 to use the library.
</p>
<ul>
    <li><Link href="/docs/components/browse/tooltip">Tooltip</Link></li>
</ul>
<CodeBlock code="npm install @floating-ui/dom" lang="bash" />

<h2 id="optional-dependencies">Optional dependencies</h2>
<p>These libraries are optional if you don't use the components that rely on them.</p>

<h3 id="code-block">CodeBlock</h3>
<p>
    The <code>{"<CodeBlock />"}</code> component uses <Link href="https://shiki.style" external
        >shiki</Link
    > under the hood to provide syntax highlighting.
</p>
<CodeBlock code="npm install shiki" lang="bash" />
