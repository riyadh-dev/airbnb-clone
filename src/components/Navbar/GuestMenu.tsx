import { TLoginInSignUpFormTypes } from '@/common/types';
import {
	logInSignUpFromTypeAtom,
	logInSignUpModalOpenAtom,
} from '@/jotai/atoms';
import { Menu } from '@headlessui/react';
import { useSetAtom } from 'jotai';
import ThemeToggleMenuItem from './ThemeToggleMenuItem';

export default function GuestMenu() {
	const setSignUpModalOpen = useSetAtom(logInSignUpModalOpenAtom);
	const setLoginSignUpFormType = useSetAtom(logInSignUpFromTypeAtom);

	const openModal = (modalType: TLoginInSignUpFormTypes) => () => {
		setLoginSignUpFormType(modalType);
		setSignUpModalOpen(true);
	};

	return (
		<Menu.Items className='absolute right-0 mt-2 w-60 rounded-lg border bg-white py-3 shadow-md dark:bg-neutral-950'>
			<Menu.Item>
				<div
					onClick={openModal('mock-list')}
					className='cursor-pointer px-5 py-2 font-bold hover:bg-slate-100 dark:hover:bg-gray-700'
				>
					Mock account
				</div>
			</Menu.Item>
			<Menu.Item>
				<div
					onClick={openModal('sign-up')}
					className='cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700'
				>
					Sign up
				</div>
			</Menu.Item>
			<Menu.Item>
				<div
					onClick={openModal('login')}
					className='cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700'
				>
					Log in
				</div>
			</Menu.Item>
			<ThemeToggleMenuItem />
		</Menu.Items>
	);
}
