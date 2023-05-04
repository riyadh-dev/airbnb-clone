import { FilterModalOpenAtom } from '@/jotai/atoms';
import { Dialog, Transition } from '@headlessui/react';
import { useAtom, useSetAtom } from 'jotai';
import { Fragment } from 'react';
import CustomInput from '../Input/CustomInput';

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
					<Dialog.Panel className='fixed inset-0 m-auto h-fit max-w-2xl rounded-xl bg-white dark:bg-neutral-800'>
						<FilterModalInner />
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
}

function FilterModalInner() {
	const setModalOpen = useSetAtom(FilterModalOpenAtom);

	return (
		<div>
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
				<div className='flex items-center gap-x-6 [&>*]:grow'>
					<CustomInput
						inputProps={{
							type: 'number',
							placeholder: 'Minimum',
						}}
					/>
					<div className='max-w-[16px] border-t-2' />
					<CustomInput
						inputProps={{
							type: 'number',
							placeholder: 'Maximum',
						}}
					/>
				</div>
				<div className='border-t' />
				<h1 className='text-xl font-bold'>Beds and bathrooms</h1>
				<h3 className='text-lg'>Beds </h3>
				<div className='flex items-center gap-x-2'>
					<button className='h-10 rounded-full border bg-black px-6 text-white'>
						Any
					</button>
					{Array.from({ length: 7 }, (_, i) => (
						<button key={i} className='h-10 rounded-full border px-6'>
							{i + 1}
						</button>
					))}
					<button className='h-10 rounded-full border px-6'>8+</button>
				</div>

				<h3 className='text-lg'>Bathrooms</h3>
				<div className='flex items-center gap-x-2'>
					<button className='h-10 rounded-full border bg-black px-6 text-white'>
						Any
					</button>
					{Array.from({ length: 7 }, (_, i) => (
						<button key={i} className='h-10 rounded-full border px-6'>
							{i + 1}
						</button>
					))}
					<button className='h-10 rounded-full border px-6'>8+</button>
				</div>
			</div>
			<div className='border-t' />
			<div className='flex justify-between p-6'>
				<button type='submit' className='h-12 rounded-lg border px-4 font-bold'>
					Clear
				</button>
				<button
					type='submit'
					className='h-12 rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] px-4 font-bold text-white'
				>
					Show places
				</button>
			</div>
		</div>
	);
}
