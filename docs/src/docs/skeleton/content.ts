import { script } from '$utils/playground.js';

export const code = `${script("import { Skeleton } from '@sveltique/components';")}

<div class="relative w-full max-w-3xs flex flex-col items-start gap-2.5">
    <Skeleton class="h-32 w-full" />
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-1/2" />
</div>`;
