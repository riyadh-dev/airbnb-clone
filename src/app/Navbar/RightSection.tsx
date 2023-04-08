'use client';

import { logInSignUpModalOpenAtom } from '@/jotai/atoms';
import { classNames } from '@/utils';
import { Menu } from '@headlessui/react';
import { useSetAtom } from 'jotai';
import { useTheme } from 'next-themes';
import { MouseEventHandler, useEffect, useState } from 'react';

export default function RightSection() {
	const { setTheme, theme } = useTheme();
	const toggleTheme: MouseEventHandler<HTMLElement> = (e) => {
		e.preventDefault();
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	const [themeIcon, setThemeIcon] = useState<
		'ri-moon-line' | 'ri-computer-line' | 'ri-sun-line'
	>('ri-computer-line');

	useEffect(() => {
		switch (theme) {
			case 'light':
				setThemeIcon('ri-sun-line');
				break;
			case 'dark':
				setThemeIcon('ri-moon-line');
				break;
			default:
				setThemeIcon('ri-computer-line');
				break;
		}
	}, [setTheme, theme]);

	const setSignUpModalOpen = useSetAtom(logInSignUpModalOpenAtom);

	return (
		<div className='hidden w-72 items-center justify-end bg-inherit max-lg:ml-auto md:flex'>
			<button className='rounded-full p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700'>
				Airbnb your home
			</button>
			<button className='flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700'>
				<i className='ri-earth-line text-lg'></i>
			</button>
			<Menu as='div' className='relative bg-inherit'>
				<Menu.Button className='ml-2 flex h-10 items-center justify-center gap-x-3 rounded-full border px-3 hover:shadow-md'>
					<i className='ri-menu-line text-lg'></i>
					<i className='ri-user-line text-2xl'></i>
				</Menu.Button>
				<Menu.Items className='absolute right-0 mt-2 w-60 rounded-lg border bg-inherit py-3 shadow-md'>
					<Menu.Item>
						<div
							onClick={() => setSignUpModalOpen(true)}
							className='cursor-pointer px-5 py-2 font-bold hover:bg-slate-100 dark:hover:bg-gray-700'
						>
							Sign up
						</div>
					</Menu.Item>
					<Menu.Item>
						<div
							onClick={() => setSignUpModalOpen(true)}
							className='cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700'
						>
							Log in
						</div>
					</Menu.Item>
					<div className='my-2 h-[0.25px] w-full bg-gray-200' />
					<Menu.Item>
						<div
							onClick={toggleTheme}
							className='flex cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700'
						>
							<span className='first-letter:capitalize'>{theme} theme</span>
							<i className={classNames(themeIcon, 'ml-auto')}></i>
						</div>
					</Menu.Item>
				</Menu.Items>
			</Menu>
		</div>
	);
}
