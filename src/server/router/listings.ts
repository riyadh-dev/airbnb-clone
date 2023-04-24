import db from '@/db';
import { listings, userLikedListings } from '@/db/schema';
import { listingInsertSchema } from '@/zod/listings';
import { and, eq, exists, sql } from 'drizzle-orm';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

const listingListItemSelect = {
	id: listings.id,
	title: listings.title,
	description: listings.description,
	imagesCSV: listings.imagesCSV,
	price: listings.price,
};

const isLikedSQL = (userId: number) =>
	exists(
		db
			.select()
			.from(userLikedListings)
			.where(
				and(
					eq(listings.id, userLikedListings.listingId),
					eq(userLikedListings.userId, userId)
				)
			)
	);

const listingsRouter = router({
	create: protectedProcedure
		.input(listingInsertSchema)
		.mutation(async ({ input, ctx }) => {
			const values = { ownerId: ctx.session.user.id, ...input };
			const results = await db.insert(listings).values(values);
			return results[0].insertId;
		}),

	getById: publicProcedure
		.input(z.number())
		.query(async ({ ctx, input: id }) => {
			const user = ctx.session?.user;

			const select = {
				listing: listings,
				isLiked: user
					? sql<1 | 0>`user_liked_listings.user_id = ${user.id}`
					: sql<boolean>`false`,
			};

			const results = !user
				? await db.select(select).from(listings).where(eq(listings.id, id))
				: await db
						.select(select)
						.from(listings)
						.leftJoin(
							userLikedListings,
							and(
								eq(listings.id, userLikedListings.listingId),
								eq(userLikedListings.userId, user.id)
							)
						)
						.where(eq(listings.id, id));

			return results.length ? results[0] : null;
		}),

	list: publicProcedure.query(async ({ ctx }) => {
		const user = ctx.session?.user;

		const select = {
			...listingListItemSelect,
			isLiked: user
				? sql<1 | 0>`user_liked_listings.user_id = ${user.id}`
				: sql<boolean>`false`,
		};

		if (!user) return await db.select(select).from(listings);

		return await db
			.select(select)
			.from(listings)
			.leftJoin(
				userLikedListings,
				and(
					eq(listings.id, userLikedListings.listingId),
					eq(userLikedListings.userId, user.id)
				)
			);
	}),

	listLiked: protectedProcedure.query(
		async ({ ctx }) =>
			await db
				.select(listingListItemSelect)
				.from(listings)
				.where(isLikedSQL(ctx.session.user.id))
	),

	like: protectedProcedure
		.input(z.number())
		.mutation(async ({ ctx, input: id }) => {
			await db
				.insert(userLikedListings)
				.values({ userId: ctx.session.user.id, listingId: id });
			return 'listing liked';
		}),

	unlike: protectedProcedure
		.input(z.number())
		.mutation(async ({ ctx, input: id }) => {
			await db
				.delete(userLikedListings)
				.where(
					and(
						eq(userLikedListings.userId, ctx.session.user.id),
						eq(userLikedListings.listingId, id)
					)
				);
			return 'listing un-liked';
		}),

	toggleLike: protectedProcedure
		.input(z.number())
		.mutation(async ({ ctx, input: id }) => {
			const results = await db
				.select({ id: userLikedListings.listingId })
				.from(userLikedListings)
				.where(
					and(
						eq(userLikedListings.userId, ctx.session.user.id),
						eq(userLikedListings.listingId, id)
					)
				);

			if (results.length === 0) {
				await db
					.insert(userLikedListings)
					.values({ userId: ctx.session.user.id, listingId: id });
				return 'listing liked';
			}

			await db
				.delete(userLikedListings)
				.where(
					and(
						eq(userLikedListings.userId, ctx.session.user.id),
						eq(userLikedListings.listingId, id)
					)
				);
			return 'listing un-liked';
		}),
});

export default listingsRouter;
