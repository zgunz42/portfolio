/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-type-alias */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { theme } from 'themes/theme'

type Property = ArgumentsType<typeof MantineProvider>[0]
type Child = Property['children']

export default function RootLayout({
	children
}: {
	children: Child
}): JSX.Element {
	return (
		<html lang='en'>
			<head>
				<ColorSchemeScript />
				<meta charSet='utf8' />
				<link rel='icon' type='image/svg+xml' href='/icon.svg' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<title>My App</title>
				<meta name='description' content='My App is a...' />
			</head>
			<body>
				<MantineProvider defaultColorScheme='dark' theme={theme}>
					{children}
				</MantineProvider>
			</body>
		</html>
	)
}
