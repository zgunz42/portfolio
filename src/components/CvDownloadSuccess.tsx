import { Button, Card, Image, Text, Title } from '@mantine/core'
import type { ReactElement } from 'react'
import { CloudDownload } from 'tabler-icons-react'

interface Properties {
	onDownload: VoidFunction
}

function CvDownloadSuccess({ onDownload }: Properties): ReactElement {
	return (
		<Card className='mx-auto max-w-md pb-12 text-center'>
			<Image
				src='/images/__generated/340px-success.png'
				className='mx-auto w-full max-w-xs'
				alt='loading illustration'
			/>
			<Title order={2} className='mb-4'>
				The CV is Ready
			</Title>
			<Text className='mt-4 mb-6'>
				CV has been created, wait for it automatically download under 5 seconds.
				When you click button below, it will download too.
			</Text>
			<Button onClick={onDownload} leftIcon={<CloudDownload />}>
				Download Now
			</Button>
		</Card>
	)
}

export default CvDownloadSuccess
