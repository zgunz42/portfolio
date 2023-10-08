import { ColorSchemeScript } from '@mantine/core'
import { Head, Html, Main, NextScript } from 'next/document'
import type { ReactElement } from 'react'

export default function Document(): ReactElement {
	return (
		<Html lang='en'>
			<Head>
				<meta charSet='utf8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<ColorSchemeScript defaultColorScheme='dark' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
