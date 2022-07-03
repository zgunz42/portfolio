import type { ColorScheme } from '@mantine/core'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CvLocalProvider from './components/CvLanguageContext'

const Home = lazy(async () => import('pages/Home'))
const About = lazy(async () => import('pages/About'))
const Project = lazy(async () => import('pages/Project'))
const ProjectDetail = lazy(async () => import('pages/ProjectDetail'))
const Blog = lazy(async () => import('pages/Blog'))
const BlogArticle = lazy(async () => import('pages/BlogArticle'))
const Contact = lazy(async () => import('pages/Contact'))
const CvDownload = lazy(async () => import('pages/CvDownload'))

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
				<CvLocalProvider>
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
				</CvLocalProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}
