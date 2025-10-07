<script lang="ts">
import { SveltiqueProvider } from "@sveltique/components/config";
import Navigation from "$components/Navigation.svelte";
import ToastContainer from "$components/toast/ToastContainer.svelte";
import { sveltiqueProvider } from "$lib/contexts/sveltique.svelte";
import "../app.css";

let { children, data } = $props();
</script>

<SveltiqueProvider animation={sveltiqueProvider.animation}>
    <ToastContainer />

    <div class="relative w-full">
        <Navigation version={data.version} />
        <div class="relative w-full">
            {@render children()}
        </div>
    </div>
</SveltiqueProvider>
