<script lang="ts">
	import type { Writable } from 'svelte/store';
	import Button from '../ui/button/button.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import Separator from '../ui/separator/separator.svelte';

	export let name: string;
	export let config: Writable<any>;
	export let data: Writable<any>;

	const dispatch = createEventDispatcher();

	function onSubmitX() {
		dispatch('state', { name, event: 'SUBMIT_X', _detail: true, config, data });
	}

	function onSubmitY() {
		dispatch('state', { name, event: 'SUBMIT_Y', _detail: true, config, data });
	}

	onMount(() => {
		dispatch('state', { name, event: 'ON_MOUNT', _detail: true, config, data });
	});
</script>

<div class="bg-gray-100 p-5">
	<h1 class="text-lg text-blue-500"><a href="/">{name}</a></h1>
	<h1 class="text-lg text-blue-500">{$config.title}</h1>
	<h2 class="text-sm text-gray-500">{$config.subtitle}</h2>
	<Separator class="my-2" />
	<Button size="sm" on:click={onSubmitX}>Submit_X</Button>
	<Button size="sm" on:click={onSubmitY}>Submit_Y</Button>
</div>
{#if $data}
	{JSON.stringify($data)}
{/if}
