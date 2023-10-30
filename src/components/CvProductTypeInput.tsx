/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-handler-names */
import type { InputBaseProps } from '@mantine/core'
import {
	Combobox,
	Flex,
	Input,
	InputBase,
	Space,
	useCombobox
} from '@mantine/core'
import {
	IconDeviceGamepad,
	IconMobiledata,
	IconPhone,
	IconRoad,
	IconSignature,
	IconSolarElectricity,
	IconTicket,
	IconVideo,
	IconWorld
} from '@tabler/icons-react'
import type { ReactElement } from 'react'
import classes from './CvProductTypeInput.module.css'

interface Properties extends InputBaseProps {
	labels: string[]
	value: string
	onChange: (value: string) => void
}

function CvProducTypeInput({
	labels,
	value,
	onChange,
	...properties
}: Properties): ReactElement {
	const getIcon = (label: string): ReactElement => {
		switch (label) {
			case 'voucher':
				return <IconTicket />
			case 'data':
				return <IconMobiledata />
			case 'pln':
				return <IconSolarElectricity />
			case 'game':
				return <IconDeviceGamepad />
			case 'etoll':
				return <IconRoad />
			case 'pulsa':
				return <IconPhone />
			case 'streaming':
				return <IconVideo />
			case 'emeterai':
				return <IconSignature />
			case 'international':
				return <IconWorld />
			default:
				return <IconWorld />
		}
	}

	const combobox = useCombobox()

	const options = labels.map(item => (
		<Combobox.Option value={item} key={item}>
			<Flex>
				{getIcon(item)}
				<Space w='sm' />
				{item}
			</Flex>
		</Combobox.Option>
	))

	return (
		<Combobox
			onOptionSubmit={(optionValue): void => {
				onChange(optionValue)
				combobox.closeDropdown()
			}}
			store={combobox}
		>
			<Combobox.Target targetType='button'>
				<InputBase
					label='Pilih Layanan'
					component='button'
					onClick={(): void => combobox.openDropdown()}
					onFocus={(): void => combobox.openDropdown()}
					onBlur={(): void => combobox.closeDropdown()}
					{...properties}
				>
					{value === '' ? (
						<Input.Placeholder color='var(--mantine-color-primary-5)'>
							Klik untuk memilih
						</Input.Placeholder>
					) : (
						<Input.Placeholder color='var(--mantine-color-primary-5)'>
							<Flex align='center' className={classes['hint-color']}>
								{getIcon(value)}
								<Space w='sm' />
								{value}
							</Flex>
						</Input.Placeholder>
					)}
				</InputBase>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>
					{options.length === 0 ? (
						<Combobox.Empty>Nothing found</Combobox.Empty>
					) : (
						options
					)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	)
}

export default CvProducTypeInput
