import db from '@/db';
import { reservations } from '@/db/schema';
import { reservationInsertSchema } from '@/zod/reservation';
import { protectedProcedure, router } from '../trpc';

const reservationsRouter = router({
	create: protectedProcedure
		.input(reservationInsertSchema)
		.mutation(async ({ input, ctx }) => {
			await db.insert(reservations).values({
				...input,
				ownerId: ctx.session.user.id,
			});
			return 'reservation created';
		}),
});

export default reservationsRouter;
