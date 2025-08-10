<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="relative w-full">
	<header class="fixed left-0 top-0 z-50 h-16 w-full border-b border-zinc-300 bg-white">
		<nav class="ga[-5 relative flex w-full items-center justify-center">
			<a href="/">home</a>
			<a href="/docs/components">components</a>
		</nav>
	</header>
	<div class="relative w-full pt-16">
		{@render children()}
	</div>
</div>
