'use client';

import useZodForm from '@/hooks/useZodForm';
import {
	disableUserSignActionsAtom,
	logInSignUpModalOpenAtom,
} from '@/jotai/atoms';
import { loginInputSchema } from '@/zod/user';
import { useAtom, useSetAtom } from 'jotai';
import { signIn } from 'next-auth/react';
import LoadingSpinner from '../LoadingSpinner';
import CustomInput from './CustomInput';

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
	const onSubmit = handleSubmit(async (body) => {
		setDisableUserSignActions(true);
		signIn('credentials', { redirect: false, ...body }).then((response) => {
			setDisableUserSignActions(false);
			if (response?.ok) setModalOpen(false);
			if (response?.error) console.log(response.error);
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
					errorMessage={formErrors.email?.message}
				/>

				<CustomInput
					inputProps={{
						disabled,
						type: 'password',
						placeholder: 'Password',
						...register('password'),
					}}
					errorMessage={formErrors.password?.message}
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
