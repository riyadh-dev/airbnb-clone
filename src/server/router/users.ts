import db from '@/db';
import { users } from '@/db/schema';
import { signUpBodySchema } from '@/zod/user';
import { hash } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

const usersRouter = router({
	listMocked: publicProcedure.query(
		async () =>
			await db
				.select({
					id: users.id,
					name: users.name,
					email: users.email,
					image: users.image,
				})
				.from(users)
				.where(eq(users.isMockAccount, true))
	),

	create: publicProcedure
		.input(signUpBodySchema)
		.mutation(async ({ input: { email, password, name } }) => {
			const hashedPassword = await hash(password, 12);
			await db.insert(users).values({
				email,
				name,
				password: hashedPassword,
			});
			return 'user created successfully';
		}),

	getById: publicProcedure.input(z.number()).query(async ({ input: id }) => {
		const results = await db.select().from(users).where(eq(users.id, id));
		return results.length > 0 ? results[0] : null;
	}),
});

export default usersRouter;
