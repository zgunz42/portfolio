/* eslint-disable unicorn/no-keyword-prefix */
import { AppShell, useMantineColorScheme } from '@mantine/core'
import useLocale from 'hooks/useLocale'
import type { PropsWithChildren, ReactElement } from 'react'
import CvFooterCentered from './CvFooter'
import CvHeader from './CvHeader'

interface Properties {
	className?: string
}

function CvPageLayout({
	children,
	className
}: PropsWithChildren<Properties>): ReactElement {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const { menu } = useLocale()
	return (
		<AppShell
			className={`${dark ? 'bg-gray-900' : 'bg-gray-100'} relative ${
				className ?? ''
			}`}
			header={<CvHeader links={menu} />}
			footer={<CvFooterCentered links={menu} />}
			fixed
		>
			<div className='min-h-screen pt-16'>{children}</div>
		</AppShell>
	)
}

CvPageLayout.defaultProps = {
	className: undefined
}

export default CvPageLayout
