'use client';

import LISTING_CATEGORIES from '@/constants/listing-categories';
import { rentModalOpenAtom } from '@/jotai/atoms';
import { Dialog, Transition } from '@headlessui/react';
import { useAtom, useSetAtom } from 'jotai';
import Image from 'next/image';
import { Fragment } from 'react';

export default function RentModal() {
	const [modalOpen, setModalOpen] = useAtom(rentModalOpenAtom);
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
					<Dialog.Panel className='bg fixed inset-0 m-auto h-fit max-w-lg rounded-xl bg-white dark:bg-neutral-800'>
						<RentModalInner />
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
}

function RentModalInner() {
	const setModalOpen = useSetAtom(rentModalOpenAtom);

	return (
		<div>
			<div className='relative p-6'>
				<span className='absolute flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-gray-700'>
					<i
						onClick={() => setModalOpen(false)}
						className='ri-close-line cursor-pointer text-2xl'
					></i>
				</span>

				<h1 className='text-center text-lg font-bold'>Airbnb you home!</h1>
			</div>
			<div className='border-t' />
			<div className='space-y-5 p-6'>
				<h1 className='text-xl font-bold'>
					Which of these best describes your place?
				</h1>
				<h3 className='text-center text-gray-400'>Choose a category</h3>
				<ul className='-mr-6 grid max-h-96 grid-cols-2 gap-2 overflow-y-scroll pr-2'>
					{LISTING_CATEGORIES.map(({ image, title }, index) => (
						<li key={index} className='space-y-4 rounded-lg border-2 p-4'>
							<Image
								alt='icon'
								src={image}
								className='aspect-square h-6 w-6 dark:invert'
							/>
							<div className='whitespace-nowrap text-xs font-bold'>{title}</div>
						</li>
					))}
				</ul>
				<button className='h-12 w-full rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] font-bold text-white'>
					Next
				</button>
			</div>
		</div>
	);
}
