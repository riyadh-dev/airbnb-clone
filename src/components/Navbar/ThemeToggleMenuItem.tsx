import { TThemeRemixIcon } from '@/common/types';
import { classNames } from '@/utils/helpers';
import { Menu } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { MouseEventHandler, useEffect, useState } from 'react';

export default function ThemeToggleMenuItem() {
	const { setTheme, theme } = useTheme();
	const toggleTheme: MouseEventHandler<HTMLElement> = (e) => {
		e.preventDefault();
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	const [themeIcon, setThemeIcon] =
		useState<TThemeRemixIcon>('ri-computer-line');

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

	return (
		<Menu.Item>
			<div
				onClick={toggleTheme}
				className='flex cursor-pointer px-5 py-2 hover:bg-slate-100 dark:hover:bg-gray-700'
			>
				<span className='first-letter:capitalize'>{theme} theme</span>
				<i className={classNames(themeIcon, 'ml-auto')}></i>
			</div>
		</Menu.Item>
	);
}
