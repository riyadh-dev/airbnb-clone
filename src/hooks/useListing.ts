import {
	logInSignUpFromTypeAtom,
	logInSignUpModalOpenAtom,
} from '@/jotai/atoms'
import { trpc } from '@/utils/trpc'
import { useSetAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function useListing() {
	const router = useRouter()
	const id = Number(router.query.id)

	const { data, isLoading: isLoadingListing } =
		trpc.listings.getById.useQuery(id, { enabled: Boolean(id) })
	const { data: user, isLoading: isLoadingUser } =
		trpc.users.getById.useQuery(data?.ownerId as number, {
			enabled: Boolean(data?.ownerId),
		})

	const utils = trpc.useContext()
	const { mutate } = trpc.listings.toggleLike.useMutation({
		async onMutate(id) {
			await utils.listings.getById.cancel()
			const prevListing = utils.listings.getById.getData(id)

			utils.listings.getById.setData(id, (old) =>
				old ? { ...old, isLiked: !old.isLiked } : undefined
			)

			return { prevListing }
		},
		onError(error, id, context) {
			utils.listings.getById.setData(id, context?.prevListing)
		},
	})

	const session = useSession()
	const setLoginSignUpFormType = useSetAtom(logInSignUpFromTypeAtom)
	const setLogInSignUpModalOpen = useSetAtom(logInSignUpModalOpenAtom)

	const toggleLike = () => {
		if (session.status !== 'authenticated') {
			setLoginSignUpFormType('mock-list')
			setLogInSignUpModalOpen(true)
		} else mutate(data?.id as number)
	}

	return {
		isLoading: isLoadingListing || isLoadingUser,
		listing: data
			? {
					...data,
					isLiked: data.isLiked,
					isReserved: data.isReserved,
				}
			: null,
		user,
		toggleLike,
	}
}
