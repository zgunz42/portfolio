/* eslint-disable @typescript-eslint/no-magic-numbers */
import useWindowSize from '@rehooks/window-size'
import type {
	ForwardRefComponent,
	HTMLMotionProps,
	PanInfo
} from 'framer-motion'
import { motion, useAnimation } from 'framer-motion'
import useDimensions from 'hooks/useDimension'
import type { PropsWithChildren, ReactElement } from 'react'
import { useContext } from 'react'
import type { CarouselContextProperties } from './Context'
import { Context } from './Context'

// const Wrapper = styled.div`
// 	width: 100%;
// `

// const StyledTrack = styled(motion.div)`
// 	display: flex;
// 	flex-wrap: nowrap;
// 	min-width: min-content;
// 	padding: ${properties => properties.padding}px;
// 	cursor: grab;
// 	&:active {
// 		cursor: grabbing;
// 	}
// `
interface WindowSize {
	innerHeight: number
	innerWidth: number
	outerHeight: number
	outerWidth: number
}
interface TrackProperties {
	padding: number
	velocity: number
	transition: object
}

function Track({
	children,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	padding,
	velocity,
	transition
}: PropsWithChildren<TrackProperties>): ReactElement {
	const [trackReference, trackDimensions] = useDimensions<
		HTMLDivElement,
		ForwardRefComponent<HTMLDivElement, HTMLMotionProps<'div'>>
	>()
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const windowDimensions: WindowSize = useWindowSize()
	const controls = useAnimation()

	const { state, dispatch } = useContext<CarouselContextProperties>(Context)
	// const negativeItems = state.items.map(item => item * -1)

	function onDragEnd(
		event: MouseEvent | PointerEvent | TouchEvent,
		info: PanInfo
	): void {
		const offset = info.offset.x
		const correctedVelocity = info.velocity.x * velocity

		const direction = correctedVelocity < 0 || offset < 0 ? 1 : -1
		// const startPosition = info.point.x - offset
		console.log(direction)

		// const endOffset =
		// 	direction === 1
		// 		? Math.min(correctedVelocity, offset)
		// 		: Math.max(correctedVelocity, offset)
		// const endPosition = startPosition + endOffset

		// let closestPosition = 0

		// for (const current of negativeItems) {
		// 	closestPosition =
		// 		Math.abs(current - endPosition) <
		// 		Math.abs(closestPosition - endPosition)
		// 			? current
		// 			: closestPosition
		// }
		if (state.activeItem === 0 && direction === -1) {
			return
		}
		const activeSlide =
			Math.abs(state.activeItem + direction) % state.items.length
		console.log(activeSlide, state.items)
		dispatch({ type: 'SET_ACTIVE_ITEM', activeItem: activeSlide })
		// const xPos = Math.max(
		// 	closestPosition,
		// 	windowDimensions.innerWidth - trackDimensions.width - trackDimensions.x ||
		// 		0
		// )
		void controls.start({
			x:
				state.items[activeSlide] * (activeSlide !== 0 ? -direction : direction),
			transition
		})
	}

	return (
		<div ref={trackReference} className='w-full'>
			<motion.div
				className='flex min-w-fit flex-nowrap gap-3'
				animate={controls}
				drag='x'
				transition={{
					x: { type: 'spring', stiffness: 300, damping: 30 },
					opacity: { duration: 0.2 }
				}}
				dragConstraints={{
					left:
						windowDimensions.innerWidth -
						trackDimensions.width -
						trackDimensions.x,
					right: 0 + trackDimensions.x
				}}
				onDragEnd={onDragEnd}
			>
				{children}
			</motion.div>
		</div>
	)
}

export default Track
