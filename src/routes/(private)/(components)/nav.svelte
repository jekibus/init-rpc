<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';

	export let isCollapsed: boolean;
	export let routes: any[];
</script>

<ScrollArea orientation="vertical" class="h-[calc(100vh-50px)]">
	<div data-collapsed={isCollapsed} class="group flex flex-col gap-4 py-2">
		<nav class="grid gap-1 px-2">
			{#each routes as route}
				{#if isCollapsed}
					<Tooltip.Root openDelay={0}>
						<Tooltip.Trigger asChild let:builder>
							<Button
								href="#"
								builders={[builder]}
								variant={route.variant}
								size="icon"
								class={cn(
									'size-9',
									route.variant === 'default' &&
										'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
								)}
							>
								<svelte:component this={route.icon} class="size-4" aria-hidden="true" />
								<span class="sr-only">{route.title}</span>
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content side="right" class="flex items-center gap-4">
							{route.title}
							{#if route.label}
								<span class="ml-auto text-muted-foreground">
									{route.label}
								</span>
							{/if}
						</Tooltip.Content>
					</Tooltip.Root>
				{:else}
					<Button
						href="#"
						variant={route.variant}
						size="default"
						class={cn('justify-start', {
							'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white':
								route.variant === 'default'
						})}
					>
						<svelte:component this={route.icon} class="mr-3 size-4" aria-hidden="true" />
						{route.title}
						{#if route.label}
							<span
								class={cn('ml-auto', {
									'text-background dark:text-white': route.variant === 'default'
								})}
							>
								{route.label}
							</span>
						{/if}
					</Button>
				{/if}
			{/each}
		</nav>
	</div>
</ScrollArea>
