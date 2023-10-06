import type { ColorScheme } from '@mantine/core'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import type { ReactElement, ReactNode } from 'react'
import { useState } from 'react'
import CvLocalProvider from './components/CvLanguageContext'

interface AppProperties {
	children: ReactElement | ReactNode
	isLoading: boolean
	loadElement: ReactElement
}

export default function App({
	children,
	loadElement,
	isLoading
}: AppProperties): ReactElement {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
	const toggleColorScheme = (value?: ColorScheme): void =>
		setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'))

	let displayElement = children

	if (isLoading) {
		displayElement = loadElement
	}

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider theme={{ colorScheme, fontFamily: 'Raleway' }}>
				<CvLocalProvider>
					<ModalsProvider>
						<NotificationsProvider>{displayElement}</NotificationsProvider>
					</ModalsProvider>
				</CvLocalProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}
