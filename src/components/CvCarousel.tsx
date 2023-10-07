'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import { Box } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import type * as React from 'react'
import { theme } from 'themes/theme'
import classes from './CVCarousel.module.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CvCarouselProperties<C = any> {
	items: C[]
	children: (items: C) => React.ReactElement
}

export default function CvCarousel({
	children,
	items
}: CvCarouselProperties): CompElement {
	const matches = useMediaQuery(`(max-width: ${theme.breakpoints?.md})`)

	return (
		<Carousel
			slideSize={matches ? '50%' : '25%'}
			m={12}
			slideGap='md'
			className={classes['carousel-style']}
		>
			{items.map<CompElement>((child, index) => (
				<Carousel.Slide key={index}>
					<Box className={classes['item-style']}>{children(child)}</Box>
				</Carousel.Slide>
			))}
		</Carousel>
	)
}
