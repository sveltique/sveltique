import { script } from '$utils/playground.js';

export const code = {
	short: `{@render videoLoading()}
{@render videoLoading()}

{#snippet videoLoading()}
    <div class="relative flex w-full max-w-3xs flex-col items-start gap-2.5">
        <Skeleton class="h-32 w-full" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-1/2" />
    </div>
{/snippet}`,
	expanded: `${script("import { Skeleton } from '@novaotp/design/components';")}

{@render videoLoading()}
{@render videoLoading()}

{#snippet videoLoading()}
    <div class="relative flex w-full max-w-3xs flex-col items-start gap-2.5">
        <Skeleton class="h-32 w-full" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-1/2" />
    </div>
{/snippet}`
};
