import AmenitiesListStatic from '@/components/Listing/AmenitiesListStatic';
import ReservationBox from '@/components/Listing/ReservationBox';
import ReviewsListStatic from '@/components/Listing/ReviewsListStatic';
import LoadingSpinner from '@/components/LoadingSpinner';
import useListing from '@/hooks/useListing';
import { reservationListingAtom } from '@/jotai/atoms';
import { classNames } from '@/utils/helpers';
import { useSetAtom } from 'jotai';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';

export default function ListingPage() {
	const { isLoading, listing, toggleLike, user } = useListing();
	const setReservationListing = useSetAtom(reservationListingAtom);

	useEffect(() => {
		if (listing) setReservationListing(listing);
	}, [listing, setReservationListing]);

	if (isLoading)
		return (
			<div className='flex h-[calc(100vh-80px)] items-center justify-center'>
				<LoadingSpinner className='w-32' />
			</div>
		);

	if (!listing || !user)
		return (
			<div className='mt-32 flex items-center justify-center text-2xl font-bold text-gray-400'>
				Listing not found
			</div>
		);

	return (
		<div className='mx-auto my-6 max-w-6xl px-4'>
			<Head>
				<title>{listing.title}</title>
			</Head>
			<div className='pb-6'>
				<h1 className='mb-2 text-4xl font-semibold capitalize'>
					{listing.title}
				</h1>
				<div className='flex flex-wrap items-center gap-2'>
					<div className='flex flex-wrap items-center gap-1'>
						<i className='ri-star-fill'></i>
						<span>4.85</span>
						<span>.</span>
						<span className='font-semibold underline'>10 reviews</span>
						<span>.</span>
						<span className='font-semibold underline'>{listing.city},</span>
						<span className='font-semibold underline'>{listing.state}</span>
						<span className='font-semibold underline'>{listing.country}</span>
					</div>
					<button
						onClick={() => toggleLike()}
						className='ml-auto flex items-center gap-x-2 rounded-lg leading-[normal]'
					>
						<svg
							viewBox='0 0 32 32'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
							role='presentation'
							focusable='false'
							className={classNames(
								listing.isLiked
									? 'fill-primary dark:stroke-white'
									: 'fill-white stroke-black stroke-2 dark:fill-black dark:stroke-white',
								'h-5 w-5'
							)}
						>
							<path d='m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z'></path>
						</svg>
						Wishlist
					</button>
				</div>
			</div>

			<div className='grid grid-cols-4 grid-rows-2 gap-3 overflow-hidden rounded-xl'>
				{listing.imagesCSV
					.split(',')
					.splice(0, 5)
					.map((image, index) => (
						<Image
							key={index}
							src={image}
							width={index === 0 ? 760 : 380}
							height={index === 0 ? 760 : 380}
							quality={100}
							alt='image'
							className={classNames(
								index === 0 ? 'col-span-2 row-span-2' : '',
								'aspect-square h-full object-cover'
							)}
						/>
					))}
			</div>

			<div className='flex gap-x-20 gap-y-8 pt-8 max-lg:flex-wrap'>
				<div className='space-y-8'>
					<div className='flex items-center'>
						<div>
							<h1 className='text-2xl font-semibold capitalize'>
								Hosted by {user.name}
							</h1>
							<div className='space-x-1'>
								<span>{listing.guestsCount} Guests</span>
								<span>.</span>
								<span>{listing.bedroomsCount} Bedrooms</span>
								<span>.</span>
								<span>{listing.bedsCount} Beds</span>
								<span>.</span>
								<span>{listing.bathroomsCount} Bathrooms</span>
							</div>
						</div>

						{user.image ? (
							<Image
								src={user.image}
								alt='image'
								width={56}
								height={56}
								className='ml-auto h-14 w-14 rounded-full'
							/>
						) : (
							<div className='ml-auto h-14 w-14 rounded-full bg-gradient-to-br from-[#e61e4d] from-40% to-[#bd1e59]' />
						)}
					</div>

					<div className='!mt-6 border-t' />

					<div>
						<h1 className='text-2xl font-semibold'>What this place offers</h1>
						<AmenitiesListStatic />
					</div>

					<div className='border-t' />

					<div>
						<h1 className='pb-1 text-2xl font-semibold'>Description</h1>
						<p>{listing.description}</p>
					</div>
				</div>

				<ReservationBox disabled={Boolean(listing.isReserved)} />
			</div>

			<div className='my-8 border-t' />

			<div>
				<div className='flex items-center pb-8 font-bold'>
					<i className='ri-star-fill pr-2 text-lg'></i>
					<h1 className='text-2xl'>4.85 . 10 reviews</h1>
				</div>

				<ReviewsListStatic />
			</div>
		</div>
	);
}
