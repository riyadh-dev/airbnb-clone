import { TSignUpBody } from '@/common/types';
import { exclude } from '@/common/utils';
import {
	disableUserSignActionsAtom,
	logInSignUpModalOpenAtom,
} from '@/jotai/atoms';
import axios, { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { signIn } from 'next-auth/react';

export default function useSignUp() {
	const setDisableUserSignActions = useSetAtom(disableUserSignActionsAtom);
	const setModalOpen = useSetAtom(logInSignUpModalOpenAtom);

	return async (body: TSignUpBody) => {
		setDisableUserSignActions(true);

		return axios
			.post(process.env.NEXT_PUBLIC_API_URL + 'auth/sign-up', body)
			.then(() => {
				signIn('credentials', {
					redirect: false,
					...exclude(body, ['name']),
				}).then((response) => {
					setDisableUserSignActions(false);
					if (response?.ok) setModalOpen(false);
					if (response?.error) console.log(response.error);
				});
				return null;
			})
			.catch((error) => {
				setDisableUserSignActions(false);
				return error as AxiosError;
			});
	};
}
