import Giscus from '@giscus/react'
import {
	Badge,
	Box,
	Card,
	createStyles,
	Group,
	Image,
	Stack,
	Text,
	Title,
	TypographyStylesProvider
} from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import type { IBlogArticleDto } from 'api'
import { getArticleList, getBlogArticle, getNodeArticleDetail } from 'api'
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
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import ReactMarkdown from 'react-markdown'
import { Badge as BadgeIcon } from 'tabler-icons-react'
import useAppStyles from 'themes/styles'

const useStyle = createStyles(() => ({
	articleBody: {
		letterSpacing: '0.01em',
		lineHeight: '1.5em',
		'ol, ul, menu': {
			listStyle: 'inherit'
		}
	},
	wrapper: {
		margin: '0 auto',
		padding: '0 1em',
		maxWidth: '800px'
	},
	imgArticle: {
		maxWidth: '100%',
		height: 'auto',
		'figure,figure>div': {
			height: '100%'
		}
	}
}))

/** Blog post article page */
function BlogArticlePage({
	article,
	name
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
	const { classes, theme, cx } = useStyle()
	const { locale } = useLocale()
	const { classes: appClasses } = useAppStyles()
	const router = useRouter()
	console.log(name)

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

	console.log(article.attributes.publishedAt)

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
				<Helmet>
					<title>{article.attributes.title} | Blog</title>
				</Helmet>
				<Card className={`${appClasses.text} giscus mt-16`}>
					<Title>{article.attributes.title}</Title>
					<Text className='mt-4 mb-12'>Diterbitkan {publishAt}</Text>
					<Image
						className={cx(
							classes.imgArticle,
							'mb-4 mt-12 h-64 overflow-hidden rounded-md object-cover shadow-md'
						)}
						src={article.attributes.thumbnail}
						alt={article.attributes.title}
						withPlaceholder
					/>
					<article className={classes.articleBody}>
						<TypographyStylesProvider>
							<ReactMarkdown unwrapDisallowed>{article.body}</ReactMarkdown>
						</TypographyStylesProvider>
						<Group className='mt-12'>
							<Text>Tags:</Text>
							<Box>
								{(article.attributes.label ).map(tag => (
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
						theme={theme.colorScheme === 'dark' ? 'dark_dimmed' : 'light'}
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
