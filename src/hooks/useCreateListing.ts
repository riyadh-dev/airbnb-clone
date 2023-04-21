import {
	listingCategoryAtom,
	listingDescriptionAtom,
	listingFloorPlanAtom,
	listingImagesAtom,
	listingLocationAtom,
	listingPriceAtom,
	listingTitleAtom,
} from '@/jotai/atoms';
import { trpc } from '@/utils/trpc';
import { useAtomValue } from 'jotai';

export default function useCreateListing() {
	const { mutate, ...rest } = trpc.createListing.useMutation();
	const category = useAtomValue(listingCategoryAtom);
	const location = useAtomValue(listingLocationAtom);
	const images = useAtomValue(listingImagesAtom);
	const price = useAtomValue(listingPriceAtom);
	const description = useAtomValue(listingDescriptionAtom);
	const title = useAtomValue(listingTitleAtom);
	const floorPlan = useAtomValue(listingFloorPlanAtom);

	return {
		...rest,
		mutate: () =>
			mutate({
				category,
				...location,
				...floorPlan,
				imagesCSV: images.map((image) => image.value).join(','),
				price,
				description,
				title,
			}),
	};
}
