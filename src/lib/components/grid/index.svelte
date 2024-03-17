<script lang="ts">
	import Items from './items.svelte';

	export let data: any;
	export let schemas: any = undefined;
	export let machines: any = undefined;
</script>

{#if data && data.grid && data.grid.length > 0}
	{#if data.options?.grid === false}
		<div class="flex h-screen items-center justify-center">
			<Items {data} {schemas} {machines} />
		</div>
	{:else}
		<div
			class="grid {data.options?.gap !== false
				? 'gap-4'
				: ''} grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
		>
			<Items {data} {schemas} {machines} />
		</div>
	{/if}
{:else}
	<p>No grid found. Please contact your Administrator.</p>
{/if}
