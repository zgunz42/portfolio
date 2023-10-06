/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/jsx-props-no-spreading */
import type { ImageProps } from '@mantine/core'
import { Image } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import type { IMetaImage } from 'api'
import fetch from 'cross-fetch'
import type { ReactElement, RefAttributes } from 'react'
import { readBlurImage } from 'utils'

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
// NOTE: Expirenemntal
function CvImage({
	src,
	alt,
	...properties
}: Omit<ImageProps, 'src'> &
	RefAttributes<HTMLDivElement> & { src: string }): ReactElement {
	const { data } = useQuery([src], fetchImage.bind(undefined, src))
	return <Image src={data} alt={alt} withPlaceholder {...properties} />
}

export default CvImage
