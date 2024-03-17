<script lang="ts">
	import Grid from '$lib/components/grid/index.svelte';
	import * as schemas from './schemas/index';
	import * as machines from './machines/index';

	export let data;
</script>

<Grid {data} {schemas} {machines} />
