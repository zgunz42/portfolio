import { Container, Stack } from '@mantine/core'
import CvPageLayout from 'components/CvPageLayout'
import type { ReactElement } from 'react'
import { Helmet } from 'react-helmet'

function HomePage(): ReactElement {
	return (
		<CvPageLayout>
			<Stack align='stretch' justify='center'>
				<Helmet>
					<title>Adi Gunawan | FullStack Developer and IOT antusias</title>
				</Helmet>
				<Container className='w-lg'>
					<h1 className='text-center text-3xl font-bold'>
						Temukan event diskeitarmu
					</h1>
				</Container>
			</Stack>
		</CvPageLayout>
	)
}

export default HomePage
