import useSignUp from '@/hooks/useSignUp'
import useZodForm from '@/hooks/useZodForm'
import { disableUserSignActionsAtom } from '@/jotai/atoms'
import { exclude } from '@/utils/helpers'
import { signUpInputSchema } from '@/zod/user'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import CustomInput from '../Input/CustomInput'
import InputErrorMessage from '../Input/InputErrorMessage'
import LoadingSpinner from '../LoadingSpinner'

interface IRequestError {
	[key: string]: string | undefined
}

export default function SignUpFrom() {
	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
	} = useZodForm(signUpInputSchema)

	const signUp = useSignUp()
	const [requestError, setRequestError] = useState<IRequestError>()

	const onSubmit = handleSubmit(async (body) => {
		const requestError = await signUp(
			exclude(body, ['confirmPassword', 'confirmEmail'])
		)
		const isEmailUsed = requestError?.message.includes('Duplicate')
		setRequestError(
			isEmailUsed
				? { email: 'Email already in use' }
				: { other: 'Internal server error' }
		)
	})

	const disabled = useAtomValue(disableUserSignActionsAtom)
	if (disabled) return <LoadingSpinner className='!my-14 mx-auto h-20' />

	return (
		<form onSubmit={onSubmit} noValidate>
			<h1 className='pb-3 text-center text-gray-400'>
				Create an account
			</h1>

			<div className='space-y-3'>
				<CustomInput
					inputProps={{
						disabled,
						type: 'text',
						placeholder: 'Username',
						...register('name'),
					}}
					errorMessage={formErrors.name?.message}
				/>
				<div className='grid grid-cols-2 gap-3'>
					<CustomInput
						inputProps={{
							disabled,
							type: 'email',
							placeholder: 'Email',
							...register('email'),
						}}
						errorMessage={
							formErrors.email?.message ||
							formErrors.confirmEmail?.message ||
							requestError?.email
						}
					/>

					<CustomInput
						inputProps={{
							disabled,
							type: 'email',
							placeholder: 'Confirm Email',
							...register('confirmEmail'),
						}}
						errorMessage={
							formErrors.confirmEmail?.message ||
							requestError?.email
						}
					/>

					<CustomInput
						inputProps={{
							disabled,
							type: 'password',
							placeholder: 'Password',
							...register('password'),
						}}
						errorMessage={
							formErrors.password?.message ||
							formErrors.confirmPassword?.message
						}
					/>

					<CustomInput
						inputProps={{
							disabled,
							type: 'password',
							placeholder: 'Confirm password',
							...register('confirmPassword'),
						}}
						errorMessage={formErrors.confirmPassword?.message}
					/>
				</div>
				<InputErrorMessage message={requestError?.other} />
			</div>

			<button
				disabled={disabled}
				type='submit'
				className='mt-5 h-12 w-full rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] font-bold text-white'
			>
				Continue
			</button>
		</form>
	)
}
