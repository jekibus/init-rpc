export default function (
	state: string,
	states: any = {},
	configs: any,
	componentVars: Record<string, any>,
	runtimeVars: Record<string, any>
) {
	/*
	 * Original source: https://github.com/kenkunz/svelte-fsm
	 * Core Finite State Machine functionality
	 * - adheres to Svelte store contract (https://svelte.dev/docs#Store_contract)
	 * - invoked events are dispatched to handler of current state
	 * - transitions to returned state (or value if static property)
	 * - calls _exit() and _enter() methods if they are defined on exited/entered state
	 */
	const subscribers = new Set();
	let proxy: any;

	function subscribe(callback: Function) {
		if (!(callback instanceof Function)) {
			throw new TypeError('callback is not a function');
		}
		subscribers.add(callback);
		callback(state);
		return () => subscribers.delete(callback);
	}

	function transition(newState: string, event: string, args: any) {
		const metadata = { from: state, to: newState, event, args };
		dispatch('_exit', metadata);
		state = newState;
		subscribers.forEach((callback: any) => callback(state));
		dispatch('_enter', metadata);
	}

	function dispatch(event: string, ...args: any[]) {
		const action = states[state]?.[event] ?? states['*']?.[event];
		// console.log(state, event, 'action', action, args)
		if (event === '_enter' || event === '_exit') {
			args.shift();
		}
		if (configs) {
			args.push(configs[`${state}.${event}`]);
		}
		if (componentVars) {
			args.push(componentVars);
		}
		if (runtimeVars) {
			args.push(runtimeVars);
		}
		return action instanceof Function ? action.apply(proxy, args) : action;
	}

	function invoke(event: string, ...args: any) {
		const newState = dispatch(event, ...args)?.valueOf();
		if (['string', 'symbol'].includes(typeof newState) && newState !== state) {
			transition(newState, event, args);
		}
		return state;
	}

	/*
	 * Debounce functionality
	 * - `debounce` is lazily bound to dynamic event invoker methods (see Proxy section below)
	 * - `event.debounce(wait, ...args)` calls event with args after wait (unless called again first)
	 * - cancels all prior invocations made for the same event
	 * - cancels entirely when called with `wait` of `null`
	 */
	const timeout: any = {};

	async function debounce(event: string, wait = 100, ...args: any) {
		clearTimeout(timeout[event]);
		if (wait === null) {
			return state;
		} else {
			await new Promise((resolve) => (timeout[event] = setTimeout(resolve, wait)));
			delete timeout[event];
			return invoke(event, ...args);
		}
	}

	/*
	 * Proxy-based event invocation API:
	 * - return a proxy object with single native subscribe method
	 * - all other properties act as dynamic event invocation methods
	 * - event invokers also respond to .debounce(wait, ...args) (see above)
	 */
	proxy = new Proxy(
		{ subscribe },
		{
			get(target: any, property: string) {
				if (!Reflect.has(target, property)) {
					target[property] = invoke.bind(null, property);
					target[property].debounce = debounce.bind(null, property);
				}
				return Reflect.get(target, property);
			}
		}
	);

	/*
	 * `_enter` initial state and return the proxy object
	 */
	dispatch('_enter', { from: null, to: state, event: null, args: [] });

	return proxy;
}
