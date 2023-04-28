import ListingList from '@/components/Listing/ListingList';
import { ListingsListSkeleton } from '@/components/ListingsListSkeleton';
import { trpc } from '@/utils/trpc';
import Head from 'next/head';

export default function PropertiesPage() {
	const { data: listings, isLoading } =
		trpc.listings.listByCurrentUser.useQuery();

	if (isLoading) return <ListingsListSkeleton />;
	if (!listings)
		return (
			<div className='mt-32 flex items-center justify-center text-2xl font-bold text-gray-400'>
				No Results Found
			</div>
		);

	return (
		<main>
			<Head>
				<title>Properties</title>
			</Head>
			<h1 className='mt-6 text-center text-4xl font-semibold'>Your Listings</h1>
			<ListingList listings={listings} />
		</main>
	);
}
