import PhotosForm from '@/components/Forms/PhotosForm';

export default function PhotosStep() {
	return (
		<div className='mx-auto max-w-[630px] px-4 pb-4'>
			<h1 className='mb-4 text-4xl font-semibold'>
				Ta-da! How does this look?
			</h1>
			<h3 className='text-lg text-gray-400'>Add photos of your place</h3>
			<PhotosForm />
		</div>
	);
}
