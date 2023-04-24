export function ListingsListSkeleton() {
	return (
		<ul className='grid grid-cols-1 gap-x-6 gap-y-10 px-5 py-5 md:grid-cols-2 md:px-20 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
			{Array.from({ length: 10 }).map((_, i) => (
				<li key={i} className='animate-pulse space-y-3'>
					<div className='aspect-square rounded-2xl bg-gray-200 dark:bg-gray-800'></div>
					<div className='space-y-1'>
						<div className='flex'>
							<div className='h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800' />
							<div className='ml-auto h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-800' />
						</div>
						<div className='h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800' />
						<div className='h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800' />
						<div className='h-4 w-1/4 rounded bg-gray-200 pt-1 dark:bg-gray-800' />
					</div>
				</li>
			))}
		</ul>
	);
}
