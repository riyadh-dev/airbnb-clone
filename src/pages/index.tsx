import ListingList from '@/components/Listing/ListingList';
import ListingCategoriesBar from '@/components/ListingCategoriesBar';
import FilterModal from '@/components/Modals/FilterModal';
import useListings from '@/hooks/useListings';
import Head from 'next/head';
import { ListingsListSkeleton } from '../components/ListingsListSkeleton';

export default function Home() {
	return (
		<main>
			<Head>
				<title>Airbnb clone</title>
				<meta name='description' content='An airbnb clone app using NexJS 13' />
			</Head>
			<ListingCategoriesBar />
			<HomeList />
			<FilterModal />
		</main>
	);
}

function HomeList() {
	const { isLoading, listings, toggleLike } = useListings();

	if (isLoading) return <ListingsListSkeleton />;
	if (!listings || listings.length === 0)
		return (
			<div className='mt-32 flex items-center justify-center text-2xl font-bold text-gray-400'>
				No Results Found
			</div>
		);

	return <ListingList listings={listings} toggleLike={toggleLike} />;
}
