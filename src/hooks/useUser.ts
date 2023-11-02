import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useUser(lock: boolean) {
	const { data: session, status } = useSession()
	const router = useRouter()
	if (lock && status === 'unauthenticated') {
		void router.replace('/auth')
		return {
			user: undefined
		}
	}
	return {
		user: session?.user
	}
}

export default useUser
