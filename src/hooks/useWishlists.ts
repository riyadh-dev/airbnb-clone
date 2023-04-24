import { trpc } from '@/utils/trpc';

export default function useWishlists() {
	const { data: listings, isLoading } = trpc.listings.listLiked.useQuery();
	const utils = trpc.useContext();

	const { mutate: toggleLike } = trpc.listings.unlike.useMutation({
		async onMutate(id) {
			await utils.listings.listLiked.cancel();
			const prevListings = utils.listings.listLiked.getData();

			utils.listings.listLiked.setData(undefined, (old) =>
				old?.filter((listing) => listing.id !== id)
			);

			return { prevListings };
		},
		onError(error, variables, context) {
			utils.listings.listLiked.setData(undefined, context?.prevListings);
		},
	});

	return {
		listings,
		isLoading,
		toggleLike,
	};
}
