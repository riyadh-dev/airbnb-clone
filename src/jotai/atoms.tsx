import { TLoginInSignUpFormTypes } from '@/common/types';
import { atom } from 'jotai';

export const logInSignUpModalOpenAtom = atom(false);
export const rentModalOpenAtom = atom(false);

export const logInSignUpFromTypeAtom = atom<TLoginInSignUpFormTypes>('sign-up');

export const disableUserSignActionsAtom = atom(false);

if (process.env.NODE_ENV !== 'production') {
	logInSignUpModalOpenAtom.debugLabel = 'logInSignUpModalOpen';
	rentModalOpenAtom.debugLabel = 'rentModalOpen';

	logInSignUpFromTypeAtom.debugLabel = 'logInSignUpFromType';

	disableUserSignActionsAtom.debugLabel = 'disableUserSignActions';
}
