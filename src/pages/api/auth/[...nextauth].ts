/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-object-has-own */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import Joi from 'joi'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AuthOptions, Session, User } from 'next-auth'
import NextAuth from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import {
	comparePassword,
	createUser,
	getUserByEmail,
	hashPassword
} from 'serverUtils'

interface RegisterData {
	name: string
	csrfToken: string
	email: string
	password: string
	terms: boolean
}

const registerSchema = Joi.object<RegisterData>({
	name: Joi.string().required(),
	csrfToken: Joi.string(),
	email: Joi.string().email(),
	password: Joi.string().pattern(/^[\dA-Za-z]{3,30}$/),
	terms: Joi.boolean().required()
})

async function register(request: NextApiRequest, response: NextApiResponse) {
	let data = await request.body

	if (typeof data !== 'object' && typeof data === 'string') {
		data = JSON.parse(data)
	}

	const { error } = registerSchema.validate(data)

	if (error) {
		response.status(400).json({ error: error.message })
	} else {
		const { terms, csrfToken, ...contentData } = data as RegisterData

		if (!terms) {
			response.status(400).json({ error: 'Please accept terms and conditions' })
		}

		contentData.password = hashPassword(contentData.password)
		const user = await getUserByEmail(contentData.email)

		if (user) {
			response.status(400).json({ error: 'User already exists' })
		} else {
			try {
				const userIn = await createUser(contentData)

				response.status(201).json({
					id: userIn.id.toString(),
					name: userIn.name,
					email: userIn.email
				})
			} catch (error_) {
				response.status(400).json({ error: (error_ as Error).message })
			}
		}
	}
}

const callbacks: ArgumentsType<typeof NextAuth>['2']['callbacks'] = {
	async session({ session, token }: { session: Session; token: DefaultJWT }) {
		const mSession = { ...session }
		mSession.user = {}
		mSession.user.email = token.email ?? ''
		mSession.user.name = token.name ?? ''
		mSession.user.image = token.picture ?? ''
		return mSession
	}
}

const providers: ArgumentsType<typeof NextAuth>['2']['providers'] = [
	CredentialsProvider({
		// The name to display on the sign in form (e.g. "Sign in with...")
		name: 'Credentials',
		credentials: {
			email: {
				label: 'Email',
				type: 'text',
				placeholder: 'sample@email.com'
			},
			password: { label: 'Password', type: 'password' }
		},
		async authorize(credentials, request_): Promise<User> {
			// Add logic here to look up the user from the credentials supplied

			if (credentials?.email) {
				const user = await getUserByEmail(credentials.email)

				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (user) {
					if (!user.password) {
						throw new Error('Invalid credentials')
					}

					if (comparePassword(credentials.password, user.password)) {
						// Any object returned will be saved in `user` property of the JWT
						return {
							id: user.id.toString(),
							name: user.name,
							email: user.email,
							image: user.image
						}
					}
				}
			}
			// If you return null then an error will be displayed advising the user to check their details.
			throw new Error('Invalid credentials')
		}
	})
]

export const authOptions: AuthOptions = {
	providers,
	pages: {
		signIn: '/auth',
		error: '/auth'
	},
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks
}

export default async function auth(
	request: NextApiRequest,
	response: NextApiResponse
) {
	if (
		request.url?.includes('/api/auth/register') &&
		request.method === 'POST'
	) {
		return register(request, response)
	}

	// Hide Sign-In with Ethereum from default sign page
	// if (isDefaultSigninPage && Array.isArray(providers)) {
	// 	providers.pop()
	// }
	const jwtSecret = process.env.NEXTAUTH_SECRET

	if (jwtSecret) {
		const result = await NextAuth(request, response, authOptions)

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return result
	}
	throw new Error('Please set NEXTAUTH_SECRET')
}
