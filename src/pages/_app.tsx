/* eslint-disable react/jsx-props-no-spreading */
import {
	Hydrate,
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import React from 'react'
import type { ReactElement } from 'react-markdown/lib/react-markdown'
import '../index.css'
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
// import { ModalsProvider } from '@mantine/modals'
// import { Notifications } from '@mantine/notifications'
import CvLocalProvider from 'components/CvLanguageContext'
import LoadingOrError from 'components/LoadingOrError'
import { theme } from 'themes/theme'

export default function MyApp({
	Component,
	pageProps
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
		<QueryClientProvider client={queryClient()}>
			<Hydrate state={pageProps.dehydratedState}>
				<CvLocalProvider>
					<MantineProvider theme={theme}>
						{/* <ModalsProvider> */}
						{/* <Notifications> */}
						{loading ? <LoadingOrError /> : <Component {...pageProps} />}
						{/* </Notifications> */}
						{/* </ModalsProvider> */}
					</MantineProvider>
				</CvLocalProvider>
			</Hydrate>
		</QueryClientProvider>
	)
}
