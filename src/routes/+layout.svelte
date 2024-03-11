<script>
	import { browser } from '$app/environment';
	import '../app.pcss';
	import Metadata from '$lib/components/base/metadata.svelte';
	import { ModeWatcher } from 'mode-watcher';

	let online = true;

	if (browser) {
		window.addEventListener('online', () => {
			online = true;
		});
		window.addEventListener('offline', () => {
			online = false;
		});
	}
</script>

{#if !online}
	<div class=" w-full bg-red-500 p-3 text-center text-white">
		Your are offline. Make sure your internet connection is available.
	</div>
{/if}

<ModeWatcher />
<Metadata />

<slot />
