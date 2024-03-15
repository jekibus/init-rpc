import { getComponents } from '$lib/helper';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }: any) => {
	return {
		...data,
		components: await getComponents(data.grid)
	};
};
