import objectPath from 'object-path';

export function set(config: any, componentVars: any /*, runtimeVars: any*/) {
	if (!config || !componentVars) return;
	const _config = objectPath.get(componentVars, `${config.grid_name}.config`);
	if (!_config) return;
	_config.update((item: any) => {
		const current = objectPath.get(item, config.path);
		if (current === config.value) {
			objectPath.set(item, config.path, 'reset');
		} else {
			objectPath.set(item, config.path, config.value);
		}
		return item;
	});
	if (config.debounce) {
		// @ts-ignore
		return this.NEXT.debounce(config.debounce);
	}
	// @ts-ignore
	return this.NEXT();
}
