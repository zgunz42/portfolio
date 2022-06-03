import { Loader, Stack, Title } from '@mantine/core'
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
					<Stack align='center'>
						<CvIconCat height={50} />
						<Title data-testid='error-title-element' mt={12} color='red'>
							{error.message}
						</Title>
					</Stack>
				) : (
					<Stack align='center'>
						<CvLogo height={50} />
						<Loader
							data-testid='loader-element'
							aria-label='loading'
							color='gray'
							mt={12}
						/>
					</Stack>
				)}
			</h1>
		</div>
	)
}
LoadingOrError.defaultProps = {
	error: undefined
}
