import db from '@/db';
import { listings, reservations, userLikedListings } from '@/db/schema';
import { listingFilterSchema, listingInsertSchema } from '@/zod/listings';
import { and, between, eq, exists } from 'drizzle-orm/expressions';
import { SQL, sql } from 'drizzle-orm/sql';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

const listingListItemSelect = {
	id: listings.id,
	state: listings.state,
	country: listings.country,
	description: listings.description,
	imagesCSV: listings.imagesCSV,
	price: listings.price,
};

const listingsRouter = router({
	create: protectedProcedure
		.input(listingInsertSchema)
		.mutation(async ({ input, ctx }) => {
			const values = { ownerId: ctx.session.user.id, ...input };
			const results = await db.insert(listings).values(values);
			return results.insertId;
		}),

	getById: publicProcedure
		.input(z.number())
		.query(async ({ ctx, input: id }) => {
			const user = ctx.session?.user;

			const select = {
				listing: listings,
				isLiked: isLikedSQL(user?.id),
				isReserved: isReservedSQL(user?.id),
			};

			const results = await db
				.select(select)
				.from(listings)
				.where(eq(listings.id, id));

			return results.length ? results[0] : null;
		}),

	list: publicProcedure.query(async ({ ctx }) => {
		const user = ctx.session?.user;

		const select = {
			...listingListItemSelect,
			isLiked: isLikedSQL(user?.id),
		};

		return await db.select(select).from(listings);
	}),

	listFilter: publicProcedure
		.input(listingFilterSchema)
		.query(async ({ ctx, input }) => {
			const user = ctx.session?.user;

			const select = {
				...listingListItemSelect,
				isLiked: isLikedSQL(user?.id),
			};

			const query = db.select(select).from(listings);

			let whereArgs = [];
			if (input.bathroomCount)
				whereArgs.push(eq(listings.bathroomCount, input.bathroomCount));
			if (input.bedCount) whereArgs.push(eq(listings.bedCount, input.bedCount));
			if (input.maxPrice && input.minPrice)
				whereArgs.push(between(listings.price, input.minPrice, input.maxPrice));
			if (input.category) whereArgs.push(eq(listings.category, input.category));

			return await query.where(and(...whereArgs));
		}),

	listLiked: protectedProcedure.query(
		async ({ ctx }) =>
			await db
				.select(listingListItemSelect)
				.from(listings)
				.where(isLikedSQL(ctx.session.user.id))
	),

	listByCurrentUser: protectedProcedure.query(
		async ({ ctx }) =>
			await db
				.select(listingListItemSelect)
				.from(listings)
				.where(eq(listings.ownerId, ctx.session.user.id))
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

//HACK for some reason working with planetscale return strings of 1 or 0 when using drizzle orm exists()
function isLikedSQL(userId?: number) {
	if (!userId) return sql<'0'>`0`;

	return exists(
		db
			.select()
			.from(userLikedListings)
			.where(
				and(
					eq(listings.id, userLikedListings.listingId),
					eq(userLikedListings.userId, userId)
				)
			)
	) as SQL<'1' | '0'>;
}

function isReservedSQL(userId?: number) {
	if (!userId) return sql<'0'>`0`;

	return exists(
		db
			.select()
			.from(reservations)
			.where(
				and(
					eq(listings.id, reservations.listingId),
					eq(reservations.ownerId, userId)
				)
			)
	) as SQL<'1' | '0'>;
}

export default listingsRouter;
