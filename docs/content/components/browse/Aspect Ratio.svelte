<script module>
export const metadata = {
	description:
		"Displays content with a specified width to height ratio. Useful for images, videos, or embeds."
};
</script>

<script lang="ts">
import { Alert, AspectRatio, Badge, Link } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const basicUsageCode = `${script('import { AspectRatio } from "@sveltique/components";')}

<AspectRatio
    ratio={16 / 9}
    class="w-full max-w-md rounded-large"
>
    <img
        src="/images/kitten.webp"
        alt="Kitten in grass"
        class="w-full h-full object-cover"
    />
</AspectRatio>`;
</script>

<h1 id="aspect-ratio">Aspect Ratio</h1>
<p>Displays content with a specified width to height ratio. Useful for images, videos, or embeds.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Alert class="mb-4">To enforce the ratio, you must define either a width or height.</Alert>
<Playground code={basicUsageCode} class="flex-col">
    <AspectRatio ratio={16 / 9} class="w-full max-w-md rounded-large">
        <img src="/images/kitten.webp" alt="Kitten in grass" class="w-full h-full object-cover" />
    </AspectRatio>
    <p class="text-sm italic">
        Image from <Link href="https://unsplash.com/photos/orange-tabby-kitten-in-grasses-RCfi7vgJjUY" external>
            Unsplash
        </Link>
    </p>
</Playground>
