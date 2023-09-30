import * as blurhash from 'blurhash'
import type { TypeLanguages } from 'constant'
import { IconSize, Languages } from 'constant'
// eslint-disable-next-line unicorn/prefer-node-protocol
import { useLayoutEffect, useState } from 'react'
// eslint-disable-next-line import/prefer-default-export
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(() => matchMedia(query).matches)

	useLayoutEffect(() => {
		const mediaQuery = matchMedia(query)

		function onMediaQueryChange(): void {
			setMatches(mediaQuery.matches)
		}

		mediaQuery.addEventListener('change', onMediaQueryChange)

		return (): void => {
			mediaQuery.removeEventListener('change', onMediaQueryChange)
		}
	}, [query])

	return matches
}

export function localeName(label: string): TypeLanguages {
	switch (label) {
		case Languages[0]:
			return Languages[0]
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		case Languages[1]:
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			return Languages[1]
		default:
			return Languages[0]
	}
}

export function getBrowserLanguage(): TypeLanguages {
	const browserLanguage = navigator.language.split('-')[0]
	return localeName(browserLanguage)
}

export function composeImageUrl(
	icon: string,
	size = IconSize,
	color = 'inherit'
): string {
	return `https://icongr.am/devicon/${icon}.svg?size=${size}&color=${color}`
}

export function titlecase(title: string): string {
	return title
		.replaceAll(/[_-]/g, ' ')
		.replace(/((\s\w)|(^\w))/g, (m, p1): string =>
			` ${p1 as string}`.toUpperCase()
		)
}

export function readBlurImage(blurHash: string): string {
	// blurhash invalid
	if (!blurhash.isBlurhashValid(blurHash).result) {
		throw new Error('Invalid blurhash')
	}

	// origial image size
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const pixels = blurhash.decode(blurHash, 200, 200)
	const canvas = document.createElement('canvas')
	const context = canvas.getContext('2d')
	if (context === null) {
		throw new Error('Canvas not supported')
	}
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const imageData = context.createImageData(200, 200)
	imageData.data.set(pixels)
	context.putImageData(imageData, 0, 0)

	return canvas.toDataURL()
}
