import { AppShell, useMantineColorScheme } from '@mantine/core'
import { links } from 'mocks/data/menu.json'
import type { ReactElement } from 'react'
import CvFooterCentered from './CvFooter'
import CvHeader from './CvHeader'

interface Properties {
	children: ReactElement | undefined
}

export default function CvPageLayout({ children }: Properties): ReactElement {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<AppShell
			className={`${dark ? 'bg-gray-900' : 'bg-gray-100'} relative`}
			header={<CvHeader links={links} />}
			footer={<CvFooterCentered links={links} />}
		>
			<div className='min-h-screen'>{children}</div>
		</AppShell>
	)
}
