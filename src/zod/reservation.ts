import { reservations } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

const reservationInsertBaseSchema = createInsertSchema(reservations, {
	ownerId: z.number().int(),
	listingId: z.number().int(),
});

export const reservationInsertSchema = reservationInsertBaseSchema
	.omit({
		createdAt: true,
		id: true,
		totalCost: true,
	})
	.merge(
		z.object({
			pricePerNight: z.number(),
		})
	);
