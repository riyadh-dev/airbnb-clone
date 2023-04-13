import garden from '@/../public/garden.webp';
import Image from 'next/image';
export default function Home() {
	return (
		<main>
			<ul className='grid grid-cols-1 gap-x-6 gap-y-10 px-20 pt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{[...Array(10)].map((_, index) => (
					<li key={index} className='space-y-3'>
						<div className='aspect-square'>
							<Image
								src={garden}
								alt='image'
								className='h-full rounded-2xl object-cover'
							/>
						</div>
						<div>
							<div className='flex h-6 items-center justify-between leading-3'>
								<span className='font-bold'>Private room in Kyoto</span>
								<div className='flex items-center gap-1'>
									<i className='ri-star-fill text-sm'></i>
									<span>4.85 (125)</span>
								</div>
							</div>
							<div className='truncate text-gray-400'>
								{/*cspell:disable */}
								✿Kyoto✿ Guest House “WARAKU-AN” is a 100 year old Machiya House,
								renovated to be a convenient yet nostalgic guest house, located
								close to Heian Shrine.
								{/*cspell:enable */}
							</div>
							<div className='text-gray-400'>July 30 - Aug 25</div>
							<div className='pt-1'>
								<span className='font-bold'>360$ </span>
								night
							</div>
						</div>
					</li>
				))}
			</ul>
		</main>
	);
}
