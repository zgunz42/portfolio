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
import { getBlogArticle } from 'api'
import CvPageLayout from 'components/CvPageLayout'
import useLocale from 'hooks/useLocale'
import type { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import ReactMarkdown from 'react-markdown'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
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
function BlogArticlePage(): ReactElement {
	const { classes, theme, cx } = useStyle()
	const { locale } = useLocale()
	const { classes: appClasses } = useAppStyles()
	const { articleSlug } = useParams()
	if (!articleSlug) {
		throw new Error('Article slug is required')
	}
	const { data, isError } = useQuery(
		['blogArticle', articleSlug],
		getBlogArticle.bind(undefined, articleSlug, locale)
	)
	if (data === undefined) {
		return <Text>Loading...</Text>
	}
	const publishAt = new Intl.DateTimeFormat('id-ID', {
		dateStyle: 'full',
		timeStyle: 'short'
	}).format(data.attributes.publishedAt)

	if (isError) {
		return <Text>Error</Text>
	}

	return (
		<CvPageLayout>
			<Stack className={classes.wrapper}>
				<Helmet>
					<title>{data.attributes.title} | Blog</title>
				</Helmet>
				<Card className={`${appClasses.text} giscus mt-16`}>
					<Title>{data.attributes.title}</Title>
					<Text className='mt-4 mb-12'>Diterbitkan {publishAt}</Text>
					<Image
						className={cx(
							classes.imgArticle,
							'mb-4 mt-12 h-64 overflow-hidden rounded-md object-cover shadow-md'
						)}
						src={data.attributes.thumbnail}
						alt={data.attributes.title}
						withPlaceholder
					/>
					<article className={classes.articleBody}>
						<TypographyStylesProvider>
							<ReactMarkdown unwrapDisallowed>{data.body}</ReactMarkdown>
						</TypographyStylesProvider>
						<Group className='mt-12'>
							<Text>Tags:</Text>
							<Box>
								{data.attributes.label.map(tag => (
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

export default BlogArticlePage
