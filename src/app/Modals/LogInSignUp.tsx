'use client';

import { logInSignUpModalOpenAtom } from '@/jotai/atoms';
import { Dialog, Transition } from '@headlessui/react';
import { useAtom, useSetAtom } from 'jotai';
import { Fragment } from 'react';

export default function LogInSignUp() {
	const [modalOpen, setModalOpen] = useAtom(logInSignUpModalOpenAtom);
	return (
		<Transition show={modalOpen} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-40'
				onClose={() => setModalOpen(false)}
			>
				<Transition.Child
					enter='duration-200'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
					className='fixed inset-0 bg-black/75'
					aria-hidden='true'
				/>

				<Transition.Child
					enter='duration-300'
					enterFrom='translate-y-[calc(50vh+50%)]'
					enterTo='translate-y-0'
					leave='duration-300'
					leaveFrom='translate-y-0'
					leaveTo='translate-y-[calc(50vh+50%)]'
					as={Fragment}
				>
					<Dialog.Panel className='bg fixed inset-0 m-auto h-fit max-w-xl rounded-xl bg-white dark:bg-neutral-800'>
						<LogInSignUpForm />
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
}

function LogInSignUpForm() {
	const setModalOpen = useSetAtom(logInSignUpModalOpenAtom);
	return (
		<div>
			<div className='relative p-6'>
				<span className='absolute flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-gray-700'>
					<i
						onClick={() => setModalOpen(false)}
						className='ri-close-line cursor-pointer text-2xl'
					></i>
				</span>

				<h1 className='text-center text-lg font-bold'>Log in or sign up</h1>
			</div>
			<div className='border-t' />
			<div className='space-y-5 p-6'>
				<h1 className='text-2xl font-bold'>Welcome to Airbnb</h1>
				<form>
					<input
						type='text'
						placeholder='Username'
						className='h-14 w-full rounded-t-md border-x border-t border-gray-400 bg-transparent p-4'
					/>
					<input
						type='password'
						placeholder='Password'
						className='h-14 w-full rounded-b-md border border-gray-400 bg-transparent p-4'
					/>
				</form>
				<button className='h-12 w-full rounded-md bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] font-bold text-white'>
					Continue
				</button>
				<div className='flex items-center gap-x-5'>
					<span className='grow border-t' />
					<span>or</span>
					<span className='grow border-t' />
				</div>
				<button className='relative h-12 w-full rounded-md border border-black dark:border-white'>
					<i className='ri-user-smile-line absolute bottom-1/2 left-6 translate-y-1/2 text-2xl'></i>
					<span className='font-bold'>Continue with Mock account</span>
				</button>
				<button className='relative h-12 w-full rounded-md border border-black dark:border-white'>
					<i className='ri-github-fill absolute bottom-1/2 left-6 translate-y-1/2 text-2xl'></i>
					<span className='font-bold'>Continue with Github</span>
				</button>
				<button className='relative h-12 w-full rounded-md border border-black dark:border-white'>
					<i className='ri-mail-line absolute bottom-1/2 left-6 translate-y-1/2 text-2xl'></i>
					<span className='font-bold'>Continue with Email</span>
				</button>
			</div>
		</div>
	);
}
