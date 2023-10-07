import { Button, Card, Image, Text, Title } from '@mantine/core'
import { Refresh } from 'tabler-icons-react'

function CvDownloadFailed(): CompElement {
	return (
		<Card className='mx-auto max-w-md text-center'>
			<Image
				src='/images/__generated/340px-red-nooooooo.png'
				className='mx-auto w-full max-w-xs'
				alt='loading illustration'
			/>
			<Title order={2} className='mb-4'>
				Sorry we could not prepare your CV
			</Title>
			<Text className='mt-4 mb-8'>
				CV could not be prepared. Please try again later. by clicking button
				below.
			</Text>
			<Button leftSection={<Refresh />}>Retry</Button>
		</Card>
	)
}

export default CvDownloadFailed
