<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte';
	import { onMount } from 'svelte';
	import * as funcs from '../functions/index';

	export let key: string;
	export let data: string | undefined = $$props.default;
	export let label: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let required: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let isLoading = false;
	export let options: any;
	export let banded: any = undefined;

	let func: any = funcs;
	let value: string = data ?? '';
	let id: string = key;
	let optionList = [
		{
			id: '',
			name: 'Pilih Data'
		}
	];
	let localLoading = false;

	$: updateData(value);
	$: updateValue(data);
	$: updateBanded(banded);

	function updateData(val: string) {
		const setData = val || undefined;
		if (data !== setData) {
			data = setData;
		}
	}

	function updateValue(val: string | undefined) {
		const setValue = val ?? '';
		if (value !== setValue) {
			value = setValue;
		}
	}

	function updateBanded(bdata: any) {
		value = '';
		updateData(value);
		updateValue(data);
	}

	async function getData() {
		if (options?.form?.option?.func) {
			localLoading = true;
			const res = (await func[options.form.option.func](options.form.option.params)) || [];
			optionList = [...optionList, ...res];
			localLoading = false;
		}
	}

	onMount(getData);
</script>

<div class="control-string">
	<div class="mx-2 my-2 grid gap-1 overflow-y-auto">
		<Label class="mb-1" for={id}
			>{label}{#if required}<sup class="text-red-500">*</sup>{/if}</Label
		>
		<select
			name={key}
			class="w-full overflow-hidden rounded-sm border border-gray-200 p-2 text-sm {disabled ||
			isLoading
				? 'bg-gray-100 dark:bg-gray-600'
				: 'bg-white dark:bg-gray-800'}"
			bind:value
			{id}
			disabled={disabled || isLoading || localLoading}
			{required}
		>
			{#each optionList as option}
				<option value={option.id}>{option.name}</option>
			{/each}
		</select>
		{#if description}
			<p class="text-sm text-muted-foreground">{@html description}</p>
		{/if}
	</div>
</div>
