'use client'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { theme } from 'themes/theme'
import CvPaymentInfoModal from './CvPaymentInfoModal'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function CvMantineRegistry({
	children
}: {
	children: JSX.Element
}) {
	return (
		<MantineProvider defaultColorScheme='dark' theme={theme}>
			<ModalsProvider modals={{ payInfo: CvPaymentInfoModal }}>
				<Notifications />
				{children}
			</ModalsProvider>
		</MantineProvider>
	)
}
