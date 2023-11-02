/* eslint-disable @typescript-eslint/no-magic-numbers */
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
	IconBuildingHospital,
	IconCalendar,
	IconCar,
	IconCards,
	IconCash,
	IconDeviceGamepad,
	IconDeviceTv,
	IconDroplet,
	IconGasStation,
	IconHome,
	IconHttpConnect,
	IconMobiledata,
	IconPhone,
	IconRoad,
	IconSchool,
	IconSignature,
	IconSolarElectricity,
	IconTag,
	IconTicket,
	IconTrain,
	IconUserBolt,
	IconUsersGroup,
	IconVideo,
	IconWorld
} from '@tabler/icons-react'
import type { ReactElement } from 'react'
import classes from './CvProductTypeInput.module.css'

interface Properties extends InputBaseProps {
	labels: { label: string; value: string }[] | string[]
	value: string
	onOpen: () => void
	onChange: (value: string) => void
}

function CvProducTypeInput({
	labels,
	value,
	onChange,
	onOpen,
	...properties
}: Properties): ReactElement {
	const getIcon = (label: string): ReactElement => {
		switch (label.toLowerCase()) {
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
			case 'pdam':
				return <IconDroplet />
			case 'emoney':
				return <IconCash />
			case 'bpjs':
				return <IconBuildingHospital />
			case 'internet':
				return <IconHttpConnect />
			case 'tv':
				return <IconDeviceTv />
			case 'hp':
				return <IconPhone />
			case 'finance':
				return <IconCards />
			case 'iuran':
				return <IconCalendar />
			case 'kereta':
				return <IconTrain />
			case 'pbb':
				return <IconHome />
			case 'gas':
				return <IconGasStation />
			case 'pendidikan':
				return <IconSchool />
			case 'pajak-kendaraan':
				return <IconCar />
			case 'dm-member':
				return <IconUsersGroup />
			case 'dm-nonmember':
				return <IconUserBolt />
			default:
				return <IconTag />
		}
	}

	const combobox = useCombobox()

	const options = labels.map(item => {
		if (typeof item === 'string') {
			return (
				<Combobox.Option value={item} key={item}>
					<Flex>
						{getIcon(item)}
						<Space w='sm' />
						{item}
					</Flex>
				</Combobox.Option>
			)
		}
		return (
			<Combobox.Option value={item.value} key={item.value}>
				<Flex>
					{getIcon(item.value)}
					<Space w='sm' />
					{item.label}
				</Flex>
			</Combobox.Option>
		)
	})

	return (
		<Combobox
			onOptionSubmit={(optionValue): void => {
				onChange(optionValue)
				combobox.closeDropdown()
			}}
			onOpen={onOpen}
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
				<Combobox.Options style={{ overflowY: 'auto', maxHeight: 200 }}>
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
