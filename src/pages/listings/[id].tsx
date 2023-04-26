import AmenitiesListStatic from '@/components/AmenitiesListStatic';
import CounterInput from '@/components/CounterInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import ReviewsListStatic from '@/components/ReviewsListStatic';
import useListing from '@/hooks/useListing';
import { classNames } from '@/utils/helpers';
import { Menu } from '@headlessui/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import DatePicker from 'react-tailwindcss-datepicker';

type TDateRange = {
	startDate: string | null | Date;
	endDate: string | null | Date;
} | null;

export default function ListingPage() {
	const { isLoading, listing, toggleLike, user } = useListing();

	const [dateRange, setDateRange] = useState<TDateRange>({
		startDate: new Date(),
		endDate: new Date(),
	});

	const handleValueChange = (newDateRange: TDateRange) => {
		console.log('newValue:', newDateRange);
		setDateRange(newDateRange);
	};

	const [guests, setGuests] = useState({
		children: 0,
		adults: 1,
		infants: 0,
		pets: 0,
	});

	const setGuestsCategory =
		(category: keyof typeof guests) => (newValue: number) =>
			setGuests((prev) => ({ ...prev, [category]: newValue }));

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

	const startDate = !dateRange?.startDate
		? null
		: typeof dateRange.startDate === 'string'
		? dateRange.startDate
		: dateRange.startDate.toLocaleDateString();

	const endDate = !dateRange?.endDate
		? null
		: typeof dateRange.endDate === 'string'
		? dateRange.endDate
		: dateRange.endDate.toLocaleDateString();

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

				<div className='mx-auto h-fit w-full space-y-4 rounded-xl border p-6 shadow-lg md:shrink-0 lg:w-[370px]'>
					<div>
						<div className='flex items-center justify-between'>
							<span className='text-lg'>
								<b className='capitalize'>${listing.price}</b> night
							</span>
							<div className='flex shrink-0 items-center gap-1'>
								<i className='ri-star-fill text-sm'></i>
								<span>4.85</span>
								<span>.</span>
								<span>10 reviews</span>
							</div>
						</div>
					</div>

					<div className='relative flex h-14 w-full rounded-t-md border-x border-t text-left'>
						<div className='w-1/2 p-3'>
							<div className='text-xs font-bold uppercase'>check-in</div>
							<div className='text-sm'>{startDate}</div>
						</div>
						<div className='h-full w-1 border-l' />
						<div className='w-1/2 p-3'>
							<div className='text-xs font-bold uppercase'>checkout</div>
							<div className='text-sm'>{endDate}</div>
						</div>
						<DatePicker
							containerClassName=' h-full w-full bg-transparent absolute left-0'
							inputClassName='h-full w-full opacity-0 cursor-pointer'
							primaryColor='rose'
							//@ts-expect-error
							popoverDirection='down'
							value={dateRange}
							onChange={handleValueChange}
							minDate={new Date()}
						/>
					</div>

					{/* <Menu as='div' className='relative'>
						<Menu.Button className='flex h-14 w-full rounded-md border text-left'>
							<div className='w-1/2 p-3'>
								<div className='text-xs font-bold uppercase'>check-in</div>
								<div className='text-sm'>
									{value.startDate.toLocaleDateString()}
								</div>
							</div>
							<div className='h-full w-1 border-l' />
							<div className='w-1/2 p-3'>
								<div className='text-xs font-bold uppercase'>checkout</div>
								<div className='text-sm'>
									{value.endDate.toLocaleDateString()}
								</div>
							</div>
						</Menu.Button>
						<Menu.Items
							as='div'
							className='absolute right-0 z-20 mt-1 w-fit space-y-6 rounded-md border bg-white p-4 shadow-lg dark:bg-neutral-950'
						></Menu.Items>
					</Menu> */}

					<Menu as='div' className='relative !m-0'>
						<Menu.Button className='flex h-14 w-full rounded-b-md border p-3 text-left'>
							<div>
								<div className='text-xs font-bold uppercase'>guests</div>
								<div className='text-sm capitalize'>
									{guests.adults > 0 && `${guests.adults} adults` + ' '}
									{guests.children > 0 && `${guests.children} children` + ' '}
									{guests.infants > 0 && `${guests.infants} infants` + ' '}
									{guests.pets > 0 && `${guests.pets} pets`}
								</div>
							</div>
							<i className='ri-arrow-down-s-line ml-auto text-3xl'></i>
						</Menu.Button>
						<Menu.Items
							as='div'
							className='absolute mt-1 w-full space-y-6 rounded-md border bg-white p-4 shadow-lg dark:bg-neutral-950'
						>
							<div className='flex justify-between'>
								<div>
									<div className='font-bold'>Adults</div>
									<div className='text-sm'>Age 13+</div>
								</div>

								<CounterInput
									count={guests.adults}
									setCount={setGuestsCategory('adults')}
								/>
							</div>
							<div className='flex justify-between text-lg'>
								<div>
									<div className='font-bold'>Children</div>
									<div className='text-sm'>Ages 2-12</div>
								</div>

								<CounterInput
									count={guests.children}
									setCount={setGuestsCategory('children')}
								/>
							</div>
							<div className='flex justify-between text-lg'>
								<div>
									<div className='font-bold'>Infants</div>
									<div className='text-sm'>Under 2</div>
								</div>
								<CounterInput
									count={guests.infants}
									setCount={setGuestsCategory('infants')}
								/>
							</div>
							<div className='flex justify-between text-lg'>
								<div>
									<div className='font-bold'>Pets</div>
									<div className='text-sm underline'>
										Bringing a service animal?
									</div>
								</div>
								<CounterInput
									count={guests.pets}
									setCount={setGuestsCategory('pets')}
								/>
							</div>
						</Menu.Items>
					</Menu>

					<button
						type='submit'
						className='h-12 w-full rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] text-center font-bold text-white'
					>
						Reserve
					</button>
					<div className='text-center'>You won&apos;t be charged yet</div>

					<div className='flex'>
						<span>${listing.price} x 3 nights</span>
						<span className='ml-auto'>${(listing.price ?? 0) * 3}</span>
					</div>
					<div className='flex'>
						<span>Airbnb service fee</span>
						<span className='ml-auto'>$100</span>
					</div>

					<div className='border-t' />

					<div className='flex font-bold'>
						<span>Total before taxes</span>
						<span className='ml-auto'>${(listing.price ?? 0) * 3 + 100}</span>
					</div>
				</div>
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
