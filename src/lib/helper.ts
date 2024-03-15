import * as components from '$lib/components/index';

export function convertSlash(slash: string) {
	return slash?.replace(/\//g, '_');
}

export const cloneObject = (o: any) => {
	return JSON.parse(JSON.stringify(o));
};

export const getComponents = async (grid: any[] = []): Promise<any> => {
	if (grid.length === 0) return {};
	const componentList: any = {};
	for (let index = 0; index < grid.length; index++) {
		const componentName = convertSlash(grid[index].component);
		if (componentList[componentName] === undefined) {
			// @ts-ignore
			componentList[componentName] = components[componentName];
		}
	}
	return componentList;
};
