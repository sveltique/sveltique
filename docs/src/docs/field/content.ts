export const ageCode = {
	short: `<Field label="Age" error={ageError} class="w-[240px]">
    {#snippet input(props)}
        <NumberInput
            bind:value={age}
            min={0}
            max={99}
            {...props}
        />
    {/snippet}
</Field>`,
	expanded: `&lt;script&gt;
    import { Field, NumberInput } from '@sveltique/components';

    let age = $state(18);
    let ageError = $derived.by(() => {
        if (age < 16 || age > 25) {
            return 'You must be between 16 and 25 years old to participate.';
        }
    });
&lt;/script&gt;

<Field label="Age" error={ageError} class="w-[240px]">
    {#snippet input(props)}
        <NumberInput
            bind:value={age}
            min={0}
            max={99}
            {...props}
        />
    {/snippet}
</Field>`
};
