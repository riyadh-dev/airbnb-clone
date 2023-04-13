'use client';

import { classNames } from '@/common/utils';

export default function PriceForm() {
	return (
		<div className='w-full rounded-xl border bg-gray-50 p-8 dark:bg-neutral-900'>
			<div className='flex items-center gap-x-8'>
				<button className='h-12 w-12 shrink-0 rounded-full border border-gray-400 bg-white dark:bg-neutral-950'>
					<i className='ri-add-line text-gray-400'></i>
				</button>
				<input
					type='text'
					defaultValue='$75'
					placeholder='$00'
					className={classNames(
						false
							? 'border-rose-600 bg-rose-400/5 text-red-400 placeholder:text-red-400/75 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500'
							: 'border-gray-400 bg-transparent',
						'h-24 w-full rounded-lg border bg-white p-4 text-center text-5xl font-bold dark:bg-neutral-950'
					)}
				/>
				<button className='h-12 w-12 shrink-0 rounded-full border border-gray-400 bg-white dark:bg-neutral-950'>
					<i className='ri-subtract-line text-gray-400'></i>
				</button>
			</div>
			<h4 className='mt-3 text-center text-lg'>Per night</h4>
		</div>
	);
}
