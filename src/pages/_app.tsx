'use client'

/* eslint-disable react/jsx-props-no-spreading */
import {
	Hydrate,
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import React from 'react'
import type { ReactElement } from 'react-markdown/lib/react-markdown'
import '../index.css'
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/carousel/styles.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import CvLocalProvider from 'components/CvLanguageContext'
import CvMantineRegistry from 'components/CvMantineRegistry'
import LoadingOrError from 'components/LoadingOrError'

export default function MyApp({
	Component,
	pageProps: { session, ...pageProperties }
}: AppProps): ReactElement {
	const queryClient = React.useMemo(
		() => () => {
			const MAX_RETRIES = 1
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
			const mQueryClient = new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: Number.POSITIVE_INFINITY,
						retry: MAX_RETRIES
					}
				}
			})

			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return mQueryClient
		},
		[]
	)

	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		const inRouter = (): void => {
			console.log('routeChangeStart')
			setLoading(true)
		}

		const outRouter = (): void => {
			console.log('routeChangeComplete')
			setLoading(false)
		}

		Router.events.on('routeChangeStart', inRouter)
		Router.events.on('routeChangeComplete', outRouter)

		return () => {
			Router.events.off('routeChangeStart', inRouter)
			Router.events.off('routeChangeComplete', outRouter)
		}
	})

	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient()}>
				<Hydrate state={pageProperties.dehydratedState}>
					<CvLocalProvider>
						<CvMantineRegistry>
							{loading ? <LoadingOrError /> : <Component {...pageProperties} />}
						</CvMantineRegistry>
					</CvLocalProvider>
				</Hydrate>
			</QueryClientProvider>
		</SessionProvider>
	)
}
