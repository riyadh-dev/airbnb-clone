export default function Search() {
	return (
		<>
			<div className='hidden h-12 items-stretch divide-x divide-gray-400 rounded-full border p-2 text-sm shadow-sm duration-150 hover:shadow-md md:flex'>
				<button className='px-4 font-semibold'>Any where</button>
				<button className='px-4 font-semibold'>Any where</button>
				<button className='flex items-center'>
					<span className='px-4 text-gray-400'>Any where</span>
					<span className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white'>
						<i className='ri-search-line'></i>
					</span>
				</button>
			</div>

			<button className='flex h-14 w-full items-center gap-x-4 rounded-full border-2 py-2 shadow-md md:hidden'>
				<i className='ri-search-line ml-5 text-xl'></i>
				<div className='flex flex-col items-start text-sm'>
					<span className='font font-bold'>Anywhere</span>
					<div className='text-xs text-gray-400'>
						<span>Any week</span>
						<span> . </span>
						<span>Add guests</span>
					</div>
				</div>
				<span className='ml-auto mr-3 flex h-9 w-9 items-center justify-center rounded-full border'>
					<i className='ri-equalizer-fill'></i>
				</span>
			</button>
		</>
	);
}
