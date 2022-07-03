/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	Box,
	Button,
	Container,
	SimpleGrid,
	Stack,
	Text,
	Title
} from '@mantine/core'
import CvBlogCard from 'components/CvBlogCard'
import CvPageLayout from 'components/CvPageLayout'
import useBlogList from 'hooks/useBlogList'
import useLocale from 'hooks/useLocale'
import { flatten } from 'lodash'
import type { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { ArrowWaveLeftDown, ArrowWaveRightDown } from 'tabler-icons-react'
import useAppStyles from 'themes/styles'

function BlogPage(): ReactElement {
	const { classes, theme } = useAppStyles()
	const { data, fetchNextPage, isLoadMoreError } = useBlogList()
	const { $t } = useLocale()

	const onLoadMore = (): void => {
		void fetchNextPage()
	}

	return (
		<CvPageLayout>
			<Stack align='stretch' justify='center'>
				<Helmet>
					<title>Blog | Adi Gunawan</title>
				</Helmet>
				<Container>
					<Box className='mt-12 mb-8 text-center'>
						<Title
							dangerouslySetInnerHTML={{
								__html: $t('blog.list.title')
							}}
							className={`${classes.titleDecorate} mb-2`}
						/>
						<Text className={`${classes.text} mx-auto max-w-sm`}>
							{$t('blog.list.text')}
						</Text>
					</Box>
					{data === undefined ? (
						<Text>Loading...</Text>
					) : (
						<SimpleGrid
							cols={3}
							spacing={theme.spacing.xl}
							breakpoints={[
								{ maxWidth: 980, cols: 3, spacing: 'md' },
								{ maxWidth: 755, cols: 2, spacing: 'sm' },
								{ maxWidth: 600, cols: 1, spacing: 'xs' }
							]}
						>
							{flatten(data.pages).map(post => (
								<Link key={post.link} to={post.link}>
									<CvBlogCard
										title={post.title}
										description={post.description}
										readTime={post.readTime}
										tags={post.label}
									/>
								</Link>
							))}
						</SimpleGrid>
					)}
					{data !== undefined && data.pages.length > 0 && !isLoadMoreError ? (
						<Box
							className='w-fill mt-8'
							style={{
								maxWidth: '100vw'
							}}
						>
							<Button
								leftIcon={<ArrowWaveLeftDown />}
								rightIcon={<ArrowWaveRightDown />}
								className='mx-auto block'
								onClick={onLoadMore}
							>
								Load More
							</Button>
						</Box>
					) : undefined}
					{isLoadMoreError ? (
						<Text className={`${classes.text} mt-8 text-center`}>
							{$t('blog.list.loadMoreError')}
						</Text>
					) : undefined}
				</Container>
			</Stack>
		</CvPageLayout>
	)
}

export default BlogPage
