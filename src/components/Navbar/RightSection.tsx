import {
	disableUserSignActionsAtom,
	logInSignUpFromTypeAtom,
	logInSignUpModalOpenAtom,
} from '@/jotai/atoms';
import { Menu } from '@headlessui/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../LoadingSpinner';
import GuestMenu from './GuestMenu';
import UserMenu from './UserMenu';

export default function RightSection() {
	const session = useSession();
	const disableUserSignActions = useAtomValue(disableUserSignActionsAtom);
	const disabled = disableUserSignActions || session.status === 'loading';

	const setLoginSignUpFormType = useSetAtom(logInSignUpFromTypeAtom);
	const setLogInSignUpModalOpen = useSetAtom(logInSignUpModalOpenAtom);
	const router = useRouter();

	const handleRentClick = () => {
		if (session.status !== 'authenticated') {
			setLoginSignUpFormType('mock-list');
			setLogInSignUpModalOpen(true);
		} else router.push('/became-a-host/category');
	};

	const image = session?.data?.user?.image;
	return (
		<div className='flex items-center justify-end max-lg:ml-auto md:w-72'>
			<button
				disabled={disabled}
				onClick={handleRentClick}
				className='hidden rounded-full p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 md:block'
			>
				Airbnb your home
			</button>
			<button className='hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 md:flex'>
				<i className='ri-earth-line text-lg'></i>
			</button>
			<Menu as='div' className='relative'>
				<Menu.Button
					disabled={disabled}
					className='ml-2 flex h-14 items-center justify-center gap-x-3 rounded-full border-2 max-md:w-14 max-md:p-2 max-md:shadow-md md:h-10 md:border md:hover:shadow-md'
				>
					<i className='ri-menu-line ml-3 hidden text-lg md:block'></i>
					{disabled && (
						<LoadingSpinner className='h-full md:mx-1 md:ml-1 md:h-8 md:w-8' />
					)}
					{session.status === 'unauthenticated' && !image && !disabled && (
						<svg
							viewBox='0 0 32 32'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
							role='presentation'
							focusable='false'
							className='h-full opacity-50 dark:opacity-100 dark:invert md:mx-1 md:ml-1 md:h-8 md:w-8'
						>
							<path d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'></path>
						</svg>
					)}
					{session.status === 'authenticated' && !image && !disabled && (
						<div className='aspect-square h-full rounded-full bg-gradient-to-br from-[#e61e4d] from-40% to-[#bd1e59] md:mx-1 md:ml-1 md:h-8' />
					)}
					{image && !disabled && (
						<Image
							src={image}
							alt='image'
							width={48}
							height={48}
							className='h-full w-full rounded-full md:mx-1 md:ml-1 md:h-8 md:w-8'
						/>
					)}
				</Menu.Button>
				{session.status === 'authenticated' ? <UserMenu /> : <GuestMenu />}
			</Menu>
		</div>
	);
}
