<script lang="ts">
	import Qform from '$lib/components/qform/qform.svelte';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { siteConfig } from '$lib/configs/site';
	import type { Readable } from 'svelte/store';

	export let name: string;
	export let config: Readable<any>;
	export let data: Readable<any>;

	const dispatch = createEventDispatcher();

	function ev(event: string, detail: any) {
		dispatch('state', { name, event, _detail: detail, config, data });
	}
</script>

<div class="flex w-full max-w-[350px] flex-col items-center">
	<div class="relative flex">
		<img class="mb-5 mr-2 h-[70px]" src={$config.logo} title="logo" alt="logo" />
		{#if siteConfig.showVersion}
			<Badge
				class="absolute -right-12 top-0"
				title={siteConfig.lastCommit + ' - ' + siteConfig.lastCommitTs}
				variant="outline"
			>
				{siteConfig.version}
			</Badge>
		{/if}
	</div>
	<p class="mb-5 text-lg">{$config.title}</p>
	<div class="w-full rounded-md border bg-gray-50 p-5 dark:bg-gray-700">
		<Qform
			schema={$config.schema}
			data={$data}
			on:loading={({ detail }) => ev('ON_LOADING', detail)}
			on:submit={({ detail }) => ev('ON_SUBMIT', detail)}
			isLoading={$config.is_loading}
		/>
	</div>
</div>
