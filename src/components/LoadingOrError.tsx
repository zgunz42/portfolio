import { Box, Center, Loader, Title } from '@mantine/core'
import type { ReactElement } from 'react'
import CvIconCat from './CvIconCat'
import CvLogo from './CvLogo'

interface Properties {
	error?: Error
}
export default function LoadingOrError({ error }: Properties): ReactElement {
	return (
		<div className='flex min-h-screen items-center justify-center'>
			<h1 className='text-xl' data-testid='LoadingOrError'>
				{error ? (
					<Box>
						<CvIconCat />
						<Title mt={8} color='red'>
							error.message
						</Title>
					</Box>
				) : (
					<Center>
						<CvLogo />
						<Loader mt={12} />
					</Center>
				)}
			</h1>
		</div>
	)
}
LoadingOrError.defaultProps = {
	error: undefined
}
