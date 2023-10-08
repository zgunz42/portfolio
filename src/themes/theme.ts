'use client'

import type { MantineColorsTuple } from '@mantine/core'
import { createTheme } from '@mantine/core'

const primaryColor: MantineColorsTuple = [
	'#eef3ff',
	'#dce4f5',
	'#b9c7e2',
	'#94a8d0',
	'#748dc1',
	'#5f7cb8',
	'#5474b4',
	'#44639f',
	'#39588f',
	'#2d4b81'
]

// eslint-disable-next-line import/prefer-default-export
export const theme = createTheme({
	/* Put your mantine theme override here */
	primaryColor: 'sambat',
	colors: {
		sambat: primaryColor
	},
	breakpoints: {
		xs: '36em',
		sm: '48em',
		md: '62em',
		lg: '75em',
		xl: '88em',
		tablet: '768px'
	}
})
