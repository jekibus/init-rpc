<script lang="ts">
	import fsm from '$lib/fsm';
	import { cloneObject } from '$lib/helper';
	import { renderStates } from '$lib/modules';
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	export let data: any;
	export let schemas: any;
	export let machines: any;

	let proxies: any = {};
	let componentVars: Record<string, any> = {};
	let runtimeVars: Record<string, any> = {};

	function onState({ detail }: any) {
		const { name, event } = detail;
		if (proxies[name] === undefined) {
			const grid = data.grid.find((item: any) => item.name === name);
			const machine = machines[grid.machine];
			if (componentVars[name] === undefined) {
				componentVars[name] = {
					config: detail.config,
					data: detail.data
				};
			}
			const configs = {};
			const mstates = cloneObject(machine.states);
			const states = renderStates(mstates, configs);
			proxies[name] = fsm(
				machine.entrypoint ?? 'start',
				states,
				configs,
				componentVars,
				runtimeVars
			);
			proxies[name]['unsubscribe'] = proxies[name].subscribe((item: string) => {
				console.log(name, item);
			});
		}
		const proxy = proxies[name];
		proxy[event]();
	}

	onDestroy(() => {
		for (const key in proxies) {
			proxies[key].unsubscribe();
		}
	});
</script>

{#each data.grid as item}
	{@const slashConverted = item.component}
	<div class={item.class}>
		{#if data.components[slashConverted]}
			{@const configStore = writable({ ...item.config, schema: schemas[item.config?.schema] })}
			{@const dataStore = writable(item.data)}
			<svelte:component
				this={data.components[slashConverted]}
				name={item.name}
				config={configStore}
				data={dataStore}
				on:state={onState}
			/>
		{/if}
	</div>
{/each}
