/* eslint-disable @typescript-eslint/no-magic-numbers */
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
						<Title
							data-testid='error-title-element'
							mt={12}
							style={{ color: 'var(--mantine-color-red-5)' }}
						>
							{error.message}
						</Title>
					</Stack>
				) : (
					<Stack align='center'>
						<CvLogo className='h-24 w-24' />
						<Loader
							data-testid='loader-element'
							aria-label='loading'
							className='mt-8'
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
