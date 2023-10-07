import { Box, Container, Stack, Text, Title } from '@mantine/core'
import CvPageLayout from 'components/CvPageLayout'
import CvGithubRepos from 'containers/CvGithubRepos'
import useLocale from 'hooks/useLocale'
import Head from 'next/head'
import type { ReactElement } from 'react'
import classes from '../../themes/styles.module.css'

function ProjectPage(): ReactElement {
	const { $t } = useLocale()
	return (
		<CvPageLayout className='page'>
			<Stack align='stretch' justify='center'>
				<Head>
					<title>Project | Adi Gunawan</title>
				</Head>
				<Container className='w-full'>
					<Box className='mt-12 mb-4 text-center'>
						<Title
							dangerouslySetInnerHTML={{
								__html: $t('project.body.title')
							}}
							className={`${classes['title-decorate']} mb-2`}
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
