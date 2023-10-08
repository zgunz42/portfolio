/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-type-alias */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/jsx-props-no-spreading */
import type { ImageProps } from '@mantine/core'
import { Image } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import fetch from 'cross-fetch'
import NextImage from 'next/image'
import type { RefAttributes } from 'react'
import { readBlurImage } from 'utils'
import type { ArgumentsType } from 'vitest'

export interface ImageInfo {
	filename: string
	hash: string
	sources: string[]
}

const fetchImage = async (url: string): Promise<ImageInfo> => {
	const paths = url.split('/')
	const filename = paths.pop()
	if (!filename) {
		throw new Error('Invalid image filename')
	}
	const imageResponse = await fetch(
		`${window.location.origin}${paths.join('/')}/__generated/${filename}.json`
	)
	const imageMeta = (await imageResponse.json()) as ImageInfo
	const blurImage = readBlurImage(imageMeta.hash)
	imageMeta.hash = blurImage
	return imageMeta
}

type Properties = Omit<
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-magic-numbers
	ArgumentsType<typeof NextImage>[0] & ImageProps,
	'src'
> &
	RefAttributes<HTMLDivElement> & { src: string }

// NOTE: Expirenemntal
function CvImage({
	src,
	alt,
	...properties
}: Omit<Properties, 'key'>): CompElement {
	const { data } = useQuery([src], fetchImage.bind(undefined, src))
	return (
		<Image
			component={NextImage}
			src={data ? `/images/__generated/${data.sources[1]}` : src}
			alt={alt}
			blurDataURL={data ? data.blur : undefined}
			fallbackSrc='https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'
			fill
			style={{ objectFit: 'cover' }}
			{...properties}
		/>
	)
}

export default CvImage
