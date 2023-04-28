import { classNames } from '@/utils/helpers';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface IListing {
	id: number;
	state: string;
	country: string;
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
	toggleLike?: (id: number) => void;
}) {
	return (
		<ul className='grid grid-cols-1 gap-x-6 gap-y-10 px-5 pt-6 md:grid-cols-2 md:px-20 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
			{listings.map((listing) => (
				<ListingListItem
					key={listing.id}
					listing={listing}
					toggleLike={toggleLike}
				/>
			))}
		</ul>
	);
}

function ListingListItem({
	listing,
	toggleLike,
}: {
	listing: IListing;
	toggleLike?: (id: number) => void;
}) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		renderMode: 'performance',
		loop: true,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
	});

	return (
		<li key={listing.id} className='relative'>
			{toggleLike && (
				<button
					onClick={() => toggleLike(listing.id)}
					className='absolute right-3 top-3 z-20'
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
			)}

			<div
				ref={sliderRef}
				className='group relative flex aspect-square overflow-x-hidden rounded-2xl'
			>
				<Link
					href={`/listings/${listing.id}`}
					className='absolute left-0 top-0 z-10 h-full w-full'
				/>

				{listing.imagesCSV.split(',').map((image, index) => (
					<Image
						key={index}
						src={image}
						alt='image'
						loading='lazy'
						quality={100}
						width={400}
						height={400}
						className='keen-slider__slide peer h-full w-full object-cover'
					/>
				))}

				{instanceRef.current && loaded && (
					<>
						<button
							onClick={() => instanceRef.current?.prev()}
							className='absolute bottom-1/2 left-2 z-20 h-8 w-8 translate-y-1/2 rounded-full bg-white/75 text-lg text-black opacity-0 transition-opacity group-hover:opacity-100'
						>
							<i className='ri-arrow-left-s-line'></i>
						</button>

						<button
							onClick={() => instanceRef.current?.next()}
							className='absolute bottom-1/2 right-2 z-20 h-8 w-8 translate-y-1/2 rounded-full bg-white/75 text-lg text-black opacity-0 transition-opacity group-hover:opacity-100'
						>
							<i className='ri-arrow-right-s-line'></i>
						</button>

						<div className='absolute bottom-2 z-20 flex w-full items-center justify-center gap-x-1'>
							{Array.from({
								length: instanceRef.current.track.details.slides.length,
							}).map((_, idx) => {
								return (
									<button
										key={idx}
										onClick={() => instanceRef.current?.moveToIdx(idx)}
										className={classNames(
											idx === currentSlide
												? 'h-2 w-2 bg-white'
												: 'h-[6px] w-[6px] bg-white/50',
											'rounded-full'
										)}
									></button>
								);
							})}
						</div>
					</>
				)}
			</div>

			<div className='relative pt-1'>
				<Link
					href={`/listings/${listing.id}`}
					className='peer absolute left-0 top-0 z-10 h-full w-full'
				/>

				<div className='flex h-6 items-center justify-between'>
					<span className='truncate font-bold capitalize'>
						{listing.country + ', ' + listing.state}
					</span>
					<div className='flex shrink-0 items-center gap-1'>
						<i className='ri-star-fill text-sm'></i>
						<span>4.85</span>
					</div>
				</div>

				<div className='truncate text-gray-400'>{listing.description}</div>

				<div className='text-gray-400'>July 30 - Aug 25</div>

				<div className='pt-1'>
					<span className='font-bold'>{listing.price}$ </span>
					night
				</div>
			</div>
		</li>
	);
}
