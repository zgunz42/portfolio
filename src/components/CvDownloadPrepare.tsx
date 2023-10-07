import { Card, Image, Progress, Text, Title } from '@mantine/core'
import useLocale from 'hooks/useLocale'
import type { ReactElement } from 'react'
import { Clock } from 'tabler-icons-react'

interface Properties {
	progress: number
}

function CvDownloadPrepare({ progress }: Properties): ReactElement {
	const { $t } = useLocale()

	return (
		<Card className='mx-auto max-w-md text-center'>
			<Image
				src='/images/__generated/340px-lotus%20pose%20clean.png'
				className='float-anim-inf mx-auto w-full max-w-xs'
				alt='loading illustration'
			/>
			<Title order={2} className='mb-4'>
				{$t('download.cv.prepare.title')}
			</Title>
			<Progress
				className='mx-auto max-w-xs'
				value={progress}
				size='xl'
				radius='xl'
			>
				<Progress.Label>{`${progress}%`}</Progress.Label>
			</Progress>
			<Text className='mt-4 mb-8 max-w-sm text-xs'>
				<Clock size='0.75rem' className='ml-2 mr-1 inline-block' />
				{$t('download.cv.prepare.text')}
			</Text>
		</Card>
	)
}

export default CvDownloadPrepare
