import { auth } from '$lib/trpc/middleware/auth';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';

export const users = t.router({
	list: t.procedure
		.use(logger)
		.input((val) => val)
		.query(({ input }) => {
			return [
				{
					a: input
				}
			];
		}),

	loadOptions: t.procedure.use(logger).query(() => {
		return [];
	}),

	load: t.procedure
		.use(logger)
		.use(auth) // 👈 use auth middleware
		// .input(z.string())
		.query(({ input }) => {
			return [];
		}),

	save: t.procedure
		.use(logger)
		.use(auth) // 👈 use auth middleware
		// .input(
		//   z.object({
		//     id: z.string().nullable(),
		//     firstName: z.string().min(3).max(50),
		//     lastName: z.string().min(3).max(50),
		//     bio: z.string().nullable()
		//   })
		// )
		.mutation(async ({ input, ctx: { userId } }) => {
			// if (id) {
			//   await prisma.author.update({
			//     data: { ...rest, updatedByUserId: userId },
			//     where: { id }
			//   });
			// } else {
			//   await prisma.author.create({
			//     data: { ...rest, updatedByUserId: userId }
			//   });
			// }
		}),

	delete: t.procedure
		.use(logger)
		.use(auth) // 👈 use auth middleware
		// .input(z.string())
		.mutation(async ({ input: id }) => {
			// await prisma.author.delete({ where: { id } });
		})
});
