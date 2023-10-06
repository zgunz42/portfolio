import { useEffect, useState } from 'react'

interface WindowSize {
	innerHeight: number
	innerWidth: number
	outerHeight: number
	outerWidth: number
}

function getSize(): WindowSize {
	if (typeof window === 'undefined') {
		return {
			innerHeight: 0,
			innerWidth: 0,
			outerHeight: 0,
			outerWidth: 0
		}
	}

	return {
		innerHeight: window.innerHeight,
		innerWidth: window.innerWidth,
		outerHeight: window.outerHeight,
		outerWidth: window.outerWidth
	}
}

function useWindowSize(): WindowSize {
	const [windowSize, setWindowSize] = useState(getSize())

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	function handleResize() {
		setWindowSize(getSize())
	}

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize)
			return () => {
				window.removeEventListener('resize', handleResize)
			}
		}
	}, [])

	return windowSize
}

export default useWindowSize
