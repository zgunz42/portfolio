import { ColorSchemeScript } from '@mantine/core'
import { Head, Html, Main, NextScript } from 'next/document'
import type { ReactElement } from 'react'

export default function Document(): ReactElement {
	return (
		<Html lang='en'>
			<Head>
				<ColorSchemeScript defaultColorScheme='dark' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
