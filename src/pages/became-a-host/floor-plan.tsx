import BecameHostNavigation from '@/components/BecameHostNavigation';
import CounterInput from '@/components/CounterInput';
import { listingFloorPlanAtom } from '@/jotai/atoms';
import { listingFloorPlanSchema } from '@/zod/listings';
import { useAtom } from 'jotai';
import Head from 'next/head';
import { z } from 'zod';
type key = keyof z.infer<typeof listingFloorPlanSchema>;

export default function FloorPlanStep() {
	const [counts, setCounts] = useAtom(listingFloorPlanAtom);
	const setCount = (countsKey: key) => (newCount: number) =>
		setCounts({
			...counts,
			[countsKey]: newCount,
		});
	return (
		<>
			<div className='mx-auto max-w-[630px] px-4 pb-4'>
				<Head>
					<title>Floor plane</title>
				</Head>
				<h1 className='mb-4 text-4xl font-semibold'>
					Share some basics about your place
				</h1>
				<h3 className='text-lg text-gray-400'>
					You&apos;ll add more details later, like bed types.
				</h3>
				<div className='divide-y pt-8'>
					<div className='flex justify-between py-5 text-lg'>
						<span>Guests</span>
						<CounterInput
							count={counts.guestsCount}
							setCount={setCount('guestsCount')}
						/>
					</div>
					<div className='flex justify-between py-5 text-lg'>
						<span>Bedrooms</span>
						<CounterInput
							count={counts.bedroomsCount}
							setCount={setCount('bedroomsCount')}
						/>
					</div>
					<div className='flex justify-between py-5 text-lg'>
						<span>Beds</span>
						<CounterInput
							count={counts.bedsCount}
							setCount={setCount('bedsCount')}
						/>
					</div>
					<div className='flex justify-between py-5 text-lg'>
						<span>Bathrooms</span>
						<CounterInput
							count={counts.bathroomsCount}
							setCount={setCount('bathroomsCount')}
						/>
					</div>
				</div>
			</div>
			<BecameHostNavigation back='location' next='photos' />
		</>
	);
}
