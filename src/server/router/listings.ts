import db from '@/db';
import { listings, userLikedListings } from '@/db/schema';
import { listingInsertSchema } from '@/zod/listings';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

const listingsRouter = router({
	create: protectedProcedure
		.input(listingInsertSchema)
		.mutation(async ({ input, ctx }) => {
			const values = { ownerId: ctx.session.user.id, ...input };
			const results = await db.insert(listings).values(values);
			return results.insertId;
		}),

	getById: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(
			async ({ input }) =>
				(await db.select().from(listings).where(eq(listings.id, input.id)))[0]
		),

	list: publicProcedure.query(
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

	like: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			await db
				.insert(userLikedListings)
				.values({ userId: ctx.session.user.id, listingId: input.id });
			return 'listing liked';
		}),

	unlike: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			await db
				.delete(userLikedListings)
				.where(
					and(
						eq(userLikedListings.userId, ctx.session.user.id),
						eq(userLikedListings.listingId, input.id)
					)
				);
			return 'listing un-liked';
		}),
});

export default listingsRouter;
