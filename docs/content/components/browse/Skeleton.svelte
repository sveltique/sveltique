<script lang="ts">
import { Badge, Skeleton } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground.js";

const code = `${script("import { Skeleton } from '@sveltique/components';")}

<div class="relative w-full max-w-3xs flex flex-col items-start gap-2.5">
    <Skeleton class="h-32 w-full" />
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-1/2" />
</div>`;
</script>

<h1>Skeleton</h1>
<p>
	Placeholder components used to indicate that content is loading. They give users a sense of the
	structure of the page while reducing perceived wait times.
</p>

<h2>Basic Usage</h2>
<p>
	When using a <code>{'<Skeleton />'}</code>, you must provide explicit their <strong>width</strong>
	and <strong>height</strong>.
</p>
<Playground {code}>
	<div class="max-w-3xs relative flex w-full flex-col items-start gap-2.5">
		<Skeleton class="h-32 w-full" />
		<Skeleton class="h-4 w-full" />
		<Skeleton class="h-4 w-1/2" />
	</div>
</Playground>

<h3>Animation</h3>
<p>
	By default, skeletons include a subtle pulse animation to indicate activity. If you prefer a
	static placeholder, you can disable this by setting <Badge>animation="none"</Badge>.
</p>
<Playground {code}>
	<div class="max-w-3xs relative flex w-full flex-col items-start gap-2.5">
		<Skeleton animation="none" class="h-32 w-full" />
		<Skeleton animation="none" class="h-4 w-full" />
		<Skeleton animation="none" class="h-4 w-1/2" />
	</div>
</Playground>
