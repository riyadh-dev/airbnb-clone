'use client';

import { disableUserSignActionsAtom } from '@/jotai/atoms';
import { Menu } from '@headlessui/react';
import { useSetAtom } from 'jotai';
import { signOut } from 'next-auth/react';
import ThemeToggleMenuItem from './ThemeToggleMenuItem';

export default function UserMenu() {
	const setDisableUserSignActions = useSetAtom(disableUserSignActionsAtom);
	const handleSignOut = () => {
		setDisableUserSignActions(true);
		signOut().then(() => {
			setDisableUserSignActions(false);
		});
	};

	return (
		<Menu.Items className='absolute right-0 mt-2 w-60 rounded-lg border bg-inherit py-3 shadow-md'>
			<Menu.Item>
				<div className='cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700'>
					Profile
				</div>
			</Menu.Item>
			<Menu.Item>
				<div
					onClick={handleSignOut}
					className='cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700'
				>
					Log out
				</div>
			</Menu.Item>
			<ThemeToggleMenuItem />
		</Menu.Items>
	);
}
