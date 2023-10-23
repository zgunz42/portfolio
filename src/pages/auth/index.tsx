/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable react/jsx-props-no-spreading */
import { Center, Stack } from '@mantine/core'
import CvAuthenticationForm from 'components/CvAuthenticationForm'
import CvPageLayout from 'components/CvPageLayout'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getCsrfToken } from 'next-auth/react'
import Head from 'next/head'
import type { ReactElement } from 'react'

function AuthPage({
	csrfToken
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	// const { $t } = useLocale()
	return (
		<CvPageLayout>
			<Head>
				<title>Authentication | I Kadek Adi Gunawan</title>
			</Head>
			<Stack py={80}>
				<Center>
					<CvAuthenticationForm csrfToken={csrfToken} />
				</Center>
			</Stack>
		</CvPageLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const csrfToken = await getCsrfToken(context)
	return {
		props: { csrfToken }
	}
}

export default AuthPage
