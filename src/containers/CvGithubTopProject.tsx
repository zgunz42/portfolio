/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Text } from '@mantine/core'
import type { IProjectList } from 'api'
import { getPinnedProjects } from 'api'
import CvCarousel from 'components/CvCarousel'
import CvRepoCard from 'components/CvRepoCard'
import useLocale from 'hooks/useLocale'
import type { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function CvGithubTopProject(): ReactElement {
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const { locale } = useLocale()
	const { data } = useQuery(
		['pinProject', locale],
		getPinnedProjects.bind(undefined, locale)
	)

	if (data === undefined) {
		return <Text>Loading...</Text>
	}

	return (
		<CvCarousel items={data}>
			{(item: IProjectList): ReactElement => (
				<Link
					className='block cursor-pointer'
					key={item.link}
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					to={`/projects/${item.link}`}
				>
					<CvRepoCard
						title={item.name}
						description={item.description}
						image={item.thumbnail}
					/>
				</Link>
			)}
		</CvCarousel>
	)
}
