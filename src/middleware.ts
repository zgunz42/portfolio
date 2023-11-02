// eslint-disable-next-line no-restricted-exports
import { withAuth } from 'next-auth/middleware'

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	request => {
		console.log(request.nextauth.token)
	},
	{
		callbacks: {
			authorized: ({ token }) => token?.sub !== undefined
		}
	}
)

export const config = { matcher: ['/products'] }
