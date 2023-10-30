/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Avatar, Box, Group, rem, Text } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import type { ReactElement } from 'react'
import classes from './CvUserButton.module.css'

interface Properties {
	title: string
	description: string
}

function CvUserButton({ title, description }: Properties): ReactElement {
	return (
		<Box className={classes.user}>
			<Group>
				<Avatar radius='xl' />

				<div style={{ flex: 1 }}>
					<Text size='sm' fw={500}>
						{title}
					</Text>

					<Text c='dimmed' size='xs'>
						{description}
					</Text>
				</div>

				<IconChevronRight
					style={{ width: rem(14), height: rem(14) }}
					stroke={1.5}
				/>
			</Group>
		</Box>
	)
}

export default CvUserButton
