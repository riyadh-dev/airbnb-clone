import { TListing } from '@/common/types';
import db from '@/db';
import {
	listings as ListingsTable,
	reservations as reservationsTable,
} from '@/db/schema';
import { reservationInsertSchema } from '@/zod/reservation';
import { and, eq } from 'drizzle-orm/expressions';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

const reservationsRouter = router({
	create: protectedProcedure
		.input(reservationInsertSchema)
		.mutation(async ({ input, ctx }) => {
			await db.insert(reservationsTable).values({
				...input,
				ownerId: ctx.session.user.id,
			});
			return 'reservation created';
		}),

	listWithListing: protectedProcedure.query(async ({ ctx }) => {
		const reservations = await db
			.select()
			.from(reservationsTable)
			.where(eq(reservationsTable.ownerId, ctx.session.user.id));

		const listingPromises: Promise<unknown>[] = [];
		for (const reservation of reservations) {
			listingPromises.push(
				db
					.select()
					.from(ListingsTable)
					.where(eq(ListingsTable.id, reservation.listingId))
			);
		}
		const listings = (await Promise.all(listingPromises)) as TListing[][];

		return reservations.map((reservation, index) => ({
			reservation,
			listing: listings[index][0],
		}));
	}),

	delete: protectedProcedure
		.input(z.number())
		.mutation(async ({ input: id, ctx }) => {
			await db
				.delete(reservationsTable)
				.where(
					and(
						eq(reservationsTable.id, id),
						eq(reservationsTable.ownerId, ctx.session.user.id)
					)
				);

			return 'reservation deleted';
		}),
});

export default reservationsRouter;
