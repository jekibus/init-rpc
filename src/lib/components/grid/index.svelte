<script lang="ts">
	export let data: any;
</script>

{#if data && data.grid && data.grid.length > 0}
	<div
		class="grid {data?.options?.no_gap ? '' : 'gap-4'} grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
	>
		{#each data.grid as item, index}
			<div class={item.class}>
				{#if data.components[index]}
					<svelte:component this={data.components[index]} config={item.config} />
				{/if}
			</div>
		{/each}
	</div>
{/if}
