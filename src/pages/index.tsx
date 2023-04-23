import ListingCategoriesBar from '@/components/ListingCategoriesBar';
import { trpc } from '@/utils/trpc';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
	return (
		<main>
			<Head>
				<title>Airbnb clone</title>
				<meta name='description' content='An airbnb clone app using NexJS 13' />
			</Head>
			<ListingCategoriesBar />
			<ListingsList />
		</main>
	);
}

function ListingsList() {
	const { data: listings, isLoading } = trpc.listings.list.useQuery();

	if (isLoading) return <ListingsListSkeleton />;
	if (!listings)
		return (
			<div className='mt-32 flex items-center justify-center text-2xl font-bold text-gray-400'>
				No Results Found
			</div>
		);

	return (
		<ul className='grid grid-cols-1 gap-x-6 gap-y-10 px-5 pt-5 md:grid-cols-2 md:px-20 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
			{listings.map((listing) => (
				<li key={listing.id} className='space-y-3'>
					<Link href={`/listings/${listing.id}`}>
						<div className='aspect-square'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={listing.imageCSV.split(',')[0] as string}
								alt='image'
								loading='lazy'
								className='h-full rounded-2xl object-cover'
							/>
						</div>
						<div>
							<div className='flex h-6 items-center justify-between leading-3'>
								<span className='truncate font-bold capitalize'>
									{listing.title}
								</span>
								<div className='flex shrink-0 items-center gap-1'>
									<i className='ri-star-fill text-sm'></i>
									<span>4.85 (125)</span>
								</div>
							</div>
							<div className='truncate text-gray-400'>
								{listing.description}
							</div>
							<div className='text-gray-400'>July 30 - Aug 25</div>
							<div className='pt-1'>
								<span className='font-bold'>{listing.price}$ </span>
								night
							</div>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}

function ListingsListSkeleton() {
	return (
		<ul className='grid grid-cols-1 gap-x-6 gap-y-10 px-5 pt-5 md:grid-cols-2 md:px-20 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
			{Array.from({ length: 10 }).map((_, i) => (
				<li key={i} className='animate-pulse space-y-3'>
					<div className='aspect-square rounded-2xl bg-gray-200 dark:bg-gray-800'></div>
					<div className='space-y-1'>
						<div className='flex'>
							<div className='h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800' />
							<div className='ml-auto h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-800' />
						</div>
						<div className='h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800' />
						<div className='h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800' />
						<div className='h-4 w-1/4 rounded bg-gray-200 pt-1 dark:bg-gray-800' />
					</div>
				</li>
			))}
		</ul>
	);
}
