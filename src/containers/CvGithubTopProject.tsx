/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import type { IProjectList } from 'api'
import { getPinnedProjects } from 'api'
import CvCarousel from 'components/CvCarousel'
import CvRepoCard from 'components/CvRepoCard'
import useLocale from 'hooks/useLocale'
import Link from 'next/link'
import type { JSX } from 'react'

export default function CvGithubTopProject(): JSX.Element {
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
			{(item: IProjectList): CompElement => (
				<Link
					className='block cursor-pointer'
					key={item.link}
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					href={`/projects/${item.link}`}
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
