import { TSignUpBody } from '@/common/types';
import {
	disableUserSignActionsAtom,
	logInSignUpModalOpenAtom,
} from '@/jotai/atoms';
import { AppRouter } from '@/server/router/_app';
import { exclude } from '@/utils/helpers';
import { trpc } from '@/utils/trpc';
import { TRPCClientError } from '@trpc/client';
import { useSetAtom } from 'jotai';
import { signIn } from 'next-auth/react';

export default function useSignUp() {
	const setDisableUserSignActions = useSetAtom(disableUserSignActionsAtom);
	const setModalOpen = useSetAtom(logInSignUpModalOpenAtom);
	const { error, mutateAsync } = trpc.signUp.useMutation();
	return async (body: TSignUpBody) => {
		setDisableUserSignActions(true);
		return mutateAsync(body)
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
				return error as TRPCClientError<AppRouter>;
			});
	};
}
