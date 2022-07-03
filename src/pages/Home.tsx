/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	Box,
	Container,
	createStyles,
	Skeleton,
	Stack,
	Title
} from '@mantine/core'
import CvHero from 'components/CvHero'
import CvPageLayout from 'components/CvPageLayout'
import CvGithubRepos from 'containers/CvGithubRepos'
import CvGithubTopProject from 'containers/CvGithubTopProject'
import useConfig from 'hooks/useConfig'
import useLocale from 'hooks/useLocale'
import type { ReactElement } from 'react'
import { Helmet } from 'react-helmet'

const useStyles = createStyles(theme => ({
	title: {
		textAlign: 'left',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.gray[0]
				: theme.colors.gray[8],
		marginBottom: theme.spacing.lg
	},
	notSelectable: {
		userSelect: 'none'
	}
}))

function HomePage(): ReactElement {
	const { classes } = useStyles()
	const { data, isFetching, isError } = useConfig()

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

	return (
		<CvPageLayout className='page'>
			<Stack align='stretch' justify='center'>
				<Helmet>
					<title>Adi Gunawan | {$t('site.description')}</title>
				</Helmet>
				{heroElement}
				<Container className='md:w-full'>
					<Box className={`${classes.notSelectable} mb-8`}>
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
