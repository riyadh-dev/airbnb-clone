import {
	disableUserSignActionsAtom,
	logInSignUpModalOpenAtom,
} from '@/jotai/atoms';
import { trpc } from '@/utils/trpc';
import { useAtom, useSetAtom } from 'jotai';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';

export default function MockAccountsList() {
	const { data, isLoading } = trpc.users.listMocked.useQuery();

	const setModalOpen = useSetAtom(logInSignUpModalOpenAtom);
	const [disabled, setDisableUserSignActions] = useAtom(
		disableUserSignActionsAtom
	);

	const utils = trpc.useContext();
	const handleLogin = (email: string) => () => {
		setDisableUserSignActions(true);
		signIn('credentials', {
			redirect: false,
			email,
			password: 'password',
		}).then((response) => {
			setDisableUserSignActions(false);
			if (response?.ok) {
				setModalOpen(false);
				utils.listings.invalidate();
			}
			if (response?.error) console.log(response.error);
		});
	};

	if (disabled) return <LoadingSpinner className='!my-14 mx-auto h-20' />;

	return (
		<div>
			<h1 className='pb-3 text-center text-gray-400'>Choose a mock account</h1>
			<ul className='-mr-5 grid max-h-56 grid-cols-2 gap-2 overflow-y-scroll pr-5'>
				{isLoading && <MockAccountsListSkeleton />}
				{!isLoading &&
					!disabled &&
					data?.map((user) => (
						<li
							onClick={handleLogin(user.email)}
							key={user.id}
							className='flex cursor-pointer items-center gap-x-4 rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] p-2 font-bold text-white'
						>
							{user.image ? (
								<Image
									src={user.image}
									alt='image'
									width={40}
									height={40}
									className='rounded-full'
								/>
							) : (
								<svg
									viewBox='0 0 32 32'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
									role='presentation'
									focusable='false'
									className='block h-10 w-10 p-1 opacity-50 dark:opacity-100 dark:invert'
								>
									<path d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'></path>
								</svg>
							)}
							<span>{user.name}</span>
						</li>
					))}
			</ul>
		</div>
	);
}

function MockAccountsListSkeleton() {
	return (
		<>
			{[...Array(8)].map((_, index) => (
				<li
					key={index}
					className='flex items-center gap-x-4 rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] px-5 py-2 font-bold text-white'
				>
					<span className='h-10 w-10 animate-pulse rounded-full bg-rose-400' />

					<span className='h-4 w-28 animate-pulse rounded-lg bg-rose-400' />
				</li>
			))}
		</>
	);
}
