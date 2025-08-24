<script lang="ts">
import { Alert, Badge, Button, Kbd, Link, Modal } from "@sveltique/components";
import IconEdit from "@tabler/icons-svelte/icons/edit";
import IconTrash from "@tabler/icons-svelte/icons/trash";

import IconX from "@tabler/icons-svelte/icons/x";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground.js";

let isOpen = $state(false);

const code = {
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

const controlledStateCode = {
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
</script>

<h1 id="modal">Modal</h1>
<p>
	A dialog component that interrupts the user flow to capture attention. Displays content in a
	centered overlay with a dimmed backdrop.
</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>
	A modal is composed of three elements : a trigger, the modals' content and the modal's actions.
</p>
<Alert type="info" class="mb-4">The modal closes on <Kbd>Esc</Kbd> press.</Alert>
<Playground {code}>
	<Modal backdropProps={{ z: 1000 }}>
		{#snippet trigger({ open })}
			<Button onclick={open}>Show modal</Button>
		{/snippet}

		<h1 class="text-2xl font-bold">Log out</h1>
		<p>Are you sure you want to log out? You'll need to sign in again to continue.</p>

		{#snippet actions({ close })}
			<Button onclick={close} variant="text">Cancel</Button>
			<Button onclick={close} color="danger">Log Out</Button>
		{/snippet}
	</Modal>
</Playground>

<h3 id="without-actions-snippet">Without <Badge>actions</Badge> snippet</h3>
<p>
	Maybe you don't want actions at the bottom of the modal. If so, you can use the <Badge
		>children</Badge
	> snippet to access the close function.
</p>
<Playground>
	<Modal backdropProps={{ z: 1000 }}>
		{#snippet trigger({ open })}
			<Button onclick={open}>Show modal</Button>
		{/snippet}

		{#snippet children({ close })}
			<div class="flex items-center justify-between">
				<Button onclick={close} variant="text" shape="square" title="Close">
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
					This is an example project. You can edit details, view members, or delete it entirely
					using the actions in the top-right corner.
				</p>
			</div>
		{/snippet}
	</Modal>
</Playground>

<h2 id="controlling-open-closed-state">Controlling open/closed state</h2>
<p>
	If you need to control the open/closed state of the modal outside of the markup, you can bind to
	it.
</p>
<Playground code={controlledStateCode}>
	<Modal bind:isOpen backdropProps={{ z: 1000 }}>
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
	</Modal>
</Playground>

<h2 id="accessiblity">Accessiblity</h2>
<p>Some notes on accessibility.</p>

<h3 id="re-focus-the-trigger-on-exit">Re-focus the trigger on exit</h3>
<p>
	The trigger snippet also passes a ref to get the trigger element. It is used to focus it when the
	modal is exited.
</p>
<p class="italic">
	Note : You cannot destructure the paramaters AND bind a value as per <Link
		external
		href="https://github.com/sveltejs/svelte/discussions/12688#discussioncomment-10215226"
		aria-label="Opens the Github discussion in a new tab.">this discussion</Link
	>.
</p>
<Playground>
	<Modal backdropProps={{ z: 1000 }} closeOnOverlayClick>
		{#snippet trigger({ open })}
			<Button onclick={open}>Show modal</Button>
		{/snippet}

		<h2 class="text-xl font-semibold">Subscribe to our newsletter</h2>
		<p>Join our mailing list to receive occasional updates. You can unsubscribe at any time.</p>

		{#snippet actions({ close })}
			<Button onclick={close} variant="text">No thanks</Button>
			<Button onclick={close} color="primary">Subscribe</Button>
		{/snippet}
	</Modal>
</Playground>

<h3 id="allow-overlay-click">Allow overlay click</h3>
<p>
	You should only set <Badge>closeOnOverlayClick</Badge> for low-stakes interactions where accidentally
	closing the modal will not cause loss of important data or irreversible actions. See the
	<Link external href="https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/">
		accessibility guidelines
	</Link> for more information.
</p>
<Playground>
	<Modal backdropProps={{ z: 1000 }} closeOnOverlayClick>
		{#snippet trigger({ open })}
			<Button onclick={open}>Show modal</Button>
		{/snippet}

		<h2 class="text-xl font-semibold">Subscribe to our newsletter</h2>
		<p>Join our mailing list to receive occasional updates. You can unsubscribe at any time.</p>

		{#snippet actions({ close })}
			<Button onclick={close} variant="text">No thanks</Button>
			<Button onclick={close} color="primary">Subscribe</Button>
		{/snippet}
	</Modal>
</Playground>

<h3 id="passing-aria">Passing aria</h3>
<p>
	As per aria, you should link a modal label and description. The <Badge>children</Badge> snippet also
	contains spreadable label and description props that you can use.
</p>
<Playground>
	<Modal backdropProps={{ z: 1000 }}>
		{#snippet trigger({ open })}
			<Button onclick={open}>Show modal</Button>
		{/snippet}

		{#snippet children({ labelProps, descriptionProps })}
			<h1 class="text-2xl font-bold" {...labelProps}>Log out</h1>
			<p {...descriptionProps}>
				Are you sure you want to log out? You'll need to sign in again to continue.
			</p>
		{/snippet}

		{#snippet actions({ close })}
			<Button onclick={close} variant="text">Cancel</Button>
			<Button onclick={close} color="danger">Log Out</Button>
		{/snippet}
	</Modal>
</Playground>

<h3 id="autofocus">Autofocus</h3>
<p>
	You should have one element that is focused using the <Badge>autofocus</Badge> attribute.
</p>
<Playground>
	<Modal backdropProps={{ z: 1000 }}>
		{#snippet trigger({ open })}
			<Button onclick={open}>Show modal</Button>
		{/snippet}

		{#snippet children({ labelProps, descriptionProps })}
			<h1 class="text-2xl font-bold" {...labelProps}>Log out</h1>
			<p {...descriptionProps}>
				Are you sure you want to log out? You'll need to sign in again to continue.
			</p>
		{/snippet}

		{#snippet actions({ close })}
			<Button onclick={close} variant="text" autofocus>Cancel</Button>
			<Button onclick={close} color="danger">Log Out</Button>
		{/snippet}
	</Modal>
</Playground>
