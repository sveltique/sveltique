<script module>
export const metadata = {
	description:
		"A visual indicator of progress toward completing a task or reaching a limit, such as file uploads, onboarding steps, or usage quotas."
};
</script>

<script lang="ts">
import { Alert, Badge, Label, Progress } from "@sveltique/components";
import { normalizeProgress } from "@sveltique/components/utils";
import { tick } from "svelte";
import CodeBlock from "$components/CodeBlock.svelte";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

let intervalValue = $state(100);
let step = $state(1);
let value = $state(0);

let storageUsed = $state(88);
let storageLimit = $state(100);

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

const basicUsageCode = `${script('import { Progress } from "@sveltique/components";')}
    
<Progress value={73} />`;

const updatingValueCode = `${script(`import { Progress } from "@sveltique/components";
    
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
    
<Progress {value} />`;

const nonStandardRangesCode = `${script(`import { Progress } from "@sveltique/components";
    import { normalizeProgress } from "@sveltique/components/utils";`)}

<!-- normalizeProgress(value, min, max) -->
<Progress value={normalizeProgress(203, 47, 296)} />`;

const quotaCode = `${script(`import { Alert, Label, Progress } from "@sveltique/components";

    let storageUsed = $state(88);
    let storageLimit = $state(100);`)}

<div class="relative w-full max-w-md flex flex-col gap-3">
    {#if storageUsed > 80}
        {@const percentage = Math.round(storageUsed * 100 / storageLimit)}
        <Alert type="warning">
            You're approaching your storage limit ({percentage}%). Consider upgrading to a Pro plan.
        </Alert>
    {/if}
    <div class="relative w-full flex flex-col gap-3">
        <div class="relative w-full flex justify-between items-center">
            <Label for="storage-used">
                Storage usage
            </Label>
            <span class="text-sm">
                {storageUsed} / {storageLimit} GB
            </span>
        </div>
        <Progress
            id="storage-used"
            value={storageUsed}
            class="[&>[data-progress-fill]]:bg-warning"
        />
    </div>
</div>`;
</script>

<h1 id="progress">Progress</h1>
<p>
	A visual indicator of progress toward completing a task or reaching a limit, such as file uploads,
	onboarding steps, or usage quotas.
</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicUsageCode}>
	<Progress value={73} />
</Playground>

<h3 id="updating-the-value">Updating the value</h3>
<Playground code={updatingValueCode}>
	<Progress {value} />
</Playground>

<h2 id="non-standard-ranges">Non-standard ranges</h2>
<p>
	The progress bar is meant to be used for values between 0 and 100. If your min and/or max is
	outside that range, you can use the <Badge variant="secondary">normalizeProgress()</Badge> helper.
</p>
<Playground code={nonStandardRangesCode}>
	<Progress value={normalizeProgress(203, 47, 296)} />
</Playground>

<h2 id="limitations">Limitations</h2>

<h3 id="high-frequency-updates">High frequency updates</h3>
<p>
	If you update the value very frequently, the transition of 200ms might interfere with the
	re-rendering process. In that case, you should disable the transition.
</p>
<CodeBlock code={'<Progress {value} transition={false} />'} />

<h2 id="examples">Examples</h2>

<h3>Quota</h3>
<Playground code={quotaCode}>
    <div class="relative w-full max-w-md flex flex-col gap-3">
        {#if storageUsed > 80}
            {@const percentage = Math.round(storageUsed * 100 / storageLimit)}
            <Alert type="warning">
                You're approaching your storage limit ({percentage}%). Consider upgrading to a Pro plan.
            </Alert>
        {/if}
        <div class="relative w-full flex flex-col gap-3">
            <div class="relative w-full flex justify-between items-center">
                <Label for="storage-used">Storage usage</Label>
                <span class="text-sm">{storageUsed} / {storageLimit} GB</span>
            </div>
            <Progress
                id="storage-used"
                value={storageUsed}
                class="[&>[data-progress-fill]]:bg-warning"
            />
        </div>
    </div>
</Playground>
