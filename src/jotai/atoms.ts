import {
	TListing,
	TListingCategory,
	TLoginInSignUpFormTypes,
	TReservationInput,
} from '@/common/types';
import { listingFloorPlanSchema, listingLocationSchema } from '@/zod/listings';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { z } from 'zod';

export const logInSignUpModalOpenAtom = atom(false);
export const rentModalOpenAtom = atom(false);
export const confirmReservationModalOpenAtom = atom(false);
export const FilterModalOpenAtom = atom(false);

export const logInSignUpFromTypeAtom = atom<TLoginInSignUpFormTypes>('sign-up');
export const disableUserSignActionsAtom = atom(false);

export const reservationListingAtom = atom<TListing | null>(null);
export const reservationInputAtom = atom<TReservationInput>({
	ownerId: 0,
	listingId: 0,
	startDate: new Date(),
	endDate: new Date(),
	adultGuestCount: 1,
	childGuestCount: 0,
	infantGuestCount: 0,
	petCount: 0,
	pricePerNight: 0,
});

export const filterOptionsAtom = atom<{
	minPrice?: number;
	maxPrice?: number;
	bedCount?: number;
	bathroomCount?: number;
}>({});
export const filterCategoryAtom = atom<TListingCategory>('Trending');

export const listingCategoryAtom = atomWithStorage('listingCategory', '');

type TListingLocation = z.infer<typeof listingLocationSchema>;
export const listingLocationAtom = atomWithStorage<TListingLocation>(
	'listingLocation',
	{
		country: '',
		addressLine1: '',
		addressLine2: null,
		city: '',
		state: '',
		postalCode: '',
	}
);

type TListingFloorPlan = z.infer<typeof listingFloorPlanSchema>;
export const listingFloorPlanAtom = atomWithStorage<TListingFloorPlan>(
	'listingFloorPlan',
	{
		guestCount: 0,
		bedroomCount: 0,
		bedCount: 0,
		bathroomCount: 0,
	}
);

export const listingImagesAtom = atomWithStorage('listingImages', [
	{ value: '' },
]);

export const listingTitleAtom = atomWithStorage('listingTitle', '');
export const listingDescriptionAtom = atomWithStorage('listingDescription', '');
export const listingPriceAtom = atomWithStorage('listingPrice', 75);
