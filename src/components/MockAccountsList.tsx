import Image from 'next/image';

export default function MockAccountsList() {
	return (
		<div>
			<h1 className='pb-3 text-center text-gray-400'>Choose a mock account</h1>
			<ul className='-mr-5 grid max-h-56 grid-cols-2 gap-3 overflow-y-scroll pr-5'>
				{[...Array(20)].map((_, index) => (
					<li
						key={index}
						className='flex cursor-pointer items-center gap-x-4 rounded-md bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] p-2 font-bold text-white'
					>
						<Image
							src={`https://xsgames.co/randomusers/assets/avatars/female/${index}.jpg`}
							alt='avatar'
							width={40}
							height={40}
							className='rounded-full'
						/>
						<span>User Name</span>
					</li>
				))}
			</ul>
		</div>
	);
}
