import AddressForm from '@/components/Forms/AddressForm';

export default function LocationStep() {
	return (
		<div className='mx-auto max-w-[630px] space-y-4 px-4 pb-4'>
			<h1 className='text-4xl font-semibold'>
				Where&apos;s your place located?
			</h1>
			<h3 className='text-lg text-gray-400'>
				Your address is only shared with guests after they’ve made a
				reservation.
			</h3>
			<AddressForm />
		</div>
	);
}
