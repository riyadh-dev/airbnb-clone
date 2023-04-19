export default function FloorPlanStep() {
	return (
		<div className='mx-auto max-w-[630px] px-4 pb-4'>
			<h1 className='mb-4 text-4xl font-semibold'>
				Share some basics about your place
			</h1>
			<h3 className='text-lg text-gray-400'>
				You&apos;ll add more details later, like bed types.
			</h3>
			<div className='divide-y pt-8'>
				<div className='flex justify-between py-5 text-lg'>
					<span>Guests</span>
					<FloorPlanStepInput count={1} />
				</div>
				<div className='flex justify-between py-5 text-lg'>
					<span>Bedrooms</span>
					<FloorPlanStepInput count={1} />
				</div>
				<div className='flex justify-between py-5 text-lg'>
					<span>Beds</span>
					<FloorPlanStepInput count={1} />
				</div>
				<div className='flex justify-between py-5 text-lg'>
					<span>Bathrooms</span>
					<FloorPlanStepInput count={1} />
				</div>
			</div>
		</div>
	);
}

function FloorPlanStepInput({
	sub,
	count,
	add,
}: {
	sub?: () => void;
	count: number;
	add?: () => void;
}) {
	return (
		<div className='flex items-center gap-x-4'>
			<button className='h-8 w-8 rounded-full border border-gray-400'>
				<i className='ri-subtract-line text-gray-400'></i>
			</button>
			<span className='text-base'>{count}</span>
			<button className='h-8 w-8 rounded-full border border-gray-400'>
				<i className='ri-add-line text-gray-400'></i>
			</button>
		</div>
	);
}
