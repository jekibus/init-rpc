import type { PageServerLoad } from './$types';
// @ts-ignore
import layout from './layout.yaml';

export const load: PageServerLoad = async () => {
	return layout;
};
