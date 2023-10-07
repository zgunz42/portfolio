/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	Box,
	Button,
	Container,
	Group,
	Stack,
	Text,
	Title,
	TypographyStylesProvider
} from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import type { IProject } from 'api'
import { getNodeProjectDetail, getProjectDetail, getProjectList } from 'api'
import CvImage from 'components/CvImage'
import CvPageLayout from 'components/CvPageLayout'
import LoadingOrError from 'components/LoadingOrError'
import NotFoundError from 'errors/NotFoundError'
import useLocale from 'hooks/useLocale'
import type {
	GetStaticPaths,
	GetStaticPathsResult,
	GetStaticProps,
	InferGetStaticPropsType
} from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import classes from '../../themes/project.module.css'

function ProjectDetailPage({
	project,
	name
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
	const { $t, locale } = useLocale()
	const router = useRouter()
	const { data } = useQuery(
		['project', { name, locale }],
		async (): ReturnType<typeof getProjectDetail> =>
			getProjectDetail(name, locale),
		{
			onError(error) {
				if (error instanceof NotFoundError) {
					void router.push('/404')
				}
			}
		}
	)
	if (!data) {
		return <LoadingOrError />
	}
	return (
		<CvPageLayout>
			<Stack className={classes.wrapper}>
				<Head>
					<title>{project.attributes.name} | I Kadek Adi Gunawan</title>
				</Head>
				<Container>
					<TypographyStylesProvider>
						<Title>{project.attributes.name}</Title>
						<Text className='mt-4'>{project.attributes.description}</Text>
					</TypographyStylesProvider>
					<Box className='mt-8 mb-12 h-72 w-full overflow-hidden rounded-md text-right'>
						<CvImage
							className={classes['img-hero']}
							src={project.attributes.thumbnail}
							alt={project.attributes.name}
						/>
					</Box>
					<Group gap={8} className='mt-8 mb-12'>
						<Button>
							<a
								href={project.attributes.demoUrl}
								target='_blank'
								rel='noreferrer'
							>
								{$t('project.button.demo')}
							</a>
						</Button>
						<Button variant='light'>
							<a
								href={project.attributes.sourceUrl}
								target='_blank'
								rel='noreferrer'
							>
								{$t('project.button.source')}
							</a>
						</Button>
					</Group>
					<TypographyStylesProvider>
						<article className={classes['article-body']}>
							<ReactMarkdown unwrapDisallowed>{project.body}</ReactMarkdown>
						</article>
					</TypographyStylesProvider>
				</Container>
			</Stack>
		</CvPageLayout>
	)
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	const paths: GetStaticPathsResult['paths'] = []

	if (locales === undefined) {
		throw new Error('Locales are required')
	}

	console.log('locales', locales)

	for (const locale of locales) {
		// eslint-disable-next-line no-await-in-loop
		const items = await getProjectList(locale)
		for (const item of items) {
			paths.push({
				params: {
					name: item.link,
					locale
				}
			})
		}
	}

	console.log('paths', paths)

	return {
		paths,
		fallback: true // false or "blocking"
	}
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getStaticProps: GetStaticProps<{
	project: IProject
	name: string
}> = async ({ params, locale }) => {
	if (locale === undefined) {
		throw new Error('Locale is required')
	}
	console.log('testing', params)
	const project = await getNodeProjectDetail(params?.name as string, locale)
	return {
		props: {
			project,
			name: params?.name as string
		}
	}
}

export default ProjectDetailPage
