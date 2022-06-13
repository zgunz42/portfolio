import CvCarousel from 'components/CvCarousel'
import CvRepoCard from 'components/CvRepoCard'
import type { ReactElement } from 'react'

export default function CvGithubTopProject(): ReactElement {
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const items: number[] = [1, 2, 3, 4, 5, 6, 7, 8]

	return (
		<CvCarousel items={items}>
			{(item: number): ReactElement => (
				<CvRepoCard
					key={item}
					title={`${item} title`}
					description={`${item} description`}
					country='Indonesia'
					image='/images/placeholder.png'
				/>
			)}
		</CvCarousel>
	)
}
