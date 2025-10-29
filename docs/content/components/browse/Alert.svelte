<script module>
export const metadata = {
	description:
		"A visual message box used to communicate contextual feedback to users, such as information, success, warnings, or errors."
};
</script>

<script>
import { Alert, Badge, Link } from "@sveltique/components";
import IconBulbFilled from "@tabler/icons-svelte/icons/bulb-filled"
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const basicUsageCode = `${script('import { Alert } from "@sveltique/components";')}

<Alert type="info">
    This is an informational message. You can safely ignore it.
</Alert>
<Alert type="success">
    Your profile was updated successfully.
</Alert>
<Alert type="warning">
    Your subscription will expire in 3 days.
</Alert>
<Alert type="danger">
    Failed to save changes. Please try again later.
</Alert>`;

const iconCode = `${script('import { Alert, Link } from "@sveltique/components";')}

<Alert type="success">
    <!-- props : { 'aria-hidden': true } -->
    {#snippet icon({ props })}
        <IconBulbFilled class="text-success" {...props} />
    {/snippet}

    Did you know that you can contribute to Sveltique ? Head over to the <Link href="https://github.com/sveltique/sveltique" external>
        repo
    </Link> to start.
</Alert>`;
</script>

<h1 id="alert">Alert</h1>
<p>
	A visual message box used to communicate contextual feedback to users, such as information,
	success, warnings, or errors.
</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>
	An alert renders a different color and icon based on its type : info (default), success, warning,
	and danger.
</p>
<Playground code={basicUsageCode} class="flex-col">
	<Alert type="info">This is an informational message. You can safely ignore it.</Alert>
	<Alert type="success">Your profile was updated successfully.</Alert>
	<Alert type="warning">Your subscription will expire in 3 days.</Alert>
	<Alert type="danger">Failed to save changes. Please try again later.</Alert>
</Playground>

<h2 id="customization">Customization</h2>

<h3 id="icon">Icon</h3>
<p>
    You can change the icon of the alert by using the <Badge variant="secondary">icon</Badge> snippet.
</p>
<Playground code={iconCode}>
	<Alert type="success">
        {#snippet icon({ props })}
            <IconBulbFilled class="text-success" {...props} />
        {/snippet}

        Did you know that you can contribute to Sveltique ? Head over to the <Link href="https://github.com/sveltique/sveltique" external>
            repo
        </Link> to start.
    </Alert>
</Playground>
