import * as z from 'zod';
import {
	CompleteListing,
	RelatedListingModel,
	CompleteReservation,
	RelatedReservationModel,
} from './index';

export const UserModel = z.object({
	id: z.string().cuid(),
	name: z.string(),
	email: z.string().email().toLowerCase(),
	emailVerified: z.date().nullish(),
	avatar: z.string().nullish(),
	password: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	isMockAccount: z.boolean(),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
	listing: CompleteListing[];
	likedListings: CompleteListing[];
	reservations: CompleteReservation[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
	UserModel.extend({
		listing: RelatedListingModel.array(),
		likedListings: RelatedListingModel.array(),
		reservations: RelatedReservationModel.array(),
	})
);
