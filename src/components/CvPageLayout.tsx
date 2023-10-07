/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable unicorn/no-keyword-prefix */
import { AppShell, useMantineColorScheme } from '@mantine/core'
import { useHeadroom } from '@mantine/hooks'
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
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const pinned = useHeadroom({ fixedAt: 120 })
	const dark = colorScheme === 'dark'
	const { menu } = useLocale()
	return (
		<AppShell
			className={`${dark ? 'bg-gray-900' : 'bg-gray-100'} relative ${
				className ?? ''
			}`}
			header={{ height: 60, collapsed: !pinned, offset: false }}
		>
			<AppShell.Header>
				<CvHeader links={menu} />
			</AppShell.Header>
			<AppShell.Main>
				<div className='min-h-screen pt-16'>
					{children}
					<CvFooterCentered links={menu} />
				</div>
			</AppShell.Main>
		</AppShell>
	)
}

CvPageLayout.defaultProps = {
	className: undefined
}

export default CvPageLayout
