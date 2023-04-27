import {
	confirmReservationModalOpenAtom,
	reservationInputAtom,
	reservationListingAtom,
} from '@/jotai/atoms';
import { Menu } from '@headlessui/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import DatePicker from 'react-tailwindcss-datepicker';
import CounterInput from '../Input/CounterInput';

type TDateRange = {
	startDate: string | null | Date;
	endDate: string | null | Date;
} | null;

export default function ReservationBox() {
	const listing = useAtomValue(reservationListingAtom);
	const [reservationInput, setReservationInput] = useAtom(reservationInputAtom);
	const setModalOpen = useSetAtom(confirmReservationModalOpenAtom);

	const [dateRange, setDateRange] = useState<TDateRange>({
		startDate: new Date(),
		endDate: new Date(),
	});

	if (!listing) return null;

	const setGuestsCategory =
		(
			category: keyof Pick<
				typeof reservationInput,
				'adultGuestCount' | 'childGuestCount' | 'infantGuestCount' | 'petCount'
			>
		) =>
		(newValue: number) =>
			setReservationInput({ ...reservationInput, [category]: newValue });

	const handleValueChange = (newDateRange: TDateRange) => {
		setDateRange(newDateRange);
	};

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
							{reservationInput.adultGuestCount > 0 &&
								`${reservationInput.adultGuestCount} adults` + ' '}
							{reservationInput.childGuestCount > 0 &&
								`${reservationInput.childGuestCount} children` + ' '}
							{reservationInput.infantGuestCount > 0 &&
								`${reservationInput.infantGuestCount} infants` + ' '}
							{reservationInput.petCount > 0 &&
								`${reservationInput.petCount} pets`}
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
							count={reservationInput.adultGuestCount}
							setCount={setGuestsCategory('adultGuestCount')}
						/>
					</div>
					<div className='flex justify-between text-lg'>
						<div>
							<div className='font-bold'>Children</div>
							<div className='text-sm'>Ages 2-12</div>
						</div>

						<CounterInput
							count={reservationInput.childGuestCount}
							setCount={setGuestsCategory('childGuestCount')}
						/>
					</div>
					<div className='flex justify-between text-lg'>
						<div>
							<div className='font-bold'>Infants</div>
							<div className='text-sm'>Under 2</div>
						</div>
						<CounterInput
							count={reservationInput.infantGuestCount}
							setCount={setGuestsCategory('infantGuestCount')}
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
							count={reservationInput.petCount}
							setCount={setGuestsCategory('petCount')}
						/>
					</div>
				</Menu.Items>
			</Menu>

			<button
				onClick={() => setModalOpen(true)}
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
	);
}
