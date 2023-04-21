import BecameHostNavigation from '@/components/BecameHostNavigation';
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
						<FloorPlanStepInput
							count={counts.guestsCount}
							setCount={setCount('guestsCount')}
						/>
					</div>
					<div className='flex justify-between py-5 text-lg'>
						<span>Bedrooms</span>
						<FloorPlanStepInput
							count={counts.bedroomsCount}
							setCount={setCount('bedroomsCount')}
						/>
					</div>
					<div className='flex justify-between py-5 text-lg'>
						<span>Beds</span>
						<FloorPlanStepInput
							count={counts.bedsCount}
							setCount={setCount('bedsCount')}
						/>
					</div>
					<div className='flex justify-between py-5 text-lg'>
						<span>Bathrooms</span>
						<FloorPlanStepInput
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

function FloorPlanStepInput({
	setCount,
	count,
}: {
	count: number;
	setCount: (newCount: number) => void;
}) {
	return (
		<div className='flex items-center gap-x-4'>
			<button
				disabled={count === 0}
				onClick={() => setCount(count - 1)}
				className='h-8 w-8 rounded-full border border-gray-400'
			>
				<i className='ri-subtract-line text-gray-400'></i>
			</button>
			<span className='text-base'>{count}</span>
			<button
				onClick={() => setCount(count + 1)}
				className='h-8 w-8 rounded-full border border-gray-400'
			>
				<i className='ri-add-line text-gray-400'></i>
			</button>
		</div>
	);
}
