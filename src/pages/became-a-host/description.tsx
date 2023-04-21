import BecameHostNavigation from '@/components/BecameHostNavigation';
import InputErrorMessage from '@/components/Forms/InputErrorMessage';
import useZodForm from '@/hooks/useZodForm';
import { listingDescriptionAtom } from '@/jotai/atoms';
import { useAtom } from 'jotai';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { z } from 'zod';

export default function DescriptionStep() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useZodForm(z.object({ description: z.string().nonempty() }));

	const [description, setDescription] = useAtom(listingDescriptionAtom);
	useEffect(() => {
		setValue('description', description);
	}, [setValue, description]);

	const router = useRouter();
	const next = handleSubmit((data) => {
		setDescription(data.description);
		router.push('/became-a-host/price');
	});
	return (
		<>
			<div className='mx-auto w-full max-w-[630px] px-4 pb-4'>
				<Head>
					<title>Create your description</title>
				</Head>
				<h1 className='mb-4 text-4xl font-semibold'>Create your description</h1>
				<h3 className='mb-8 text-lg text-gray-400'>
					Share what makes your place special.
				</h3>
				<textarea
					rows={5}
					{...register('description')}
					className='w-full rounded-lg border border-neutral-950 bg-transparent p-6 dark:border-white'
				/>
				<InputErrorMessage message={errors.description?.message} />
			</div>
			<BecameHostNavigation back='title' next={next} />
		</>
	);
}
