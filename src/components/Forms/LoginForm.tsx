import useZodForm from '@/hooks/useZodForm';
import {
	disableUserSignActionsAtom,
	logInSignUpModalOpenAtom,
} from '@/jotai/atoms';
import { trpc } from '@/utils/trpc';
import { loginInputSchema } from '@/zod/user';
import { useAtom, useSetAtom } from 'jotai';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import CustomInput from './CustomInput';

const INVALID_CREDENTIALS = 'Invalid credentials';

interface IRequestError {
	[key: string]: string | undefined;
}

export default function LoginForm() {
	const setModalOpen = useSetAtom(logInSignUpModalOpenAtom);
	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
	} = useZodForm(loginInputSchema);

	const [disabled, setDisableUserSignActions] = useAtom(
		disableUserSignActionsAtom
	);

	const [loginError, setLoginError] = useState<IRequestError>({});
	const utils = trpc.useContext();
	const onSubmit = handleSubmit(async (body) => {
		setDisableUserSignActions(true);
		signIn('credentials', { redirect: false, ...body }).then((response) => {
			setDisableUserSignActions(false);
			if (response?.ok) {
				setModalOpen(false);
				utils.listings.invalidate();
			} else if (response?.error && response.error === INVALID_CREDENTIALS)
				setLoginError({ badCredentials: INVALID_CREDENTIALS });
			else console.log(response?.error);
		});
	});

	if (disabled) return <LoadingSpinner className='!my-14 mx-auto h-20' />;

	return (
		<form onSubmit={onSubmit} noValidate>
			<h1 className='pb-3 text-center text-gray-400'>Login to your account</h1>

			<div className='space-y-3'>
				<CustomInput
					inputProps={{
						disabled,
						type: 'text',
						placeholder: 'Email',
						...register('email'),
					}}
					errorMessage={formErrors.email?.message || loginError?.badCredentials}
				/>

				<CustomInput
					inputProps={{
						disabled,
						type: 'password',
						placeholder: 'Password',
						...register('password'),
					}}
					errorMessage={
						formErrors.password?.message || loginError?.badCredentials
					}
				/>
			</div>

			<button
				disabled={disabled}
				type='submit'
				className='mt-5 h-12 w-full rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] font-bold text-white'
			>
				Continue
			</button>
		</form>
	);
}
