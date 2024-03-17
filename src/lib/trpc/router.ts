import { users } from '$lib/trpc/routes/users';
import { auths } from '$lib/trpc/routes/auths';
import { t } from '$lib/trpc/t';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const router = t.router({
	auths,
	users
	// books,
	// stores
});

export const createCaller = t.createCallerFactory(router);

export type Router = typeof router;

// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
