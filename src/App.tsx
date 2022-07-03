import type { ColorScheme } from '@mantine/core'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import LoadingOrError from 'components/LoadingOrError'
import { Languages } from 'constant'
import enLanguages from 'data/langs/en-US/languages.json'
import idLanguages from 'data/langs/id-ID/languages.json'
import type { ReactElement } from 'react'
import { lazy, Suspense, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Home = lazy(async () => import('pages/Home'))
const About = lazy(async () => import('pages/About'))
const Project = lazy(async () => import('pages/Project'))
const ProjectDetail = lazy(async () => import('pages/ProjectDetail'))
const Blog = lazy(async () => import('pages/Blog'))
const BlogArticle = lazy(async () => import('pages/BlogArticle'))
const Contact = lazy(async () => import('pages/Contact'))
const CvDownload = lazy(async () => import('pages/CvDownload'))

function loadLocalMessages(locale: string): Record<string, string> {
	let messages: Record<string, string> = {}
	switch (locale) {
		case Languages[0]:
			messages = enLanguages
			break
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		case Languages[1]:
			messages = idLanguages
			break
		default:
			messages = enLanguages
			break
	}
	return messages
}

export default function App(): ReactElement {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
	const toggleColorScheme = (value?: ColorScheme): void =>
		setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'))
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [locale, setLocale] = useState<string>(Languages['1'])

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider theme={{ colorScheme, fontFamily: 'Raleway' }}>
				<IntlProvider messages={loadLocalMessages(locale)} locale={locale}>
					<ModalsProvider>
						<NotificationsProvider>
							<BrowserRouter>
								<Suspense fallback={<LoadingOrError />}>
									<Routes>
										<Route path='/' element={<Home />} />
										<Route path='/about' element={<About />} />
										<Route path='/projects' element={<Project />} />
										<Route
											path='/projects/:projectSlug'
											element={<ProjectDetail />}
										/>
										<Route path='/blogs' element={<Blog />} />
										<Route
											path='/blogs/:articleSlug'
											element={<BlogArticle />}
										/>
										<Route path='/download-cv' element={<CvDownload />} />
										<Route path='/contact' element={<Contact />} />
									</Routes>
								</Suspense>
							</BrowserRouter>
						</NotificationsProvider>
					</ModalsProvider>
				</IntlProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}
