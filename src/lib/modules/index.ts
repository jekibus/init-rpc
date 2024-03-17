import objectPath from 'object-path';
import * as config from './config';
import * as router from './router';

const modules: any = {
	config,
	router
};

export const renderStates = (states: any, configs: any) => {
	for (const t in states) {
		const transition: any = states[t];
		for (const e in transition) {
			const event: any = transition[e];
			if (event.function !== undefined) {
				// this event is function type
				transition[e] = objectPath.get(modules, event.function);
				configs[`${t}.${e}`] = event.config;
			}
		}
	}
	return states;
};

export const executeProxy = (name: string, proxy: any, event: string) => {};
