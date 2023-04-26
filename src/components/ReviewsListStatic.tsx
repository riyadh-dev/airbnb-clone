import Image from 'next/image';

export default function ReviewsListStatic() {
	return (
		<ul className='grid gap-x-12 gap-y-8 md:grid-cols-2'>
			{Array.from({ length: 10 }, (_, index) => (
				<li key={index}>
					<div className='flex gap-x-3'>
						<Image
							src={`https://xsgames.co/randomusers/assets/avatars/${
								index % 2 ? 'female' : 'male'
							}/${index}.jpg`}
							alt='avatar'
							width={40}
							height={40}
							className='h-10 w-10 rounded-full'
						/>
						<div className='leading-[normal]'>
							<div className='font-bold'>Review #{index + 1}</div>
							<div className='text-sm'>April 2023</div>
						</div>
					</div>
					{/*cspell:disable */}
					<p className='mt-4'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
						delectus quas repudiandae laudantium unde perferendis et, mollitia
						ab libero quod eos cumque suscipit hic aliquam! Id ab nam tenetur
						iusto.
					</p>
					{/*cspell:enable */}
				</li>
			))}
		</ul>
	);
}
