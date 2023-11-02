'use client'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { theme } from 'themes/theme'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function CvMantineRegistry({
	children
}: {
	children: JSX.Element
}) {
	return (
		<MantineProvider defaultColorScheme='dark' theme={theme}>
			<Notifications />
			{children}
		</MantineProvider>
	)
}
