/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Box, Container, Skeleton, Stack, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import CvHero from 'components/CvHero'
import CvPageLayout from 'components/CvPageLayout'
import CvGithubRepos from 'containers/CvGithubRepos'
import CvGithubTopProject from 'containers/CvGithubTopProject'
import useConfig from 'hooks/useConfig'
import useLocale from 'hooks/useLocale'
import Head from 'next/head'
import type { ReactElement } from 'react'
import classes from '../themes/home.module.css'

function HomePage(): ReactElement {
	const { data, isFetching, isError } = useConfig()
	const isMobile = useMediaQuery('(max-width: 769px)')
	let heroElement = <Skeleton height='100vh' />
	const { $t } = useLocale()
	if (!isFetching && !isError && data) {
		heroElement = (
			<CvHero
				bio={data.about.intro}
				github={data.github}
				name={data.fullName}
			/>
		)
	}

	const description = $t('site.description')

	return (
		<CvPageLayout>
			<Stack
				align='stretch'
				justify='center'
				classNames={{
					root: classes.page
				}}
			>
				<Head>
					<title>{`Adi Gunawan | ${description}`}</title>
				</Head>
				{heroElement}
				<Container fluid={isMobile} className='md:w-full'>
					<Box className={`${classes['not-selectable']} mb-8`}>
						<Title order={2} className={classes.title}>
							{$t('home.pinned')}
						</Title>
						<CvGithubTopProject />
					</Box>
					<Box>
						<Title order={2} className={classes.title}>
							{$t('home.projects')}
						</Title>
						<CvGithubRepos />
					</Box>
				</Container>
			</Stack>
		</CvPageLayout>
	)
}

export default HomePage
