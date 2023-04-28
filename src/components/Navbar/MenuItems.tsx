import { TLoginInSignUpFormTypes } from '@/common/types';
import {
	disableUserSignActionsAtom,
	logInSignUpFromTypeAtom,
	logInSignUpModalOpenAtom,
} from '@/jotai/atoms';
import { Menu } from '@headlessui/react';
import { useSetAtom } from 'jotai';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import ThemeToggleMenuItem from './ThemeToggleMenuItem';

export default function NavbarMenuItems() {
	const session = useSession();

	return (
		<Menu.Items className='absolute right-0 mt-2 w-60 rounded-lg border bg-white py-3 shadow-md dark:bg-neutral-950'>
			{session.status === 'authenticated' ? (
				<UserMenuItems />
			) : (
				<GuestMenuItems />
			)}
			<ThemeToggleMenuItem />
		</Menu.Items>
	);
}

function GuestMenuItems() {
	const setSignUpModalOpen = useSetAtom(logInSignUpModalOpenAtom);
	const setLoginSignUpFormType = useSetAtom(logInSignUpFromTypeAtom);

	const openModal = (modalType: TLoginInSignUpFormTypes) => () => {
		setLoginSignUpFormType(modalType);
		setSignUpModalOpen(true);
	};

	return (
		<>
			<Menu.Item>
				<Link
					href='/'
					className='block cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700 md:hidden'
				>
					Home
				</Link>
			</Menu.Item>
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
		</>
	);
}

function UserMenuItems() {
	const setDisableUserSignActions = useSetAtom(disableUserSignActionsAtom);
	const handleSignOut = () => {
		setDisableUserSignActions(true);
		signOut().then(() => {
			setDisableUserSignActions(false);
		});
	};

	return (
		<>
			<Menu.Item>
				<Link
					href='/'
					className='block cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700 md:hidden'
				>
					Home
				</Link>
			</Menu.Item>
			<Menu.Item>
				<div className='cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700'>
					Profile
				</div>
			</Menu.Item>
			<Menu.Item>
				<Link
					href='/trips'
					className='block cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700'
				>
					Trips
				</Link>
			</Menu.Item>
			<Menu.Item>
				<Link
					href='/properties'
					className='block cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700'
				>
					Properties
				</Link>
			</Menu.Item>
			<Menu.Item>
				<Link
					href='/wishlist'
					className='block cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700'
				>
					Wishlist
				</Link>
			</Menu.Item>
			<Menu.Item>
				<div
					onClick={handleSignOut}
					className='cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700'
				>
					Log out
				</div>
			</Menu.Item>
		</>
	);
}
