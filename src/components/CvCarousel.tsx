/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Box, createStyles } from '@mantine/core'
import useWindowSize from 'hooks/useWindowSize'
import { PietileCarousel } from 'pietile-carousel'
import type * as React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CvCarouselProperties<C = any> {
	items: C[]
	children: (items: C) => React.ReactElement
}

const useStyles = createStyles(() => ({
	carouselStyle: {
		width: '100%'
	},
	itemStyle: {
		width: '100%',
		height: '100%'
	}
}))

export default function CvCarousel({
	children,
	items
}: CvCarouselProperties): React.ReactElement {
	const { classes, theme } = useStyles()
	const { innerWidth } = useWindowSize()

	return (
		<PietileCarousel
			count={innerWidth < theme.breakpoints.md ? 2 : 4}
			margin={12}
			className={classes.carouselStyle}
		>
			{items.map((child, index) => (
				<Box className={classes.itemStyle} key={index}>
					{children(child)}
				</Box>
			))}
		</PietileCarousel>
	)
}
