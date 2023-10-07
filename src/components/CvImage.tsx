/* eslint-disable @typescript-eslint/no-type-alias */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/jsx-props-no-spreading */
import type { ImageProps } from '@mantine/core'
import { Image } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import type { IMetaImage } from 'api'
import fetch from 'cross-fetch'
import NextImage from 'next/image'
import type { RefAttributes } from 'react'
import { readBlurImage } from 'utils'
import type { ArgumentsType } from 'vitest'

const fetchImage = async (url: string): Promise<string> => {
	const paths = url.split('/')
	const filename = paths.pop()
	if (!filename) {
		throw new Error('Invalid image filename')
	}
	const imageResponse = await fetch(
		`${window.location.origin}${paths.join('/')}/__generated/${filename}.json`
	)
	const imageMeta = (await imageResponse.json()) as IMetaImage
	const blurImage = readBlurImage(imageMeta.hash)
	return blurImage
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
			src={data}
			alt={alt}
			fallbackSrc='https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'
			width={600}
			height={400}
			{...properties}
		/>
	)
}

export default CvImage
