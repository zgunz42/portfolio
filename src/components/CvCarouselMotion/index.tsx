/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { ReactElement } from 'react'
import { ContextProvider } from './Context'
import Item from './Item'
import Track from './Track'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CvCarouselMotionProperties<C = any> {
	padding?: number
	gap?: number
	items: C[]
	children: (items: C) => React.ReactElement
	velocity?: number
	transition?: object
}

function CvCarouselMotion({
	children,
	padding,
	items,
	gap,
	velocity,
	transition
}: CvCarouselMotionProperties): ReactElement {
	return (
		<ContextProvider>
			<Track
				padding={padding ?? CvCarouselMotion.defaultProps.padding}
				velocity={velocity ?? CvCarouselMotion.defaultProps.velocity}
				transition={transition ?? CvCarouselMotion.defaultProps.transition}
			>
				{items.map((child, index) => (
					<Item
						// eslint-disable-next-line react/no-array-index-key
						key={index}
						index={index}
						gap={gap ?? CvCarouselMotion.defaultProps.gap}
						padding={0}
					>
						{children(child)}
					</Item>
				))}
			</Track>
		</ContextProvider>
	)
}

CvCarouselMotion.defaultProps = {
	padding: 40,
	gap: 40,
	velocity: 0.4,
	transition: { type: 'spring', damping: 500 }
}

export default CvCarouselMotion
