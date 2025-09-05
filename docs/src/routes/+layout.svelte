<script lang="ts">
import Navigation from "$components/Navigation.svelte";
import ToastContainer from "$components/toast/ToastContainer.svelte";
import "../app.css";

let { children, data } = $props();
</script>

<ToastContainer />

<div class="relative w-full">
    <Navigation version={data.version} />
    <div class="relative w-full">
        {@render children()}
    </div>
</div>
