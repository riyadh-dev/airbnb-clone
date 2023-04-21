import { TLoginInSignUpFormTypes } from '@/common/types';
import { listingFloorPlanSchema, listingLocationSchema } from '@/zod/listings';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { z } from 'zod';

export const logInSignUpModalOpenAtom = atom(false);
export const rentModalOpenAtom = atom(false);

export const logInSignUpFromTypeAtom = atom<TLoginInSignUpFormTypes>('sign-up');

export const disableUserSignActionsAtom = atom(false);

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
		guestsCount: 0,
		bedroomsCount: 0,
		bedsCount: 0,
		bathroomsCount: 0,
	}
);

export const listingImagesAtom = atomWithStorage('listingImages', [
	{ value: '' },
]);

export const listingTitleAtom = atomWithStorage('listingTitle', '');
export const listingDescriptionAtom = atomWithStorage('listingDescription', '');
export const listingPriceAtom = atomWithStorage('listingPrice', 75);
