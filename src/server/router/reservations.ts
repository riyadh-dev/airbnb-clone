import { TListing } from '@/common/types';
import { AIRBNB_SERVICE_FEE } from '@/constants';
import db from '@/db';
import {
	listings as ListingsTable,
	reservations as reservationsTable,
} from '@/db/schema';
import { getDateDiffInDays } from '@/utils/helpers';
import { reservationInsertSchema } from '@/zod/reservation';
import { and, eq } from 'drizzle-orm/expressions';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

const reservationsRouter = router({
	create: protectedProcedure
		//TODO validate guest count and dates
		.input(reservationInsertSchema)
		.mutation(async ({ input: { pricePerNight, ...input }, ctx }) => {
			const totalCostBeforeFee =
				getDateDiffInDays(input.startDate, input.endDate) * pricePerNight;
			const totalCost =
				totalCostBeforeFee + totalCostBeforeFee * AIRBNB_SERVICE_FEE;

			await db.insert(reservationsTable).values({
				...input,
				ownerId: ctx.session.user.id,
				totalCost,
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
