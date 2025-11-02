<script module>
export const metadata = {
	description: "A surface to organize related content together."
};
</script>

<script lang="ts">
import { Alert, AspectRatio, Badge, Link, Paper, type PaperProps } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const basicUsageCode = `${script('import { Paper } from "@sveltique/components";')}

<Paper class="px-6 py-4 text-sm text-center">
    Outline
</Paper>
<Paper variant="elevated" class="px-6 py-4 text-sm text-center">
    Elevated
</Paper>`;

const elevationCode = `${script('import { Paper } from "@sveltique/components";')}

<div class="gap-4 grid grid-cols-[repeat(1,minmax(0,200px))] sm:grid-cols-[repeat(2,minmax(0,200px))]">
    {#each { length: 4 } as _, elevation (elevation)}
        <Paper
            variant="elevated"
            {elevation}
            class="p-6 text-sm text-center"
        >
            elevation = {elevation}
        </Paper>
    {/each}
</div>`;

const exampleCardCode = `${script('import { AspectRatio, Paper } from "@sveltique/components";')}

<Paper class="flex flex-col w-full max-w-xs overflow-hidden">
    <AspectRatio ratio={16 / 9}>
        <img
            src="/images/cat.webp"
            alt="Cats"
            class="w-full h-full object-cover"
        />
    </AspectRatio>
    <div class="relative flex flex-col items-start gap-3 p-4 w-full">
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
<p>A surface to organize related content together.</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>A paper has two variants : outline (default), and elevated.</p>
<Playground code={basicUsageCode}>
    <Paper class="px-6 py-4 text-sm text-center">
        Outline
    </Paper>
    <Paper variant="elevated" class="px-6 py-4 text-sm text-center">
        Elevated
    </Paper>
</Playground>

<h2 id="customization">Customization</h2>

<h3 id="elevation">Elevation</h3>
<p>
    Use the <Badge variant="secondary">elevation</Badge> property to control the distance of the paper
    from the background.
</p>
<Alert class="mb-4">
    This property has no effect if the <Badge variant="secondary">
        variant
    </Badge> is not set to <Badge variant="secondary">elevated</Badge>.
</Alert>
<Playground code={elevationCode}>
    <div class="gap-4 grid grid-cols-[repeat(1,minmax(0,200px))] sm:grid-cols-[repeat(2,minmax(0,200px))]">
        {#each { length: 4 } as _, elevation (elevation)}
            <Paper
                variant="elevated"
                elevation={elevation as PaperProps["elevation"]}
                class="p-6 text-sm text-center"
            >
                elevation = {elevation}
            </Paper>
        {/each}
    </div>
</Playground>

<h2 id="examples">Examples</h2>

<h3 id="card">Card</h3>
<Playground code={exampleCardCode} class="flex-col">
    <Paper class="flex flex-col w-full max-w-xs overflow-hidden">
        <AspectRatio ratio={16 / 9}>
            <img
                src="/images/cat.webp"
                alt="Cats"
                class="w-full h-full object-cover"
            />
        </AspectRatio>
        <div class="relative flex flex-col items-start gap-3 p-4 w-full">
            <h3 class="font-bold text-foreground">Cats are the cutest!</h3>
            <p class="text-sm">And yes, I prefer cats to dogs.</p>
        </div>
    </Paper>
    <p class="text-sm italic">
        Image from <Link
            href="https://unsplash.com/photos/three-assorted-color-kittens-rplhB9mYF48"
            aria-label="See the original image of the cats from Unsplash in another tab."
            external
        >
            Unsplash
        </Link>
    </p>
</Playground>
