/* eslint-disable unicorn/no-keyword-prefix */
import { AppShell, useMantineColorScheme } from '@mantine/core'
import { links } from 'mocks/data/menu.json'
import type { ReactElement } from 'react'
import CvFooterCentered from './CvFooter'
import CvHeader from './CvHeader'

interface Properties {
	children: ReactElement | undefined
	// eslint-disable-next-line react/require-default-props
	className?: string
}

export default function CvPageLayout({
	children,
	className
}: Properties): ReactElement {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<AppShell
			className={`${dark ? 'bg-gray-900' : 'bg-gray-100'} relative ${
				className ?? ''
			}`}
			header={<CvHeader links={links} />}
			footer={<CvFooterCentered links={links} />}
			fixed
		>
			<div className='min-h-screen'>{children}</div>
		</AppShell>
	)
}
