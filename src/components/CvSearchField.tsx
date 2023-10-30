/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { TextInputProps } from '@mantine/core'
import { ActionIcon, rem, TextInput, useMantineTheme } from '@mantine/core'
import { IconArrowRight, IconSearch } from '@tabler/icons-react'
import type { ReactElement } from 'react'

function CvSearchField(properties: TextInputProps): ReactElement {
	const theme = useMantineTheme()

	return (
		<TextInput
			radius='xl'
			size='md'
			placeholder='Search products'
			rightSectionWidth={42}
			leftSection={
				<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
			}
			rightSection={
				<ActionIcon
					size={32}
					radius='xl'
					color={theme.primaryColor}
					variant='filled'
				>
					<IconArrowRight
						style={{ width: rem(18), height: rem(18) }}
						stroke={1.5}
					/>
				</ActionIcon>
			}
			{...properties}
		/>
	)
}

export default CvSearchField
