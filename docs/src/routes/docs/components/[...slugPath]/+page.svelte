<script lang="ts">
let { data } = $props();

const { default: Component, metadata } = $derived(await import(/* @vite-ignore */ data.path));
</script>

<svelte:head>
	<title>{data.name} - @sveltique/components</title>
	<meta name="description" content={metadata?.description} />
</svelte:head>

<Component />
