import { listings } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

const listingInsertBaseSchema = createInsertSchema(listings, {
	country: z.string().nonempty(),
	addressLine1: z.string().nonempty(),
	addressLine2: z.string(),
	city: z.string().nonempty(),
	state: z.string().nonempty(),
	postalCode: z.string().nonempty(),

	guestCount: z.number().positive(),
	bedroomCount: z.number().positive(),
	bedCount: z.number().positive(),
	bathroomCount: z.number().positive(),

	imagesCSV: z.string().nonempty(),

	description: z.string(),

	title: z.string().nonempty(),

	price: z.number().positive(),
});

export const listingLocationSchema = listingInsertBaseSchema.pick({
	country: true,
	addressLine1: true,
	addressLine2: true,
	city: true,
	state: true,
	postalCode: true,
});

export const listingFloorPlanSchema = listingInsertBaseSchema.pick({
	guestCount: true,
	bedroomCount: true,
	bedCount: true,
	bathroomCount: true,
});

const listingRestSchema = listingInsertBaseSchema.pick({
	category: true,
	imagesCSV: true,
	description: true,
	title: true,
	price: true,
});

export const listingInsertSchema = listingLocationSchema
	.merge(listingFloorPlanSchema)
	.merge(listingRestSchema);

export const listingFilterSchema = createInsertSchema(listings, {
	bedCount: z.number().positive().optional(),
	bathroomCount: z.number().positive().optional(),
	category: z.string().optional(),
})
	.pick({
		bedCount: true,
		bathroomCount: true,
		category: true,
	})
	.merge(
		z.object({
			minPrice: z.coerce.number().positive().optional(),
			maxPrice: z.coerce.number().positive().optional(),
		})
	);
