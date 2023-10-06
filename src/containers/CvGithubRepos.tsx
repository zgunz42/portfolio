import { Box, Button, SimpleGrid, Text } from '@mantine/core'
import CvRepoCard from 'components/CvRepoCard'
import {
	ColumnMD,
	ColumnSM,
	ColumnXS,
	ScreenSizeMD,
	ScreenSizeSM,
	ScreenSizeXS
} from 'constant'
import useLocale from 'hooks/useLocale'
import useProjectList from 'hooks/useProjectList'
import { flatten } from 'lodash'
import Link from 'next/link'
import type { ReactElement } from 'react'
import { ArrowWaveLeftDown, ArrowWaveRightDown } from 'tabler-icons-react'
import useAppStyles from 'themes/styles'

export default function CvGithubRepos(): ReactElement {
	const { classes } = useAppStyles()
	const { data, fetchNextPage, isLoadMoreError } = useProjectList()
	const { $t } = useLocale()

	const onLoadMore = (): void => {
		void fetchNextPage()
	}

	return (
		<Box>
			<SimpleGrid
				cols={4}
				breakpoints={[
					{ maxWidth: ScreenSizeMD, cols: ColumnMD, spacing: 'md' },
					{ maxWidth: ScreenSizeSM, cols: ColumnSM, spacing: 'sm' },
					{ maxWidth: ScreenSizeXS, cols: ColumnXS, spacing: 'xs' }
				]}
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
							leftIcon={<ArrowWaveLeftDown />}
							rightIcon={<ArrowWaveRightDown />}
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
