/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	Box,
	Container,
	createStyles,
	Skeleton,
	Stack,
	Title
} from '@mantine/core'
import { getGithubUser } from 'api'
import CvHero from 'components/CvHero'
import CvPageLayout from 'components/CvPageLayout'
import CvGithubRepos from 'containers/CvGithubRepos'
import CvGithubTopProject from 'containers/CvGithubTopProject'
import type { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'

const useStyles = createStyles(theme => ({
	title: {
		textAlign: 'left',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.gray[0]
				: theme.colors.gray[8],
		marginBottom: theme.spacing.lg
	}
}))

const skills = [
	{
		name: 'javascript',
		level: 'advanced',
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		experience: 5
	},
	{
		name: 'react',
		level: 'advanced',
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		experience: 5
	},
	{
		name: 'nodejs',
		level: 'advanced',
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		experience: 5
	},
	{
		name: 'typescript',
		level: 'advanced',
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		experience: 4
	}
]

function HomePage(): ReactElement {
	const { classes } = useStyles()
	const { data, isFetching, isError } = useQuery(
		'profile',
		getGithubUser.bind(undefined, 'zgunz42')
	)

	let heroElement = <Skeleton height='100vh' />

	if (!isFetching && !isError && data) {
		heroElement = (
			<CvHero
				avatarUrl={data.avatarURL}
				skills={skills}
				bio={data.bio}
				name={data.name}
			/>
		)
	}

	return (
		<CvPageLayout className='page'>
			<Stack align='stretch' justify='center'>
				<Helmet>
					<title>Adi Gunawan | FullStack Developer and IOT antusias</title>
				</Helmet>
				{heroElement}
				<Container>
					<Title order={2} className={classes.title}>
						Top Project
					</Title>
					<Box>
						<CvGithubTopProject />
					</Box>
				</Container>
				<Container>
					<Title order={2} className={classes.title}>
						My Project
					</Title>
					<Box>
						<CvGithubRepos username='zgunz42' />
					</Box>
				</Container>
			</Stack>
		</CvPageLayout>
	)
}

export default HomePage
