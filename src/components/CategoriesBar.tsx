import CATEGORIES from '@/constants/categories';
import Image from 'next/image';

export default function CategoriesBar() {
	return (
		<nav className='sticky top-20 z-20 flex h-20 bg-inherit px-10 shadow-md dark:border-b xl:px-20'>
			<ul className='flex items-stretch gap-x-8 overflow-x-hidden text-gray-500'>
				{CATEGORIES.concat(CATEGORIES).map((category, index) => (
					<li key={index} className='group mt-auto cursor-pointer space-y-2'>
						<Image
							alt='icon'
							src={category.Image}
							className='mx-auto aspect-square h-6 w-6 opacity-60 dark:invert'
						/>
						<div className='whitespace-nowrap text-xs font-bold'>
							{category.title}
						</div>
						<div className='invisible mt-auto h-[2.5px] w-full rounded-full bg-gray-300 group-hover:visible' />
					</li>
				))}
			</ul>
			<div className='ml-auto self-center pl-6'>
				<button className='flex h-12 items-center justify-center gap-x-2 rounded-xl border px-4'>
					<i className='ri-equalizer-fill'></i>
					<span className='text-sm font-semibold'>Filter</span>
				</button>
			</div>
		</nav>
	);
}
