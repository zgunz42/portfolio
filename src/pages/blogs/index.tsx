/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	Box,
	Button,
	Center,
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
import Head from 'next/head'
import Link from 'next/link'
import type { ReactElement } from 'react'
import { ArrowWaveLeftDown, ArrowWaveRightDown } from 'tabler-icons-react'
import classes from 'themes/styles.module.css'

function BlogPage(): ReactElement {
	const { data, fetchNextPage, isLoadMoreError } = useBlogList()
	const { $t } = useLocale()

	const onLoadMore = (): void => {
		void fetchNextPage()
	}

	return (
		<CvPageLayout>
			<Stack align='stretch' justify='center'>
				<Head>
					<title>Blog | Adi Gunawan</title>
				</Head>
				<Container>
					<Box className='mt-12 mb-8 text-center'>
						<Title
							dangerouslySetInnerHTML={{
								__html: $t('blog.list.title')
							}}
							className={`${classes.titleDecorate} mb-2`}
						/>
						<Text className={`${classes.text} mx-auto inline-block max-w-sm`}>
							{$t('blog.list.text')}
						</Text>
					</Box>
					{data === undefined ? (
						<Text>Loading...</Text>
					) : (
						<SimpleGrid
							cols={{ lg: 3, md: 2, sm: 1 }}
							spacing={{ lg: 'md', md: 'sm', sm: 'xs', xs: 0 }}
						>
							{flatten(data.pages).map(post => (
								<Link key={post.link} href={`blogs/${post.link}`}>
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
					<Center>
						{data !== undefined && data.pages.length > 0 && !isLoadMoreError ? (
							<Center maw={100}>
								<Box className='w-fill mt-8'>
									<Button
										variant='subtle'
										leftSection={<ArrowWaveLeftDown />}
										rightSection={<ArrowWaveRightDown />}
										className='mx-auto block'
										classNames={{
											root: 'block'
										}}
										onClick={onLoadMore}
									>
										{$t('site.loadMore')}
									</Button>
								</Box>
							</Center>
						) : undefined}
						{isLoadMoreError ? (
							<Text className={`${classes.text} mt-8 text-center`}>
								{$t('blog.list.loadMoreError')}
							</Text>
						) : undefined}
					</Center>
				</Container>
			</Stack>
		</CvPageLayout>
	)
}

export default BlogPage
