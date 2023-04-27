import ListingList from '@/components/Listing/ListingList';
import { ListingsListSkeleton } from '@/components/ListingsListSkeleton';
import useWishlists from '@/hooks/useWishlists';

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

	return <ListingList listings={listings} toggleLike={toggleLike} />;
}
