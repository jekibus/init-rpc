import type { PageServerLoad } from './$types';
import layout from './layout.json';

export const load: PageServerLoad = async () => {
	return {
		title: layout.title,
		description: layout.description,
		options: layout.options,
		grid: layout.grid
	};
};
