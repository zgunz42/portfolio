import { Box, Container, Stack, Text, Title } from '@mantine/core'
import CvPageLayout from 'components/CvPageLayout'
import CvGithubRepos from 'containers/CvGithubRepos'
import useLocale from 'hooks/useLocale'
import type { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import useAppStyles from 'themes/styles'

function ProjectPage(): ReactElement {
	const { classes } = useAppStyles()
	const { $t } = useLocale()
	return (
		<CvPageLayout className='page'>
			<Stack align='stretch' justify='center'>
				<Helmet>
					<title>Project | Adi Gunawan</title>
				</Helmet>
				<Container className='w-full'>
					<Box className='mt-12 mb-4 text-center'>
						<Title
							dangerouslySetInnerHTML={{
								__html: $t('project.body.title')
							}}
							className={`${classes.titleDecorate} mb-2`}
						/>
						<Text className={`${classes.text} mx-auto max-w-sm`}>
							{$t('project.body.description')}
						</Text>
					</Box>
					<Box>
						<CvGithubRepos />
					</Box>
				</Container>
			</Stack>
		</CvPageLayout>
	)
}

export default ProjectPage
