<script lang="ts">
	import { convertSlash } from '$lib/helper';

	export let data: any;
	export let schemas: any;
</script>

{#each data.grid as item}
	{@const config = { ...item.config, schema: schemas[item.config?.schema] }}
	<div class={item.class}>
		{#if data.components[convertSlash(item.component)]}
			<svelte:component
				this={data.components[convertSlash(item.component)]}
				{config}
				data={item.data}
			/>
		{/if}
	</div>
{/each}
