import CounterInput from '@/components/CounterInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import { classNames } from '@/utils/helpers';
import { trpc } from '@/utils/trpc';
import { Menu } from '@headlessui/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DatePicker from 'react-tailwindcss-datepicker';

type TDateRange = {
	startDate: string | null | Date;
	endDate: string | null | Date;
} | null;

export default function ListingPage() {
	const router = useRouter();
	const { id } = router.query;

	const { data: listing, isLoading: isLoadingListing } =
		trpc.listings.getById.useQuery(
			{ id: Number(id) },
			{ enabled: Boolean(id) }
		);
	const { data: user, isLoading: isLoadingUser } = trpc.users.getById.useQuery(
		{ id: Number(listing?.ownerId) },
		{ enabled: Boolean(listing?.ownerId) }
	);

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
		adults: 0,
		infants: 0,
		pets: 0,
	});

	const setGuestsCategory =
		(category: keyof typeof guests) => (newValue: number) =>
			setGuests((prev) => ({ ...prev, [category]: newValue }));

	if (isLoadingListing || isLoadingUser)
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
		<div className='mx-auto my-6 max-w-6xl space-y-6 px-4'>
			<Head>
				<title>{listing.title}</title>
			</Head>
			<h1 className='text-4xl font-semibold capitalize'>{listing.title}</h1>
			<div className='grid grid-cols-4 grid-rows-2 gap-3 overflow-hidden rounded-xl'>
				{listing.imagesCSV
					.split(',')
					.splice(0, 5)
					.map((image, index) => (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							key={index}
							src={image}
							alt='image'
							className={classNames(
								index === 0 ? 'col-span-2 row-span-2' : '',
								'aspect-square h-full object-cover'
							)}
						/>
					))}
			</div>
			<div className='flex gap-x-20 pt-6'>
				<div className='space-y-4'>
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
					<div className='border-t' />
					<p>{listing.description}</p>
				</div>

				<div className='w-[370px] shrink-0 space-y-4 rounded-xl border p-6 shadow-lg'>
					<div>
						<div className='flex items-center justify-between'>
							<span className='text-lg'>
								<b className='capitalize'>${listing.price}</b> night
							</span>
							<div className='flex shrink-0 items-center gap-1'>
								<i className='ri-star-fill text-sm'></i>
								<span>4.85</span>
								<span>.</span>
								<span>5reviews</span>
							</div>
						</div>
					</div>

					<div className='relative flex h-14 w-full rounded-md border text-left'>
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

					<Menu as='div' className='relative'>
						<Menu.Button className='flex h-14 w-full rounded-md border p-3 text-left'>
							<div>
								<div className='text-xs font-bold uppercase'>guests</div>
								<div className='text-sm'>2 guests</div>
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
		</div>
	);
}
