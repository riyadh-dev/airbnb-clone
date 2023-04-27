import BecameHostNavigation from '@/components/BecameHostNavigation';
import InputErrorMessage from '@/components/Input/InputErrorMessage';
import useZodForm from '@/hooks/useZodForm';
import { listingTitleAtom } from '@/jotai/atoms';
import { useAtom } from 'jotai';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { z } from 'zod';

export default function TitleStep() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useZodForm(z.object({ title: z.string().nonempty() }));

	const [title, setTitle] = useAtom(listingTitleAtom);
	useEffect(() => {
		setValue('title', title);
	}, [setValue, title]);

	const router = useRouter();
	const next = handleSubmit((data) => {
		setTitle(data.title);
		router.push('/became-a-host/description');
	});
	return (
		<>
			<div className='mx-auto max-w-[630px] px-4 pb-4'>
				<Head>
					<title>Choose a title</title>
				</Head>
				<h1 className='mb-4 text-4xl font-semibold'>
					Now, let&apos;s give your house a title
				</h1>
				<h3 className='mb-8 text-lg text-gray-400'>
					Short titles work best. Have fun with it—you can always change it
					later.
				</h3>
				<textarea
					rows={5}
					{...register('title')}
					className='w-full rounded-lg border border-neutral-950 bg-transparent p-6 dark:border-white'
				/>
				<InputErrorMessage message={errors.title?.message} />
			</div>
			<BecameHostNavigation back='photos' next={next} />
		</>
	);
}
