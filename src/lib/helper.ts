export const cloneObject = (o: any) => {
	return JSON.parse(JSON.stringify(o));
};

export const convertToComponent = async (gridLength: number = 0): Promise<any> => {
	if (gridLength <= 0) return {};
	const components: any = {};
	for (let index = 0; index < gridLength; index++) {
		// @ts-ignore
		components[index] = (await import(/* @vite-ignore */ '$lib/widgets/template.svelte')).default;
	}
	return components;
};
