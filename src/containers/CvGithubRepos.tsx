/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Box, Button, Center, SimpleGrid } from '@mantine/core'
import { getGithubRepositories } from 'api'
import CvRepoCard from 'components/CvRepoCard'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'

interface Properties {
	username: string
}

const firstPage = 1
const pageSize = 10
export default function CvGithubRepos({ username }: Properties): ReactElement {
	const [page, setPage] = useState(firstPage)
	const { data, error, isError, isLoading } = useQuery(
		[`get${username}_repo`, page],
		getGithubRepositories.bind(undefined, username, page, pageSize)
	)

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const onLoadMore = (): void => setPage(page + 1)

	if (isLoading) {
		// show skeleton loading
		return <div>Loading...</div>
	}

	if (isError) {
		// show error
		return (
			<div>
				{String(error)}
				<Button onClick={onLoadMore}>Retry</Button>
			</div>
		)
	}

	if (data === undefined) {
		// show empty state
		return <div>Empty</div>
	}

	if (data.length === 0) {
		// show empty state
		return <div>Empty</div>
	}

	return (
		<Box>
			<SimpleGrid
				cols={4}
				breakpoints={[
					{ maxWidth: 980, cols: 3, spacing: 'md' },
					{ maxWidth: 755, cols: 2, spacing: 'sm' },
					{ maxWidth: 600, cols: 1, spacing: 'sm' }
				]}
			>
				{data.map(repo => (
					<CvRepoCard
						key={repo.id}
						title={repo.name}
						description={repo.description ?? ''}
						country='Indonesia'
						image='/images/placeholder.png'
					/>
				))}
			</SimpleGrid>
			<Center mt='md'>
				<Button onClick={onLoadMore}>Load More</Button>
			</Center>
		</Box>
	)
}
