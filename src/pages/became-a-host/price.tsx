import BecameHostNavigation from '@/components/BecameHostNavigation';
import InputErrorMessage from '@/components/Forms/InputErrorMessage';
import useCreateListing from '@/hooks/useCreateListing';
import useZodForm from '@/hooks/useZodForm';
import { listingPriceAtom } from '@/jotai/atoms';
import { classNames } from '@/utils/helpers';
import { useAtom } from 'jotai';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { z } from 'zod';

export default function PriceStep() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		getValues,
	} = useZodForm(z.object({ price: z.number().positive() }));

	const [price, setPrice] = useAtom(listingPriceAtom);
	useEffect(() => {
		setValue('price', price);
	}, [setValue, price]);

	const { mutate, isLoading, isError, isSuccess } = useCreateListing();
	const router = useRouter();
	const next = handleSubmit((data) => {
		setPrice(data.price);
		mutate();
	});

	useEffect(() => {
		if (isSuccess) router.push('/');
	}, [isSuccess, router]);

	const nextButtonText = isLoading
		? 'Loading...'
		: isError
		? 'Something went wrong'
		: 'Submit';

	return (
		<>
			<div className='mx-auto max-w-[630px] px-4 pb-4'>
				<Head>
					<title>Set a price</title>
				</Head>
				<h1 className='mb-4 text-4xl font-semibold'>Now, set your price</h1>
				<h3 className='mb-8 text-lg text-gray-400'>
					You can change it anytime.
				</h3>
				<div className='w-full rounded-xl border bg-gray-50 p-8 dark:bg-neutral-900'>
					<div className='flex items-center gap-x-8'>
						<button
							onClick={() => setValue('price', getValues('price') - 5)}
							className='h-12 w-12 shrink-0 rounded-full border border-gray-400 bg-white dark:bg-neutral-950'
						>
							<i className='ri-subtract-line text-gray-400'></i>
						</button>
						<input
							type='text'
							placeholder='$00'
							disabled={isLoading}
							{...register('price')}
							className={classNames(
								false
									? 'border-rose-600 bg-rose-400/5 text-red-400 placeholder:text-red-400/75 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500'
									: 'border-gray-400 bg-transparent',
								'h-24 w-full rounded-lg border bg-white p-4 text-center font-mono text-5xl font-bold dark:bg-neutral-950'
							)}
						/>

						<button
							onClick={() => setValue('price', getValues('price') + 5)}
							className='h-12 w-12 shrink-0 rounded-full border border-gray-400 bg-white dark:bg-neutral-950'
						>
							<i className='ri-add-line text-gray-400'></i>
						</button>
					</div>
					<div className='mt-2 flex justify-center'>
						<InputErrorMessage message={errors.price?.message} />
					</div>

					<h4 className='mt-3 text-center text-lg'>Per night</h4>
				</div>
			</div>
			<BecameHostNavigation
				back='description'
				next={next}
				nextButtonText={nextButtonText}
				disabled={isLoading}
			/>
		</>
	);
}
