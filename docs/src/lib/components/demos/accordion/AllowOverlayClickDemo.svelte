<script lang="ts">
import { Button, Drawer, Field, Switch } from "@sveltique/components";
import type { FormEventHandler } from "svelte/elements";
import Playground from "$components/Playground.svelte";
import { toasts } from "$lib/contexts/toast.svelte";
import { script } from "$utils/playground";

type FormEvent = Parameters<FormEventHandler<HTMLFormElement>>[0];

type EmailPreferenceKey = "product-updates" | "weekly-newsletters" | "promotions-and-offers";
type EmailPreferences = Record<EmailPreferenceKey, { label: string; checked: boolean }>;

let isOpen = $state(false);
let emailPreferences = $state<EmailPreferences>({
	"product-updates": {
		label: "Product updates",
		checked: true
	},
	"weekly-newsletters": {
		label: "Weekly newsletters",
		checked: true
	},
	"promotions-and-offers": {
		label: "Promotions and offers",
		checked: true
	}
});

function onsubmit(event: FormEvent) {
	const formData = new FormData(event.currentTarget);

	for (const emailPreference of Object.entries(emailPreferences)) {
		emailPreference[1].checked = !!formData.get(emailPreference[0]!);
	}

	toasts.add({ type: "success", content: "Your preferences have been updated." });
	isOpen = false;
}

const closeOnOverlayClickCode = `${script(`import { Button, Drawer, Field, Switch } from "@sveltique/components";
    import type { FormEventHandler } from "svelte/elements";
    import { toasts } from "$lib/contexts/toast.svelte";

    type FormEvent = Parameters<FormEventHandler<HTMLFormElement>>[0];

    type EmailPreferenceKey = "product-updates" | "weekly-newsletters" | "promotions-and-offers";
    type EmailPreferences = Record<EmailPreferenceKey, { label: string; checked: boolean }>;

    let isOpen = $state(false);
    let emailPreferences = $state<EmailPreferences>({
        "product-updates": {
            label: "Product updates",
            checked: true
        },
        "weekly-newsletters": {
            label: "Weekly newsletters",
            checked: true
        },
        "promotions-and-offers": {
            label: "Promotions and offers",
            checked: true
        }
    });

    function onsubmit(event: FormEvent) {
        const formData = new FormData(event.currentTarget);

        for (const emailPreference of Object.entries(emailPreferences)) {
            emailPreference[1].checked = !!formData.get(emailPreference[0]!);
        }

        toasts.add({ type: "success", content: "Your preferences have been updated." });
        isOpen = false;
    }`)}

<Drawer.Root bind:isOpen closeOnOverlayClick>
    {#snippet trigger({ open })}
        <Button onclick={open}>
            Manage email preferences
        </Button>
    {/snippet}

    <div class="relative flex flex-col gap-6 w-full">
        <div class="relative flex flex-col gap-3 w-full">
            <h2 class="font-bold text-2xl">Email Preferences</h2>
            <p class="text-muted-foreground">
                Choose which types of emails you want to receive. You can update these anytime.
            </p>
        </div>
        <form {onsubmit} id="email-preferences-form" class="space-y-3">
            {#each Object.entries(emailPreferences) as [name, { label, checked }] (name)}
                <Field
                    {label}
                    placement="left"
                    controlProps={{ class: "justify-between" }}
                >
                    {#snippet input({ props })}
                        <Switch {name} {checked} {...props} />
                    {/snippet}
                </Field>
            {/each}
        </form>
    </div>

    {#snippet actions({ close })}
        <Button form="email-preferences-form" type="submit">
            Save changes
        </Button>
        <Button onclick={close} variant="text">Cancel</Button>
    {/snippet}
</Drawer.Root>`;
</script>

<Playground code={closeOnOverlayClickCode}>
	<Drawer.Root bind:isOpen closeOnOverlayClick backdropProps={{ z: 1000 }}>
        {#snippet trigger({ open })}
            <Button onclick={open}>Manage email preferences</Button>
        {/snippet}

        <div class="relative flex flex-col gap-6 w-full">
            <div class="relative flex flex-col gap-3 w-full">
                <h2 class="font-bold text-2xl">Email Preferences</h2>
                <p class="text-muted-foreground">
                    Choose which types of emails you want to receive. You can update these anytime.
                </p>
            </div>
            <form {onsubmit} id="email-preferences-form" class="space-y-3">
                {#each Object.entries(emailPreferences) as [name, { label, checked }] (name)}
                    <Field
                        {label}
                        placement="left"
                        controlProps={{ class: "justify-between" }}
                    >
                        {#snippet input({ props })}
                            <Switch {name} {checked} {...props} />
                        {/snippet}
                    </Field>
                {/each}
            </form>
        </div>

        {#snippet actions({ close })}
            <Button form="email-preferences-form" type="submit">
                Save changes
            </Button>
            <Button onclick={close} variant="text">Cancel</Button>
        {/snippet}
    </Drawer.Root>
</Playground>
