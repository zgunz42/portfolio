import useDimensions from 'hooks/useDimension'
import type { PropsWithChildren, ReactElement } from 'react'
import { useContext, useEffect } from 'react'
import type { CarouselContextProperties } from './Context'
import { Context } from './Context'

interface ItemProperties {
	gap: number
	padding: number
	index: number
}

function Item({
	children,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	gap,
	index,
	padding
}: PropsWithChildren<ItemProperties>): ReactElement {
	const { dispatch } = useContext<CarouselContextProperties>(Context)
	const [itemReference, { x }] = useDimensions<HTMLElement, HTMLElement>()

	useEffect(() => {
		if (x !== 0) {
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			dispatch({ type: 'ADD_ITEM', index, item: 225 * index })
		}
	}, [dispatch, padding, x, index])

	return (
		<div className='flex-shrink-0' ref={itemReference}>
			{children}
		</div>
	)
}

export default Item
