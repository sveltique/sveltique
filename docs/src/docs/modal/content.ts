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
	expanded: `${script('import { Button, Modal } from "@sveltique/components";')}

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

export const controlledStateCode = {
	short: `<Modal bind:isOpen>
    {#snippet trigger()}
        <Button onclick={() => (isOpen = true)}>Show modal</Button>
    {/snippet}

    <div class="flex items-center justify-between">
        <Button onclick={() => (isOpen = false)} variant="text" shape="square" title="Close">
            <IconX class="h-5 w-5" />
        </Button>

        <div class="flex items-center gap-3">
            <Button onclick={() => alert('Edit action')} shape="square" title="Edit">
                <IconEdit class="h-5 w-5" />
            </Button>
            <Button
                onclick={() => confirm('Delete this project?')}
                shape="square"
                color="danger"
                title="Delete"
            >
                <IconTrash class="h-5 w-5" />
            </Button>
        </div>
    </div>

    <div class="flex flex-col items-start gap-3">
        <h2 class="text-xl font-bold">Project Alpha</h2>
        <p class="text-gray-600">
            This is an example project. You can edit details, view members, or delete it entirely using
            the actions in the top-right corner.
        </p>
    </div>
</Modal>`,
	expanded: `${script(`import { Button, Modal } from "@sveltique/components";
    
    let isOpen = $state(false);`)}

<Modal bind:isOpen>
    {#snippet trigger()}
        <Button onclick={() => (isOpen = true)}>Show modal</Button>
    {/snippet}

    <div class="flex items-center justify-between">
        <Button onclick={() => (isOpen = false)} variant="text" shape="square" title="Close">
            <IconX class="h-5 w-5" />
        </Button>

        <div class="flex items-center gap-3">
            <Button onclick={() => alert('Edit action')} shape="square" title="Edit">
                <IconEdit class="h-5 w-5" />
            </Button>
            <Button
                onclick={() => confirm('Delete this project?')}
                shape="square"
                color="danger"
                title="Delete"
            >
                <IconTrash class="h-5 w-5" />
            </Button>
        </div>
    </div>

    <div class="flex flex-col items-start gap-3">
        <h2 class="text-xl font-bold">Project Alpha</h2>
        <p class="text-gray-600">
            This is an example project. You can edit details, view members, or delete it entirely using
            the actions in the top-right corner.
        </p>
    </div>
</Modal>`
};
