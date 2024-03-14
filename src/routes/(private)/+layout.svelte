<script lang="ts">
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { Separator } from '$lib/components/ui/select/index.js';
	import { cn } from '$lib/utils.js';
	import Brand from './(components)/brand.svelte';
	import ModeToggle from '$lib/components/base/mode-toggle.svelte';
	import Nav from './(components)/nav.svelte';
	import UserNav from './(components)/user-nav.svelte';
	import { primaryRoutes } from './dummy-data';
	import { ArrowLeft, BookOpenText } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowRight } from 'svelte-radix';

	let isCollapsed = false;
	let innerWidth: number;

	function onInnerWidthChange(innerWidth: number) {
		if (innerWidth <= 640 && !isCollapsed) {
			isCollapsed = true;
		} else if (innerWidth > 640 && isCollapsed) {
			isCollapsed = false;
		}
	}

	$: onInnerWidthChange(innerWidth);
</script>

<svelte:window bind:innerWidth />

<div class="flex items-start">
	<div class={cn('w-[57px] border border-r', isCollapsed ? 'w-[57px]' : 'sm:w-[250px]')}>
		<div class={cn('my-1 flex justify-between', isCollapsed ? 'flex justify-center' : 'px-2')}>
			<Brand {isCollapsed} />
			<div class="relative">
				<Button
					on:click={() => (isCollapsed = !isCollapsed)}
					class={cn(
						'absolute hidden text-gray-400 sm:inline-flex',
						isCollapsed ? '-right-[17px] top-[10px] h-4 w-4' : '-right-5 top-2 h-5 w-6'
					)}
					size="icon"
					variant="outline"
				>
					{#if isCollapsed}
						<ArrowRight class="h-4 w-5" />
					{:else}
						<ArrowLeft class="h-4 w-5" />
					{/if}
				</Button>
			</div>
		</div>
		<Separator />
		<Nav {isCollapsed} routes={primaryRoutes} />
	</div>
	<div class="w-full">
		<div class="flex justify-between">
			<div class="h-[40px] px-3 py-2 text-lg">
				<!-- {$page.data?.title} -->
			</div>
			<div class="ml-auto mr-2 mt-1 flex w-full items-center justify-end space-x-2">
				<Button href="/" size="sm" variant="ghost" class="h-8">
					<BookOpenText class="mr-1 h-5 w-5" /> <span style="font-size: 15px;">Buku Panduan</span>
				</Button>
				<ModeToggle />
				<UserNav />
			</div>
		</div>
		<Separator class="w-full" />
		<ScrollArea orientation="both" class="h-[calc(100vh-50px)] w-full pl-1">
			<div class="px-2 pt-1">
				<slot />
			</div>
		</ScrollArea>
	</div>
</div>
