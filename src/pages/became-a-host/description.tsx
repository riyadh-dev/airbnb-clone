export default function DescriptionStep() {
	return (
		<div className='mx-auto max-w-[630px] px-4 pb-4'>
			<h1 className='mb-4 text-4xl font-semibold'>Create your description</h1>
			<h3 className='mb-8 text-lg text-gray-400'>
				Share what makes your place special.
			</h3>
			<textarea
				rows={5}
				className='w-full rounded-lg border border-neutral-950 bg-transparent p-6 dark:border-white'
			/>
		</div>
	);
}
