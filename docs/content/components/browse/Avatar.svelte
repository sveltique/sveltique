<script lang="ts">
import { Alert, Avatar, Badge } from "@sveltique/components";
import { stringToHSL } from "@sveltique/components/utils";
import IconUserFilled from "@tabler/icons-svelte/icons/user-filled";
import CodeBlock from "$components/CodeBlock.svelte";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const basicUsageCode = `${script(`import { Avatar } from "@sveltique/components";`)}

<Avatar src="/images/avatar.webp" alt="Username" />`;

const fallbackCode = `${script(`import { Avatar } from "@sveltique/components";
    import { stringToHSL } from "@sveltique/components/utils";`)}

<Avatar
    fallback="SR"
    containerProps={{
        style: \`background-color: \${stringToHSL("SR")};\`
    }}
/>`;

const complexFallbackCode = `${script(`import { Avatar } from "@sveltique/components";
    import { stringToHSL } from "@sveltique/components/utils";`)}

<Avatar
    containerProps={{
        style: \`background-color: \${stringToHSL("SR")};\`
    }}
>
    <IconUserFilled />
</Avatar>`;
</script>

<h1 id="avatar">Avatar</h1>
<p>Displays an image representing a user, with a fallback.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicUsageCode}>
    <Avatar src="/images/avatar.webp" alt="Username" />
</Playground>

<h2 id="features">Features</h2>
<ul>
    <li>Shows the image if available</li>
    <li>Automatically displays a fallback if the image is loading or fails to load</li>
</ul>

<h2 id="fallback">Fallback</h2>
<p>
   If the image fails to load or no <Badge variant="secondary">src</Badge> is provided, you can use
   the <Badge variant="secondary">fallback</Badge> attribute to show a placeholder.
</p>
<Playground code={fallbackCode}>
    <Avatar fallback="SR" containerProps={{ style: `background-color: ${stringToHSL("SR")};` }} />
</Playground>

<h3 id="custom-fallback">Custom fallback</h3>
<p>If you need to display a fallback other than a string, you can pass content as <Badge variant="secondary">children</Badge>.</p>
<Alert class="mb-4">
    When both <Badge variant="secondary">children</Badge> and <Badge variant="secondary">fallback</Badge>
    are provided, <strong>children takes precedence</strong>.
</Alert>
<Playground code={complexFallbackCode}>
    <Avatar containerProps={{ style: `background-color: ${stringToHSL("SR")};` }}>
        <IconUserFilled />
    </Avatar>
</Playground>

<h2 id="utility">Utility</h2>
<p>
    <Badge variant="secondary">stringToHSL</Badge> is a helper function for generating a consistent
    background color from a string, commonly used for fallback initials.
</p>
<CodeBlock code={'import { stringToHSL } from "@sveltique/components/utils";'} lang="ts" />
