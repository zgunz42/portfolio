import type { ColorScheme } from '@mantine/core'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Details = lazy(async () => import('pages/Details'))
const Home = lazy(async () => import('pages/Home'))
export default function App(): ReactElement {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
	const toggleColorScheme = (value?: ColorScheme): void =>
		setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'))
	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider theme={{ colorScheme, fontFamily: 'Raleway' }}>
				<ModalsProvider>
					<BrowserRouter>
						<Suspense fallback={<LoadingOrError />}>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path=':fruitName' element={<Details />} />
							</Routes>
						</Suspense>
					</BrowserRouter>
				</ModalsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}
