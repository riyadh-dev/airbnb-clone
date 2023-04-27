import { classNames } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';

interface IListing {
	id: number;
	title: string;
	price: number;
	//if undefined assume its listing liked
	isLiked?: boolean | 0 | 1;
	imagesCSV: string;
	description: string;
}

const getIsLiked = (isLiked: IListing['isLiked']) =>
	isLiked === undefined ? true : isLiked;

export default function ListingList({
	listings,
	toggleLike,
}: {
	listings: IListing[];
	toggleLike: (id: number) => void;
}) {
	return (
		<ul className='grid grid-cols-1 gap-x-6 gap-y-10 px-5 pt-5 md:grid-cols-2 md:px-20 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
			{listings.map((listing) => (
				<li key={listing.id} className='relative space-y-3'>
					<button
						onClick={() => toggleLike(listing.id)}
						className='absolute right-3 top-3'
					>
						<svg
							viewBox='0 0 32 32'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
							role='presentation'
							focusable='false'
							className={classNames(
								getIsLiked(listing.isLiked)
									? 'fill-primary stroke-white stroke-2'
									: 'fill-black/50 stroke-white stroke-2',
								'h-6 w-6'
							)}
						>
							<path d='m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z'></path>
						</svg>
					</button>
					<Link href={`/listings/${listing.id}`}>
						<div className='aspect-square'>
							<Image
								src={listing.imagesCSV.split(',')[0] as string}
								alt='image'
								loading='lazy'
								quality={100}
								width={400}
								height={400}
								className='h-full rounded-2xl object-cover'
							/>
						</div>
						<div>
							<div className='flex h-6 items-center justify-between leading-3'>
								<span className='truncate font-bold capitalize'>
									{listing.title}
								</span>
								<div className='flex shrink-0 items-center gap-1'>
									<i className='ri-star-fill text-sm'></i>
									<span>4.85 (125)</span>
								</div>
							</div>
							<div className='truncate text-gray-400'>
								{listing.description}
							</div>
							<div className='text-gray-400'>July 30 - Aug 25</div>
							<div className='pt-1'>
								<span className='font-bold'>{listing.price}$ </span>
								night
							</div>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}
