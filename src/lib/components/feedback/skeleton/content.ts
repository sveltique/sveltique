import { script } from '$utils/playground.js';

export const code = {
	short: `<div class="relative aspect-square w-40 overflow-hidden rounded-2xl">
    {#if loading}
        <Skeleton class="h-full w-full" />
    {:else}
        <img
            src="/images/lost-in-japan.jpg"
            alt="Lost In Japan cover"
            class="h-full w-full object-cover"
        />
    {/if}
</div>
<Button onclick={() => (loading = true)} disabled={loading}>
    Restart
</Button>`,
	expanded: `${script(`import { Button, Skeleton } from '@novaotp/design/components';

    let loading = $state(true);

    $effect(() => {
        if (loading) {
            main();
        }

        async function main() {
            await sleep(3000);
            loading = false;
        }
    });

    // In actual code, this could be a fetch request
    async function sleep(ms: number) {
        return new Promise<void>((resolve) => {
            setTimeout(resolve, ms);
        });
    }`)}

<div class="relative aspect-square w-40 overflow-hidden rounded-2xl">
    {#if loading}
        <Skeleton class="h-full w-full" />
    {:else}
        <img
            src="/images/lost-in-japan.jpg"
            alt="Lost In Japan cover"
            class="h-full w-full object-cover"
        />
    {/if}
</div>
<Button onclick={() => (loading = true)} disabled={loading}>
    Restart
</Button>`
};
