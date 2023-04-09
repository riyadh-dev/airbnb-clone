import { TLoginInSignUpFormTypes } from '@/app/common/types';
import { atom } from 'jotai';

export const logInSignUpModalOpenAtom = atom(false);
export const logInSignUpFromTypeAtom = atom<TLoginInSignUpFormTypes>('sign-up');
