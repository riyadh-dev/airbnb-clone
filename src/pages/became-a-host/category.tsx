import LISTING_CATEGORIES from '@/constants/listing-categories';
import Image from 'next/image';

export default function CategoryStep() {
	return (
		<div className='mx-auto max-w-[630px] space-y-8 px-4 pb-4'>
			<h1 className='text-4xl font-semibold'>
				Which of these best describes your place?
			</h1>
			<ul className='grid w-full grid-cols-2 gap-4 overflow-y-scroll scrollbar-hidden md:grid-cols-3'>
				{LISTING_CATEGORIES.concat(LISTING_CATEGORIES).map(
					({ image, title }, index) => (
						<li
							key={index}
							className='space-y-2 rounded-lg border p-4 hover:border-neutral-950 hover:bg-gray-100 dark:hover:border-primary dark:hover:bg-neutral-800'
						>
							<Image
								alt='icon'
								src={image}
								className='h- aspect-square h-8 w-8 dark:invert'
							/>
							<div className='text whitespace-nowrap font-bold'>{title}</div>
						</li>
					)
				)}
			</ul>
		</div>
	);
}
