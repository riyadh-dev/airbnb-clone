import LISTING_CATEGORIES from '@/constants/listing-categories';
import { FilterModalOpenAtom, filterCategoryAtom } from '@/jotai/atoms';
import { classNames } from '@/utils/helpers';
import { useAtom, useSetAtom } from 'jotai';
import Image from 'next/image';

export default function ListingCategoriesBar() {
	const setModalOpen = useSetAtom(FilterModalOpenAtom);
	const [selectedCategory, setCategory] = useAtom(filterCategoryAtom);

	return (
		<nav className='sticky top-20 z-30 flex h-20 bg-white px-10 shadow-md dark:border-b dark:bg-neutral-950 xl:px-20'>
			<ul className='flex items-stretch gap-x-8 overflow-x-hidden'>
				{LISTING_CATEGORIES.map((category, index) => (
					<li
						onClick={() => setCategory(category.title)}
						key={index}
						className='group mt-auto cursor-pointer space-y-2'
					>
						<Image
							alt='icon'
							src={category.image}
							className={classNames(
								selectedCategory === category.title ? '' : 'opacity-60',
								'mx-auto aspect-square h-6 w-6 dark:invert'
							)}
						/>
						<div
							className={classNames(
								selectedCategory === category.title ? '' : 'text-gray-500',
								'whitespace-nowrap text-xs font-bold'
							)}
						>
							{category.title}
						</div>
						<div
							className={classNames(
								selectedCategory === category.title
									? 'bg-slate-950 dark:bg-white'
									: 'invisible bg-gray-300 group-hover:visible',
								'mt-auto h-[2.5px] w-full rounded-full'
							)}
						/>
					</li>
				))}
			</ul>
			<div className='ml-auto self-center pl-6'>
				<button
					onClick={() => setModalOpen(true)}
					className='flex h-12 items-center justify-center gap-x-2 rounded-xl border px-4'
				>
					<i className='ri-equalizer-fill'></i>
					<span className='text-sm font-semibold'>Filter</span>
				</button>
			</div>
		</nav>
	);
}
