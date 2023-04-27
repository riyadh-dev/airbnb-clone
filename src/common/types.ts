import { listings, reservations, users } from '@/db/schema';
import { listingInsertSchema } from '@/zod/listings';
import { reservationInsertSchema } from '@/zod/reservation';
import { loginInputSchema, signUpBodySchema } from '@/zod/user';
import { InferModel } from 'drizzle-orm';
import { z } from 'zod';

export type TLoginInSignUpFormTypes = 'sign-up' | 'login' | 'mock-list';
export type TSignUpBody = z.infer<typeof signUpBodySchema>;
export type TLoginInput = z.infer<typeof loginInputSchema>;
export type TListingINput = z.infer<typeof listingInsertSchema>;
export type TReservationInput = z.infer<typeof reservationInsertSchema>;

export type TUiUser = Omit<InferModel<typeof users>, 'password'>;
export type TListing = InferModel<typeof listings>;

export type TThemeRemixIcon =
	| 'ri-moon-line'
	| 'ri-computer-line'
	| 'ri-sun-line';

export type TListingCategory =
	| 'Trending'
	| 'Amazing views'
	| 'Tiny homes'
	| 'OMG!'
	| 'Golfing'
	| 'Private rooms'
	| 'Beachfront'
	| 'Boats'
	| 'Amazing pools'
	| 'Bed and breakfast'
	| 'Castles';

export type TRentModalStep =
	| 'category'
	| 'location'
	| 'floor-plan'
	| 'photos'
	| 'title'
	| 'description'
	| 'price';
