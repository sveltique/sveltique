<script lang="ts">
	import { code } from './content.js';
	import Modal from './Modal.svelte';

	import Playground from '$docs/Playground.svelte';
	import Badge from '$lib/components/data-display/badge/Badge.svelte';
	import Button from '$lib/components/inputs/button/Button.svelte';
	import Link from '$lib/components/navigation/link/Link.svelte';

	import IconX from '@tabler/icons-svelte/icons/x';
	import IconEdit from '@tabler/icons-svelte/icons/edit';
	import IconTrash from '@tabler/icons-svelte/icons/trash';
	import Banner from '../banner/Banner.svelte';
</script>

<h1>Modal</h1>
<p>
	A dialog component that interrupts the user flow to capture attention. Displays content in a
	centered overlay with a dimmed backdrop.
</p>
<h2>Basic Usage</h2>
<p>
	A modal is composed of three elements : a trigger, the modals' content and the modal's actions.
</p>
<Playground {code}>
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
	</Modal>
</Playground>

<h3>Without <Badge>actions</Badge> snippet</h3>
<p>
	Maybe you don't want actions at the bottom of the modal. If so, you can use the <Badge
		>children</Badge
	> snippet to access the close function.
</p>
<Playground>
	<Modal>
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

<h2>Accessiblity</h2>
<p>Some notes on accessibility.</p>

<h3>Re-focus the trigger on exit</h3>
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
	<Modal closeOnOverlayClick>
		{#snippet trigger(props)}
			<Button bind:ref={props.ref} onclick={props.open}>Show modal</Button>
		{/snippet}

		<h2 class="text-xl font-semibold">Subscribe to our newsletter</h2>
		<p>Join our mailing list to receive occasional updates. You can unsubscribe at any time.</p>

		{#snippet actions({ close })}
			<Button onclick={close} variant="text">No thanks</Button>
			<Button onclick={close} color="primary">Subscribe</Button>
		{/snippet}
	</Modal>
</Playground>

<h3>Allow overlay click</h3>
<p class="italic">
	Note : You should only set <Badge>closeOnOverlayClick</Badge> for low-stakes interactions where accidentally
	closing the modal will not cause loss of important data or irreversible actions. See the
	<Link external href="https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/">
		accessibility guidelines
	</Link> for more information.
</p>
<Playground>
	<Modal closeOnOverlayClick>
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

<h3>Passing aria</h3>
<p>
	As per aria, you should link a modal label and description. The <Badge>children</Badge> snippet also
	contains spreadable label and description props that you can use.
</p>
<Playground>
	<Modal>
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

<h3>Autofocus</h3>
<p>
	You should have one element that is focused using the <Badge>autofocus</Badge> attribute.
</p>
<Playground>
	<Modal>
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
