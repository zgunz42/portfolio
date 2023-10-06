import type { ReactElement } from 'react'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}): ReactElement {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf8' />
				<link rel='icon' type='image/svg+xml' href='/icon.svg' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<title>My App</title>
				<meta name='description' content='My App is a...' />
			</head>
			<body>
				<div id='root'>{children}</div>
			</body>
		</html>
	)
}
