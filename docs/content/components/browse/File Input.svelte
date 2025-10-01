<script module>
export const metadata = {
	description: "A styled replacement for the native file input element."
};
</script>

<script lang="ts">
import { Badge, Field, FileInput } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

let file = $state<File>();
let fileError = $derived(file && getSizeMB(file) > 5 ? "File too big" : undefined);

function getSizeMB(file: File): number {
	return file.size / 1024 / 1024;
}

const basicUsageCode = `${script('import { FileInput } from "@sveltique/components";')}

<FileInput class="max-w-xs" />`;

const fileVsFilesCode = `${script(`import { FileInput } from "@sveltique/components";

    let file = $state<File>();
    let files = $state<FileList>();`)}

<FileInput bind:file bind:files />`;

const formExampleCode = `${script(`import { Field, FileInput } from "@sveltique/components";

    let files = $state<FileList>();

    // Proper validation should also happen on the server
    let error = $derived.by(() => {
        const file = files?.[0];
        return file && getSizeMB(file) > 5 ? "File too big" : undefined;
    });

    function getSizeMB(file: File): number {
        return file.size / 1024 / 1024;
    }`)}

<Field
    label="CV"
    helper="PDF or DOCX (max. 5 MB)"
    {error}
    class="max-w-xs"
>
    {#snippet input({ props })}
        <FileInput
            bind:files
            accept=".pdf,.docx"
            {...props}
        />
    {/snippet}
</Field>`;
</script>

<h1 id="file-upload">File Input</h1>
<p>A styled replacement for the native file input element.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicUsageCode}>
    <FileInput class="max-w-xs" />
</Playground>

<h2 id="file-vs-files">File vs Files</h2>
<p>
    By default, file inputs provide a <Badge variant="secondary">files</Badge> property to access the
    current list of selected files. However, it always returns a list, even when <Badge variant="secondary">
        multiple
    </Badge> is set to false.
</p>
<p>
    For convenience, a bindable <Badge variant="secondary">file</Badge> property is also available 
    to access the first selected file directly.
</p>
<CodeBlock code={fileVsFilesCode} showLineNumbers />

<h2 id="examples">Examples</h2>

<h3 id="form">Form</h3>
<Playground code={formExampleCode}>
    <Field label="CV" helper="PDF or DOCX (max. 5 MB)" error={fileError} class="max-w-xs">
        {#snippet input({ props })}
            <FileInput bind:file accept=".pdf,.docx" {...props} />
        {/snippet}
    </Field>
</Playground>
