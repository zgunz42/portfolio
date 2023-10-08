/* eslint-disable react/jsx-handler-names */

'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { Carousel } from '@mantine/carousel'
import { Box } from '@mantine/core'
import Autoplay from 'embla-carousel-autoplay'
import type { EmblaPluginType } from 'embla-carousel-react'
import * as React from 'react'
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
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const autoplay = React.useRef(Autoplay({ delay: 2000 }))

	return (
		<Carousel
			slideSize={{ lg: '25%', md: '50%', sm: '50%', base: '100%' }}
			slideGap={{ lg: 'xl', md: 'md', sm: 'md', xs: 'sm' }}
			align='start'
			height='100%'
			withControls={false}
			plugins={[autoplay.current as unknown as EmblaPluginType]}
			onMouseEnter={autoplay.current.stop}
			onMouseLeave={autoplay.current.reset}
			style={{ maxWidth: '100vw' }}
			loop
			classNames={{
				root: classes['carousel-style'],
				slide: classes.slide
			}}
		>
			{items.map<CompElement>((child, index) => (
				<Carousel.Slide key={index}>
					<Box className={classes['item-style']}>{children(child)}</Box>
				</Carousel.Slide>
			))}
		</Carousel>
	)
}
