import { script } from '$utils/playground';

export const code = {
	short: `<Button onclick={() => (showBackdrop = true)}>
    Show backdrop
</Button>

{#if showBackdrop}
    <Backdrop
        onClick={() => (showBackdrop = false)}
        z={1000}
    />
{/if}`,
	expanded: `${script(`import { Backdrop, Button } from '@sveltique/components';

    let showBackdrop = $state(false);`)}

<Button onclick={() => (showBackdrop = true)}>
    Show backdrop
</Button>

{#if showBackdrop}
    <Backdrop
        onClick={() => (showBackdrop = false)}
        z={1000}
    />
{/if}`
};
