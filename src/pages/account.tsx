import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function AccountPage() {
	const { data: session } = useSession();

	if (session?.user)
		return (
			<main className='mx-auto mt-6 max-w-xl px-4'>
				<div className='space-y-4'>
					{session.user.image && (
						<div className='grid place-content-center'>
							<Image
								src={session.user.image}
								width={100}
								height={100}
								alt='avatar'
								className='mx-auto rounded-full'
							/>
							<button disabled={true} className='mt-1 font-bold underline'>
								Change Avatar
							</button>
						</div>
					)}
					<div className='flex justify-between space-x-2'>
						<div>
							<div>Legal name</div>
							<div className='text-gray-400'>{session.user.name}</div>
						</div>
						<button disabled={true} className='self-start font-bold underline'>
							Edit
						</button>
					</div>

					<div className='my-2 h-[0.25px] w-full bg-gray-200' />

					<div className='flex justify-between space-x-2'>
						<div>
							<div>Email</div>
							<div className='text-gray-400'>{session.user.email}</div>
						</div>
						<button disabled={true} className='self-start font-bold underline'>
							Edit
						</button>
					</div>

					<div className='my-2 h-[0.25px] w-full bg-gray-200' />

					<div className='flex justify-between space-x-2'>
						<div>
							<div>Joined on</div>
							<div className='text-gray-400'>
								{new Date(session.user.createdAt).toDateString()}
							</div>
						</div>
					</div>

					<div className='my-2 h-[0.25px] w-full bg-gray-200' />
				</div>
			</main>
		);

	// If no session, display access denied message.
	return (
		<main className='mt-32 flex items-center justify-center text-2xl font-bold text-gray-400'>
			Access Denied
		</main>
	);
}
