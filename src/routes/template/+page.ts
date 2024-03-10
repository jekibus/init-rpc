import { convertToComponent } from '$lib/helper';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
	let { grid } = data;
	const components = await convertToComponent(grid.length);
	return {
		...data,
		components
	};
};
