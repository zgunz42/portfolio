/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Container } from '@mantine/core'
import CvDownloadFailed from 'components/CvDownloadFailed'
import CvDownloadPrepare from 'components/CvDownloadPrepare'
import CvDownloadSuccess from 'components/CvDownloadSuccess'
import CvPageLayout from 'components/CvPageLayout'
import useCreatorCv from 'hooks/useCreatorCv'
import Head from 'next/head'
import type { ReactElement } from 'react'
import { useEffect } from 'react'

function CvDownloadPage(): ReactElement {
	const { createCV, isLoading, isError, progress } = useCreatorCv()
	const onDownload = (): void => {
		void createCV()
	}
	useEffect(() => {
		if (progress >= 100) {
			setTimeout(() => {
				void createCV()
			}, 5000)
		}
	}, [createCV, progress])

	return (
		<CvPageLayout className='page'>
			<Head>
				<title>Download Resume | I Kadek Adi Gunawan</title>
			</Head>
			<Container>
				{progress < 100 && <CvDownloadPrepare progress={progress} />}
				{progress >= 100 &&
					(!isLoading && !isError ? (
						<CvDownloadSuccess onDownload={onDownload} />
					) : (
						<CvDownloadFailed />
					))}
			</Container>
		</CvPageLayout>
	)
}

export default CvDownloadPage
