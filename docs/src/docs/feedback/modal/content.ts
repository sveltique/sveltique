import { script } from '$utils/playground.js';

export const code = {
	short: `<Modal>
    {#snippet trigger({ open })}
        <Button onclick={open}>Show modal</Button>
    {/snippet}

    <h1 class="text-2xl font-bold">Log out</h1>
    <p>Are you sure you want to log out? You'll need to sign in again to continue.</p>

    {#snippet actions({ close })}
        <Button onclick={close} variant="text">Cancel</Button>
        <Button onclick={close} color="danger">Log Out</Button>
    {/snippet}
</Modal>`,
	expanded: `${script('import { Button, Modal } from "@novaotp/design/components";')}

<Modal>
    {#snippet trigger({ open })}
        <Button onclick={open}>Show modal</Button>
    {/snippet}

    <h1 class="text-2xl font-bold">Log out</h1>
    <p>Are you sure you want to log out? You'll need to sign in again to continue.</p>

    {#snippet actions({ close })}
        <Button onclick={close} variant="text">Cancel</Button>
        <Button onclick={close} color="danger">Log Out</Button>
    {/snippet}
</Modal>`
};
