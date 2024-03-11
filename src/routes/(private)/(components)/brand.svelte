<script lang="ts">
	import { cn } from '$lib/utils.js';

	export let isCollapsed: boolean;
</script>

<div
	class={cn(
		'flex h-[35px] items-center gap-2 p-2 text-left',
		isCollapsed && 'flex h-9 w-9 shrink-0 items-center justify-center p-0'
	)}
	aria-label="OBE"
>
	<div>
		<img src="/favicon.png" alt="brand" class="h-7 w-7" />
	</div>
	{#if !isCollapsed}
		<div class="ml-2">OBE</div>
	{/if}
</div>
