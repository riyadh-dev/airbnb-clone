import useZodForm from '@/hooks/useZodForm';
import { FilterModalOpenAtom, filterOptionsAtom } from '@/jotai/atoms';
import { classNames } from '@/utils/helpers';
import { listingFilterSchema } from '@/zod/listings';
import { Dialog, Transition } from '@headlessui/react';
import { useAtom, useSetAtom } from 'jotai';
import { Fragment, useEffect, useState } from 'react';
import CustomInput from '../Input/CustomInput';

function isEmptyString(str: string) {
	return !str || str.length === 0;
}

export default function FilterModal() {
	const [modalOpen, setModalOpen] = useAtom(FilterModalOpenAtom);

	return (
		<Transition show={modalOpen} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-40'
				onClose={() => setModalOpen(false)}
			>
				<Transition.Child
					enter='duration-200'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
					className='fixed inset-0 bg-black/75'
					aria-hidden='true'
				/>

				<Transition.Child
					enter='duration-300'
					enterFrom='translate-y-[calc(50vh+50%)]'
					enterTo='translate-y-0'
					leave='duration-300'
					leaveFrom='translate-y-0'
					leaveTo='translate-y-[calc(50vh+50%)]'
					as={Fragment}
				>
					<Dialog.Panel className='fixed inset-0 mx-2 my-auto h-fit max-w-2xl rounded-xl bg-white dark:bg-neutral-800 md:mx-auto'>
						<FilterModalInner />
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
}

function FilterModalInner() {
	const setModalOpen = useSetAtom(FilterModalOpenAtom);
	const [filterOptions, setFilterOptions] = useAtom(filterOptionsAtom);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors: formErrors },
	} = useZodForm(
		listingFilterSchema
			.pick({
				maxPrice: true,
				minPrice: true,
			})
			.refine(
				(data) =>
					(data.minPrice && data.maxPrice) ||
					(!data.minPrice && !data.maxPrice),
				{
					message: 'min and max must be provided together',
					path: ['minPrice'],
				}
			)
			.refine(
				(data) =>
					data.minPrice && data.maxPrice
						? data.minPrice <= data.maxPrice
						: true,
				{
					message: 'min must be less than max',
					path: ['minPrice'],
				}
			),
		{
			defaultValues: {
				maxPrice: filterOptions.maxPrice,
				minPrice: filterOptions.minPrice,
			},
		}
	);

	const [bedCount, setBedCount] = useState<number | undefined>(undefined);
	const [bathroomCount, setBathroomCount] = useState<number | undefined>(
		undefined
	);

	useEffect(() => {
		if (filterOptions.bedCount) setBedCount(filterOptions.bedCount);
		if (filterOptions.bathroomCount)
			setBathroomCount(filterOptions.bathroomCount);
	}, [
		filterOptions.bathroomCount,
		filterOptions.bedCount,
		filterOptions.minPrice,
	]);

	const onSubmit = handleSubmit(({ maxPrice, minPrice }) => {
		setFilterOptions({
			...filterOptions,
			maxPrice,
			minPrice,
			bedCount,
			bathroomCount,
		});
		setModalOpen(false);
	});

	const onClear = () => {
		setValue('maxPrice', undefined);
		setValue('minPrice', undefined);
		setBedCount(undefined);
		setBathroomCount(undefined);
	};

	return (
		<form onSubmit={onSubmit}>
			<div className='relative p-6'>
				<span className='absolute flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-gray-700'>
					<i
						onClick={() => setModalOpen(false)}
						className='ri-close-line cursor-pointer text-2xl'
					></i>
				</span>
				<h1 className='text-center text-lg font-bold'>Filters</h1>
			</div>
			<div className='border-t' />
			<div className='space-y-5 p-6'>
				<h1 className='text-xl font-bold'>Price Range ($)</h1>
				<div className='flex gap-x-6 [&>*]:grow'>
					<CustomInput
						inputProps={{
							type: 'number',
							placeholder: 'Minimum',
							...register('minPrice', {
								setValueAs: (value) =>
									isEmptyString(value) ? undefined : Number(value),
							}),
						}}
						errorMessage={formErrors.minPrice?.message}
					/>
					<div className='max-w-[16px] self-center border-t-2' />
					<CustomInput
						inputProps={{
							type: 'number',
							placeholder: 'Maximum',
							...register('maxPrice', {
								setValueAs: (value) =>
									isEmptyString(value) ? undefined : Number(value),
							}),
						}}
						errorMessage={formErrors.maxPrice?.message}
					/>
				</div>
				<div className='border-t' />
				<h1 className='text-xl font-bold'>Beds and bathrooms</h1>
				<h3 className='text-lg'>Beds </h3>
				<div className='flex flex-wrap items-center gap-2'>
					<button
						type='button'
						onClick={() => setBedCount(undefined)}
						className={classNames(
							bedCount === undefined
								? 'bg-slate-950 text-white transition-colors duration-300 dark:bg-white dark:text-black'
								: '',
							'h-10 rounded-full border px-6'
						)}
					>
						Any
					</button>
					{Array.from({ length: 8 }, (_, i) => (
						<button
							type='button'
							onClick={() => setBedCount(i + 1)}
							key={i}
							className={classNames(
								bedCount === i + 1
									? 'bg-slate-950 text-white transition-colors duration-300 dark:bg-white dark:text-black'
									: '',
								'h-10 rounded-full border px-6'
							)}
						>
							{i + 1}
						</button>
					))}
				</div>

				<h3 className='text-lg'>Bathrooms</h3>
				<div className='flex flex-wrap items-center gap-2'>
					<button
						type='button'
						onClick={() => setBathroomCount(undefined)}
						className={classNames(
							bathroomCount === undefined
								? 'bg-slate-950 text-white transition-colors duration-300 dark:bg-white dark:text-black'
								: '',
							'h-10 rounded-full border px-6'
						)}
					>
						Any
					</button>
					{Array.from({ length: 8 }, (_, i) => (
						<button
							type='button'
							onClick={() => setBathroomCount(i + 1)}
							key={i}
							className={classNames(
								bathroomCount === i + 1
									? 'bg-slate-950 text-white transition-colors duration-300 dark:bg-white dark:text-black'
									: '',
								'h-10 rounded-full border px-6'
							)}
						>
							{i + 1}
						</button>
					))}
				</div>
			</div>
			<div className='border-t' />
			<div className='flex justify-between p-6'>
				<button
					onClick={onClear}
					type='button'
					className='h-12 rounded-lg border px-4 font-bold'
				>
					Clear
				</button>
				<button
					type='submit'
					className='h-12 rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] px-4 font-bold text-white'
				>
					Show places
				</button>
			</div>
		</form>
	);
}
