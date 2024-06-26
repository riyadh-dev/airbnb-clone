import {
	filterCategoryAtom,
	filterOptionsAtom,
	logInSignUpFromTypeAtom,
	logInSignUpModalOpenAtom,
} from '@/jotai/atoms'
import { trpc } from '@/utils/trpc'
import { useAtomValue, useSetAtom } from 'jotai'
import { useSession } from 'next-auth/react'

export default function useListings() {
	const filterOption = useAtomValue(filterOptionsAtom)
	const filterCategory = useAtomValue(filterCategoryAtom)
	const filter = {
		...filterOption,
		category: filterCategory === 'Trending' ? undefined : filterCategory,
	}

	//const { data: listings, isLoading } = trpc.listings.list.useQuery();
	const { data: listings, isLoading } =
		trpc.listings.listFilter.useQuery(filter)

	const utils = trpc.useContext()
	const { mutate } = trpc.listings.toggleLike.useMutation({
		async onMutate(id) {
			await utils.listings.listFilter.cancel()
			const prevListings = utils.listings.listFilter.getData()

			utils.listings.listFilter.setData(filter, (old) =>
				old?.map((listing) =>
					listing.id === id
						? {
								...listing,
								isLiked: !listing.isLiked,
							}
						: listing
				)
			)

			return { prevListings }
		},
		onError(error, variables, context) {
			utils.listings.list.setData(undefined, context?.prevListings)
		},
	})

	const session = useSession()
	const setLoginSignUpFormType = useSetAtom(logInSignUpFromTypeAtom)
	const setLogInSignUpModalOpen = useSetAtom(logInSignUpModalOpenAtom)

	const toggleLike = (id: number) => {
		if (session.status !== 'authenticated') {
			setLoginSignUpFormType('mock-list')
			setLogInSignUpModalOpen(true)
		} else mutate(id)
	}

	return {
		listings,
		isLoading,
		toggleLike,
	}
}
