import BecameHostNavigation from '@/components/BecameHostNavigation';
import LISTING_CATEGORIES from '@/constants/listing-categories';
import { listingCategoryAtom } from '@/jotai/atoms';
import { classNames } from '@/utils/helpers';
import { useAtom } from 'jotai';
import Head from 'next/head';
import Image from 'next/image';

export default function CategoryStep() {
	const [category, setCategory] = useAtom(listingCategoryAtom);
	return (
		<>
			<div className='mx-auto max-w-[630px] space-y-8 px-4 pb-4'>
				<Head>
					<title>Select a category</title>
				</Head>
				<h1 className='text-4xl font-semibold'>
					Which of these best describes your place?
				</h1>
				<ul className='grid w-full grid-cols-2 gap-4 overflow-y-scroll scrollbar-hidden md:grid-cols-3'>
					{LISTING_CATEGORIES.concat(LISTING_CATEGORIES).map(
						({ image, title }, index) => (
							<li
								onClick={() => setCategory(title)}
								key={index}
								className={classNames(
									title === category
										? 'border-neutral-950 bg-gray-100 dark:border-primary dark:bg-neutral-800'
										: 'hover:border-neutral-950 hover:bg-gray-100 dark:hover:border-primary dark:hover:bg-neutral-800',
									'cursor-pointer space-y-2 rounded-lg border p-4'
								)}
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
			<BecameHostNavigation back='category' next='location' />
		</>
	);
}
