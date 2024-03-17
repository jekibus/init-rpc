import { goto as _goto } from '$app/navigation';

export function goto(config: any) {
	if (config) {
		_goto(config.to);
	}
	// @ts-ignore
	return this.NEXT();
}
