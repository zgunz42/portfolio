import Giscus from '@giscus/react'
import {
	Badge,
	Box,
	Card,
	Group,
	Stack,
	Text,
	Title,
	TypographyStylesProvider
} from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import type { IBlogArticleDto } from 'api'
import { getArticleList, getBlogArticle, getNodeArticleDetail } from 'api'
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
import { Badge as BadgeIcon } from 'tabler-icons-react'
import classes from '../../themes/project.module.css'
import appClasses from '../../themes/styles.module.css'

/** Blog post article page */
function BlogArticlePage({
	article,
	name
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
	const { locale } = useLocale()
	const router = useRouter()
	const colorScheme = useColorScheme()
	const { data, isError } = useQuery(
		['blogArticle', name, locale],
		getBlogArticle.bind(undefined, name as string, locale),
		{
			onError(error) {
				if (error instanceof NotFoundError) {
					void router.push('/404')
				}
			}
		}
	)

	if (!data || !name) {
		return <LoadingOrError />
	}

	const publishDate = new Date(article.attributes.publishedAt)
	const publishAt = new Intl.DateTimeFormat('id-ID', {
		dateStyle: 'full',
		timeStyle: 'short'
	}).format(publishDate)

	if (isError) {
		return <Text>Error</Text>
	}

	return (
		<CvPageLayout>
			<Stack className={classes.wrapper}>
				<Head>
					<title>{article.attributes.title} | Blog</title>
				</Head>
				<Card className={`${appClasses.text} giscus mt-16`}>
					<Title>{article.attributes.title}</Title>
					<Text className='mt-4 mb-12'>Diterbitkan {publishAt}</Text>
					<CvImage
						className={classes['img-hero']}
						src={article.attributes.thumbnail}
						alt={article.attributes.title}
					/>
					<article className={classes['article-body']}>
						<TypographyStylesProvider>
							<ReactMarkdown unwrapDisallowed>{article.body}</ReactMarkdown>
						</TypographyStylesProvider>
						<Group className='mt-12'>
							<Text>Tags:</Text>
							<Box>
								{article.attributes.label.map(tag => (
									<Badge
										className='mr-4'
										leftSection={<BadgeIcon size={14} />}
										size='lg'
										key={tag}
									>
										{tag}
									</Badge>
								))}
							</Box>
						</Group>
					</article>
					<Box className={`${appClasses.divider} my-8`} />
					<Giscus
						repo='zgunz42/portfolio'
						repoId='R_kgDOHcQWqQ'
						mapping='number'
						term='14'
						reactionsEnabled='1'
						theme={colorScheme === 'dark' ? 'dark_dimmed' : 'light'}
						emitMetadata='1'
					/>
				</Card>
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
		const items = await getArticleList(locale)
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
	name?: string[] | string
	article: IBlogArticleDto
}> = async ({ params, locale }) => {
	if (locale === undefined) {
		throw new Error('Locale is required')
	}
	console.log('testing', params)
	const article = await getNodeArticleDetail(params?.name as string, locale)
	return {
		props: {
			article,
			name: params?.name
		}
	}
}

export default BlogArticlePage
