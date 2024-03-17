import { auth } from '$lib/trpc/middleware/auth';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';

export const auths = t.router({
	login: t.procedure
		.use(logger)
		// .input((val) => val)
		.query(({ input }) => {
			return [
				{
					a: input
				}
			];
		}),
	session: t.procedure
		.use(logger)
		.use(auth) // 👈 use auth middleware
		// .input(z.string())
		.query(({ ctx }) => {
			return ctx;
		})
});
