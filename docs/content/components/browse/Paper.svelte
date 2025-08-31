<script module>
export const metadata = {
	description:
		"A surface to organize related content and, when needed, display actions in a consistent way."
};
</script>

<script lang="ts">
import { Link, Paper } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
</script>

<h1 id="paper">Paper</h1>
<p>A surface to organize related content and, when needed, display actions in a consistent way.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground class="flex-col">
	<Paper class="flex flex-col rounded-xl w-xs overflow-hidden">
        <img
            src="/images/cat.webp"
            alt="Cats"
            class="w-full aspect-video object-cover"
        />
        <div class="relative w-full flex flex-col items-start gap-3 p-6">
            <h3 class="font-bold text-foreground">Cats are the cutest!</h3>
            <p class="text-sm">And yes, I prefer cats to dogs.</p>
        </div>
    </Paper>
    <p class="text-sm italic">
        Image from <Link
            href="https://unsplash.com/photos/three-assorted-color-kittens-rplhB9mYF48"
            aria-label="See the original image of the cats from Unsplash in another tab."
            external
        >Unsplash</Link>
    </p>
</Playground>
