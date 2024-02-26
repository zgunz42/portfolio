'use client'

/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	ActionIcon,
	Box,
	Button,
	Group,
	List,
	Stack,
	Text,
	ThemeIcon
} from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import type { ContextModalProps } from '@mantine/modals'
import {
	IconCopy,
	IconInfoCircleFilled,
	IconStepInto
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import advanceFormat from 'dayjs/plugin/advancedFormat'
import timeZone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import Link from 'next/link'
import type { ReactElement } from 'react'
import { addSpaceChar } from 'utils'
import classes from './CvPaymentInfoModal.module.css'

dayjs.extend(utc)
dayjs.extend(timeZone)
dayjs.extend(advanceFormat)

export interface InnerProperties {
	paymentNo: string
	paymentFee: string
	paymentTotal: string
	paymentMethod: string
	paymentChannel: string
	paymentDate: string
	paymentInstructionUrl: string
}

function CvPaymentInfoModal({
	context,
	id,
	innerProps
}: ContextModalProps<InnerProperties>): ReactElement {
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const clipboard = useClipboard({ timeout: 500 })
	const onCloseClick = (): void => {
		context.closeModal(id)
	}
	const onCopyClick = (): void => {
		clipboard.copy(innerProps.paymentNo)
	}

	return (
		<Stack gap='xs'>
			<Box className={classes['fee-banner']}>
				<IconInfoCircleFilled size='1.5rem' d='inline-block' />
				<Text>
					Biyaya admin {innerProps.paymentFee} telah ditambahkan dalam total di
					bawah
				</Text>
			</Box>
			<Text>Total Tagihan:</Text>
			<Group className={classes.instruction} justify='space-between'>
				<Text fz='lg'> {innerProps.paymentTotal}</Text>
				<ActionIcon onClick={onCopyClick}>
					<IconCopy />
				</ActionIcon>
			</Group>
			<Text>No. Rekening:</Text>
			<Group className={classes.instruction} justify='space-between'>
				<Text fz='lg'>{addSpaceChar(innerProps.paymentNo, 4, '-')}</Text>
				<ActionIcon onClick={onCopyClick}>
					<IconCopy />
				</ActionIcon>
			</Group>
			<Text c='green'>
				Prosses verifikasi kurang dari 5 menit setelah pembayaran selesai
			</Text>
			<Box className={classes.instruction}>
				<Text>Instruksi</Text>
				<List
					center
					icon={
						<ThemeIcon color='teal' size={16} radius='xl'>
							<IconStepInto size='1rem' />
						</ThemeIcon>
					}
				>
					<List.Item>
						<Text>
							Bayar pesanan ke {innerProps.paymentChannel} sebelum{' '}
							<Text c='yellow'>
								{dayjs(innerProps.paymentDate)
									.tz(dayjs.tz.guess())
									.format('D MMMM YYYY h:mm A z')
									.replace('GMT+8', 'WITA')
									.replace('GMT+7', 'WIB')
									.replace('GMT+9', 'WIT')}
							</Text>
						</Text>
					</List.Item>
					<List.Item>
						<Text>Hanya menerima dari {innerProps.paymentChannel}</Text>
					</List.Item>
					<List.Item>
						<Text>
							Instruksi cara pembayaran klik di
							<Link href={innerProps.paymentInstructionUrl}>
								<Text
									component='a'
									style={{ display: 'inline-block', marginLeft: 5 }}
								>
									<Box
										style={{
											cursor: 'pointer',
											color: 'var(--mantine-color-sambat-9)'
										}}
										c='sambat'
									>
										sini
									</Box>
								</Text>
							</Link>
						</Text>
					</List.Item>
				</List>
			</Box>
			<Button fullWidth mt='md' onClick={onCloseClick}>
				Check Status
			</Button>
		</Stack>
	)
}

export default CvPaymentInfoModal
