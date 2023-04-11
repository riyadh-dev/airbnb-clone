import * as z from 'zod';
import {
	CompleteUser,
	RelatedUserModel,
	CompleteListing,
	RelatedListingModel,
} from './index';

export const ReservationModel = z.object({
	id: z.string().cuid(),
	ownerId: z.string().cuid(),
	listingId: z.string().cuid(),
	startDate: z.date(),
	endDate: z.date(),
	totalPrice: z.number().int(),
	createdAt: z.date(),
});

export interface CompleteReservation extends z.infer<typeof ReservationModel> {
	owner: CompleteUser;
	listing: CompleteListing;
}

/**
 * RelatedReservationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReservationModel: z.ZodSchema<CompleteReservation> = z.lazy(
	() =>
		ReservationModel.extend({
			owner: RelatedUserModel,
			listing: RelatedListingModel,
		})
);
