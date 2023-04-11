import * as z from 'zod';
import {
	CompleteReservation,
	RelatedReservationModel,
	CompleteUser,
	RelatedUserModel,
} from './index';

export const ListingModel = z.object({
	id: z.string().cuid(),
	authorId: z.string().cuid(),
	title: z.string(),
	description: z.string(),
	imageSrc: z.string().url(),
	category: z.string(),
	roomCount: z.number().int(),
	bathroomCount: z.number().int(),
	guestCount: z.number().int(),
	locationValue: z.string(),
	price: z.number().int(),
	createdAt: z.date(),
});

export interface CompleteListing extends z.infer<typeof ListingModel> {
	reservations: CompleteReservation[];
	author: CompleteUser;
	likers: CompleteUser[];
}

/**
 * RelatedListingModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedListingModel: z.ZodSchema<CompleteListing> = z.lazy(() =>
	ListingModel.extend({
		reservations: RelatedReservationModel.array(),
		author: RelatedUserModel,
		likers: RelatedUserModel.array(),
	})
);
