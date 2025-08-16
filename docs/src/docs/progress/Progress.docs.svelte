<script lang="ts">
	import Playground from '$components/Playground.svelte';
	import { theme } from '$lib/contexts/theme.svelte';
	import { script } from '$utils/playground';
	import { Badge, CodeBlock, Field, NumberInput, Progress } from '@sveltique/components';
	import { normalizeProgress } from '@sveltique/components/utils';
	import { tick } from 'svelte';

	let intervalValue = $state(100);
	let step = $state(1);
	let value = $state(0);

	$effect(() => {
		const interval = setInterval(async () => {
			if (value >= 100) {
				value = 0;
				return tick();
			}

			value = Math.min(value + step, 100);
			await tick();
		}, intervalValue);

		return () => clearInterval(interval);
	});
</script>

<h1>Progress</h1>
<p>
	A visual indicator of progress toward completing a task or reaching a limit, such as file uploads,
	onboarding steps, or usage quotas.
</p>

<h2>Basic Usage</h2>
<p>Simply set the current value.</p>
<Playground
	code={{
		short: '<Progress value={73} />',
		expanded: `${script('import { Progress } from "@sveltique/components";')}
    
<Progress value={73} />`
	}}
>
	<Progress value={73} />
</Playground>

<h3>Updating the value</h3>
<Playground
	code={{
		short: '<Progress {value} />',
		expanded: `${script(`import { Progress } from "@sveltique/components";
    
    let value = $state(0);
    
    $effect(() => {
        const interval = setInterval(() => {
            if (value >= 100) {
                value = 0;
                return;
            }

            value++;
        }, 100);
    });`)}
    
<Progress {value} />`
	}}
>
	<Progress {value} />

	{#snippet controls()}
		<div class="flex flex-col gap-6">
			<Field label="Step">
				{#snippet input(props)}
					<NumberInput bind:value={step} min={1} max={40} containerClass="w-40" {...props} />
				{/snippet}
			</Field>

			<Field label="Interval speed (ms)">
				{#snippet input(props)}
					<NumberInput
						bind:value={intervalValue}
						min={40}
						max={400}
						containerClass="w-40"
						{...props}
					/>
				{/snippet}
			</Field>
		</div>
	{/snippet}
</Playground>

<h2>Non-standard ranges</h2>
<p>
	The progress bar is meant to be used for values between 0 and 100. If your min and/or max is
	outside that range, you have to use <Badge>normalizeProgress()</Badge> to use it with the progress
	bar.
</p>
<Playground
	code={{
		short: `<!-- normalizeProgress(value, min, max) -->
<Progress value={normalizeProgress(203, 47, 296)} />`,
		expanded: `${script(`import { Progress } from "@sveltique/components";
    import { normalizeProgress } from "@sveltique/components/utils";`)}

<!-- normalizeProgress(value, min, max) -->
<Progress value={normalizeProgress(203, 47, 296)} />`
	}}
>
	<Progress value={normalizeProgress(203, 47, 296)} />
</Playground>

<h2>Limitations</h2>
<h3>High frequency updates</h3>
<p>
	If you update the value very frequently, the transition of 200ms might interfere with the
	re-rendering process. In that case, you should disable the transition.
</p>
<CodeBlock
	code={'<Progress {value} transition={false} />'}
	lang="svelte"
	theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
	class="**:font-cascadia-code"
/>
