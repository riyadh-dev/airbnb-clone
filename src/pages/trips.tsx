import { ListingsListSkeleton } from '@/components/ListingsListSkeleton';
import { trpc } from '@/utils/trpc';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function trips() {
	const { data, isLoading } = trpc.reservations.listWithListing.useQuery();

	const utils = trpc.useContext();
	const { mutate, isLoading: isDeleting } =
		trpc.reservations.delete.useMutation({
			async onMutate(reservationId) {
				await utils.listings.getById.cancel();
				const prevData = utils.reservations.listWithListing.getData();

				utils.reservations.listWithListing.setData(undefined, (old) =>
					old?.filter((item) => item.reservation.id !== reservationId)
				);

				return { prevData };
			},
			onError(error, variables, context) {
				utils.reservations.listWithListing.setData(
					undefined,
					context?.prevData
				);
			},
		});

	if (isLoading) return <ListingsListSkeleton />;
	if (!data?.length)
		return (
			<div className='mt-32 flex items-center justify-center text-2xl font-bold text-gray-400'>
				No Results Found
			</div>
		);

	return (
		<main>
			<Head>
				<title>Trips</title>
			</Head>
			<ul className='grid grid-cols-1 gap-x-6 gap-y-10 px-5 pt-5 md:grid-cols-2 md:px-20 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
				{data.map(({ listing, reservation }) => (
					<li key={reservation.id} className='relative'>
						<Link href={`/listings/${listing.id}`}>
							<div className='aspect-square'>
								<Image
									src={listing.imagesCSV.split(',')[0] as string}
									alt='image'
									loading='lazy'
									quality={100}
									width={400}
									height={400}
									className='h-full w-full rounded-2xl object-cover'
								/>
							</div>
						</Link>
						<div className='mt-2 flex flex-wrap gap-x-1'>
							<span className='font-semibold'>{listing.state},</span>
							<span className='font-semibold'>{listing.country}</span>
						</div>

						<div className='text-gray-400'>
							{reservation.startDate.toLocaleDateString()} -{' '}
							{reservation.endDate.toLocaleDateString()}
						</div>

						<div className='font-bold'>${reservation.totalCost}</div>

						<button
							onClick={() => mutate(reservation.id)}
							disabled={isDeleting}
							className='z- mt-2 h-8 w-full rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] font-bold text-white'
						>
							{isDeleting ? 'Canceling...' : 'Cancel Reservation'}
						</button>
					</li>
				))}
			</ul>
		</main>
	);
}
