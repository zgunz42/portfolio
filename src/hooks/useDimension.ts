import { useCallback, useLayoutEffect, useState } from 'react'

export interface DimensionObject {
	width: number
	height: number
	top: number
	left: number
	x: number
	y: number
	right: number
	bottom: number
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type UseDimensionsHook<T, R> = [
	onUpdate: (node: T | null) => void,
	// eslint-disable-next-line @typescript-eslint/ban-types
	dimens: DimensionObject,
	node: R | undefined
]

export interface UseDimensionsArguments {
	liveMeasure?: boolean
}

function getDimensionObject<T>(node: T): DimensionObject {
	if (node instanceof HTMLElement) {
		const { bottom, height, left, right, top, width, x, y } =
			node.getBoundingClientRect()

		return {
			bottom,
			height,
			left,
			right,
			top,
			width,
			x,
			y
		}
	}
	return {
		bottom: 0,
		height: 0,
		left: 0,
		right: 0,
		top: 0,
		width: 0,
		x: 0,
		y: 0
	}
}

function useDimensions<T, R>({
	liveMeasure = true
}: UseDimensionsArguments = {}): UseDimensionsHook<T, R> {
	const [dimensions, setDimensions] = useState<DimensionObject>({
		bottom: 0,
		height: 0,
		left: 0,
		right: 0,
		top: 0,
		width: 0,
		x: 0,
		y: 0
	})
	const [node, setNode] = useState<R | undefined>()

	const reference = useCallback((domNode: T | null) => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		setNode((domNode as unknown as R) ?? undefined)
	}, [])

	// eslint-disable-next-line consistent-return
	useLayoutEffect(() => {
		if (node) {
			// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
			const measure = () =>
				window.requestAnimationFrame(() =>
					setDimensions(getDimensionObject(node))
				)
			measure()

			if (liveMeasure) {
				window.addEventListener('resize', measure)
				window.addEventListener('scroll', measure)

				return () => {
					window.removeEventListener('resize', measure)
					window.removeEventListener('scroll', measure)
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [node])

	return [reference, dimensions, node]
}

export default useDimensions
