import { Box, Button, SimpleGrid, Text } from '@mantine/core'
import CvRepoCard from 'components/CvRepoCard'
import useLocale from 'hooks/useLocale'
import useProjectList from 'hooks/useProjectList'
import { flatten } from 'lodash'
import Link from 'next/link'
import type { ReactElement } from 'react'
import { ArrowWaveLeftDown, ArrowWaveRightDown } from 'tabler-icons-react'
import classes from '../themes/styles.module.css'

export default function CvGithubRepos(): ReactElement {
	// const { classes } = useAppStyles()
	const { data, fetchNextPage, isLoadMoreError } = useProjectList()
	const { $t } = useLocale()

	const onLoadMore = (): void => {
		void fetchNextPage()
	}

	return (
		<Box>
			<SimpleGrid
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				cols={{ lg: 4, md: 3, sm: 2, xs: 1 }}
				spacing={{ lg: 'md', md: 'sm', sm: 'xs', xs: 0 }}
			>
				{data === undefined ? (
					<Text>Loading...</Text>
				) : (
					flatten(data.pages).map(project => (
						<Link
							className='block cursor-pointer'
							key={project.link}
							// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
							href={`/projects/${project.link}`}
						>
							<CvRepoCard
								title={project.name}
								description={project.description}
								image={project.thumbnail}
							/>
						</Link>
					))
				)}
			</SimpleGrid>
			<Box
				className='w-fill mt-8'
				style={{
					maxWidth: '100vw'
				}}
			>
				{data !== undefined && data.pages.length > 0 && !isLoadMoreError ? (
					<Box
						className='w-fill mt-8'
						style={{
							maxWidth: '100vw'
						}}
					>
						<Button
							variant='subtle'
							leftSection={<ArrowWaveLeftDown />}
							rightSection={<ArrowWaveRightDown />}
							className='mx-auto block'
							onClick={onLoadMore}
						>
							{$t('site.loadMore')}
						</Button>
					</Box>
				) : undefined}
				{isLoadMoreError ? (
					<Text className={`${classes.text} mt-8 text-center`}>
						{$t('blog.list.loadMoreError')}
					</Text>
				) : undefined}
			</Box>
		</Box>
	)
}
