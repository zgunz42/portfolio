/* eslint-disable unicorn/no-keyword-prefix */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-type-alias */
import { Checkbox, Image, Text, UnstyledButton } from '@mantine/core'
import { useUncontrolled } from '@mantine/hooks'
import type React from 'react'
import type { ReactElement } from 'react'
import classes from './CvImageCheckboxs.module.css'

interface ImageCheckboxProperties {
	checked?: boolean
	defaultChecked?: boolean
	onChange?: (checked: boolean) => void
	title: string
	description: string
	image: string
}

type Properties = ImageCheckboxProperties &
	Omit<React.ComponentPropsWithoutRef<'button'>, keyof ImageCheckboxProperties>

function CvImageCheckbox({
	checked,
	defaultChecked,
	onChange,
	title,
	description,
	className,
	image,
	...others
}: Properties): ReactElement {
	const [value, handleChange] = useUncontrolled({
		value: checked,
		defaultValue: defaultChecked,
		finalValue: false,
		onChange
	})

	return (
		<UnstyledButton
			{...others}
			onClick={(): void => handleChange(!value)}
			data-checked={value || undefined}
			className={classes.button}
		>
			<Image src={image} alt={title} />

			<div className={classes.body}>
				<Text c='dimmed' size='xs' lh={1} mb={5}>
					{description}
				</Text>
				<Text fw={500} size='sm' lh={1}>
					{title}
				</Text>
			</div>

			<Checkbox
				checked={value}
				onChange={(): void => {}}
				tabIndex={-1}
				styles={{ input: { cursor: 'pointer' } }}
			/>
		</UnstyledButton>
	)
}

CvImageCheckbox.defaultProps = {
	checked: false,
	defaultChecked: false,
	onChange: undefined
}

export default CvImageCheckbox
