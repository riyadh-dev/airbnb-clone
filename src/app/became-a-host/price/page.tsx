import PriceForm from '@/components/Forms/PriceForm';

export default function DescriptionStep() {
	return (
		<div className='mx-auto max-w-[630px] px-4 pb-4'>
			<h1 className='mb-4 text-4xl font-semibold'>Now, set your price</h1>
			<h3 className='mb-8 text-lg text-gray-400'>You can change it anytime.</h3>
			<PriceForm />
		</div>
	);
}
