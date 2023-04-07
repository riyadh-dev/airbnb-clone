export default function UserMenu() {
	return (
		<div className='hidden w-72 items-center justify-end max-lg:ml-auto md:flex'>
			<button className='rounded-full p-3 hover:bg-gray-100'>
				Airbnb your home
			</button>
			<button className='flex h-10 w-10 items-center justify-center rounded-full text-lg hover:bg-gray-100'>
				<i className='ph ph-globe'></i>
			</button>
			<button className='ml-2 flex h-10 items-center justify-center gap-x-3 rounded-full border px-3 hover:shadow-md'>
				<i className='ph ph-list text-lg'></i>
				<i className='ph ph-user text-2xl'></i>
			</button>
		</div>
	);
}
