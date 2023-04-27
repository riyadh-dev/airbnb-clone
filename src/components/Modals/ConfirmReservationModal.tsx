import {
	confirmReservationModalOpenAtom,
	reservationInputAtom,
	reservationListingAtom,
} from '@/jotai/atoms';
import { trpc } from '@/utils/trpc';
import { Dialog, Transition } from '@headlessui/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { Fragment } from 'react';

export default function ConfirmReservationModal() {
	const [modalOpen, setModalOpen] = useAtom(confirmReservationModalOpenAtom);

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
					<Dialog.Panel className='bg fixed inset-0 m-auto h-fit max-w-xl rounded-xl bg-white dark:bg-neutral-800'>
						<ConfirmReservationModalInner />
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
}

function ConfirmReservationModalInner() {
	const setModalOpen = useSetAtom(confirmReservationModalOpenAtom);
	const listing = useAtomValue(reservationListingAtom);
	const reservationInput = useAtomValue(reservationInputAtom);
	const { mutate, isLoading, isError } = trpc.reservations.create.useMutation();

	if (!listing || !reservationInput) return null;

	const onConfirm = () => {
		mutate(reservationInput, {
			onSuccess: () => setModalOpen(false),
		});
	};

	return (
		<div className='space-y-6 p-6'>
			<div className='flex gap-x-3'>
				<Image
					width={300}
					height={300}
					src={listing.imagesCSV.split(',')[0]}
					alt='Image'
					className='h-28 w-28 rounded-lg object-cover'
				/>
				<div className='flex flex-col text-sm capitalize'>
					<div>{listing.title}</div>
					<div className='text-base'>
						{listing.description.substring(0, 100)}...
					</div>
					<div className='mt-auto'>4.98 (5 reviews)</div>
				</div>
			</div>
			<div className='border-t' />
			<div className='space-y-4'>
				<h1 className='text-2xl font-semibold'>Your trip</h1>
				<div>
					<h2 className='font-semibold'>Dates</h2>
					<h2>
						{reservationInput.startDate.toLocaleDateString()} -{' '}
						{reservationInput.endDate.toLocaleDateString()}
					</h2>
				</div>
				<div>
					<h2 className='font-semibold'>Guests</h2>
					<h2 className='capitalize'>
						{reservationInput.adultGuestCount > 0 &&
							`${reservationInput.adultGuestCount} adults` + ' '}
						{reservationInput.childGuestCount > 0 &&
							`${reservationInput.childGuestCount} children` + ' '}
						{reservationInput.infantGuestCount > 0 &&
							`${reservationInput.infantGuestCount} infants` + ' '}
						{reservationInput.petCount > 0 &&
							`${reservationInput.petCount} pets`}
					</h2>
				</div>
				<div className='border-t' />

				<div className='flex justify-between'>
					<button
						onClick={() => setModalOpen(false)}
						className='h-14 rounded-lg border px-12 text-xl font-bold text-white'
					>
						Cancel
					</button>
					<button
						disabled={isLoading}
						onClick={onConfirm}
						className='h-14 rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] px-12 text-center text-xl font-bold text-white'
					>
						{isLoading
							? 'Submitting...'
							: isError
							? 'Error'
							: 'Confirm And Pay'}
					</button>
				</div>
			</div>
		</div>
	);
}
