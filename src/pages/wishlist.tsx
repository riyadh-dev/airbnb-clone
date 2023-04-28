import ListingList from '@/components/Listing/ListingList';
import { ListingsListSkeleton } from '@/components/ListingsListSkeleton';
import useWishlists from '@/hooks/useWishlists';
import Head from 'next/head';

type TProcedures = 'like' | 'unlike';

export default function Wishlist() {
	const { isLoading, listings, toggleLike } = useWishlists();

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
				<title>Wishlist</title>
			</Head>
			<h1 className='mt-6 text-center text-4xl font-semibold'>Wishlist</h1>
			<ListingList listings={listings} toggleLike={toggleLike} />;
		</main>
	);
}
