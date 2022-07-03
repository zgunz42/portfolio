/* eslint-disable unicorn/no-keyword-prefix */
import { AppShell, useMantineColorScheme } from '@mantine/core'
import { links as EnLinks } from 'data/langs/en-US/menu.json'
import { links as IDLinks } from 'data/langs/id-ID/menu.json'
import type { PropsWithChildren, ReactElement } from 'react'
import { useIntl } from 'react-intl'
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
	const intl = useIntl()
	const links = intl.locale === 'en' ? EnLinks : IDLinks
	return (
		<AppShell
			className={`${dark ? 'bg-gray-900' : 'bg-gray-100'} relative ${
				className ?? ''
			}`}
			header={<CvHeader links={links} />}
			footer={<CvFooterCentered links={links} />}
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
