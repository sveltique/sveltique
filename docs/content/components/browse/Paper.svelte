<script module>
export const metadata = {
	description:
		"A surface to organize related content and, when needed, display actions in a consistent way."
};
</script>

<script lang="ts">
    import {
        AspectRatio,
        Link,
        Paper,
        type PaperProps,
    } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
    import { script } from "$utils/playground";

    const basicCode = `${script('import { AspectRatio, Paper } from "@sveltique/components";')}

<Paper class="w-full flex flex-col max-w-xs overflow-hidden">
    <AspectRatio ratio={16 / 9}>
        <img
            src="/images/cat.webp"
            alt="Cats"
            class="w-full h-full object-cover"
        />
    </AspectRatio>
    <div class="relative w-full flex flex-col items-start gap-3 p-4">
        <h3 class="font-bold text-foreground">
            Cats are the cutest!
        </h3>
        <p class="text-sm">
            And yes, I prefer cats to dogs.
        </p>
    </div>
</Paper>`;
</script>

<h1 id="paper">Paper</h1>
<p>
    A surface to organize related content and, when needed, display actions in a
    consistent way.
</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicCode} class="flex-col">
    <Paper class="w-full flex flex-col max-w-xs overflow-hidden">
        <AspectRatio ratio={16 / 9}>
            <img
                src="/images/cat.webp"
                alt="Cats"
                class="w-full h-full object-cover"
            />
        </AspectRatio>
        <div class="relative w-full flex flex-col items-start gap-3 p-4">
            <h3 class="font-bold text-foreground">Cats are the cutest!</h3>
            <p class="text-sm">And yes, I prefer cats to dogs.</p>
        </div>
    </Paper>
    <p class="text-sm italic">
        Image from <Link
            href="https://unsplash.com/photos/three-assorted-color-kittens-rplhB9mYF48"
            aria-label="See the original image of the cats from Unsplash in another tab."
            external>Unsplash</Link
        >
    </p>
</Playground>

<h2 id="customization">Customization</h2>

<h3 id="elevation">Elevation</h3>
<Playground
    code={basicCode}
    class="grid grid-cols-[repeat(1,minmax(0,200px))] sm:grid-cols-[repeat(2,minmax(0,200px))]"
>
    {#each { length: 6 } as _, i}
        <Paper
            variant="elevated"
            elevation={i as PaperProps["elevation"]}
            class="p-6 text-center"
        >
            elevation = {i}
        </Paper>
    {/each}
</Playground>
