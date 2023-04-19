import db from '@/db';
import { users } from '@/db/schema';
import { signUpBodySchema } from '@/zod/user';
import { hash } from 'bcrypt';
import { eq } from 'drizzle-orm/expressions';
import { publicProcedure, router } from '../trpc';

signUpBodySchema;
export const appRouter = router({
	mockedUser: publicProcedure.query(
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
	signUp: publicProcedure
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
});

// export type definition of API
export type AppRouter = typeof appRouter;
