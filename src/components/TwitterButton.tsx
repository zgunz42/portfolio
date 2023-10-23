/* eslint-disable react/jsx-props-no-spreading */
import type { ButtonProps } from '@mantine/core'
import { Button } from '@mantine/core'
import { TwitterIcon } from '@mantine/ds'

export default function TwitterButton(
	properties: ButtonProps & React.ComponentPropsWithoutRef<'button'>
): CompElement {
	return (
		<Button
			leftSection={
				<TwitterIcon
					style={{ width: '1rem', height: '1rem' }}
					color='#00ACEE'
				/>
			}
			variant='default'
			{...properties}
		/>
	)
}
