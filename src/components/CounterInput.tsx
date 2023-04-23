export default function CounterInput({
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
