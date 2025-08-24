<script lang="ts">
import { Paper, Separator } from "@sveltique/components";
import IconPlayerPauseFilled from "@tabler/icons-svelte/icons/player-pause-filled";
import IconPlayerSkipBackFilled from "@tabler/icons-svelte/icons/player-skip-back-filled";
import IconPlayerSkipForwardFilled from "@tabler/icons-svelte/icons/player-skip-forward-filled";
import Playground from "$components/Playground.svelte";

const code = {
	short: `<Paper variant="outline" class="flex w-[360px]">
    <div class="relative flex w-2/3 flex-col">
        <div class="px-6 py-3">
            <p class="text-xs">Shawn Mendes</p>
            <p class="text-lg font-bold">Lost in Japan</p>
        </div>
        <Separator />
        <div class="relative flex w-full items-center justify-center gap-3 px-6 py-3">
            <IconPlayerSkipBackFilled />
            <IconPlayerPauseFilled />
            <IconPlayerSkipForwardFilled />
        </div>
    </div>
    <Separator orientation="vertical" />
    <div class="relative aspect-square w-1/3">
        <img
            src="/images/lost-in-japan.jpg"
            alt="Lost In Japan cover image"
            class="object-cover h-full w-full"
        />
    </div>
</Paper>`,
	expanded: `&lt;script lang="ts"&gt;
    import { Paper, Separator } from '@sveltique/components';
    import {
        IconPlayerPauseFilled,
        IconPlayerSkipBackFilled,
        IconPlayerSkipForwardFilled
     } from '@tabler/icons-svelte';
&lt;/script&gt;

<Paper variant="outline" class="flex w-[360px]">
    <div class="relative flex w-2/3 flex-col">
        <div class="px-6 py-3">
            <p class="text-xs">Shawn Mendes</p>
            <p class="text-lg font-bold">Lost in Japan</p>
        </div>
        <Separator />
        <div class="relative flex w-full items-center justify-center gap-3 px-6 py-3">
            <IconPlayerSkipBackFilled />
            <IconPlayerPauseFilled />
            <IconPlayerSkipForwardFilled />
        </div>
    </div>
    <Separator orientation="vertical" />
    <div class="relative aspect-square w-1/3">
        <img
            src="/images/lost-in-japan.jpg"
            alt="Lost In Japan cover image"
            class="object-cover h-full w-full"
        />
    </div>
</Paper>`
};
</script>

<h1>Separator</h1>
<p>A visible, thin line to visually divide two items.</p>

<h2>Basic Usage</h2>
<p>The separator can either be vertical or horizontal.</p>
<Playground {code} class="flex-col">
	<Paper variant="outline" class="flex w-[360px]">
		<div class="relative flex w-2/3 flex-col">
			<div class="px-6 py-3">
				<p class="text-xs">Shawn Mendes</p>
				<p class="text-lg font-bold">Lost in Japan</p>
			</div>
			<Separator />
			<div class="relative flex w-full items-center justify-center gap-3 px-6 py-3">
				<IconPlayerSkipBackFilled />
				<IconPlayerPauseFilled />
				<IconPlayerSkipForwardFilled />
			</div>
		</div>
		<Separator orientation="vertical" />
		<div class="relative aspect-square w-1/3">
			<!-- svelte-ignore a11y_img_redundant_alt -->
			<img
				src="/images/lost-in-japan.jpg"
				alt="Lost In Japan cover image"
				class="h-full w-full object-cover"
			/>
		</div>
	</Paper>
	<p class="text-sm italic text-zinc-500">
		Image from <a
			href="https://www.last.fm/music/Shawn+Mendes/Lost+in+Japan/+images"
			target="_blank">last.fm</a
		>
	</p>
</Playground>
