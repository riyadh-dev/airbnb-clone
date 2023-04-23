import db from '@/db';
import { listings, users } from '@/db/schema';
import { listingInsertSchema } from '@/zod/listings';
import { signUpBodySchema } from '@/zod/user';
import { hash } from 'bcrypt';
import { eq } from 'drizzle-orm/expressions';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

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
	getUserById: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(
			async ({ input }) =>
				(await db.select().from(users).where(eq(users.id, input.id)))[0]
		),
	createListing: protectedProcedure
		.input(listingInsertSchema)
		.mutation(async ({ input, ctx }) => {
			const values = { ownerId: ctx.session.user.id, ...input };
			const results = await db.insert(listings).values(values);
			return results.insertId;
		}),
	getListing: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(
			async ({ input }) =>
				(await db.select().from(listings).where(eq(listings.id, input.id)))[0]
		),
	getListings: publicProcedure.query(
		async () =>
			await db
				.select({
					id: listings.id,
					title: listings.title,
					description: listings.description,
					imageCSV: listings.imagesCSV,
					price: listings.price,
				})
				.from(listings)
	),
});

// export type definition of API
export type AppRouter = typeof appRouter;
