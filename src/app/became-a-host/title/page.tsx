export default function TitleStep() {
	return (
		<div className='mx-auto max-w-[630px] px-4 pb-4'>
			<h1 className='mb-4 text-4xl font-semibold'>
				Now, let&apos;s give your house a title
			</h1>
			<h3 className='mb-8 text-lg text-gray-400'>
				Short titles work best. Have fun with it—you can always change it later.
			</h3>
			<textarea
				rows={5}
				className='w-full rounded-lg border border-neutral-950 bg-transparent p-6 dark:border-white'
			/>
		</div>
	);
}
