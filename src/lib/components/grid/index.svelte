<script lang="ts">
	import { convertSlash } from '$lib/helper';

	export let data: any;
</script>

{#if data && data.grid && data.grid.length > 0}
	<div
		class="grid {data?.options?.no_gap ? '' : 'gap-4'} grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
	>
		{#each data.grid as item}
			<div class={item.class}>
				{#if data.components[convertSlash(item.component)]}
					<svelte:component
						this={data.components[convertSlash(item.component)]}
						config={item.config}
					/>
				{/if}
			</div>
		{/each}
	</div>
{:else}
	<p>No config found. Please contact your Administrator.</p>
{/if}
