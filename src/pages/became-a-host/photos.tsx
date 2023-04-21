import BecameHostNavigation from '@/components/BecameHostNavigation';
import CustomInput from '@/components/Forms/CustomInput';
import useZodForm from '@/hooks/useZodForm';
import { listingImagesAtom } from '@/jotai/atoms';
import { useAtom } from 'jotai';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { z } from 'zod';

const zodSchema = z.object({
	images: z.array(z.object({ value: z.string().url().nonempty() })).min(1),
});

export default function PhotosStep() {
	const [images, setImages] = useAtom(listingImagesAtom);
	const {
		control,
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useZodForm(zodSchema, { defaultValues: { images } });
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'images',
	});

	useEffect(() => {
		setValue('images', images);
	}, [images, setValue]);

	const router = useRouter();
	const next = handleSubmit((data) => {
		setImages(data.images);
		router.push('/became-a-host/title');
	});

	return (
		<>
			<div className='mx-auto max-w-[630px] px-4 pb-4'>
				<Head>
					<title>Add photos</title>
				</Head>
				<h1 className='mb-4 text-4xl font-semibold'>
					Ta-da! How does this look?
				</h1>
				<h3 className='text-lg text-gray-400'>Add photos of your place</h3>
				<div className='space-y-3 pt-8'>
					{fields.map((field, index) => (
						<div key={field.id} className='flex gap-x-4'>
							<div className='grow'>
								<CustomInput
									inputProps={{
										type: 'text',
										placeholder: `Photo #${index + 1}`,
										...register(`images.${index}.value`),
									}}
									errorMessage={errors.images?.[index]?.value?.message}
								/>
							</div>

							<button
								onClick={() => remove(index)}
								className='h-14 w-14 rounded-lg bg-primary'
							>
								<i className='ri-subtract-line text-xl text-white'></i>
							</button>
						</div>
					))}
					<button
						onClick={() => append({ value: '' })}
						className='mx-auto h-14 w-full rounded-lg border-2 border-dashed border-gray-400'
					>
						<i className='ri-add-line text-xl text-gray-400'></i>
					</button>
				</div>
			</div>
			<BecameHostNavigation back='floor-plan' next={next} />
		</>
	);
}
