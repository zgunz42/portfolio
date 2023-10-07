/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { MantineColorsTuple } from '@mantine/core'
import type { ReactElement } from 'react'
import { theme } from 'themes/theme'

interface Properties {
	imageUrl: string
}

export default function CvProfileAvatar({
	imageUrl
}: Properties): ReactElement {
	const point =
		'M59,-56.9C75.4,-42.5,86.9,-21.3,85.8,-1.2C84.6,19,70.8,37.9,54.4,53.2C37.9,68.5,19,80,-1.9,81.9C-22.8,83.9,-45.7,76.2,-62.1,60.9C-78.5,45.7,-88.5,22.8,-86.2,2.3C-83.8,-18.1,-69.1,-36.3,-52.7,-50.6C-36.3,-64.9,-18.1,-75.5,1.6,-77C21.3,-78.6,42.5,-71.2,59,-56.9Z'
	return (
		<svg viewBox='0 0 200 200' className='h-full w-full'>
			<defs>
				<mask id='blobmask'>
					<path fill='#FFFFFF' d={point} transform='translate(100 100)' />
				</mask>
			</defs>
			<path
				fill={
					theme.primaryColor && theme.colors && theme.colors[theme.primaryColor]
						? (theme.colors[theme.primaryColor] as MantineColorsTuple)[1]
						: undefined
				}
				d={point}
				transform='translate(100 100)'
			/>
			<image
				mask='url(#blobmask)'
				xlinkHref={imageUrl}
				x={0}
				y={0}
				width='100%'
				height='100%'
			/>
		</svg>
	)
}
